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
    chapter: 'Name of Chapter',
    topic: 'Name of Topic',
    type: 'mcq',
    image: 'test-name-folder/MATHS_MCQ_1.png',
    solution_image: 'test-name-folder/solutions/sol_MATHS_MCQ_1.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // 0 for A, 1 for B, etc.
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120 // seconds
  },
  // ... and so on for questions 2 through 20 ...

  // --- Maths Integer (21-25) ---
  {
    subject: 'Maths',
    chapter: 'Name of Chapter',
    topic: 'Name of Topic',
    type: 'integer',
    image: 'test-name-folder/MATHS_INT_21.png',
    solution_image: 'test-name-folder/solutions/sol_MATHS_INT_21.png',
    options: [],
    answer: "42", // The answer as a string
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  // ... and so on for questions 22 through 25 ...

  // ======================================================
  // PART 2: PHYSICS (Questions 26-50)
  // ======================================================

  // --- Physics MCQs (26-45) ---
  {
    subject: 'Physics',
    chapter: '...',
    topic: '...',
    type: 'mcq',
    image: 'test-name-folder/PHYSICS_MCQ_26.png',
    solution_image: 'test-name-folder/solutions/sol_PHYSICS_MCQ_26.png',
    options: ["A", "B", "C", "D"],
    answer: 1,
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  // ... and so on for questions 27 through 45 ...
  
  // --- Physics Integer (46-50) ---
  {
    subject: 'Physics',
    chapter: '...',
    topic: '...',
    type: 'integer',
    image: 'test-name-folder/PHYSICS_INT_46.png',
    solution_image: 'test-name-folder/solutions/sol_PHYSICS_INT_46.png',
    options: [],
    answer: "8",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  // ... and so on for questions 47 through 50 ...
  
  // ======================================================
  // PART 3: CHEMISTRY (Questions 51-75)
  // ======================================================

  // --- Chemistry MCQs (51-70) ---
  {
    subject: 'Chemistry',
    chapter: '...',
    topic: '...',
    type: 'mcq',
    image: 'test-name-folder/CHEM_MCQ_51.png',
    solution_image: 'test-name-folder/solutions/sol_CHEM_MCQ_51.png',
    options: ["A", "B", "C", "D"],
    answer: 3,
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 70
  },
  // ... and so on for questions 52 through 70 ...

  // --- Chemistry Integer (71-75) ---
  {
    subject: 'Chemistry',
    chapter: '...',
    topic: '...',
    type: 'integer',
    image: 'test-name-folder/CHEM_INT_71.png',
    solution_image: 'test-name-folder/solutions/sol_CHEM_INT_71.png',
    options: [],
    answer: "5",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 110
  }
  // ... and so on for questions 72 through 75 ...
];