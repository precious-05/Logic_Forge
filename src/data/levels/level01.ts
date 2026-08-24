import type { Challenge, Level, Mission } from '../../types'

const mission01Challenge: Challenge = {
  id: 'mission-01',
  title: "The Robot's Route",
  description: 'Guide a delivery robot through a warehouse using step-by-step instructions.',
  difficulty: 1,
  concept: 'Algorithms',
  type: 'sequence',
  problemStatement: `You are controlling a delivery robot inside a warehouse.

The robot starts at the entrance.
It must reach the package, collect it, and return to the exit.

The robot can:
- Move Forward
- Turn Left
- Turn Right

Create a sequence of instructions that allows the robot to complete the mission.`,
  xp: 100,
  hints: [
    { level: 1, text: 'Trace the path from entrance to package first. How many forward moves does that require?' },
    { level: 2, text: 'After reaching the package, the robot must turn to face the exit before moving forward again.' },
    { level: 3, text: 'Try: Forward x2, Turn Right, Forward x2, Turn Left, Forward x2, Turn Right, Forward x2.' },
  ],
  conceptExplanation: `You just created an algorithm.

An algorithm is a step-by-step sequence of instructions used to solve a problem. Every program you will ever write is built from algorithms — ordered steps that transform inputs into outputs.`,
  conceptsLearned: ['Algorithms', 'Sequencing', 'Step-by-step thinking'],
  understand: [
    {
      id: 'u1',
      question: 'What is the goal of this mission?',
      options: ['Make the robot spin in circles', 'Deliver the package from entrance to exit', 'Count warehouse tiles', 'Turn the robot left only'],
      correctIndex: 1,
      feedback: {
        correct: 'Correct. The robot must collect the package and reach the exit.',
        incorrect: 'Re-read the problem. What must the robot accomplish by the end?',
      },
    },
    {
      id: 'u2',
      question: 'What actions can the robot perform?',
      options: ['Jump and fly', 'Move Forward, Turn Left, Turn Right', 'Only Move Forward', 'Write code'],
      correctIndex: 1,
    },
    {
      id: 'u3',
      question: 'What should your solution produce?',
      options: ['A drawing of the warehouse', 'An ordered sequence of robot instructions', 'The robot\'s battery level', 'A random guess'],
      correctIndex: 1,
    },
  ],
  logicBlocks: {
    blocks: [
      { id: 'start', label: 'START', type: 'start' },
      { id: 'b1', label: 'Move toward package', type: 'process' },
      { id: 'b2', label: 'Collect package', type: 'process' },
      { id: 'b3', label: 'Turn toward exit', type: 'process' },
      { id: 'b4', label: 'Move to exit', type: 'process' },
      { id: 'end', label: 'END', type: 'end' },
    ],
    correctOrder: ['start', 'b1', 'b2', 'b3', 'b4', 'end'],
  },
  pseudocode: {
    template: [
      { id: 'l1', text: 'START', editable: false },
      { id: 'l2', text: 'MOVE forward until package reached', editable: false },
      { id: 'l3', text: 'COLLECT package', editable: false },
      { id: 'l4', text: 'TURN toward exit', editable: false },
      { id: 'l5', text: 'MOVE forward until exit reached', editable: false },
      { id: 'l6', text: 'END', editable: false },
    ],
  },
  robot: {
    grid: [
      [{ type: 'start' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
      [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
      [{ type: 'empty' }, { type: 'empty' }, { type: 'package' }, { type: 'empty' }, { type: 'empty' }],
      [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
      [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'exit' }],
    ],
    startDirection: 'east',
    solution: ['forward', 'forward', 'right', 'forward', 'forward', 'left', 'forward', 'forward', 'right', 'forward', 'forward'],
  },
}

const mission02Challenge: Challenge = {
  id: 'mission-02',
  title: 'The Problem Brief',
  description: 'Learn to read and analyze programming-style problem statements.',
  difficulty: 1,
  concept: 'Problem Understanding',
  type: 'problem-analysis',
  problemStatement: `A student has 500 rupees and wants to buy a notebook costing 350 rupees.

Write a program that calculates how much money the student will have left after the purchase.`,
  xp: 100,
  hints: [
    { level: 1, text: 'Identify what values are given to the program versus what it must compute.' },
    { level: 2, text: 'The student\'s money and notebook price are inputs. The remaining amount is the output.' },
    { level: 3, text: 'When buying something, you subtract the cost from the money you have.' },
  ],
  conceptExplanation: `Before writing any code, programmers analyze the problem.

They identify inputs (data given), outputs (results needed), and the operations that connect them. This analysis prevents wasted effort and logical errors.`,
  conceptsLearned: ['Problem analysis', 'Inputs and outputs', 'Requirements gathering'],
  understand: [
    {
      id: 'u1',
      question: 'What is the goal?',
      options: ['Find the student\'s name', 'Calculate remaining money after purchase', 'Print the notebook brand', 'Add 500 and 350'],
      correctIndex: 1,
    },
    {
      id: 'u2',
      question: 'What is the input?',
      options: ['500 only', '350 only', 'Both 500 and 350', 'Remaining money'],
      correctIndex: 2,
      feedback: {
        correct: 'Both values are given — the money available and the item cost.',
        incorrect: 'Inputs are the values the program receives. What numbers are provided in the problem?',
      },
    },
    {
      id: 'u3',
      question: 'What is the output?',
      options: ['Remaining money', 'Notebook price', 'Student name', '500'],
      correctIndex: 0,
    },
    {
      id: 'u4',
      question: 'What operation is required?',
      options: ['Addition', 'Subtraction', 'Multiplication', 'Comparison'],
      correctIndex: 1,
    },
  ],
  logicBlocks: {
    blocks: [
      { id: 'start', label: 'START', type: 'start' },
      { id: 'b1', label: 'Get money amount', type: 'input' },
      { id: 'b2', label: 'Get notebook price', type: 'input' },
      { id: 'b3', label: 'Calculate remaining money', type: 'process' },
      { id: 'b4', label: 'Display remaining money', type: 'output' },
      { id: 'end', label: 'END', type: 'end' },
    ],
    correctOrder: ['start', 'b1', 'b2', 'b3', 'b4', 'end'],
  },
  pseudocode: {
    template: [
      { id: 'l1', text: 'START', editable: false },
      { id: 'l2', text: 'INPUT money', editable: false },
      { id: 'l3', text: 'INPUT price', editable: false },
      { id: 'l4', text: 'remaining = money - price', editable: true, placeholder: 'remaining = ?' },
      { id: 'l5', text: 'DISPLAY remaining', editable: false },
      { id: 'l6', text: 'END', editable: false },
    ],
    correctLines: ['remaining = money - price'],
  },
}

const mission03Challenge: Challenge = {
  id: 'mission-03',
  title: 'Input / Output Lab',
  description: 'Practice identifying inputs, outputs, and operations in real scenarios.',
  difficulty: 2,
  concept: 'Inputs, Outputs & Operations',
  type: 'problem-analysis',
  problemStatement: `A temperature converter receives a value in Celsius and must produce the equivalent Fahrenheit.

Formula: Fahrenheit = (Celsius × 9/5) + 32

Identify the inputs, outputs, and operation for this program.`,
  xp: 120,
  hints: [
    { level: 1, text: 'What single value does the program receive?' },
    { level: 2, text: 'The input is Celsius. The output is Fahrenheit.' },
    { level: 3, text: 'The operation combines multiplication and addition using the given formula.' },
  ],
  conceptExplanation: `Programs transform inputs into outputs through operations.

Recognizing this pattern — Input → Process → Output — is the foundation of every program you'll write. The process step applies logic, calculations, or decisions to produce the result.`,
  conceptsLearned: ['Input/Output model', 'Operations', 'Data transformation'],
  understand: [
    {
      id: 'u1',
      question: 'What is the input?',
      options: ['Fahrenheit', 'Celsius', 'Both Celsius and Fahrenheit', 'The formula'],
      correctIndex: 1,
    },
    {
      id: 'u2',
      question: 'What is the output?',
      options: ['Celsius', 'Fahrenheit', '32', '9/5'],
      correctIndex: 1,
    },
    {
      id: 'u3',
      question: 'What type of operation is used?',
      options: ['String comparison', 'Mathematical calculation', 'Loop repetition', 'File reading'],
      correctIndex: 1,
    },
  ],
  logicBlocks: {
    blocks: [
      { id: 'start', label: 'START', type: 'start' },
      { id: 'b1', label: 'Read Celsius temperature', type: 'input' },
      { id: 'b2', label: 'Apply conversion formula', type: 'process' },
      { id: 'b3', label: 'Display Fahrenheit', type: 'output' },
      { id: 'end', label: 'END', type: 'end' },
    ],
    correctOrder: ['start', 'b1', 'b2', 'b3', 'end'],
  },
  pseudocode: {
    template: [
      { id: 'l1', text: 'START', editable: false },
      { id: 'l2', text: 'INPUT celsius', editable: false },
      { id: 'l3', text: 'fahrenheit = (celsius * 9/5) + 32', editable: true, placeholder: 'fahrenheit = ?' },
      { id: 'l4', text: 'DISPLAY fahrenheit', editable: false },
      { id: 'l5', text: 'END', editable: false },
    ],
    correctLines: ['fahrenheit = (celsius * 9/5) + 32'],
  },
}

const mission04Challenge: Challenge = {
  id: 'mission-04',
  title: 'Order Matters',
  description: 'Discover why the order of instructions is critical in programming.',
  difficulty: 2,
  concept: 'Sequencing',
  type: 'sequence',
  problemStatement: `A recipe program must prepare tea in the correct order:

1. Boil water
2. Add tea leaves to cup
3. Pour hot water into cup
4. Add sugar
5. Stir

The steps below are scrambled. Arrange them in the correct execution order.`,
  xp: 120,
  hints: [
    { level: 1, text: 'You cannot pour water before boiling it, and you cannot stir before adding ingredients.' },
    { level: 2, text: 'Water must boil first. Then prepare the cup, pour, sweeten, and stir.' },
    { level: 3, text: 'Order: Boil water → Add tea leaves → Pour water → Add sugar → Stir.' },
  ],
  conceptExplanation: `In programming, sequence matters.

Instructions execute one after another in order. Changing the order can produce completely wrong results — just like pouring water before boiling it. This is why algorithms require careful ordering.`,
  conceptsLearned: ['Execution order', 'Sequential logic', 'Dependencies between steps'],
  understand: [
    {
      id: 'u1',
      question: 'Why does order matter in this problem?',
      options: ['It doesn\'t matter at all', 'Some steps depend on previous steps being done first', 'Random order is fine', 'Only the last step matters'],
      correctIndex: 1,
    },
    {
      id: 'u2',
      question: 'What happens if you pour water before boiling it?',
      options: ['Better tea', 'The step fails logically — water isn\'t hot yet', 'Nothing changes', 'Sugar dissolves faster'],
      correctIndex: 1,
    },
  ],
  logicBlocks: {
    blocks: [
      { id: 'start', label: 'START', type: 'start' },
      { id: 'b1', label: 'Boil water', type: 'process' },
      { id: 'b2', label: 'Add tea leaves to cup', type: 'process' },
      { id: 'b3', label: 'Pour hot water', type: 'process' },
      { id: 'b4', label: 'Add sugar', type: 'process' },
      { id: 'b5', label: 'Stir', type: 'process' },
      { id: 'end', label: 'END', type: 'end' },
    ],
    correctOrder: ['start', 'b1', 'b2', 'b3', 'b4', 'b5', 'end'],
  },
  pseudocode: {
    template: [
      { id: 'l1', text: 'START', editable: false },
      { id: 'l2', text: 'BOIL water', editable: false },
      { id: 'l3', text: 'ADD tea_leaves TO cup', editable: false },
      { id: 'l4', text: 'POUR hot_water INTO cup', editable: false },
      { id: 'l5', text: 'ADD sugar', editable: false },
      { id: 'l6', text: 'STIR', editable: false },
      { id: 'l7', text: 'END', editable: false },
    ],
  },
}

const mission05Challenge: Challenge = {
  id: 'mission-05',
  title: 'Find the Bug',
  description: 'Locate and fix a logical error in a sequence of instructions.',
  difficulty: 2,
  concept: 'Debugging',
  type: 'debug',
  problemStatement: `A program calculates the average of three test scores:

START
INPUT score1
INPUT score2
INPUT score3
total = score1 + score2
average = total / 3
DISPLAY average
END

The program produces wrong results. Find and fix the bug.`,
  xp: 130,
  hints: [
    { level: 1, text: 'Check whether all three inputs are being used in the calculation.' },
    { level: 2, text: 'The total should include score1, score2, AND score3.' },
    { level: 3, text: 'Line 5 is missing score3 in the addition.' },
  ],
  conceptExplanation: `Debugging is the process of finding and fixing errors in logic.

Bugs aren't always syntax errors — often they're logical mistakes, like forgetting to include a value. Reading through your logic step by step, checking inputs and operations, is a core programming skill.`,
  conceptsLearned: ['Debugging', 'Logical errors', 'Tracing execution'],
  understand: [
    {
      id: 'u1',
      question: 'What should the program output?',
      options: ['The sum of all scores', 'The average of three scores', 'The highest score', 'The first score only'],
      correctIndex: 1,
    },
    {
      id: 'u2',
      question: 'How many scores should be included in the total?',
      options: ['1', '2', '3', '0'],
      correctIndex: 2,
    },
  ],
  logicBlocks: {
    blocks: [
      { id: 'start', label: 'START', type: 'start' },
      { id: 'b1', label: 'Get score1, score2, score3', type: 'input' },
      { id: 'b2', label: 'Calculate total of all scores', type: 'process' },
      { id: 'b3', label: 'Divide total by 3', type: 'process' },
      { id: 'b4', label: 'Display average', type: 'output' },
      { id: 'end', label: 'END', type: 'end' },
    ],
    correctOrder: ['start', 'b1', 'b2', 'b3', 'b4', 'end'],
  },
  debug: {
    steps: [
      { id: 's1', text: 'START' },
      { id: 's2', text: 'INPUT score1' },
      { id: 's3', text: 'INPUT score2' },
      { id: 's4', text: 'INPUT score3' },
      { id: 's5', text: 'total = score1 + score2', isBug: true },
      { id: 's6', text: 'average = total / 3' },
      { id: 's7', text: 'DISPLAY average' },
      { id: 's8', text: 'END' },
    ],
    bugStepId: 's5',
    fixOptions: [
      { id: 'f1', text: 'total = score1 + score2 + score3', correct: true },
      { id: 'f2', text: 'total = score1 * score2 * score3' },
      { id: 'f3', text: 'total = score1 - score2 - score3' },
      { id: 'f4', text: 'total = score1 + score2 + score3 + 3' },
    ],
  },
}

const mission06Challenge: Challenge = {
  id: 'mission-06',
  title: 'Make the Decision',
  description: 'Build a decision flow that handles different conditions.',
  difficulty: 3,
  concept: 'Conditions & Decisions',
  type: 'decision',
  problemStatement: `A grading program evaluates student marks:

If the student's marks are 50 or above, display "Pass".
Otherwise, display "Fail".

Construct the correct decision flow for this program.`,
  xp: 140,
  hints: [
    { level: 1, text: 'Every decision has two paths: what happens when the condition is true, and when it is false.' },
    { level: 2, text: 'Check marks >= 50 first. If true, show Pass. If false, show Fail.' },
    { level: 3, text: 'Flow: Check condition → If true: Pass → If false: Fail.' },
  ],
  conceptExplanation: `Programs often need to make decisions.

Conditional logic (if/else) lets a program choose different actions based on whether a condition is true or false. This is how software handles real-world scenarios with multiple outcomes.`,
  conceptsLearned: ['Conditional logic', 'If/else decisions', 'Branching'],
  understand: [
    {
      id: 'u1',
      question: 'What condition determines Pass or Fail?',
      options: ['Marks equal exactly 50', 'Marks are 50 or above', 'Marks are below 50', 'Student name starts with A'],
      correctIndex: 1,
    },
    {
      id: 'u2',
      question: 'What happens when marks are 45?',
      options: ['Display Pass', 'Display Fail', 'Display nothing', 'Display 45'],
      correctIndex: 1,
    },
  ],
  logicBlocks: {
    blocks: [
      { id: 'start', label: 'START', type: 'start' },
      { id: 'b1', label: 'Get student marks', type: 'input' },
      { id: 'b2', label: 'IF marks >= 50', type: 'decision' },
      { id: 'b3', label: 'Display Pass', type: 'output' },
      { id: 'b4', label: 'Display Fail', type: 'output' },
      { id: 'end', label: 'END', type: 'end' },
    ],
    correctOrder: ['start', 'b1', 'b2', 'b3', 'b4', 'end'],
  },
  decision: {
    scenario: 'Student grading system',
    condition: 'marks >= 50',
    branches: [
      { label: 'True', action: 'Display "Pass"' },
      { label: 'False', action: 'Display "Fail"' },
    ],
    correctFlow: ['check-marks', 'if-true-pass', 'if-false-fail'],
  },
  pseudocode: {
    template: [
      { id: 'l1', text: 'START', editable: false },
      { id: 'l2', text: 'INPUT marks', editable: false },
      { id: 'l3', text: 'IF marks >= 50', editable: false },
      { id: 'l4', text: '    DISPLAY "Pass"', editable: false },
      { id: 'l5', text: 'ELSE', editable: false },
      { id: 'l6', text: '    DISPLAY "Fail"', editable: true, placeholder: '    DISPLAY ?' },
      { id: 'l7', text: 'END IF', editable: false },
      { id: 'l8', text: 'END', editable: false },
    ],
    correctLines: ['    DISPLAY "Fail"'],
  },
}

const mission07Challenge: Challenge = {
  id: 'mission-07',
  title: 'The Repeating Pattern',
  description: 'Recognize when actions repeat and understand the concept of loops.',
  difficulty: 3,
  concept: 'Repetition & Loops',
  type: 'repetition',
  problemStatement: `A factory robot must stamp 5 boxes on an assembly line.

The robot performs these actions for EACH box:
1. Move to box
2. Apply stamp
3. Move to next position

Instead of writing these 3 steps five times, programmers use loops.

Identify the repeating pattern and select the correct loop representation.`,
  xp: 140,
  hints: [
    { level: 1, text: 'The same three actions repeat for each of the 5 boxes.' },
    { level: 2, text: 'A loop runs a block of instructions a specific number of times.' },
    { level: 3, text: 'REPEAT 5 times: move, stamp, next position.' },
  ],
  conceptExplanation: `Loops eliminate repetitive instructions.

When the same steps must happen multiple times, a loop executes them automatically. This is one of the most powerful concepts in programming — it turns dozens of lines into a few.`,
  conceptsLearned: ['Repetition', 'Loops', 'Pattern recognition'],
  understand: [
    {
      id: 'u1',
      question: 'How many times does the robot stamp boxes?',
      options: ['1', '3', '5', '10'],
      correctIndex: 2,
    },
    {
      id: 'u2',
      question: 'Why use a loop instead of writing steps 5 times?',
      options: ['Loops are slower', 'Loops make code shorter and easier to change', 'Loops are only for experts', 'You cannot write steps manually'],
      correctIndex: 1,
    },
  ],
  repetition: {
    pattern: ['Move to box', 'Apply stamp', 'Move to next position'],
    question: 'Which loop correctly represents this process for 5 boxes?',
    options: [
      'REPEAT 3 times: Move, Stamp, Next',
      'REPEAT 5 times: Move to box, Apply stamp, Move to next position',
      'REPEAT 1 time: Move, Stamp, Next',
      'IF box exists: Stamp once',
    ],
    correctIndex: 1,
    loopRepresentation: 'REPEAT 5 times:\n    Move to box\n    Apply stamp\n    Move to next position',
  },
}

const mission08Challenge: Challenge = {
  id: 'mission-08',
  title: 'Memory Vault',
  description: 'Understand how programs store and modify values using variables.',
  difficulty: 3,
  concept: 'Variables & State',
  type: 'variables',
  problemStatement: `A game tracks the player's state using variables:

score = 50
lives = 3
coins = 20

The player collects 10 coins and loses 1 life.

What are the new values of score, lives, and coins after these events?`,
  xp: 150,
  hints: [
    { level: 1, text: 'Variables hold values that can change. Track each variable separately.' },
    { level: 2, text: 'Collecting coins increases coins. Losing a life decreases lives. Score stays the same.' },
    { level: 3, text: 'coins becomes 30, lives becomes 2, score stays 50.' },
  ],
  conceptExplanation: `Variables are named containers that store data.

Programs use variables to remember values that change during execution — scores, counts, user input. Understanding how values change is essential for predicting what a program will do.`,
  conceptsLearned: ['Variables', 'State management', 'Value mutation'],
  understand: [
    {
      id: 'u1',
      question: 'What is a variable?',
      options: ['A type of loop', 'A named container that stores a value', 'An error message', 'A programming language'],
      correctIndex: 1,
    },
    {
      id: 'u2',
      question: 'Which variable changes when the player collects coins?',
      options: ['score', 'lives', 'coins', 'None of them'],
      correctIndex: 2,
    },
  ],
  variables: {
    initialState: [
      { name: 'score', value: 50, type: 'number' },
      { name: 'lives', value: 3, type: 'number' },
      { name: 'coins', value: 20, type: 'number' },
    ],
    scenarios: [
      {
        id: 'vs1',
        question: 'After collecting 10 coins, what is coins?',
        options: ['20', '30', '10', '50'],
        correctIndex: 1,
        stateBefore: [
          { name: 'score', value: 50, type: 'number' },
          { name: 'lives', value: 3, type: 'number' },
          { name: 'coins', value: 20, type: 'number' },
        ],
        operation: 'coins = coins + 10',
      },
      {
        id: 'vs2',
        question: 'After losing 1 life, what is lives?',
        options: ['4', '3', '2', '1'],
        correctIndex: 2,
        stateBefore: [
          { name: 'score', value: 50, type: 'number' },
          { name: 'lives', value: 3, type: 'number' },
          { name: 'coins', value: 30, type: 'number' },
        ],
        operation: 'lives = lives - 1',
      },
      {
        id: 'vs3',
        question: 'What is score after both events?',
        options: ['50', '60', '40', '0'],
        correctIndex: 0,
        stateBefore: [
          { name: 'score', value: 50, type: 'number' },
          { name: 'lives', value: 2, type: 'number' },
          { name: 'coins', value: 30, type: 'number' },
        ],
        operation: 'No change to score',
      },
    ],
  },
}

const bossChallenge: Challenge = {
  id: 'boss-01',
  title: 'The Logic Core',
  description: 'Combine every concept from Level 01 into one comprehensive challenge.',
  difficulty: 5,
  concept: 'Integrated Problem Solving',
  type: 'boss',
  isBoss: true,
  problemStatement: `Smart Parking System

A parking lot has a limited number of spaces.

When a vehicle arrives, the system checks whether a space is available.

If a space is available, the vehicle is allowed to enter and the number of available spaces decreases by 1.

If no space is available, the system displays "Parking Full".`,
  xp: 300,
  hints: [
    { level: 1, text: 'Identify the variable that tracks available spaces and the condition that checks it.' },
    { level: 2, text: 'Input: vehicle arrival. Check: spaces > 0. If true: allow entry and decrease spaces. If false: display message.' },
    { level: 3, text: 'The condition is spaces > 0. When true, spaces = spaces - 1. When false, display "Parking Full".' },
  ],
  conceptExplanation: `You are no longer just following instructions.

You analyzed a problem, identified inputs and outputs, built logic, wrote pseudocode, and tested a solution. This is computational thinking — the skill that underlies all programming.`,
  conceptsLearned: [
    'Problem analysis',
    'Variables & state',
    'Conditional logic',
    'Algorithm design',
    'Pseudocode',
    'Testing & debugging',
  ],
  understand: [
    {
      id: 'u1',
      question: 'What is the input to this system?',
      options: ['A vehicle arrives', 'Parking Full message', 'Number of spaces', 'Exit command'],
      correctIndex: 0,
    },
    {
      id: 'u2',
      question: 'What is the output when no spaces are available?',
      options: ['Allow entry', 'Display "Parking Full"', 'Increase spaces', 'Close the parking lot'],
      correctIndex: 1,
    },
    {
      id: 'u3',
      question: 'What variable tracks the parking state?',
      options: ['vehicle', 'spaces', 'message', 'time'],
      correctIndex: 1,
    },
    {
      id: 'u4',
      question: 'What condition determines if a vehicle can enter?',
      options: ['spaces > 0', 'spaces = 0', 'vehicle = true', 'spaces < 0'],
      correctIndex: 0,
    },
  ],
  logicBlocks: {
    blocks: [
      { id: 'start', label: 'START', type: 'start' },
      { id: 'b1', label: 'Vehicle arrives', type: 'input' },
      { id: 'b2', label: 'IF spaces > 0', type: 'decision' },
      { id: 'b3', label: 'Allow entry, spaces = spaces - 1', type: 'process' },
      { id: 'b4', label: 'Display "Parking Full"', type: 'output' },
      { id: 'end', label: 'END', type: 'end' },
    ],
    correctOrder: ['start', 'b1', 'b2', 'b3', 'b4', 'end'],
  },
  pseudocode: {
    template: [
      { id: 'l1', text: 'START', editable: false },
      { id: 'l2', text: 'INPUT vehicle_arrives', editable: false },
      { id: 'l3', text: 'IF spaces > 0', editable: false },
      { id: 'l4', text: '    ALLOW entry', editable: false },
      { id: 'l5', text: '    spaces = spaces - 1', editable: true, placeholder: '    spaces = ?' },
      { id: 'l6', text: 'ELSE', editable: false },
      { id: 'l7', text: '    DISPLAY "Parking Full"', editable: false },
      { id: 'l8', text: 'END IF', editable: false },
      { id: 'l9', text: 'END', editable: false },
    ],
    correctLines: ['    spaces = spaces - 1'],
  },
  boss: {
    phases: [
      { id: 'p1', type: 'understand', title: 'Analyze the Problem' },
      { id: 'p2', type: 'logic', title: 'Build the Logic Flow' },
      { id: 'p3', type: 'pseudocode', title: 'Write Pseudocode' },
      { id: 'p4', type: 'test', title: 'Test the System' },
    ],
    understandQuestions: [],
    logicOrder: ['start', 'b1', 'b2', 'b3', 'b4', 'end'],
    pseudocodeSolution: ['    spaces = spaces - 1'],
    testCases: [
      { input: { spaces: 5 }, expectedOutput: 'Entry allowed. Spaces: 4' },
      { input: { spaces: 1 }, expectedOutput: 'Entry allowed. Spaces: 0' },
      { input: { spaces: 0 }, expectedOutput: 'Parking Full' },
    ],
  },
}

export const level01: Level = {
  id: 'level-01',
  number: 1,
  title: 'Think Like a Programmer',
  subtitle: 'LEVEL 01',
  description: 'Develop computational thinking through interactive problem-solving challenges.',
  missions: [
    { id: 'mission-01', number: 1, title: "The Robot's Route", subtitle: 'Algorithms & Sequencing', challenge: mission01Challenge },
    { id: 'mission-02', number: 2, title: 'The Problem Brief', subtitle: 'Understanding Problems', challenge: mission02Challenge },
    { id: 'mission-03', number: 3, title: 'Input / Output Lab', subtitle: 'Inputs, Outputs & Operations', challenge: mission03Challenge },
    { id: 'mission-04', number: 4, title: 'Order Matters', subtitle: 'Sequencing', challenge: mission04Challenge },
    { id: 'mission-05', number: 5, title: 'Find the Bug', subtitle: 'Debugging', challenge: mission05Challenge },
    { id: 'mission-06', number: 6, title: 'Make the Decision', subtitle: 'Conditions & Decisions', challenge: mission06Challenge },
    { id: 'mission-07', number: 7, title: 'The Repeating Pattern', subtitle: 'Repetition & Loops', challenge: mission07Challenge },
    { id: 'mission-08', number: 8, title: 'Memory Vault', subtitle: 'Variables & State', challenge: mission08Challenge },
    { id: 'boss-01', number: 9, title: 'The Logic Core', subtitle: 'FINAL BOSS', challenge: bossChallenge },
  ],
}

export const level02Preview: Level = {
  id: 'level-02',
  number: 2,
  title: 'From Logic to Code',
  subtitle: 'LEVEL 02',
  description: 'Transition from pseudocode to real Python and JavaScript syntax.',
  locked: true,
  missions: [],
}

export const allLevels = [level01, level02Preview]

export function getMissionById(missionId: string): { mission: Mission; level: Level } | null {
  for (const level of allLevels) {
    const mission = level.missions.find((m) => m.id === missionId)
    if (mission) return { mission, level }
  }
  return null
}

export function getNextMissionId(currentId: string): string | null {
  const missions = level01.missions
  const idx = missions.findIndex((m) => m.id === currentId)
  if (idx >= 0 && idx < missions.length - 1) return missions[idx + 1].id
  return null
}

// Sequence ordering data for mission 04
export const mission04Steps = [
  { id: 'step-1', label: 'Boil water' },
  { id: 'step-2', label: 'Add tea leaves to cup' },
  { id: 'step-3', label: 'Pour hot water into cup' },
  { id: 'step-4', label: 'Add sugar' },
  { id: 'step-5', label: 'Stir' },
]

export const mission04CorrectOrder = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5']
