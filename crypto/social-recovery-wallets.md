# Social Recovery Wallets

**Goals of a Wallet**

1. No single point of failure: there is no single thing (and ideally, no collection of things which travel together) which, if stolen, can give an attacker access to your funds, or if lost, can deny you access to your funds.
2. Low mental overhead: as much as possible, it should not require users to learn strange new habits or exert mental effort to always remember to follow certain patterns of behavior.
3. Maximum ease of transacting: most normal activities should not require much more effort than they do in regular wallets (eg. Status, Metamask...)


## Relevant Articles

[Why we need wide adoption of social recovery wallets](https://vitalik.ca/general/2021/01/11/recovery.html)

**Fix Loss:**

* Signing key to approve transactions
* Gaurdians (should be more than 3 of them) who come together to change the signing key
  * A delay if 1-3 days before new Gaurdians can be added

**Fix Theft:**

* A Vault where majority of assets are kept
* Can send to Vault immediately
* Takes 1 week to move out of Vault
  * During that delay, the Gaurdians can cancel the transaction
* Could have some whitelisted users we could send to from the vault immediately

## Relevant Projects

* [Argent Wallet](https://www.argent.xyz/)
* [Loopring Wallet](https://loopring.io/)
