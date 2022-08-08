---
---

Pioneered by Robert J. Shiller in [Measuring Asset Values for Cash Settlement in Derivative Markets](https://cowles.yale.edu/sites/default/files/files/pub/d10/d1036.pdf).

$s_{t+1} = (f_{t+1} - f_{t}) + (d_{t+1} - r_{t}f_{t})$ [^1]

- $f_{t}$: perpetual futures price at day $t$
- $d_{t+1}$: index of dividends paid to owner of underlaying asset on day $t+1$
- $r_{t}$: return on an alternative asset between day $t$ and $t+1$. The asset could be anything liquid, but in practice would be the return on a risk-free short debt, such as an overnight repo rate, debt that is either nominal or indexed to a consumer price index.
- $s_{t+1}$: daily resettlement received by a long from the short

The term $(f_{t+1} - f_{t})$ corresponds to the _daily_ (except the last day) resettlement of a conventional futures contract, $(d_{t+1} - r_{t}f_{t})$ corresponds to the _final_ cash settlement of a conventional futures contract which is settled via $c_{T} - f_{T-1}$. $c_{T}$ being the final cash price and maturity date $T$.

**Alternative interpretation of expression $s_{t+1}$:** suppose $f_t$ is a price of the perpetual claim (a contract promising the buyer a daily perpetual stream of dividends paid by the writer of the claim), then $s_{t+1}$ would be the return a long would obtain if he or she bought the perpetual claim with zero margin minus the return a short would obtain if he sold short the perpetual claim with 100% margin (margin rate at $r_{t}$).

If there is an observed price $p_t$ on a liquid asset that pays the dividend steam $d_{t+k} = 1, ...$, then the futures price $f_t$ will tend to equal the price $p_t$.[^2]

## Traditional Future Contracts

- [How traditional futures are priced](https://www.angelbroking.com/knowledge-center/derivatives/futures-pricing-formula)
- [What are futures? (video)](https://www.youtube.com/watch?v=1Mhk4UHJsRc)

$F(t, T) = S(t)e^{(r+u-q)(T-t)}$[^3]

- $F(t, T)$: forward price at time $t$ to maturity $T$
- $S(t)$: present value
- $r$: rate of risk-free return[^4]; $u$: storage costs; $q$: dividend (or income) yield
- $e$: used for [continuous compounding](https://en.wikipedia.org/wiki/Compound_interest#Continuous_compounding)

Or more simply for a non-dividend paying asset,

$F(t,T) = S(t) \times (1+r)^{T-t}$

## Perpetuals in Practice

Commercialized by Bitmex(?)

> For conventional futures contracts such as WTI, the contract’s price will gradually converge with the underlying asset’s spot market price as the expiry date approaches. For a perpetual contract, to converge its price with the spot market, the most effective method used in the industry is “funding rate”. ~[Perpetual Protocol](https://medium.com/perpetual-protocol/a-deep-dive-into-our-virtual-amm-vamm-40345c522eeb)

> Perpetual contracts allow traders to speculate on the future price of a given asset by buying (going long) or selling (going short) perpetual futures contracts. Unlike typical futures, perpetuals do not expire and remain effective until the trader closes their position.
>
> The price of perpetual contracts will often diverge from the broader market (aka spot market). These deviations signal sentiment on the exchange - if a majority of traders expect the underlying asset to increase in value over time, the price of the perpetual contract will likely exceed the spot price. Likewise, if most traders expect the price to fall, the price of the perpetual will be below the spot price. ~[Perpetual Contract Basics](https://docs.perp.fi/getting-started/how-it-works#perpetual-contract-basics)

There are two mechanisms to moderate this slippage side effect,

1. Funding payments: every hour traders will pay the other side (i.e. long --> short) depending on the slippage direction.

   ```
   contract price > spot price --> longs pay shorts
   contract price < spot price --> shorts pay longs
   ```

   > The size of the funding payment is a function of the difference between the contract price and the spot price, as well as your position size. This incentivizes traders to take the unpopular side of the market.

2. Arbitrage
   > If the contract price diverges significantly from the spot price in other exchanges, arbitrageurs can benefit in two ways. 1. If they hold a position elsewhere, they can use Perpetual Protocol to take the inverse position and earn funding payments. 2. They buy or sell an asset elsewhere, and long or short that asset using Perpetual Protocol, in the expectation that the price will tend to move back toward the spot price.

[^1]: [Measuring Asset Values for Cash Settlement in Derivative Markets](https://cowles.yale.edu/sites/default/files/files/pub/d10/d1036.pdf) - Pg. 20
[^2]: [Measuring Asset Values for Cash Settlement in Derivative Markets](https://cowles.yale.edu/sites/default/files/files/pub/d10/d1036.pdf) - Pg. 22
[^3]: [Futures contract pricing](https://en.wikipedia.org/wiki/Futures_contract#Pricing)
[^4]: Real risk-free rate is the interest rate that'd exist on a risk-less security if no inflation were expected. Usually a 3-month US treasury _bill_ is used or more rarely a 10-year US treasury _bond_.
