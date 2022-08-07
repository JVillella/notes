[Draft Paper](https://medium.com/@thoggy/polygon-fast-lane-rough-draft-aaa6a7c0b140)

* On Polygon
	* Selected validator will mine 64 blocks in a row before another validator takes over.
	* Txs are propagated to `sqrt(peers)`, and announced to remainder; direct transaction propagation is "approx. 500ms speed advantage"
	* Validators are connected to 1 (sometimes >1) "sentries", it's through these sentry nodes they hear about new txs. Sentry may announce or send direct full tx payload.
	* Searchers attempt to "match the propagation pattern of the target tx" (N.B. to author, searcher can "pseudo-bundle" that target, sending it alongside the backrun to increase odds of success)
* Proposal is to add a new Sentry node called "PFL Sentry" where searchers bid to have their txs get relayed directly to validators connected to this sentry. Additionally, it appears validators are asked to only accepted "announced txs" from other sentries, so that incoming txs from this PFL sentry are always faster.
	* The auction apparently runs on Polygon, searchers just submit to the mempool and "PFL listening nodes" will pick it up.