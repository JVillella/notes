---
---

**Resources**

- [MEV Roast 15 Agenda - PBS on Ethereum Roadmap](https://github.com/flashbots/pm/issues/98)
- https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance
- https://hackmd.io/@vbuterin/pbs_2021_12

### Background

MEV leads centralization risk ([[state-of-mev]]), the proposal is to separate out the task with the strong centralization pressures (i.e. selection of block contents) from the rest of block validation. This could be achieved by having block producers (validators) sell the right to decide the contents of their block to a builder at the highest bid.

**Security**

- Payments to proposer are unconditional, so builder doesn't need to be trusted
  - If builder doesn't reveal on time, they pay bid but lose MEV
- Involves multiple steps per slot, requiring increased block times or stronger latency assumptions

### Approach

> 1.  Block builders make bundles and publish the headers of the bundles that they create. A bundle header contains a commitment to the bundle body (the intended block contents), the payment to the proposer, and a signature from the builder.
>
> 2.  The proposer chooses the bundle header offering the highest payment (considering only bundles where the builder has enough balance to actually make that payment). They sign and publish a proposal containing that bundle header.
>
> 3.  Upon seeing the signed proposal, the block builder that offered the included bundle header publishes the full bundle.

**Security**

> [Proposers] can publish their proposal near the end of a slot, ensuring that attesters (probably) see the proposal on time, but not giving the block-builder enough time to publish the body, so there would be a significant chance that the attesters do not see the body on time. This imposes a risk on block-builders, and gives them an incentive to favor trusted proposers. Additionally, it creates an opportunity by which a malicious majority can heavily penalize block-builders that it dislikes.

~[Proposer/block builder separation-friendly fee market designs](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)

[//begin]: # "Autogenerated link references for markdown compatibility"
[state-of-mev]: state-of-mev "State of MEV"
[//end]: # "Autogenerated link references"