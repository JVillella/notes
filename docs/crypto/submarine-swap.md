# Submarine Swap

>Unlike atomic swaps — where LN needs to be enabled on both cryptocurrencies participating in an exchange — submarine swaps only need one side to be lightning enabled. ~[Blocknomi - Submarine Swap](https://blockonomi.com/submarine-swaps/)

## Use Cases

You want to pay something in the Lightning Network but don’t want to manually manage channels yourself. Submarine swaps allow you to use your on-chain bitcoins to pay the lightning invoice (through a swap provider).

## How it Works

Lightning merchant shares a secret (or hint?) with buyer. You pay swap provider over blockchain (via a HTLC), where the funds can only be locked with the secret. Swap provider will send money to merchant via lightning w/ the clause that the merchent needs to reveal the secret to claim the funds. Upon revealing, now the swap provider knows and can claim the buyer's money. _while the swap provider claims the money on-chain, the merchants does it off-chain._

When a channel's supply of BTC runs out, there is no method to "refill" the channel, so another channel needs to be opened.

Submarine swaps provide a solution to this problem by allowing LN channels to be refilled through an on-chain transfer from the Bitcoin blockchain to the off-chain LN channel.
