---
---

With MEV Senpai and Hasu

**MEV Actors**

- Miners (those sequencing blocks)
- Searchers (express transaction ordering preferences to a miner; e.g. arbitrage between exchanges)
- Users (e.g. those taking out loans, trading)
- dApps (create MEV game oppourtunities)
- Protocol Developers (create base rules of the games)

_Decentralized Finances work b/c their exists incentives to balance out prices, creating efficient markets._

## How It Works

### Searching

- Need to know how dapps work, their logic
- Identify optimal trade to capture value
- Put trade in bundle, send off to miners via flashbots auction

Flashbots, open and permissionless, to avoid traders building private relationships with miners for MEV extraction.

### Flashbots

(Bundle is a group of transactions that a searcher submits to a miner)

- (Targeting) Could be my own transactions, or someone else's I found in the pending mempool (or some other source)
- (Targeting) Has to be executed precisely in the order given (e.g. right after a big order)
- (Atomic) All executed or nothing
- Published directly to miner through the flashbots relay, not through public mempool (could be seen by sandich bots otherwise)

A core role of the relay today is to run each transaction to make sure no ddos-ing on miners happens. They also have a reputation where new / low rep searcher requests go into a low priority queue.

When a bundle is sent to a miner, it's simulated locally to figure out what the "gas" price is. Workers will take the top bundle and include it in a block.

### Unbundling

Uncle blocks as a way of unbundling (or deep re-orgs)...Bundles submitted, gone stale. Put gaurds on contract (`require block.hash == desiredBlockHash`, for example for sandwich attacks; not applicable to arbitrage bots.

### Relayers

- Flashbots
- ArcherDAO's w/ Archer Swap MEV protection
- bloXroute
- direct miner relationships

Long tail approaches, don't submit to flashbots otherwise people can steal the approach. Direct to miners and bloXroute have different properties than flashbots relays enabling different strategies that are not possible on flashbots relay.

## MEV Strategies

- Arbitrage
- Liquidation
- Sandwich
- _Extremely_ long tail of other strategies

> 10 teams that take 80-90% of MEV in those categories on Flashbots...pretty efficient as well.

> Miners are in the privileged position that 80-90% profits goes to miners...they could extract value themselves

Cartelization is happening early on on new opportunities, but if it bothers miners they may just extract MEV themselves

Competition/edge seems to be on gas efficieny of contracts. Gas tokens (through `selfdestruct`) seems to be table stakes. Removing solidity gaurd rails (by writing in assembly) is a growing technique. Space efficient address formats is another technique.

Taking risk (e.g. time risk) is a big opportunity on the table.

## Trading

**Account Abstraction:** Able to make transactions from wallet, but pay for them from another wallet. One transaction "sponsors" another by having a coinbase.transfer (or high enough gas payment) part of a bundle that includes a 0 gas payment.

- Can have ERC-20 in a wallet w/o ETH in the wallet, and have another wallet w/ eth pay for it
- This is useful for privacy (a la [Tornado Cash](https://tornado.cash/))
- Bundling a trade to avoid sandwiching, send it to a private relay
- Sandwich attacks happen because trades have a price impact. Traders set a slippage tollerance since the market may move ahead of them, the transaction would fail and it'd cost them money. If you have account abstraction, and your account only pays if the transaction succeeds.
- Hundreds of transactions a day w/ millions of dollars worth
- Sushiswap just integrated ["Archerswap"](https://archerdao.io/) the MEV protection service

Non-leaking MEV transactions

- Batched Auctions
- Request for Flow Transactions (RFQ)

All these systems are just creating protocols that change the terms on how MEV is extracted. Your never removing MEV, your just changing the terms in which it's extracted. ~[Philip Daian](https://twitter.com/phildaian?lang=en)

How it has become harder to sandwich attack on Uniswap V3. Big innovation w/ Uniswap V3 was to concentrate liquidity within price ranges. Users can set tighter slippage, preventing MEV oppourtunities.

MEV Senpai didn't bother w/ V3 for technical challenges, harder to reason about.

Flash loans add 200-300k gas and 0.09 - 0.3% fee. Very hard to win auction this way. Person with capital always wins out over flash loans.

> If you are trading on something for the first time it costs a little more gas than if you have that token already...If you look at top bots they'll have wallets that have like a thousand tokens and they only have one of each of those tokens.

### Using DEXs

- You should not use Uniswap directly, use aggregator services; can "arbitrage me" to negotiate the MEV turn in better favour of the end user, instead of someone else taking it.

> Miners are in a priviledged position to extract this value, that's why it's called Miner Extracted Value. We are learning today this isn't true. The person who submits the transaction is in a dominant position as they get to choose who to give it to...why people are calling it "maximal extractable value" instead of "miner extractable value"... We need to build MEV-aware systems.

## Short-Term Re-Orgs

In proof of work systems, miners are operating in a probabilistic lottery. Two miners might win at the nearly the same time. Due to network propogation delays you may not have known another party created/sealed this block. As a node you need to decide which of these two block you should append. This is done by taking the one that has more "computational work". You could mine the block, go back do more computational work, then reveal the block. If you could go back in time many blocks you could take a liquidation someone else got and capture all the MEV from it. Sequence transactions so you can capture lots of MEV. "A time-bandit attack". Very de-stabilizing.

James Lovejoy, master student - paper on double spending attacks on chains - a big reason why miners don't double spend small chains/coins is because it would shrink the market for that hash (they see the market in terms of hashes). Miners have a vested in interest in seeing their "hash" succeed. "It's very unlikely miners would participate in time bandit attacks"

Will be much more difficult to perform these attacks in Eth 2. Nakomoto consensus has one leader that proposes a block and everyone moves to the heaviest chain. With Eth 2, you have one person who proposes a block in a particular block and then there's an "attestation game" (voting) where different stakers vote on that block which gives a weight to the block. If they attested twice, they'd get slashed by the protocol.

## In The Future...

- The end state of the market is a "block template"; division of labour between efficient block producers to maximize payout and miners who don't know of the content.
- Bundle atomicity at the protocol layer: transaction is only valid at position X and block Y
