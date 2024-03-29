---
---

- [[lightning-network-liquidity]]
- [[lightning-network-developer-resources]]

## Relevant Projects

- ["Breez provides a simple, fast and safe way to spend your bitcoins. Powered by Lightning Network, Breez is the future of commerce"](https://github.com/breez?type=source)
- [NiceHash LN Node anyone can connect to](https://www.nicehash.com/nicehash-lightning-network-node)

## Centralization

- [10% of the nodes on Lightning control 80% of the liquidity](https://arxiv.org/pdf/2002.02819.pdf)

Key issues

- [[lightning-network-liquidity]] centralization
- Creates "choke points" which are easier to censor

## Glossary

- Invoice: A request for funds on the Lightning Network including payment type, payment amount, expiry, and other information. This is how payments are made on the Lightning Network, rather than using Bitcoin-style addresses.
- Watchtower:

## Notes

[Bitcoin Q&A: Lightning, Liquid, and Exchange Rates](https://www.youtube.com/watch?v=aM-3dC6dv_o)

- Useful for payment channels
- An inter-ledger protocol that can bridge blockchains - decentralized exchange capability
  - Could use it for atomic swaps, each payment channel is effectively an atomic swap
  - Most layer-2 tech based off of HTLC could be used for this
- Uses an interoperable standard called "Bolt"

[The Bitcoin Lightning Network: Scalable Off-Chain Instant Payments](http://lightning.network/lightning-network-paper.pdf)

> Micropayment channels use real bitcoin transactions, only electing to defer the broadcast to the blockchain in such a way that both parties can guarantee their current balance on the blockchain; this is not a trusted overlay network —payments in micropayment channels are real bitcoin communicated and exchanged off-chain.

Only create 2-way channels. A network of channels would be needed.

> The contracts are enforced by creating a responsibility for one party to broadcast transactions before or after certain dates.

> By chaining together multiple micropayment channels, it is possible to create a network of transaction paths. Paths can be routed using a BGP-like system (Border Gateway Protocol), and the sender may designate a particular path to the recipient. The output scripts are encumbered by a hash, which is generated by the recipient. By disclosing the input to that hash, the recipient’s counterparty will be able to pull funds along the route.

> Without `SIGHASH_NOINPUT`, Bitcoin transactions cannot be spent from before they may be broadcast — it’s as if one could not draft a contract without paying the other party first.

Order of Operations:

1. Create the Funding Transaction (the parent)
2. Create Commitment Transaction and all spends from the commitment transactions (the children)
3. Sign the children
4. Exchange the signatures for the children
5. Sign the parent
6. Exchange the signatures for the parent
7. Broadcast the parent on the blockchain

> Instead of active revocation enforced by the blockchain, it’s necessary to construct the channel itself in similar manner to a Fidelity Bond, whereby both parties make commitments, and violations of these commitments are enforced by penalties. If one party violates their agreement, then they will lose all the money in the channel.

**Revocable Sequence Maturity Contract (RSMC) Terms:**

1. All parties pay into the contract w/ an output enforcing this contract
2. All parties agree to send funds with some waiting period (e.g. # of block confirmations and/or time)
3. If this transaction wasn't broadcasted (redeemed the funds) they can revoke the payout if both parties sign and publish a new payout
4. It's up to one of the parties to publish the new payout term RSMC otherwise the old will get used

> Either party may redeem the funds from the channel. However, the party that broadcasts the Commitment Transaction must wait for the predefined number of confirmations described in the RSMC. The counterparty which did not broadcast the Commitment Transaction may redeem the funds immediately.

> For this reason, one should periodically monitor the blockchain to see if one’s counterparty has broadcast an invalidated Commitment Transaction, or delegate a third party to do so. A third party can be delegated by only giving the Breach Remedy transaction to this third party. They can be incentivized to watch the blockchain broadcast such a transaction in the event of counterparty maliciousness by giving these third parties some fee in the output. Since the third party is only able to take action when the counterparty is acting maliciously, this third party does not have any power to force close of the channel.

## Security Flaws

**[Flood & Loot: A Systemic Attack On The Lightning Network](https://arxiv.org/pdf/2006.08513.pdf)**

> One of the risks that was identified early on is that of a wide systemic attack on the protocol, in which an attacker triggers the closure of many Lightning channels at once. The resulting high volume of transactions in the blockchain will not allow for the proper settlement of all debts, and attackers may get away with stealing some funds.

## Misc Notes

> The payment network Visa achieved 47,000 peak transactions per second (tps) on its network during the 2013 holidays, and currently averages hundreds of millions per day. Currently, Bitcoin supports less than 7 transactions per second with a 1 megabyte block limit. If we use an average of 300
>
> bytes per bitcoin transaction and assumed unlimited block sizes, an equivalent capacity to peak Visa transaction volume of 47,000/tps would be nearly 8 gigabytes per Bitcoin block, every ten minutes on average. Continuously, that would be over 400 terabytes of data per year.

**Privacy**

> Additionally, PTLCs will enable more complex smart contract logic to facilitate unprecedented blockchain escrow conditions and to improve oracles. (Since a blockchain can’t process data outside of its network, an oracle feeds this data to it.) ~[CoinDesk Taproot Upgrade](https://www.coindesk.com/taproot-bitcoin-upgrade-improve-technology-software)

[//begin]: # "Autogenerated link references for markdown compatibility"
[lightning-network-liquidity]: lightning-network-liquidity "lightning-network-liquidity"
[lightning-network-developer-resources]: lightning-network-developer-resources "lightning-network-developer-resources"
[//end]: # "Autogenerated link references"
