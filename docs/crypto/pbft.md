# Practical Byzantine Fault Tolerance (pBFT)

**Resources**

* [Original paper](https://pmg.csail.mit.edu/papers/osdi99.pdf)
* [2019 presentation from Barbara Liskov](https://www.youtube.com/watch?v=S2Hqd7v6Xn4)

## Byzantine General's Problem

[CS198.2x Week - Byzantine Fault Tolerance](https://www.youtube.com/watch?v=3wUp5V-4s8Y)

Involved parties must agree on a single strategy to avoid complete a complete failure, but some of the involved parties may be corrupt or unreliable. The corrupt/unreliable nodes are called Byzantine nodes and there's no solution to the problem when >= 1/3 nodes are byzantine.

* **Fault tolerant systems:** Applicable when nodes can crash, not return values, but crash is detectable.
* **Byzantine tolerant systems:** Applicable to fault tolerant systems _and_ when nodes send incorrect/corrupted values.

## Practical Byzantine Fault Tolerance (pBFT)

[paper](https://pmg.csail.mit.edu/papers/osdi99.pdf)
[CS198.2x Week 1 - Practical Byzantine Fault Tolerance](https://www.youtube.com/watch?v=IafgKJN3nwU)

PBFT handles < 1/3 byzantine faults/nodes. Has three phases: "pre-prepare", "prepare", and "commit"

1. `client` sends information to primary node (e.g. `derrick`)
2. node 2, `nadir` drops out due to network troubles
3. Phase 1 - Pre-prepare: Derrick sends messages to all nodes (`rustie`, `gloria`, `nadir`)
4. Phase 2 - Prepare: A node accepting a pre-prepare messages responds by sending a Prepare message to everyone else. A node is prepared when it has seen the pre-prepare message, sent its prepare message and has received 2f prepare messages from other nodes (leading to a total of 2f+1 prepares)
5. Phase 3 - Commit: Nodes send out commit messages, if a node received f+1 valid commit messages they process the client requests then reply back to the client
6. Client needs to wait for f+1 results

(f are adversarial nodes, but how do we know the # of f? maybe assume 1/3?)

## Sybil Attacks

PBFT considers consensus but not sybil attacks. I.e. in the generals problem, N byzantine nodes could be the same corrupt general. Nakamoto Consensus handles sybil attacks via requiring block generation ability to be proportional to computational power available through the proof-of-work mechanism (i.e. it's a unique consensus mechanism because it's baked in, but PBFT and many other consensus mechanisms don't have baked in Sybil resistance).

There are however straightforward solutions like using "weighted users"[^1]

[^1]: See page 1 of [Algorand paper](https://people.csail.mit.edu/nickolai/papers/gilad-algorand-eprint.pdf)
