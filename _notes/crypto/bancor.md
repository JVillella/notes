---
---

[Introduced the first AMM](https://docs.bancor.network/getting-started/the-v2-difference) to solve the liquidity problem (where sparse order books struggled to guarantee liquidity to investors on both sides of the trade).

## v2.1

Uses BNT (their protocol token) as a counterpart asset (co-invests) in each pool. The supply is elastic and is used to,

- support single-sided AMM exposure (i.e. LPs only have to put in one token, not some of each side; can also use BNT)
- cover the cost of impermanent loss with swap fees earned from co-investments ("Impermanent Loss Insurance")

**Impermanent Loss Insurance**

> Bancor v2.1 is designed so that a liquidity provider always gets back the same value he/she originally deposits plus trading fees through a novel concept called Impermanent Loss Insurance.
>
> Impermanent Loss Insurance accrues over time, by 1% each day, until 100% protection is achieved after 100 days in the pool. There is a 30-day cliff, which means that if a liquidity provider decides to withdraw their position before 30 days passes, they’d incur the same IL loss experienced in a normal, unprotected AMM. If an LP withdraws any time after 100 days, they receive 100% compensation for any loss that occurred in the first 100 days, or anytime thereafter.
>
> If there are not sufficient tokens in the pool to fully pay out IL compensation in the staked token, part of the insurance may be paid out in an equivalent value of BNT.
