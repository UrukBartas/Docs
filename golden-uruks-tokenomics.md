---
description: >-
  Welcome to the Golden Uruks economy, the foundation of our Uruk Bartas game
  ecosystem. Here’s a transparent breakdown of our tokenomics, designed to
  ensure fairness, growth, and sustainability.
cover: >-
  .gitbook/assets/DALL·E 2024-11-23 17.32.55 - A panoramic fantasy-style
  illustration of a group of orcs enjoying a pile of glowing golden coins,
  inspired by the vibrant and dynamic aesthetic of Fo.webp
coverY: -236
---

# 🪙 Golden Uruks Tokenomics

***

### **Why an Infinite Supply?**

Golden Uruks tokens are earned through gameplay. To support a growing community, we’ve adopted an **infinite supply model**:

* **Rewards for All Players:** Ensures tokens are always available as the game grows.
* **Burn Mechanisms:** Helps balance supply and demand by enabling token burning during character reinvestments.

This creates a dynamic economy where **game activity drives token minting**, ensuring fairness and sustainability.

***

### **Initial Supply & Distribution**

Tokens for in-game rewards will not be pre-minted but dynamically issued as players earn them.

#### **Token Allocation Breakdown**

1. **In-Game Rewards & Ecosystem (\~70%)**
   * **Dynamic Minting:** Tokens are issued as players earn them.
   * Ensures fairness and aligns with the infinite supply model.
2.  **Team Vesting (20%)**

    * **1,000,000 tokens pre-minted** for the team and subject to a vesting schedule:
      * **Vesting Duration:** 24 months (2 years).
      * **Monthly Releases:** Equal portions of tokens are released monthly.
      * **6-Month Cliff:** No tokens will be released in the first 6 months.

    This ensures the team remains aligned with the project’s long-term success.
3. **Community Treasury & Marketing (10%)**
   * **500,000 tokens pre-minted** and **vested similarly** over 24 months:
     * Supports marketing, partnerships, and liquidity.
     * Strengthens community engagement while maintaining stability.

***

### **Team & Marketing Vesting Details**

#### **Vesting Mechanism**

The **vesting process** ensures that tokens are released incrementally, preventing a sudden influx of liquidity that could destabilize the token's value. The mechanism is as follows:

* **Duration:** 2 years (24 months).
* **Monthly Release Amounts:** Tokens are released in equal portions every month after the initial 6-month cliff.
* **Cliff Period:** During the first 6 months, no tokens will be released to incentivize the team's commitment to long-term goals.

#### **How It Works**

1. **Token Locking:** All team and marketing tokens are locked in a smart contract upon allocation.
2. **Gradual Release:** At the start of each month, tokens are unlocked in increments, ensuring steady distribution over the vesting period.
3. **Final Month Adjustment:** In the last month, any remaining tokens are released to ensure the full allocation is distributed.

#### **Smart Contract Implementation**

The vesting process is managed via the **VestingGoldenUruks** contract:

* **Fair Distribution:** Automatically calculates vested tokens each month.
* **Transparency:** Allows players to view vesting schedules and token releases.

You can explore the contract for details on how vesting works:

* **Monthly Release:** `totalAmount / 24` tokens are released monthly.
* **Releasable Check:** Players can verify token availability using `releasableAmount()`.

***

### **Initial Liquidity & Price**

We’re launching with:

* **Initial Liquidity:** $1,000.
* **Pre-minted Tokens for Liquidity:** 100,000 tokens.
* **Starting Price:** $0.01 per token.

This ensures a fair entry point for players and market stability as the ecosystem grows.

***

### **Burn Mechanisms to Control Inflation**

Golden Uruks tokens can be **burned** through specific actions in the game, such as:

* **Character Reinvestments:** Upgrading or improving characters reduces circulating supply.
* **Exclusive Events:** Players can burn tokens to unlock rare in-game content.

This helps balance the infinite supply model, maintaining token value over time.

***

### **Why This Matters**

Our tokenomics are built to:

* **Reward players equitably.**
* **Promote economic stability.**
* **Foster long-term growth** for both the token and the game.

***

**Start your adventure today!**

* [Play Now](https://game.urukbartas.com)
* [Presale](https://game.urukbartas.com/presale)

