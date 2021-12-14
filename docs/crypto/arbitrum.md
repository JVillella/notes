# Arbitrum

**Resources**

* [Inside Arbitrum](https://developer.offchainlabs.com/docs/inside_arbitrum)

Another [[layer-2-scaling]] solution based on Optimistic Rollups (OR) technology (like [[optimism]]).

## How it Works?

See [[optimism]] and [[layer-2-scaling]] for background on how optimistic rollups work. The key differences with Arbitrum are,

1. **The fraud proof design**
   1. Uses "interactive proofs", specifically by splitting the dispute in halves recursively, the disputer picking one side, until we narrow down to a single step of execution that happens on L1.
   2. Benefit of this approach is most activity is happening off-chain: reduced gas usage on pessimistic case, support for a higher per-tx gas limit and contract sizes.
   3. However, takes up to 2 weeks to finish (realistically 1 week), and requires original [claimer to be online and cooperative](https://threadreaderapp.com/thread/1395812308451004419.html).
2. "able to run unmodified EVM contracts and unmodified Ethereum transactions" (though that should now be true of [[optimism]] as well)
3. ...

## Sequencing

**The Sequencer today:** single one run by Offchain Labs's official chain, controls insertion order into the Inbox (which is split into two: 1. regular inbox and 2. sequencer inbox)) up to ~10 minutes in the past. ArbOS will consume messages from the inboxes according to their block numbers, however sequencers impose a fixed subtraction to the block number causing it to go in before the other inbox.

_it appears that today, if going via the sequencer it looks FIFO-style fairness (same as [[optimism]])._

**Later, decentralized sequencer:**
>sequencer is a committee of servers, and as long as a quorum of more than two-thirds of the committee is honest, the sequencer will establish a fair ordering over transactions.
[see paper](https://eprint.iacr.org/2020/269.pdf)
