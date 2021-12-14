# Eden Network

[paper](https://edennetwork.io/EDEN_Network___Whitepaper___2021_07.pdf)

>We propose an optional, non-consensus breaking transaction ordering protocol which allows participants to guarantee placement within blocks and protection from arbitrary reordering (e.g “frontrunning”, “sandwiching”). The system offers a transparent and fair set of rules to order transactions within each block. An accompanying token reward system realizes MEV profits to block producers to maximize network security.

## Block Construction

* Participants (block producers, users, bots) are paid in EDEN token which is a migration of [ARCH](https://www.archerdao.io) token.
* There is a new class of transactions that get priority above all other transactions
* Flashbot bundles can also be accepted (lower priority than slots, but more than regular eth transactions), total gasLimit of 4M [^3]
* Finally, even regular users can have their txs get priority amongst the mempool tx group (/ sent directly) by staking 100+ EDEN
  * This gives their tx front-running protection

**Slots**

* There are 3 "slots" per block, at any given time each slot is owned by a "slot tenant" account who can set the "delegate address" (an EOA or SC)
* Published transactions that set their `to` address to to be the delegate address are included in the slot
* Each slot can use up to 1.5M gas
* Users reserve slots via a continuous auction mechanism known as a Harberger tax[^2]
  * Slot tenants are taxed at 3.3% per day on the principle of their stake, the taxed amount is burned and the tenant loses their claim once their entire balance is depleted (30 days)
  * A user can become a slot tenant by staking[^1] 10% more than the current slot tenant's initial bid. If outbid, the current slot tenant gets his remaining staked balance back

## Incentives

* Block producers receive rewards daily triggered via an "admin address" (an NFT is sent to the block producer, than the block producer uses that NFT to claim their rewards from a distributor contract)
* There are max 250M EDEN tokens, the Harberger tax burns tokens, and there's a planned network change to mint new tokens to counteract the burning?
* The rewards are a portion of the monthly issuance (based on their contribution of mined blocks?) of new EDEN tokens
  * 60% goes to block producers, 30% to liquidity providers, 10% to EDEN treasury
  * The full issuance of the 250M will be done by the end of 48 months
  * Afterwards it appears they'll mint again at an equal amount to burning[^4]

[^1]: Staking is all done in EDEN token
[^2]: Key attributes over this tax model is that anyone can force a sale by paying a sufficient amount (seller doesn't get to choose) and that there's an ongoing tax. [The aim](https://medium.com/@simondlr/what-is-harberger-tax-where-does-the-blockchain-fit-in-1329046922c6) of this is to reduces the prevalence of monopolies that exclude society from an asset’s wealth generating capabilities. IOW preventing "deadweight" loss in a society due to misallocation of resources. A buyer would only come in to do a forced sale if they get be productive with it.
[^3]: Perhaps this compatibility is to encourage people to use Eden by reducing risk of opportunity cost
[^4]: Wouldn't ecosystem participant profits go down substantially at this point? Perhaps the intention is to then tune the tax rates to burn more, which means mint more to compensate and lead to competitive profits again
