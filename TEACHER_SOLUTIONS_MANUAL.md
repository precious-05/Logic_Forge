# LogicForge: Teacher's Solutions & Curriculum Manual
> **Confidential Reference for Instructors**  
> This document contains complete solutions, logic flows, pseudocode answers, and pedagogical guidance for all Level 01 missions in LogicForge.

---

## Table of Contents
1. [Mission 01: The Robot's Route (Algorithms & Sequencing)](#mission-01-the-robots-route)
2. [Mission 02: The Problem Brief (Understanding Problems, Inputs & Outputs)](#mission-02-the-problem-brief)
3. [Mission 03: Input / Output Lab (Inputs, Outputs & Operations)](#mission-03-input--output-lab)
4. [Mission 04: Order Matters (Sequencing & Dependencies)](#mission-04-order-matters)
5. [Mission 05: Find the Bug (Debugging & Tracing Execution)](#mission-05-find-the-bug)
6. [Mission 06: The Branching Path (Conditionals & Decisions)](#mission-06-the-branching-path)
7. [Mission 07: The Repeating Pattern (Loops & Repetition)](#mission-07-the-repeating-pattern)
8. [Mission 08: Memory Vault (Variables & State)](#mission-08-memory-vault)
9. [Final Boss: The Logic Core (Smart Parking System - Integrated Capstone)](#final-boss-the-logic-core)

---

## Mission 01: The Robot's Route
* **Primary Concept:** Algorithms, Step-by-Step Sequencing, Relative Direction
* **Difficulty:** 1 / 5 | **XP:** 100

### Phase 1: Understand Questions
1. **Goal of mission:** `Deliver the package from entrance to exit`
2. **Robot actions:** `Move Forward, Turn Left, Turn Right`
3. **What solution produces:** `An ordered sequence of robot instructions`

### Phase 2: Logic Blocks Order
`START` -> `Move toward package` -> `Collect package` -> `Turn toward exit` -> `Move to exit` -> `END`

### Phase 3: Pseudocode (Review Only)
```text
START
MOVE forward until package reached
COLLECT package
TURN toward exit
MOVE forward until exit reached
END
```

### Phase 4: Challenge Solution (5x5 Grid)
* **Starting Position:** Row 0, Col 0 (Facing East 👉)
* **Package Location:** Row 2, Col 2
* **Exit Location:** Row 4, Col 4
* **Exact Command Sequence (11 steps):**
  1. `MOVE FORWARD` (to [0, 1])
  2. `MOVE FORWARD` (to [0, 2])
  3. `TURN RIGHT` (rotates to face South 👇)
  4. `MOVE FORWARD` (to [1, 2])
  5. `MOVE FORWARD` (to [2, 2] -> **Collects Package**)
  6. `TURN LEFT` (rotates to face East 👉)
  7. `MOVE FORWARD` (to [2, 3])
  8. `MOVE FORWARD` (to [2, 4])
  9. `TURN RIGHT` (rotates to face South 👇)
  10. `MOVE FORWARD` (to [3, 4])
  11. `MOVE FORWARD` (to [4, 4] -> **Exit Portal Reached**)

* **Teaching Tip:** Remind students that the robot does not have a "Down" button. To go down when facing East, they must `Turn Right` to face South, then `Move Forward`.

---

## Mission 02: The Problem Brief
* **Primary Concept:** Inputs, Outputs, Problem Analysis
* **Difficulty:** 1 / 5 | **XP:** 100
* **Problem:** Student has 500 rupees and buys a notebook costing 350 rupees. Calculate remaining money.

### Phase 1: Understand Questions
1. **Goal:** `Calculate remaining money after purchase`
2. **Input:** `Both 500 and 350`
3. **Output:** `Remaining money`
4. **Operation:** `Subtraction`

### Phase 2: Logic Blocks Order
`START` -> `Get money amount` -> `Get notebook price` -> `Calculate remaining money` -> `Display remaining money` -> `END`

### Phase 3: Pseudocode Solution
* **Line 4 Expression:** `remaining = money - price`
* **Accepted Variations:** `money - price`, `remaining = money - cost`, `500 - 350`

### Phase 4: Challenge Solution
* **Inputs Identified:** `500 (money)`, `350 (notebook price)`
* **Output Identified:** `150 (remaining money)`
* **Formula:** `remaining = money - price`

---

## Mission 03: Input / Output Lab
* **Primary Concept:** Data Transformation, Mathematical Formulas
* **Difficulty:** 2 / 5 | **XP:** 120
* **Problem:** Celsius to Fahrenheit formula: `Fahrenheit = (Celsius * 9/5) + 32`

### Phase 1: Understand Questions
1. **Input:** `Celsius`
2. **Output:** `Fahrenheit`
3. **Operation:** `Multiplication and addition`

### Phase 2: Logic Blocks Order
`START` -> `Get Celsius temperature` -> `Calculate Fahrenheit = (Celsius * 9/5) + 32` -> `Display Fahrenheit` -> `END`

### Phase 3: Pseudocode Solution
* **Line 3 Expression:** `fahrenheit = (celsius * 9/5) + 32`
* **Accepted Variations:** `(celsius * 9/5) + 32`, `celsius * 9/5 + 32`, `fahrenheit = (celsius * 1.8) + 32`

### Phase 4: Challenge Solution
* Matching components:
  * **Input:** `Celsius`
  * **Process / Formula:** `(Celsius * 9/5) + 32`
  * **Output:** `Fahrenheit`

---

## Mission 04: Order Matters
* **Primary Concept:** Sequential Dependencies, Execution Order
* **Difficulty:** 2 / 5 | **XP:** 120
* **Problem:** Preparing tea recipe with dependent steps.

### Phase 1: Understand Questions
1. **Why order matters:** `Some steps depend on previous steps being done first`
2. **What happens if water is poured before boiling:** `The step fails logically: water isn't hot yet`

### Phase 2: Logic Blocks Order
`START` -> `Boil water` -> `Add tea leaves to cup` -> `Pour hot water` -> `Add sugar` -> `Stir` -> `END`

### Phase 3: Pseudocode (Review Only)
```text
START
BOIL water
ADD tea_leaves TO cup
POUR hot_water INTO cup
ADD sugar
STIR
END
```

### Phase 4: Challenge Solution (Recipe Ordering)
1. Step 1: `Boil water`
2. Step 2: `Add tea leaves to cup`
3. Step 3: `Pour hot water into cup`
4. Step 4: `Add sugar`
5. Step 5: `Stir`

---

## Mission 05: Find the Bug
* **Primary Concept:** Debugging, Tracing Variables, Off-by-one / Missing Operand
* **Difficulty:** 2 / 5 | **XP:** 130
* **Problem:** Calculate average of 3 test scores: `score1`, `score2`, `score3`.
  ```text
  1. START
  2. INPUT score1
  3. INPUT score2
  4. INPUT score3
  5. total = score1 + score2   <-- BUG
  6. average = total / 3
  7. DISPLAY average
  8. END
  ```

### Phase 1: Understand Questions
1. **Expected Output:** `The average of three scores`
2. **Scores to include in total:** `All three (score1, score2, and score3)`

### Phase 2: Logic Blocks Order
`START` -> `Input 3 scores` -> `Add all 3 scores together` -> `Divide total by 3` -> `Display average` -> `END`

### Phase 3: Challenge Solution (2-Step Debugging)
* **Step 1 (Identify Bug Line):** Click **Line 5** (`total = score1 + score2`)
* **Step 2 (Apply Fix Option):** Select `total = score1 + score2 + score3`

---

## Mission 06: The Branching Path
* **Primary Concept:** Conditionals (`IF / ELSE`), Boolean Logic (`>= 50`)
* **Difficulty:** 3 / 5 | **XP:** 140
* **Problem:** Student pass/fail system (Pass if marks >= 50, else Fail).

### Phase 1: Understand Questions
1. **Decision condition:** `Whether marks are 50 or higher (marks >= 50)`
2. **Result when marks are 75:** `Display Pass`
3. **Result when marks are 45:** `Display Fail`

### Phase 2: Logic Blocks Order
`START` -> `Get student marks` -> `IF marks >= 50` -> `Display Pass` -> `Display Fail` -> `END`

### Phase 3: Pseudocode Solution
* **Line 6 Missing Expression:** `DISPLAY "Fail"`
* **Accepted Variations:** `"Fail"`, `Fail`, `'Fail'`, `PRINT "Fail"`

### Phase 4: Decision Tree Challenge
* **True Branch:** `Display "Pass"`
* **False Branch:** `Display "Fail"`
* **Correct Flow:** `check-marks` -> `if-true-pass` -> `if-false-fail`

---

## Mission 07: The Repeating Pattern
* **Primary Concept:** Loops (`REPEAT n times`), Pattern Recognition
* **Difficulty:** 3 / 5 | **XP:** 140
* **Problem:** Stamping 5 boxes with 3 repeated sub-actions.

### Phase 1: Understand Questions
1. **Number of repetitions:** `5`
2. **Why use a loop:** `Loops make code shorter and easier to change`

### Phase 2: Challenge Solution
* **Correct Loop Representation:**
  ```text
  REPEAT 5 times:
      Move to box
      Apply stamp
      Move to next position
  ```
* **Correct Option Index:** Option 2 (`REPEAT 5 times: Move to box, Apply stamp, Move to next position`)

---

## Mission 08: Memory Vault
* **Primary Concept:** Variables, State Mutation, Memory Tracking
* **Difficulty:** 3 / 5 | **XP:** 150
* **Initial State:** `score = 50`, `lives = 3`, `coins = 20`
* **Events:** Collects 10 coins, loses 1 life.

### Phase 1: Understand Questions
1. **What is a variable:** `A named container that stores a value`
2. **Which variable changes on collecting coins:** `coins`
3. **Which variable changes on losing a life:** `lives`

### Phase 2: Challenge Solution (Variable Scenarios)
1. **Scenario 1 (Coins collected):** `coins` becomes `30` (from `20 + 10`)
2. **Scenario 2 (Life lost):** `lives` becomes `2` (from `3 - 1`)
3. **Scenario 3 (Score unchanged):** `score` remains `50`

---

## Final Boss: The Logic Core
* **Primary Concept:** Integrated Capstone (Problem Analysis + Conditionals + Variable State + Testing)
* **Difficulty:** 5 / 5 | **XP:** 300
* **Problem:** Smart Parking System
  * Input: Vehicle arrives
  * Condition: `spaces > 0`
  * True Action: Allow entry, decrement `spaces = spaces - 1`
  * False Action: Display `"Parking Full"`

### Phase 1: Understand Questions
1. **System Input:** `A vehicle arrives`
2. **Output when full:** `Display "Parking Full"`
3. **Tracking Variable:** `spaces`
4. **Entry Condition:** `spaces > 0`

### Phase 2: Logic Blocks Order
`START` -> `Vehicle arrives` -> `IF spaces > 0` -> `Allow entry, spaces = spaces - 1` -> `Display "Parking Full"` -> `END`

### Phase 3: Pseudocode Solution
* **Line 5 Missing Expression:** `spaces = spaces - 1`
* **Accepted Variations:** `spaces = spaces-1`, `spaces - 1`, `spaces -= 1`, `spaces--`

### Phase 4: Test Suite Verification
* **Test 1 (spaces = 5):** `Entry allowed. Spaces: 4`
* **Test 2 (spaces = 1):** `Entry allowed. Spaces: 0`
* **Test 3 (spaces = 0):** `Parking Full`
* Click **"Run All Tests"** -> Click **"Verify Results"** -> Mission Complete!

---
*Created for LogicForge Educators. Keep this guide as an instructor reference.*
