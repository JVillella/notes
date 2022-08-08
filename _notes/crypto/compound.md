---
---

[Whitepaper](https://compound.finance/documents/Compound.Whitepaper.pdf)

**Borrowing rate formula (w/ example)**

```
Exchange Rate = Underlying Balance + Total Borrow Balance
```

**Borrowing rate formula (w/ example)**

```
Utilization Ratio (U)
	= Total Borrowing Amount /
		(Total Cash Invested + Borrowing Amount)
	= 1000 / (5000 + 1000)
	= 0.1666

Borrowing Interest Rate (BIR)
	= 2.5% + U * 20%
	= 2.5% + 0.1666 * 20%
	= 0.05832
	= 5.832%
```

## FAQ

**How to adjust loaned position across multiple lending platforms (e.g. Compound vs Aave)?**

Answer: Aave flash loans

> Assume the price of ETH is 200 DAI. A user supplies 100 ETH in Compound and borrows 10,000 DAI to lever up and purchase an additional 50 ETH, which the user also supplies to Compound. Suppose the borrow interest rate in DAI on Compound is 15% but only Aave is 5%. The goal is to refinance the borrowing to take advantage of the lower rate offered on Aave, which is analogous to refinancing a mortgage, a long and costly process in centralized finance.
>
> One option is to manually unwind each trade on Compound and re-do both trades on Aave to reconstruct the levered position, but this option is wasteful in terms of exchange fees and gas fees. The easier action is to take out a flash loan from Aave for 10,000 DAI, use it to pay the debt on Compound, withdraw the full 150 ETH, resupply to Aave, and trigger a normal Aave borrow position (at 5% APR) against that collateral to repay the flash loan. The latter approach effectively skips the steps of exchanging ETH for DAI to unwind and rewind the leverage.

**Why are people using Compound to loan out money?**

- Answer 1: Obtain leverage.
- Answer 2: Avoid paying taxes; if anything it is tax _deductable_.
  > The utility of the Compound lending market is straightforward: it allows users to unlock the value of an asset without selling it and incurring a taxable event (at least under today’s rules), similar to a home equity line of credit.
  >
  > they can use the borrowed assets to engineer leveraged long or short positions, with competitive pooled rates and no approval process.
