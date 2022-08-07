## Market Makers

Market makers are high-volume traders that "make a market" by always standing at the ready to buy or sell. They profit on the bid-ask spread and they benefit the market by adding liquidity. Without market makers, it would take considerably longer for buyers and sellers to be matched with one another. This would reduce liquidity, making it more difficult to enter or exit positions and adding to the costs and risks of trading.  This would reduce the amount of money available to companies, and in turn, their value. NYSE (and other exchanges) have designated market makers - called "specialists".

* [Relevant Market Making strategies for DeFi (Private)](https://docs.google.com/document/d/1LR_Y1VsJKiqXBlnZEj_F1_YpKLA4u-0e4uDKMqyQ9sI/edit#)

## Order Matching + Fees (Exchange Level, LOB)[^1]

**LOB Matching**

E.g. a limit buy order for 2000 shares with a price $10. The order is either,
1. **aggressive order that consumes liquidity** matched immediately with a standing limit sell order that has a price of less than $10
2. **passive order that supplies liquidity** it is added to the stack of limit buy orders on the buy side of the book
   * _standing orders are ranked by price-time priority_

**Fee Models**

1. **Fixed fee per trade** (e.g. $1.20), fee discount for high volume traders
   * Optional **variable fee per trade** (e.g. 0.05 basis point)
2. **Maker/taker model** aggressive order (takes liquidity) gets charged (e.g. 0.30 basis point) whereas a passive order receives a rebate (e.g. 0.20 basis point) when it leads to an execution. The platform is guaranteed the difference of cost and rebase (e.g. 0.10 basis point revenue per transaction)

**Clearing House**

A trade is not done once two limit orders have been matched. The actual transfer of the security and the payment is effectuated three days after the transaction; the trade is cleared and settled. This process leads to two types of cost: clearing fees (e.g. by LCH-Clearnet or EMCF; fee example $0.2/trade) and margin requirements.

Central counterparty (CCP) clearing houses are the counterparty to every trade which removes the risk for each participant (i.e. a broker) that the counterparty to a trade becomes insolvent before the actual transfer is due three days after limit orders were matched. They require the participant to have a margin account with them of typically 5-6% of the net value of the position (e.g. longs - shorts). This money is confiscated should the participant go insolvent.

**Electronic Communications Network (ECN)**

ECN order books connect buyers/sellers directly and remove the the middleman (market makers / specialists). This system is only effective when there are many participants. ECNs often follow a maker/taker pricing scheme. Some direct brokers offer "smart routing" which splits the order across ECNs.[^2]

**Order Routing**

The process for how an "order" goes from the end user (e.g. buyer) to the exchange.

**"Smart" order routing**: process of executing a trade so that it minimally moves the market (e.g. routing through dark pools, order splitting, finding hidden sources of liquidity)

**Payment for order flow (PFOF)**: A common practive of brokers routing orders to select market makers who then pay the broker in exchange.

[^1]: [High Frequency Trading and the New-Market Makers](https://deliverypdf.ssrn.com/delivery.php?ID=480102116097122110115089071098096030127059060050007025029030113007114013025067003011033056120123040008022109120116095015083108057004042083061115076097064006091077033008025096011065103118082126011067025013088089005126119094000069118019099118109005&EXT=pdf&INDEX=TRUE)
[^2]: [Order Routing And How It Affects Your Trading](https://speedtrader.com/order-routing-and-how-it-affects-your-trading/)
