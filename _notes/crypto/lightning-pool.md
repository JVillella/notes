---
---

[Lightning Pool Whitepaper](https://lightning.engineering/lightning-pool-whitepaper.pdf)

**TL;DR**

1. Lightning Pool Account Creation: Lifts UTXO
   - Satoshis are locked in (including fees)
   - Signing, broadcast, wait for confirmations
2. Send bid/ask orders (over GRPC?)
3. Auctioneer (aka Orchestrator) Matchmaking: Construct and Propose Block
   - Price clearing (when fees are taken), list of leases (block creation on the _shadow chain_)
4. Traders Validate and Partially Sign LCLs
5. Auctioneer Signs LCL and Publishes
