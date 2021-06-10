# Ethereum Security

## Resources

* [Manticore](https://github.com/trailofbits/manticore)
* [Oyente](https://github.com/enzymefinance/oyente)

Video: https://www.youtube.com/watch?v=IOUnhCTw6tE

## Exploits

**Re-entrancy:**
* Doing accounting after sending money. E.g. taking money out repeatedly and crashing before the accounting could have been done.
* Can write a contract to attack a contract
* https://youtu.be/IOUnhCTw6tE?t=598

**Parity Wallet Hack (1st):**
* If you don't declare function visibility, it defaults to public, meaning anyone can make requests to it, and own it.
* Can call `initWallet(...)`, saying "you belong to me now", and then take the money.

**Parity Wallet Hack (2nd):**
* Shared 1 non-stateless library. Someone was able to `initWallet(...)` and `kill(...)` it.

**Overflows:**
* If number gets too big it goes back to beginning (Solidity <= 0.8)
* Should use Solidity > 0.8 or [OpenZeppelin SafeMath](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol)
* Could overflow in decrement to a large number

**Withdraw Not Send:**
* Need to handle send fails (e.g. if insufficient gas)
* Always check enough gas is available, and withdraw before sending

**Transaction-Ordering Dependence:**
* Be mindful of order and business logic. E.g. owner can change/send money before others.
* https://youtu.be/IOUnhCTw6tE?t=1360
* Contract needs to be able to survive time drift and people getting their calls in sooner.
