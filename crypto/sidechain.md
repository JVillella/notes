# Sidechains

## Sidechain Implementations

### Two-way peg

A user, operating on the mainchain, sends X tokens to a custom address
that locks assets. Those funds are locked on the mainchain, and a corresponding number of tokens are created on the sidechain. The user can now use the tokens on the sidechain. Eventually, the user can transfer back the tokens to the main chain, which causes assets on the sidechain to be locked or destroyed, depending on the implementation.

**Three major types of two-way pegs**

* **simplified payment verification** - "light client", only needs block headers; verifying a transaction is in a block just requires the merkle tree proof to construct a partial Merkle tree root.
* **centralized two-way pegs** - an exchange or organization
* **federated two-way pegs** - a group is responsible for locking and unlocking funds instead of just one. Standard implementations rely on multi-signature schemes, in which a quorum of entities must sign transactions to be deemed valid by the network. Although a better option, it does not eliminate centralization.

Example services: BTC Relay, Zendoo

### Hash Time-Lock Contracts (HTLC)

**How it Works**

* 2 blockchains w/ Alice/Bob
* Alice generates and hashes secret `s`, yielding `h`
* Hashlock: protection of a smart contract with hash `h`
* Alice creates a timelock - an upper bound (time or block height) in which the hashlock can be unlocked
* Alice publishes the contract in Blockchain A
* Bob verifies deployment and records `h` and timelock
* Bob publishes smart contract in Blockchain B with hashlock `h` and an earlier timelock than Alice's
* Alice checks that Bob's smart contract has been published and gives input secret `s` before the earlier timelock to acquire his assets
* Bob sends `s` to Alice's smart contract between the two time intervals to acquire her assets

### Notary Schemes

A trusted federation to attest to events on another chain. This federation will verify to chain A that an event on chain B took place. The notaries will come to an agreement via some consensus algorithm and will issue a signature that can be used to finalize payments on chain A conditional on this consensus.

**Federated Pegged Sidechain**

The federation will be in control of a multisig address on chain A such that assets locked up in the multisig can be issued synthetically on the sidechain (chain B). Liquid network does this(?)

### Relays

* [A Primer on Blockchain Interoperability](https://blockchain.capital/top-highlight-a-primer-on-blockchain-interoperability/)

>Instead of having a federation that verifies events on another chain, relays allow the chains to do this themselves.

Contract on chain A that functions as a light client of chain B, using chain B’s standard verification procedure to verify block headers fed into the contract.

E.g. [BTCRelay](http://btcrelay.org/) is a smart contract on Ethereum that can read the Bitcoin chain. However, it's 1-way; Bitcoin can't read the Ethereum chain as there is no Ethereum relay contract on Bitcoin.

>Relayers are those who submit block headers to BTC Relay. To incentivize the community to be relayers, and thus allow BTC Relay to be autonomous and up-to-date with the Bitcoin blockchain, Relayers can submit block headers to BTC Relay. When any transaction is verified in the block, or the header is retrieved, Relayers will be rewarded a fee. ~[How to be a Relayer and receive incentives?](https://btc-relay.readthedocs.io/en/latest/frequently-asked-questions.html)

Today's relays are mostly 1-way pegged. **There's work happening on 2-way pegs via a central hub called a **relay chain**.

**Relay Chain**

>Relay chains are distinct blockchains that function as light clients for connected “member” blockchains. Member chains can leverage information on other chains by messaging through the relay chain, which tracks part of the state of all connected chains and can be given a degree of control over assets on those chains
>
>Relay chain architectures work best with chains that have certain characteristics, including flexible multisig capability and fast consensus finality, and as such are creating software development toolkits that make it easy for developers to create these types of blockchains.
>
>...downside of the relay architecture is that it is very difficult to connect existing blockchains that don’t have the desired characteristics, including both Bitcoin and Ethereum. Cosmos and Polkadot both use variants of proof of stake (POS) and the Practical Byzantine Fault Tolerant (PBFT) family of consensus algorithms, which limit the number of nodes that actively participate in consensus in exchange for increased throughput and fast consensus finality.
>
>Cosmos and Polkadot present potentially advantageous new paradigms for constructing blockchain networks rather than solutions targeted to existing blockchains.
