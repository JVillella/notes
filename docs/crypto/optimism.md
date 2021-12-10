# Optimism

An implementation of Optimistic Rollups, a [[layer-2-scaling]] solution for [[ethereum]].

## How it Works

Optimistic rollups sit "in parallel" to Ethereum offering significant TPS improvements by avoiding performing computation (during the "happy path"). Since the transactions within optimistic rollups are not actually executed, a fraud detction mechanism is built in called "fraud proofs".

>If someone notices a fraudulent transaction, the rollup will execute a fraud-proof and run the transaction's computation, using the available state data. This means you may have longer wait times for transaction confirmation than a ZK-rollup because the transaction could get challenged.

~[Layer 2 Rollups](https://ethereum.org/en/developers/docs/scaling/layer-2-rollups/#optimistic-rollups)

When you "zoom out" Optimism is basically a chain within a chain. There's a smart contract called the "State Commitment Chain" (SCC) which is an append only log of the state roots of applying each transaction (this "chain" is revertable if the faud proof failed).

Transactions get sent to a (centralized[^1]) sequencer (which puts up the bounty to a bond contract in case of a fraudulent tx). The are plans to [decentralize the sequencer](https://community.optimism.io/docs/protocol/sequencing.html) but as is there are mechanisms in place to frevent censoring of txs by the sequencer. The sequencer is the "miner" appending blocks to its chain (among other things).

**Txs between L1/L2**

L1/L2 calls are not instantaneous / not synchronous (the [bridge contract](https://community.optimism.io/docs/developers/bridge/standard-bridge.html) sitting on L1 will callback to the caller contract "some time in the future"). L2 --> L1 must wait the challange period (7 days). L1 --> L2 should be quick but it's not synchronous. The bridge contract has "helpers" for eth and erc20 transfers (deposits/withdrawals).

Accounts / smart contracts / state are not automatically visible in the L2 chain, it needs to be bridged over, redeployed, etc. This way the sequencer's blockchain is aware of it. If the sequencer goes down, there's a way to rebuild L2 from on-chain L1 data (e.g. via SCC contract)

**Fraud Proofs**

Verifiers run alongside the sequencer monitoring its actions. If they detect an incorrect state root calculation they communicate with L1 chain contracts that re-run the tx (stored as messages in CTC calldata, i.e. `publish(bytes _transactions) public { }`) - uploading necessary L2 state to another L1 StateManager contract. If the resulting state root calculated by L1 smart contract is different than the Sequencer loses staked funds and the verifier makes a profit. To afford time for this "challenging" there is a 7 day L2 --> L1 withdrawal period that has to pass. This will likely rise to market maker services, that for a fee provide L1 ETH for L2 ETH and vice versa.

See [Long withdrawal/dispute periods are fatal for adoption and composability](https://research.paradigm.xyz/rollups)

**Transaction Ordering**

Optimistic Ethereum doesn't have a mempool. Transactions are immediately sequenced when they are submitted to the sequencer. If the [gasPrice](https://community.optimism.io/docs/developers/l2/new-fees.html#for-backend-developers) is too low the tx gets immediately rejected.

## Low-level Breakdown

### OVM

* Needs deterministic contract execution at previous points in time, so replaces EVM with OVM (Optimistic VM) which replaces context-dependent opcodes `ovm{OPCODE}`, e.g. `ovmTIMESTAMP`
* Forks solc (500 lines diff)
* OVM doesn’t have blocks, it is just an ordered list of txs. Instead of a block gas limit there’s a gas rate limit based on a time period (called “epoch”). Txs exceeding gas limit for an epoch return early
* “Sync service” - a process that runs alongside geth operations, responsible for monitoring eth logs, processing them, and injecting corresponding L2 transactions to be applied in the L2 state.

### Smart Contracts

* `ExecutionManager` - “context” (tx, msg, g) is passed in
	* `run` - contract execution begins here
	* Context aware opcodes are routed through to the execution manager (this rewriting is done by the forked solc)
	* Tx get converted to compact “messages”. The to field is replaced with the EM
* `SafetyChecker` - linter/whitelist for contract returning 1/0 if OVM-safe
* `StateManager` - allows messages to access Geth’s StateDB
	* Only gets deployed during fraud proofs
	* The final destination of all ovm opcodes, to then get wired to talk to Geth’s StateDB
* Canonical Transaction Chain (CTC), functionally known as the Sequencer - the to address of txs (later replaced with the StateManager when converted from txs to messages)
	* Append-only log representing “official history”, all txs and in what order, of the roll-up chain
	* Txs submitted via sequencer (prioritized) or a FIFO queue (has a delay)
* State Commitment Chain (SCC) - given a list of state roots, merklize them and save merkle root for intermediate state roots for use in later fraud proofs
	* In the optimistic case correspond to the result of applying each tx in the CTC against the previous one
	* If state roots are incorrect, then fraud verification process allows for invalid state root (and all following it) to be deleted
* `FraudVerifier` (enabled for fraud verification) - Contract that coordinates fraud proof verification.
	* Begins by calling the State Transitioner Factory to initialize a new fraud proof
	* If fraud proof successful, it prunes batches published after dispute point from the SCC
* `StateTransitioner` - Is deployed by Fraud Verifier when a dispute is created (w/ pre-state root and transaction being disputed)
	* Calls EM to re-execute tx on L1
	* Results in a state root mismatch, which then prunes SCC
* `StateManager` - Data provided by user is stored here. Ephemeral state, deployed only for fraud proof. Only contains information about the state that was touched by the disputed tx. State gets loaded by OVM as needed, otherwise would fail immediately with INVALID_STATE_ACCESS error.
* `BondManager` - marks sequencers as “collateralized” by users putting up a refundable deposit (7 days)

### Sequencer

* Rolls up txs into a batch, then publishes to L1
* Even if sequencer disappears, a new sequencer can be launched to continue where things left off
* Can make a tx from L1 to L2
* Anyone can be a sequencer, but to prevent being spammed with junk data, collateral needs to be put up (can withdraw after 7 days) via the Bond Manager.

**Batch Processing**

* Verifies context-related invariants (different context than StateDB)
	* Context is a shared state between
	* Sequencer and queued (FIFO) transactions
* Create merkle tree out of transaction data
* Batch is converted to a OVM Chain Batch Header, stored on CTC (this header stores merkle root)

### Execution Paths

**Happy Path**

* User broadcasts tx
* Sequencer picks up tx
* Sequencer rolls up txs according to epoch
* Publishes txs to CTC
* Publishes intermediate state roots as a state batch in State Commitment Chain

**Fraud Proofs**

See [[fraud-proofs]] for explanation of concept.

* “Microblocks” - each block has 1 tx, each block’s stateroot is that produced by 1 tx, this effectively allows for “intermediate state roots”, something no longer support on L1 since EIP98/EIPPR658
* Verifiers monitor the SCC to see if there’s a mismatch between the stored intermediate state roots and the txs stored in the CTC.
* A mismatch is found by,
	* Uploading tx pre-state to State Manager (deployed on L1)
	* Re-executing (via Execution Manager using state in State Manager) the tx on L1 to produce the correct state root. (Coordinated via Fraud Verifier)
	* If value of a storage slot / account state changes, it gets marked as changed (alongside a counter). For every item changed, user provides merkle proof from L2 state, indicating this was the observed value. Counter is decremented for each published item. Expected to be 0 by complete tx
* Fraud Verifier prunes batches published after dispute point from the SCC

### Questions

* Is a time delay on non-sequencer batches safe?
* How do we guarantee that the deployed contracts are the same on L1 and L2?
* Why was tx.origin removed? (I.e. support disabled)

[^1]: Centralized sequencers is but one approach. See [Who can submit a batch? - An Incomplete Guide to Rollups](https://vitalik.ca/general/2021/01/05/rollup.html)

[//begin]: # "Autogenerated link references for markdown compatibility"
[layer-2-scaling]: layer-2-scaling "Layer-2 Scaling"
[ethereum]: ethereum "Ethereum"
[fraud-proofs]: fraud-proofs "Fraud Proofs"
[//end]: # "Autogenerated link references"
