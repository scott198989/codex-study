export type Equation = {
  id: string;
  label: string;
  expression: string;
  whenToUse: string;
  memoryTip: string;
  variables: string[];
};

export type Flashcard = {
  front: string;
  back: string;
  tag: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type FillBlank = {
  prompt: string;
  answers: string[];
  hint: string;
  explanation: string;
};

export type EquationChallenge = {
  scenario: string;
  options: string[];
  correctId: string;
  explanation: string;
};

export type CalculatorChallenge = {
  prompt: string;
  answer: number;
  tolerance: number;
  units?: string;
};

export type CalculatorDrill = {
  title: string;
  goal: string;
  steps: string[];
  check: string;
  challenge?: CalculatorChallenge;
};

export type Chapter = {
  id: number;
  title: string;
  subtitle: string;
  printedPages: string;
  sections: string[];
  whyItMatters: string;
  keyIdeas: string[];
  pitfalls: string[];
  workflow: string[];
  equations: Equation[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  fillBlanks: FillBlank[];
  equationChallenges: EquationChallenge[];
  calculatorDrills: CalculatorDrill[];
};
