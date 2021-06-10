# DeFi

## Introduction

**Resources**

* [Draft: DeFi and the Future of Finance](https://docs.google.com/document/d/1RvlA-J_D-p-mwrcaHaZrbleguUhPlio2kX2eWAqr5oc/edit#)

**DeFi Solves:** centralized control (costly to switch, high control upon users, stiffles innovation), limited access (1.7B are unbanked and can't obtain loans easily), inefficiency (payment network oligopoly charges 3% per transaction; remittance are 5-7%; 2 days to settle a stock transaction), lack of interoperability (silod institutions), and opacity (little information presented on bank's financial health, only FDIC).

## Glossary

**Equity Token:** tokens that represents ownership of an underlying asset or pool of assets. The units must be fungible so that each corresponds to an identical share in the pool.

**Utility Token:** tokens that are required to utilize some functionality of a smart contract system or that have an intrinsic value proposition defined by its respective smart contract system. (e.g. LINK to represent reputation or stake).

**Governance Token:** similar to equity tokens (they represent percent ownership), but instead of asset ownership, applies to voting rights.

**[Multi Token Standard](https://eips.ethereum.org/EIPS/eip-1155):** a multi-token model in which the contract holds balances for a variable number of tokens, which can be fungible or nonfungible. The standard also allows for batch reading and transfers, which saves on gas costs and leads to a smoother user experience.

**Flash Loan:** If the loan is not repaid with required interest by the end of the transaction, the whole process reverts to the state before any money ever left the lender’s account.

**Keepers:** external participants directly incentivized to provide a service to DeFi protocols, such as monitoring positions to safeguard that they are sufficiently collateralized or triggering state updates for various functions. Keeper rewards are often structured as an auction.

**Initial DeFi Offering:** A user can create an Initial DeFi Offering (IDO) by market making his own Uniswap trading pair. The user can set the initial exchange rate by becoming the first liquidity provider on the pair.

**Tokenization and Interoperability in DeFi:** Because DeFi relies on shared interfaces, applications can directly plug into each other’s assets, repackage, and subdivide positions as needed. DeFi has the potential to unlock liquidity in traditionally illiquid assets through tokenization. A simple use case would be creating fractional shares from a unitary asset such as a stock. We can extend this concept to give fractional ownership to scarce resources such as rare art. The tokens can be used as collateral for any other DeFi service, such as leverage or derivatives.
