# Solana

## How It Works

Proof of History (PoH): Recursively used hash. A "leader" is selected and executes transactions on the current state, then publishes the final state to "verifiers".

>Verifiers utilize parallelization to execute sections of the same transactions on their copies of the state in order to verify that the Leader has acted honestly...If a failure is detected by a two thirds majority of Verifiers, then the Leader is stripped of its role and the Verifier with the largest voting power takes on the position of the Leader. ~[Solana and Proof of History](https://www.cmcc.vc/insights/solana-and-proof-of-history).
