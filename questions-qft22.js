const testQuestions = [
  // --- MCQ Questions ---

  // Physics (M61-M67)
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Moment of Inertia',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M61.png',
    solution_image: 'AD1WT7/solutions/sol-M61.png',
    options: ["A", "B", "C", "D"],
    answer: 1,
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120 // seconds
},

  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Angular Momentum',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M62.png',
    solution_image: 'AD1WT7/solutions/sol-M62.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Angular Momentum',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M63.png',
    solution_image: 'AD1WT7/solutions/sol-M63.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Torque',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M64.png',
    solution_image: 'AD1WT7/solutions/sol-M64.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Torque',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M65.png',
    solution_image: 'AD1WT7/solutions/sol-M65.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Torque',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M66.png',
    solution_image: 'AD1WT7/solutions/sol-M66.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Angular Momentum',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M67.png',
    solution_image: 'AD1WT7/solutions/sol-M67.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 140
  },

  // Maths (M68-M74)
  {
    subject: 'Maths',
    chapter: 'Algebra',
    topic: 'Quadratic Equations',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M68.png',
    solution_image: 'AD1WT7/solutions/sol-M68.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 100
  },
  {
    subject: 'Maths',
    chapter: 'Algebra',
    topic: 'Quadratic Equations',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M69.png',
    solution_image: 'AD1WT7/solutions/sol-M69.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Maths',
    chapter: 'Algebra',
    topic: 'Quadratic Equations',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M70.png',
    solution_image: 'AD1WT7/solutions/sol-M70.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Maths', 
    chapter: 'Algebra',
    topic: 'Quadratic Equations',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M71.png',
    solution_image: 'AD1WT7/solutions/sol-M71.png',
    options: ["A", "B", "C", "D"],
    answer: 2, // C
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Maths',
    chapter: 'Algebra',
    topic: 'Quadratic Equations',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M72.png',
    solution_image: 'AD1WT7/solutions/sol-M72.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Maths',
    chapter: 'Algebra',
    topic: 'Quadratic Equations',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M73.png',
    solution_image: 'AD1WT7/solutions/sol-M73.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Maths',
    chapter: 'Algebra',
    topic: 'Quadratic Equations',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M74.png',
    solution_image: 'AD1WT7/solutions/sol-M74.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 140
  },

  // Chemistry (M75-M80)
  {
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    topic: 'Molecular Geometry',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M75.png',
    solution_image: 'AD1WT7/solutions/sol-M75.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 80
  },
  {
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    topic: 'Molecular Geometry',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M76.png',
    solution_image: 'AD1WT7/solutions/sol-M76.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    topic: 'Molecular Geometry',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M77.png',
    solution_image: 'AD1WT7/solutions/sol-M77.png',
    options: ["A", "B", "C", "D"],
    answer: 3, // D
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    topic: 'Molecular Geometry',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M78.png',
    solution_image: 'AD1WT7/solutions/sol-M78.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 110
  },
  {
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    topic: 'Molecular Geometry',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M79.png',
    solution_image: 'AD1WT7/solutions/sol-M79.png',
    options: ["A", "B", "C", "D"],
    answer: 0, // A
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 160
  },
  {
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    topic: 'Molecular Geometry',
    type: 'mcq',
    image: 'AD1WT7/AD1WT7-M80.png',
    solution_image: 'AD1WT7/solutions/sol-M80.png',
    options: ["A", "B", "C", "D"],
    answer: 1, // B
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },

  // --- Integer Type Questions ---

  // Physics (M81-M83)
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Torque',
    type: 'integer',
    image: 'AD1WT7/AD1WT7-M81.png',
    solution_image: 'AD1WT7/solutions/sol-M81.png',
    options: [],
    answer: "117",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Torque',
    type: 'integer',
    image: 'AD1WT7/AD1WT7-M82.png',
    solution_image: 'AD1WT7/solutions/sol-M82.png',
    options: [],
    answer: "3",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },
  {
    subject: 'Physics',
    chapter: 'Rotational Motion',
    topic: 'Torque',
    type: 'integer',
    image: 'AD1WT7/AD1WT7-M83.png',
    solution_image: 'AD1WT7/solutions/sol-M83.png',
    options: [],
    answer: "11",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 200
  },

  // Maths (M84-M86)
  {
    subject: 'Maths',
    chapter: 'Algebra',
    topic: 'Quadratic Equations',
    type: 'integer',
    image: 'AD1WT7/AD1WT7-M84.png',
    solution_image: 'AD1WT7/solutions/sol-M84.png',
    options: [],
    answer: "18",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 150
  },
  {
    subject: 'Maths',
    chapter: 'Algebra',
    topic: 'Quadratic Equations',
    type: 'integer',
    image: 'AD1WT7/AD1WT7-M85.png',
    solution_image: 'AD1WT7/solutions/sol-M85.png',
    options: [],
    answer: "11",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 160
  },
  {
    subject: 'Maths',
    chapter: 'Algebra',
    topic: 'Quadratic Equations',
    type: 'integer',
    image: 'AD1WT7/AD1WT7-M86.png',
    solution_image: 'AD1WT7/solutions/sol-M86.png',
    options: [],
    answer: "16",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  },

  // Chemistry (M87-M90)
  {
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    topic: 'Molecular Geometry',
    type: 'integer',
    image: 'AD1WT7/AD1WT7-M87.png',
    solution_image: 'AD1WT7/solutions/sol-M87.png',
    options: [],
    answer: "160",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 120
  },
  {
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    topic: 'Molecular Geometry',
    type: 'integer',
    image: 'AD1WT7/AD1WT7-M88.png',
    solution_image: 'AD1WT7/solutions/sol-M88.png',
    options: [],
    answer: "25",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Easy',
    idealTime: 90
  },
  {
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    topic: 'Molecular Geometry',
    type: 'integer',
    image: 'AD1WT7/AD1WT7-M89.png',
    solution_image: 'AD1WT7/solutions/sol-M89.png',
    options: [],
    answer: "1",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Medium',
    idealTime: 140
  },
  {
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    topic: 'Molecular Geometry',
    type: 'integer',
    image: 'AD1WT7/AD1WT7-M90.png',
    solution_image: 'AD1WT7/solutions/sol-M90.png',
    options: [],
    answer: "51",
    marks: { correct: 4, incorrect: -1 },
    difficulty: 'Hard',
    idealTime: 180
  }
];
