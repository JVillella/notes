https://www.youtube.com/watch?v=hnw59hmk6rk

* Discovery is based off of [Kademlia](https://www.scs.stanford.edu/~dm/home/papers/kpos.pdf)
	* Kademlia does node lookup and routing
	* Runs atop UDP
	* Ethereum doesn't use KV-store lookup, but does use the routing table part
		* Routing is designed for "wide coverage" not short distance
		* Notable messages: `PING`, `FIND_NODE`
* To join a network:
	* Ask bootstrap nodes for "neighbouring" nodes, does this through a "find node" passing itself, then repeat with the returned list?
	* Returned nodes also returns an expiry
* "Bonding" technique to reduce DDOS
	* Before responding to a find neighbours, need to do a ping and pong

Node table,
* Persisted across runs, gets "refreshed" periodically (configurable), e.g. every 5 minutes, or every day

What does "closest neighbours" mean?

Client-specific "reputation policy". What is it in geth?

Stack for devp2p communication

RLPx session initialization
* crypto handshake: auth message, hello message
	* hello message includes capabilities
	* sub protocol negotiation to resolve which capabilities can be used
* session is created, when we switch to wire protocol

```
Sub-protocols (e.g. eth, swam, etc.)
Wire
RLPx
TCP
```

Ideas to make networking faster
* https://github.com/Mining-DAO/docs/blob/master/ethereum-mining-pool-howto.md#1-set-up-ethereum-full-node-client

---
Frankfurt to Idaho is ~7.5km --> 7,500 km * 2 / 200,000 km/s * 1000 ms/s = 75 milliseconds (ms)

>When comparing results, be aware that latency on fiber links is constrained by the distance and the speed of light in fiber, which is roughly 200,000 km per second (or 124,724 miles per second).

Cloudflare socket workers may be suitable https://blog.cloudflare.com/introducing-socket-workers/ but not yet available

---
Do we use hash or full payload for the arrival time