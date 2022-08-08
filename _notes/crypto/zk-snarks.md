---
---

[zkSNARKs in a nutshell](https://blog.ethereum.org/2016/12/05/zksnarks-in-a-nutshell/)

**Zero-Knowledge Succinct Non-interactive ARguments of Knowledge.**

Used to verify the correctness of computations without having to execute them and you will not even learn what was executed - just that it was done correctly.

**Encoding as a polynomial problem**

The program needs to be compiled into a quadratic equation of polynomials: `t(x)h(x) = w(x)v(x)`. Equality holds only if program is computed correctly; prover wants to convince verifier of this equality.

**Succintness by random sampling**

The Verifier chooses a secret evaluation point `s` to reduce the problem from multiplying polynomials to multiplcation/equality check on numbers (i.e. `t(s)h(s) = w(s)v(s)`). This reduces proof size and verification time.

_the sizes of the messages are tiny in comparison to the length of the actual computation_

**Homomorphic encoding/encryption: encryption function**

`E`, has some homomorphic properties allowing the prover to compute `E(t(s))`, `E(h(s))`, `E(w(s))`, `E(v(s))` without knowing `s`, just `E(s)`.

**Zero knowledge**

Prover permutes the values `E(t(s))`, `E(h(s))`, `E(w(s))`, `E(v(s))` by multiplying by some number so the verifier can check the structure without knowing the actual values.

_during the interaction, the verifier learns nothing apart from the validity of the statement. The verifier especially does not learn the witness string - we will see later what that is exactly._

> of Knowledge: it is not possible for the prover to construct a proof/argument without knowing a certain so-called witness (for example the address she wants to spend from, the preimage of a hash function or the path to a certain Merkle-tree node).

**Quadratic Span Problems/Programs**

> A Quadratic Span Program consists of a set of polynomials and the task is to find a linear combination of those that is a multiple of another given polynomial

**TO BE CONTINUED...**

## Relevant Articles

- https://vitalik.ca/general/2019/09/22/plonk.html
- https://medium.com/starkware/hello-cairo-3cb43b13b209
