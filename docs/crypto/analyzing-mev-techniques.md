# Analyzing MEV Transactions

_This document is old and more of a scratchpad. Notes below may be incorrect._

## Glossary

* USV2: Uniswap V2
* SS: ShibaSwap

## Resources

- [MEV Explorer - Leaderboard](https://explore.flashbots.net/leaderboard)
- [Oko Ethereum Explorer](https://oko.palkeo.com/)

## Method

1. https://etherscan.io/tx/<tx_hash>/advanced
2. https://etherscan.io/txsInternal?a=<pair_contract_address>&&m=advanced
3. Go to page w/ block in question, look at transactions around the <tx_hash> of interest
4. https://etherscan.io/tx/<tx_hash>#statechange (can also see miner direct payouts; or if a miner made this transaction)

## Reverse-Engineering Bots

**`0x78A55B9b3BBEffB36A43D9905F654d2769dC55e8`**

1. Bot smart contract: `0x78A55B9b3BBEffB36A43D9905F654d2769dC55e8` (#0x78A)
   * Sometimes it [wins](https://etherscan.io/tx/0xe85d3a51585e1d8d1b2c5bb8a9bd467499f3ffa1b8ab7bc629d73b7fe5ba4317) and sometimes it [loses](https://etherscan.io/tx/0x3bb232a67efe9ef987495c0dcca437de738d8def4f0bf2afb793d75f2d1811a0)
2. EOA that triggers the withdrawals: `0xF46b0BDfB89B704D09AcF3AE722a49db0C7efe8B` (#0xF46)
   * This contract triggers the #0x78A bot contract to send withdrawals to a subset (3 + 1) EOA tx issuer accounts ([example](https://etherscan.io/tx/0x95d19d03ac16eb64f988f6869d2e7abe0adeba2b0879e848334fddd8ef144859/advanced))
   * Withdrawals happens every ~1 day
3. EOA tx issuers: `0x3F6349708CB72750fFAF7F69fae94718b983de39`, `0x55f6b9cb4CcF714BEc345a95DF3d1460Bc9d35Cb`, ... (many of them)
   * Their ETH balances never go above 2 ETH (hard threshold?). Usually stays above 1 ETH.
4. Strategy
   * Standard arbitrage, usually after a big trade, pays gas
   * [Sometimes splits MEV](https://etherscan.io/tx/0xa367636b0ad457c88381e7cfb45031c3f71769cf4a0e4f4b2d928ba3dc1e2d63#statechange) and pays no gas

## Examples

### Misclassification

**[0x51255ecfe42d5f91e759a26cf49f39e4b2f349aee4b5ab34f8de980a614105c4](https://etherscan.io/tx/0x51255ecfe42d5f91e759a26cf49f39e4b2f349aee4b5ab34f8de980a614105c4/advanced)**

* Misclassification. This is a 0x-based trade that filled the order via ["the best price"](https://protocol.0x.org/en/latest/advanced/erc20_transformations.html#liquidity-aggregation) under the hood across multiple exchanges (see also [matcha.xyz](https://matcha.xyz/)).

### "Wavelet" Arbitrage

An arbitrage opportunity created due to a "big" trade. These opportunities cascade through exchanged until the price equilizes.

**[0xcef31c72322034789df4e18b344776627b2fd8c68e7ed7c0dea94fafe277b327](https://etherscan.io/tx/0xcef31c72322034789df4e18b344776627b2fd8c68e7ed7c0dea94fafe277b327)**

* #0x78a --> #0xd0d SS(WETH --> SAITAMA) --> #0x78a --> #0x9cb USV2(SAITAMA --> WETH) --> #0x78a
* $17 in gas fees, $330 in revenue
* Seems a rookie mistake to route back to #0x78a instead of going directly to USV2
* SS pair was [proceeded by](https://etherscan.io/tx/0x809b49ef8110fedb9b6dbe1068f17f1d5394e7186cf992e5b3c8dcb65448fb5a/advanced) a $6.7k trade
* It was the first trade on USV2
* Odd: state change says #0x002 (a miner) was paid 0.007 ETH, but that's not shown in the decompilation (?)

**[0x8c712de501368b8e573919a08f090479c1f8d8901fec8162591f941e8af261c6](https://etherscan.io/tx/0x8c712de501368b8e573919a08f090479c1f8d8901fec8162591f941e8af261c6/advanced)**

* A clean arbitrage of $1375 USD in profit. Didn't pay any gas or eth for this, but it ends with 3 suicides. Perhaps gas reclaimed from that(?) (double check this)

**[0xbf52f98dda12a2f4c5e925215872925a9e3b393e82155639c83bce361f756eda](https://etherscan.io/tx/0xbf52f98dda12a2f4c5e925215872925a9e3b393e82155639c83bce361f756eda/advanced)**

* Miner finding the arbitrage and paying themselves. As a result no tx fees. Profit of about $50 USD. (double check this)

**[0xb055f6ddbd3151bacdeadffaab9345df782323978bfad3003f8c668b76d11f17](https://etherscan.io/tx/0xb055f6ddbd3151bacdeadffaab9345df782323978bfad3003f8c668b76d11f17)**

* Transaction from `0xdfee68a9adb981cd08699891a11cabe10f25ec44` team
* #0xdfee --> #0x9cbf UNIV2(WETH --> SAITAMA) --> #0xd0dc SHIBASWAP(SAITAMA --> WETH) --> #0xdfee
* $40 revenue, $8 tx fee
* Burned gas tokens to keep fees low
  * Does pay miner directly, so gas token burning may actually be to reduce slots used in the tx to encourage miner to include it at no loss
* Opportunity was created from a $124 trade right before on the uniswap pair (only 2 transactions on that pair in the block, ShibaSwap had 1 transaction in that block)

**[0xe9c1a848469d89c231eff705a54a26566e5c93227955a06bbd152f6d81b894dd](https://etherscan.io/tx/0xe9c1a848469d89c231eff705a54a26566e5c93227955a06bbd152f6d81b894dd)**

* Another transaction from `0xdfee68a9adb981cd08699891a11cabe10f25ec44` team
* #0xdfe ($1455) --> UNIV2 GALA --> #0x000 --> UNIV3 GALA --> #0xdfe ($1546)
* $100 revenue, "$0" tx fee due to using gas tokens
* This was the first UNIV2 GALA trade on the block, subsequent transactions are `getReserves` checks from other bots(?); this bot got in first
* Opportunity looks like it was opened from the first trade on this block of UNIV3 GALA ($5k worth of GALA --> ETH), this bot was the second trade that came in just after. Subsequent transactions are `getReserves` checks from other bots(?); this bot got in first

**[0xfcf4558f6432689ea57737fe63124a5ec39fd6ba6aaf198df13a825dd599bffc](https://etherscan.io/tx/0xfcf4558f6432689ea57737fe63124a5ec39fd6ba6aaf198df13a825dd599bffc)**

* Split profits w/ miner (miner took 48 ETH, they took 5 ETH); they took exactly 10%, and gave 90% to miner
* 70 ETH -(SS)-> 197k YGG -(UV3)-> USDC -(UV3)-> 123 ETH


### Sandwiches

**[0x68e81606b062c629bc24cabeb24feb07839f857a458d6e8be5f6d873b3cb52cd](https://etherscan.io/tx/0x68e81606b062c629bc24cabeb24feb07839f857a458d6e8be5f6d873b3cb52cd)**

* A sandwich attack, made ~0.033 ($95 CAD), gave a 0.01 ETH to miner. Misreported on MEV Explorer. Oddly combines a swap between Sushi and Uniswap as well.

**[0xf85a6159a2e36bd872d1f8010b1419be9f88d992369ac185a2d4042fbd884f49](https://etherscan.io/tx/0xf85a6159a2e36bd872d1f8010b1419be9f88d992369ac185a2d4042fbd884f49)**

* #0x000 --> #0xa5e US V2 (WETH --> STARL) --> #0x2a5 SS (STARL --> WETH) --> #0x000
* $11000 revenue, w/ $50 to miner
* Looks like a standard bundle
