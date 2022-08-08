---
---

> Fraud proofs are a system where to accept the result of a computation, you require someone with a staked deposit to sign a message of the form "I certify that if you make computation C with input X, you get output Y". You trust these messages by default, but you leave open the opportunity for someone else with a staked deposit to make a challenge (a signed message saying "I disagree, the output is Z"). Only when there is a challenge, all nodes run the computation. Whichever of the two parties was wrong loses their deposit, and all computations that depend on the result of that computation are recomputed.

~[Why sharding is great: demystifying the technical properties](https://vitalik.ca/general/2021/04/07/sharding.html)
