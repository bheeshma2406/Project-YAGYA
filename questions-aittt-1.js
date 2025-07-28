// --- questions-jee-75-template.js ---
// This is the updated, official blueprint for a 75-question YAGNA test file.
// Structure: Maths (1-25) -> Physics (26-50) -> Chemistry (51-75).
// Marking: +4 / -1 for ALL questions.

const testQuestions = [
  // ======================================================
  // PART 1: MATHEMATICS (Questions 1-25)
  // ======================================================

  // --- Maths MCQs (1-20) ---
  {
    subject: 'Maths',
    chapter: 'Quadratic equations',
    topic: 'Sum of roots',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M61.png',
    solution_image: 'AITTT-1/M/AD1WT7-M61.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Maths',
    chapter: 'Quadratic equations',
    topic: 'Product of roots',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M62.png',
    solution_image: 'AITTT-1/M/AD1WT7-M62.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Maths',
    chapter: 'Quadratic equations',
    topic: 'Location of roots',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M63.png',
    solution_image: 'AITTT-1/M/AD1WT7-M63.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Maths',
    chapter: 'Sequential series',
    topic: 'Arithmetic progression',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M64.png',
    solution_image: 'AITTT-1/M/AD1WT7-M64.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Maths',
    chapter: 'Sequential series',
    topic: 'Geometric progression',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M65.png',
    solution_image: 'AITTT-1/M/AD1WT7-M65.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Maths',
    chapter: 'Sequential series',
    topic: 'Arithmetic-geometric progression',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M66.png',
    solution_image: 'AITTT-1/M/AD1WT7-M66.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  },
  {
    subject: 'Maths',
    chapter: 'Trigonometry',
    topic: 'Compound angles',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M67.png',
    solution_image: 'AITTT-1/M/AD1WT7-M67.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 60
  },
  {
    subject: 'Maths',
    chapter: 'Trigonometry',
    topic: 'Multiple angles',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M68.png',
    solution_image: 'AITTT-1/M/AD1WT7-M68.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Maths',
    chapter: 'Trigonometry',
    topic: 'Trigo-series',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M69.png',
    solution_image: 'AITTT-1/M/AD1WT7-M69.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Maths',
    chapter: 'Quadratic equations',
    topic: 'Sum of roots',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M70.png',
    solution_image: 'AITTT-1/M/AD1WT7-M70.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 60
  },
  {
    subject: 'Maths',
    chapter: 'Sequential series',
    topic: 'Geometric progression',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M71.png',
    solution_image: 'AITTT-1/M/AD1WT7-M71.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Maths',
    chapter: 'Trigonometry',
    topic: 'Compound angles',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M72.png',
    solution_image: 'AITTT-1/M/AD1WT7-M72.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Maths',
    chapter: 'Quadratic equations',
    topic: 'Location of roots',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M73.png',
    solution_image: 'AITTT-1/M/AD1WT7-M73.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  },
  {
    subject: 'Maths',
    chapter: 'Sequential series',
    topic: 'Arithmetic progression',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M74.png',
    solution_image: 'AITTT-1/M/AD1WT7-M74.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Maths',
    chapter: 'Trigonometry',
    topic: 'Multiple angles',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M75.png',
    solution_image: 'AITTT-1/M/AD1WT7-M75.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Maths',
    chapter: 'Quadratic equations',
    topic: 'Product of roots',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M76.png',
    solution_image: 'AITTT-1/M/AD1WT7-M76.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Maths',
    chapter: 'Sequential series',
    topic: 'Arithmetic-geometric progression',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M77.png',
    solution_image: 'AITTT-1/M/AD1WT7-M77.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 240
  },
  {
    subject: 'Maths',
    chapter: 'Trigonometry',
    topic: 'Trigo-series',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M78.png',
    solution_image: 'AITTT-1/M/AD1WT7-M78.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  },
  {
    subject: 'Maths',
    chapter: 'Sequential series',
    topic: 'Geometric progression',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M79.png',
    solution_image: 'AITTT-1/M/AD1WT7-M79.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Maths',
    chapter: 'Trigonometry',
    topic: 'Multiple angles',
    type: 'mcq',
    image: 'AITTT-1/M/AD1WT7-M80.png',
    solution_image: 'AITTT-1/M/AD1WT7-M80.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },

  // --- Maths Integer (21-25) ---
  {
    subject: 'Maths',
    chapter: 'Quadratic equations',
    topic: 'Location of roots',
    type: 'integer',
    image: 'AITTT-1/M/AD1WT7-M81.png',
    solution_image: 'AITTT-1/M/AD1WT7-M81.png',
    options: [],
    answer: "5",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  },
  {
    subject: 'Maths',
    chapter: 'Sequential series',
    topic: 'Geometric progression',
    type: 'integer',
    image: 'AITTT-1/M/AD1WT7-M82.png',
    solution_image: 'AITTT-1/M/AD1WT7-M82.png',
    options: [],
    answer: "8",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Maths',
    chapter: 'Trigonometry',
    topic: 'Multiple angles',
    type: 'integer',
    image: 'AITTT-1/M/AD1WT7-M83.png',
    solution_image: 'AITTT-1/M/AD1WT7-M83.png',
    options: [],
    answer: "4",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Maths',
    chapter: 'Sequential series',
    topic: 'Arithmetic-geometric progression',
    type: 'integer',
    image: 'AITTT-1/M/AD1WT7-M84.png',
    solution_image: 'AITTT-1/M/AD1WT7-M84.png',
    options: [],
    answer: "2",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 240
  },
  {
    subject: 'Maths',
    chapter: 'Quadratic equations',
    topic: 'Sum of roots',
    type: 'integer',
    image: 'AITTT-1/M/AD1WT7-M85.png',
    solution_image: 'AITTT-1/M/AD1WT7-M85.png',
    options: [],
    answer: "7",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },

  // ======================================================
  // PART 2: PHYSICS (Questions 26-50)
  // ======================================================
  
  // --- Physics MCQs (26-45) ---
  {
    subject: 'Physics',
    chapter: 'Kinematics',
    topic: 'Projectile Motion',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-1.png',
    solution_image: 'AITTT-1/P/PJA25-1.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Physics',
    chapter: 'Kinematics',
    topic: 'Relative velocity',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-2.png',
    solution_image: 'AITTT-1/P/PJA25-2.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Physics',
    chapter: 'Laws of motion',
    topic: 'Inertia',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-3.png',
    solution_image: 'AITTT-1/P/PJA25-3.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 60
  },
  {
    subject: 'Physics',
    chapter: 'Laws of motion',
    topic: 'Force',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-4.png',
    solution_image: 'AITTT-1/P/PJA25-4.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Physics',
    chapter: 'Laws of motion',
    topic: 'Friction',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-5.png',
    solution_image: 'AITTT-1/P/PJA25-5.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Moment of inertia',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-6.png',
    solution_image: 'AITTT-1/P/PJA25-6.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Rolling motion',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-7.png',
    solution_image: 'AITTT-1/P/PJA25-7.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Angular momentum',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-8.png',
    solution_image: 'AITTT-1/P/PJA25-8.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 180
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Torque',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-9.png',
    solution_image: 'AITTT-1/P/PJA25-9.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Physics',
    chapter: 'Kinematics',
    topic: 'Projectile Motion',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-10.png',
    solution_image: 'AITTT-1/P/PJA25-10.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Physics',
    chapter: 'Laws of motion',
    topic: 'Force',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-11.png',
    solution_image: 'AITTT-1/P/PJA25-11.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Moment of inertia',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-12.png',
    solution_image: 'AITTT-1/P/PJA25-12.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  },
  {
    subject: 'Physics',
    chapter: 'Kinematics',
    topic: 'Relative velocity',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-13.png',
    solution_image: 'AITTT-1/P/PJA25-13.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Physics',
    chapter: 'Laws of motion',
    topic: 'Friction',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-14.png',
    solution_image: 'AITTT-1/P/PJA25-14.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Torque',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-15.png',
    solution_image: 'AITTT-1/P/PJA25-15.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 240
  },
  {
    subject: 'Physics',
    chapter: 'Kinematics',
    topic: 'Projectile Motion',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-16.png',
    solution_image: 'AITTT-1/P/PJA25-16.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Physics',
    chapter: 'Laws of motion',
    topic: 'Inertia',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-17.png',
    solution_image: 'AITTT-1/P/PJA25-17.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Rolling motion',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-18.png',
    solution_image: 'AITTT-1/P/PJA25-18.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  },
  {
    subject: 'Physics',
    chapter: 'Laws of motion',
    topic: 'Force',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-19.png',
    solution_image: 'AITTT-1/P/PJA25-19.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Angular momentum',
    type: 'mcq',
    image: 'AITTT-1/P/PJA25-20.png',
    solution_image: 'AITTT-1/P/PJA25-20.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 240
  },

  // --- Physics Integer (46-50) ---
  {
    subject: 'Physics',
    chapter: 'Kinematics',
    topic: 'Projectile Motion',
    type: 'integer',
    image: 'AITTT-1/P/PJA25-21.png',
    solution_image: 'AITTT-1/P/PJA25-21.png',
    options: [],
    answer: "45",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Physics',
    chapter: 'Laws of motion',
    topic: 'Friction',
    type: 'integer',
    image: 'AITTT-1/P/PJA25-22.png',
    solution_image: 'AITTT-1/P/PJA25-22.png',
    options: [],
    answer: "10",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Moment of inertia',
    type: 'integer',
    image: 'AITTT-1/P/PJA25-23.png',
    solution_image: 'AITTT-1/P/PJA25-23.png',
    options: [],
    answer: "2",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Torque',
    type: 'integer',
    image: 'AITTT-1/P/PJA25-24.png',
    solution_image: 'AITTT-1/P/PJA25-24.png',
    options: [],
    answer: "25",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 240
  },
  {
    subject: 'Physics',
    chapter: 'Kinematics',
    topic: 'Relative velocity',
    type: 'integer',
    image: 'AITTT-1/P/PJA25-25.png',
    solution_image: 'AITTT-1/P/PJA25-25.png',
    options: [],
    answer: "5",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 180
  },
  
  // ======================================================
  // PART 3: CHEMISTRY (Questions 51-75)
  // ======================================================

  // --- Chemistry MCQs (51-70) ---
  {
    subject: 'Chemistry',
    chapter: 'Mole Concept',
    topic: 'Moles',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C31.png',
    solution_image: 'AITTT-1/C/AD1WT7-C31.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Chemistry',
    chapter: 'Mole Concept',
    topic: 'Concentration terms',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C32.png',
    solution_image: 'AITTT-1/C/AD1WT7-C32.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Chemistry',
    chapter: 'Periodic table',
    topic: 'Electronic Config..',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C33.png',
    solution_image: 'AITTT-1/C/AD1WT7-C33.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 60
  },
  {
    subject: 'Chemistry',
    chapter: 'Periodic table',
    topic: 'Electronegetivity',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C34.png',
    solution_image: 'AITTT-1/C/AD1WT7-C34.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 90
  },
  {
    subject: 'Chemistry',
    chapter: 'Periodic table',
    topic: 'Effective Nuclear charge',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C35.png',
    solution_image: 'AITTT-1/C/AD1WT7-C35.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 150
  },
  {
    subject: 'Chemistry',
    chapter: 'GOC',
    topic: 'Inductive Effect',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C36.png',
    solution_image: 'AITTT-1/C/AD1WT7-C36.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Chemistry',
    chapter: 'GOC',
    topic: 'Resonance',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C37.png',
    solution_image: 'AITTT-1/C/AD1WT7-C37.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Chemistry',
    chapter: 'GOC',
    topic: 'Acidity and Basicity',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C38.png',
    solution_image: 'AITTT-1/C/AD1WT7-C38.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Chemistry',
    chapter: 'Mole Concept',
    topic: 'Moles',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C39.png',
    solution_image: 'AITTT-1/C/AD1WT7-C39.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
    {
    subject: 'Chemistry',
    chapter: 'Periodic table',
    topic: 'Electronegetivity',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C40.png',
    solution_image: 'AITTT-1/C/AD1WT7-C40.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Chemistry',
    chapter: 'GOC',
    topic: 'Isomerism',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C41.png',
    solution_image: 'AITTT-1/C/AD1WT7-C41.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  },
  {
    subject: 'Chemistry',
    chapter: 'Mole Concept',
    topic: 'Concentration terms',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C42.png',
    solution_image: 'AITTT-1/C/AD1WT7-C42.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Chemistry',
    chapter: 'Periodic table',
    topic: 'Electronic Config..',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C43.png',
    solution_image: 'AITTT-1/C/AD1WT7-C43.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Chemistry',
    chapter: 'GOC',
    topic: 'Hyperconjugation',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C44.png',
    solution_image: 'AITTT-1/C/AD1WT7-C44.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Chemistry',
    chapter: 'Periodic table',
    topic: 'Effective Nuclear charge',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C45.png',
    solution_image: 'AITTT-1/C/AD1WT7-C45.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Chemistry',
    chapter: 'Mole Concept',
    topic: 'Moles',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C46.png',
    solution_image: 'AITTT-1/C/AD1WT7-C46.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  },
  {
    subject: 'Chemistry',
    chapter: 'GOC',
    topic: 'Acidity and Basicity',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C47.png',
    solution_image: 'AITTT-1/C/AD1WT7-C47.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 240
  },
  {
    subject: 'Chemistry',
    chapter: 'Periodic table',
    topic: 'Electronegetivity',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C48.png',
    solution_image: 'AITTT-1/C/AD1WT7-C48.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 90
  },
  {
    subject: 'Chemistry',
    chapter: 'Mole Concept',
    topic: 'Concentration terms',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C49.png',
    solution_image: 'AITTT-1/C/AD1WT7-C49.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Chemistry',
    chapter: 'GOC',
    topic: 'Isomerism',
    type: 'mcq',
    image: 'AITTT-1/C/AD1WT7-C50.png',
    solution_image: 'AITTT-1/C/AD1WT7-C50.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  },

  // --- Chemistry Integer (71-75) ---
  {
    subject: 'Chemistry',
    chapter: 'Mole Concept',
    topic: 'Moles',
    type: 'integer',
    image: 'AITTT-1/C/AD1WT7-C51.png',
    solution_image: 'AITTT-1/C/AD1WT7-C51.png',
    options: [],
    answer: "2",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Chemistry',
    chapter: 'Periodic table',
    topic: 'Electronic Config..',
    type: 'integer',
    image: 'AITTT-1/C/AD1WT7-C52.png',
    solution_image: 'AITTT-1/C/AD1WT7-C52.png',
    options: [],
    answer: "6",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Chemistry',
    chapter: 'GOC',
    topic: 'Isomerism',
    type: 'integer',
    image: 'AITTT-1/C/AD1WT7-C53.png',
    solution_image: 'AITTT-1/C/AD1WT7-C53.png',
    options: [],
    answer: "5",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 240
  },
  {
    subject: 'Chemistry',
    chapter: 'Mole Concept',
    topic: 'Concentration terms',
    type: 'integer',
    image: 'AITTT-1/C/AD1WT7-C54.png',
    solution_image: 'AITTT-1/C/AD1WT7-C54.png',
    options: [],
    answer: "1",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Chemistry',
    chapter: 'GOC',
    topic: 'Hyperconjugation',
    type: 'integer',
    image: 'AITTT-1/C/AD1WT7-C55.png',
    solution_image: 'AITTT-1/C/AD1WT7-C55.png',
    options: [],
    answer: "9",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 210
  }
];
