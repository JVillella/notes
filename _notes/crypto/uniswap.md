---
---

## Resources

- [Whitepaper](https://hackmd.io/@HaydenAdams/HJ9jLsfTz?type=view#%F0%9F%A6%84-Uniswap-Whitepaper)
- [Formal Verification of `xy = k`](https://github.com/runtimeverification/verified-smart-contracts/blob/uniswap/uniswap/x-y-k.pdf)
- [Handling Front-Running](https://ethresear.ch/t/improving-front-running-resistance-of-x-y-k-market-makers/1281)

## Contracts

### Factory/Registry Contract

- Gives public ability to deploy an "exchange contract"
- Links exchange contracts together so token A:B trades can be done
- Serves as a registry of exchanges

### Exchange Contract

- Holds ETH & ERC-20 token
- The first liquidity (LP) provider joining the pool sets the initial exchange rate depositing what they believe to be equivalent value of ETH and ERC20 tokens; if the ratio is off, arbitrage traders will correct it (at the initial provider's expense)
- Future LPs deposit using the existing ratio

### Liquidity Tokens (LT)

- Minted to track the relative proportion of total reserves that each liquidity provider has contributed
- Can be burned at any time to return a proporitonal share of the markets liquidity to the provider
- ETH and ERC20 tokens are withdrawn at current exchange rate, not the ratio of originial investment; some value can be lost from market fluctuations and arbitrage
- Fees taken during trades are added to pools w/o minting new LT so withdrawals will receive a proportional share of all fees collected since liquidity was first added

**How Many LT to Receive**

```
AmountMinted = (TotalAmount * ETHDeposited) / ETHPool

# E.g.
(1 ETH * 100 LT) / 10 ETH
= 10 LT
```

**How Many Tokens to Deposit**

```
TokensDeposited = (TokenPool * ETHDeposited) / ETHPool

# E.g.
(500 OMG * 1 ETH) / 10 ETH
= 50 OMG
```

**How Many LT to Burn**

```
ETHWithdraw = (AmountBurned * ETHPool) / TotalAmount
TokensWithdraw = (AmountBurned * TokenPool) / TotalAmount

# E.g.
(10 * 11 ETH) / 110
= 1 ETH

(10 * 550 OMG) / 110
= 50 OMG
```

## Example (ETH -> OMG)

```
Fee = 0.25%

(x) ETHPool = 10
(y) OMGPool = 500
k = 10 * 500
  = 5000
```

```
# OMG buyer sends 1 ETH to the exchange contract
ETHBuy = 1

# Calculate fee that will go back to the pool
Fee = ETHBuy * 0.25%
    = 0.0025

# Calculate new ETH pool minus fees
ETHPool = ETHPool + ETHBuy - Fee
        = 10 + 1 - 0.0025
        = 10.9975

# Calculate OMG that will be received according to the invariant k
OMGRecv = OMGPool - k / ETHPool
        = 500 - 5000 / 10.9975
        = 45.35

# Calculate new OMG pool size
OMGPool = k / ETHPool
        = 5000 / 10.9975
        = 454.65

# Now add fee to ETH pool
ETHPool = ETHPool + Fee
        = 10.9975 + 0.0025
        = 11
OMGPool = 454.65

# Invariant gets shifted slightly each trade encouraging purchases in the opposite
# direction.
k = ETHPool * OMGPool
  = 11 * 454.65
  = 5001.15
```

## Example Cont. (OMG -> ETH)

```
# OMG seller sends 45.35 OMG to the exchange contract
OMGBuy = 45.35

# Calculate fee that will go back to the pool
Fee = OMGBuy * 0.25%
    = 0.113375

# Calculate new OMG pool minus fees
OMGPool = OMGPool + OMGBuy - Fee
        = 454.65 + 45.35 - 0.113375
        = 499.886625

# Calculate ETH that will be received according to the invariant k
ETHRecv = ETHPool - k / OMGPool
        = 11 - 5001.15 / 499.886625
        = 0.9954

# Calculate new ETH pool size
ETHPool = k / OMGPool
        = 5001.15 / 499.886625
        = 10.0046

# Now add fee to OMG pool
OMGPool = OMGPool + Fee
        = 499.886625 + 0.113375
        = 500
ETHPool = 10.0046

k = ETHPool * OMGPool
  = 10.0046 * 500
  = 5002.3
```
