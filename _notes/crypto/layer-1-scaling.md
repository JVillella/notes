---
---

> Make the blockchain itself have a higher transaction capacity. [however]..."bigger blocks" are inherently more difficult to verify and likely to become more centralized...developers can either increase the efficiency of client software or, more sustainably, use techniques such as sharding to allow the work of building and verifying the chain to be split up across many nodes; the effort known as "eth2" is currently building this upgrade to Ethereum. ~[An Incomplete Guide to Rollups](https://vitalik.ca/general/2021/01/05/rollup.html)

## Sharding

How It Works:

> We split the state and history up into K = O(n / c) partitions that we call “shards”. For example, a sharding scheme on Ethereum might put all addresses starting with 0x00 into one shard, all addresses starting with 0x01 into another shard, etc. In the simplest form of sharding, each shard also has its own transaction history, and the effect of transactions in some shard k are limited to the state of shard k.
>
> One simple example would be a multi-asset blockchain, where there are K shards and each shard stores the balances and processes the transactions associated with one particular asset. In more advanced forms of sharding, some form of cross-shard communication capability, where transactions on one shard can trigger events on other shards, is also included. ~[On sharding blockchains FAQs](https://eth.wiki/sharding/Sharding-FAQs)

## Larger Block Size & Shorter Block Intervals

E.g. Bitcoin Cash

Leads to an increased rate of forks.

> In a fork, the blockchain is bifurcated into multiple branches, and there is no single blockchain... Eventually, one branch is chosen and other branches are...pruned...ignored.

Security Risks of Forks

- Reduce security against attackers. Bitcoin is secured by mining power, and mining power in pruned branches does not participate in securing the system. If 1/4 of the blocks are pruned, then an attacker can be 1/4 smaller to perform selfish mining, or a 51% attack.
- Reduce rareness among miners. When forks are frequent, small miners and miners that are not well connected to the overlay network...earn less than their fair share. Miners are therefore incentivized to coalesce into larger and larger pools, and thereby pose a centralization threat

## Bitcoin-NG Approach

- [Explanation Article](https://hackingdistributed.com/2015/10/14/bitcoin-ng/)

Instead of looking at the past 10 minutes of transactions for a block - look forward 10 minutes. Elect a "leader" who serializes transactions until the next leader is chosen.

2 types of blocks. _Key-blocks_ - used for leader selection, occur every 10 minutes. Are the same as Bitcoin blocks. _Microblocks_ contain transactions, are generated by the epoch leader, contain no proof of work, and are signed with the leader’s private key. Microblock creation is limited solely by signing speed (in the millisecond range) and network propagation speeds of small microblocks.

> Yes, BTC-NG powers Waves now, and is being considered for Aeternity and Cypherium, and is potentially on the medium-term roadmap for BCH. The highest on-chain scalability numbers for blockchains that I have seen reported come from Waves, so NG is, at the moment, surprisingly still the leading on-chain scalability solution. ~ http://disq.us/p/1quhs5v

## Sharding

E.g. as proposed in [[ethereum-2]]

A horizontal scaling approach: splitting a chain into multiple independent chains (shards) to distribute the load.

[//begin]: # "Autogenerated link references for markdown compatibility"
[ethereum-2]: ethereum-2 "ethereum-2"
[//end]: # "Autogenerated link references"
