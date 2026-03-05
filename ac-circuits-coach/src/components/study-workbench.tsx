"use client";

import { useMemo, useState } from "react";
import { ChapterLab } from "@/components/labs";
import { chapterOrder, chapterById } from "@/lib/chapters";
import { Chapter, Equation } from "@/lib/types";

type TabId =
  | "learn"
  | "flashcards"
  | "quiz"
  | "fill"
  | "equation"
  | "lab"
  | "calculator";

const tabs: { id: TabId; label: string }[] = [
  { id: "learn", label: "Learn" },
  { id: "flashcards", label: "Flashcards" },
  { id: "quiz", label: "Quiz" },
  { id: "fill", label: "Fill Blanks" },
  { id: "equation", label: "Pick Equation" },
  { id: "lab", label: "Diagram Lab" },
  { id: "calculator", label: "TI Nspire" },
];

function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9.+\-*/^()]/g, "");
}

function lookupEquation(chapter: Chapter, id: string): Equation | undefined {
  return chapter.equations.find((equation) => equation.id === id);
}

function LearnTab({ chapter }: { chapter: Chapter }) {
  return (
    <div className="content-stack">
      <section className="panel hero-panel">
        <h2>{chapter.title}</h2>
        <p>{chapter.whyItMatters}</p>
        <div className="chapter-meta">
          <span>Book pages: {chapter.printedPages}</span>
          <span>Sections: {chapter.sections.length}</span>
          <span>Equations to know: {chapter.equations.length}</span>
        </div>
      </section>

      <section className="panel two-col">
        <div>
          <h3>Core Ideas</h3>
          <ul>
            {chapter.keyIdeas.map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Common Mistakes</h3>
          <ul>
            {chapter.pitfalls.map((pitfall) => (
              <li key={pitfall}>{pitfall}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel">
        <h3>Fast Problem Workflow</h3>
        <ol>
          {chapter.workflow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="panel">
        <h3>Equation Sheet</h3>
        <div className="equation-grid">
          {chapter.equations.map((equation) => (
            <article className="equation-card" key={equation.id}>
              <header>
                <strong>{equation.label}</strong>
                <code>{equation.expression}</code>
              </header>
              <p>
                <span>When to use:</span> {equation.whenToUse}
              </p>
              <p>
                <span>Memory tip:</span> {equation.memoryTip}
              </p>
              <small>{equation.variables.join(" · ")}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h3>Section Coverage from the Textbook</h3>
        <div className="section-chip-list">
          {chapter.sections.map((section) => (
            <span key={section}>{section}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

function FlashcardsTab({ chapter }: { chapter: Chapter }) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const cards = chapter.flashcards;
  const current = cards[index];

  return (
    <div className="content-stack">
      <section className="panel flashcard-panel">
        <div className="flashcard-top">
          <span>
            Card {index + 1} / {cards.length}
          </span>
          <span className="tag">{current.tag}</span>
        </div>
        <button className="flashcard" onClick={() => setShowBack((value) => !value)}>
          {showBack ? current.back : current.front}
        </button>
        <p className="flashcard-help">Click card to flip.</p>
        <div className="flashcard-controls">
          <button
            onClick={() => {
              setIndex((value) => (value - 1 + cards.length) % cards.length);
              setShowBack(false);
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setIndex((value) => (value + 1) % cards.length);
              setShowBack(false);
            }}
          >
            Next
          </button>
          <button
            onClick={() => {
              const random = Math.floor(Math.random() * cards.length);
              setIndex(random);
              setShowBack(false);
            }}
          >
            Shuffle
          </button>
        </div>
      </section>
    </div>
  );
}

function QuizTab({ chapter }: { chapter: Chapter }) {
  const questions = chapter.quiz;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => Array(questions.length).fill(null)
  );

  const current = questions[index];
  const currentPick = answers[index];
  const score = useMemo(
    () =>
      answers.reduce<number>((total, answer, questionIndex) => {
        if (answer === null) return total;
        return total + (answer === questions[questionIndex].answerIndex ? 1 : 0);
      }, 0),
    [answers, questions]
  );

  return (
    <div className="content-stack">
      <section className="panel">
        <div className="quiz-head">
          <span>
            Question {index + 1} / {questions.length}
          </span>
          <span>
            Score: {score}/{questions.length}
          </span>
        </div>
        <h3>{current.question}</h3>
        <div className="option-grid">
          {current.options.map((option, optionIndex) => {
            const isPicked = currentPick === optionIndex;
            const isCorrect = optionIndex === current.answerIndex;
            const revealed = currentPick !== null;
            return (
              <button
                key={option}
                className={
                  revealed && isCorrect
                    ? "option correct"
                    : revealed && isPicked && !isCorrect
                      ? "option wrong"
                      : isPicked
                        ? "option selected"
                        : "option"
                }
                onClick={() => {
                  if (answers[index] !== null) return;
                  setAnswers((previous) => {
                    const next = [...previous];
                    next[index] = optionIndex;
                    return next;
                  });
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
        {currentPick !== null && (
          <div className="feedback">
            {currentPick === current.answerIndex ? "Correct." : "Not quite."}{" "}
            {current.explanation}
          </div>
        )}
        <div className="row-actions">
          <button
            onClick={() => setIndex((value) => Math.max(value - 1, 0))}
            disabled={index === 0}
          >
            Previous
          </button>
          <button
            onClick={() => setIndex((value) => Math.min(value + 1, questions.length - 1))}
            disabled={index === questions.length - 1}
          >
            Next
          </button>
          <button
            onClick={() => {
              setAnswers(Array(questions.length).fill(null));
              setIndex(0);
            }}
          >
            Reset Quiz
          </button>
        </div>
      </section>
    </div>
  );
}

function FillBlanksTab({ chapter }: { chapter: Chapter }) {
  const items = chapter.fillBlanks;
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState<null | boolean>(null);
  const item = items[index];

  const check = () => {
    const normalized = normalizeAnswer(input);
    const success = item.answers.some(
      (answer) => normalizeAnswer(answer) === normalized
    );
    setChecked(success);
  };

  return (
    <div className="content-stack">
      <section className="panel">
        <div className="quiz-head">
          <span>
            Prompt {index + 1} / {items.length}
          </span>
          <span>Type short answers only.</span>
        </div>
        <h3>{item.prompt}</h3>
        <input
          className="text-entry"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setChecked(null);
          }}
          placeholder="Type your answer..."
        />
        <div className="row-actions">
          <button onClick={check}>Check</button>
          <button
            onClick={() => {
              setInput("");
              setChecked(null);
              setIndex((value) => Math.max(value - 1, 0));
            }}
            disabled={index === 0}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setInput("");
              setChecked(null);
              setIndex((value) => Math.min(value + 1, items.length - 1));
            }}
            disabled={index === items.length - 1}
          >
            Next
          </button>
        </div>
        {checked !== null && (
          <div className={`feedback ${checked ? "good" : "bad"}`}>
            {checked ? "Nice work." : "Try again."} {item.explanation}
          </div>
        )}
        <p className="hint">Hint: {item.hint}</p>
      </section>
    </div>
  );
}

function EquationPickerTab({ chapter }: { chapter: Chapter }) {
  const items = chapter.equationChallenges;
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const current = items[index];

  return (
    <div className="content-stack">
      <section className="panel">
        <div className="quiz-head">
          <span>
            Scenario {index + 1} / {items.length}
          </span>
          <span>Choose the best equation.</span>
        </div>
        <h3>{current.scenario}</h3>
        <div className="option-grid">
          {current.options.map((optionId) => {
            const equation = lookupEquation(chapter, optionId);
            if (!equation) return null;
            const isCorrect = optionId === current.correctId;
            const isPicked = optionId === picked;
            const shown = picked !== null;
            return (
              <button
                key={optionId}
                className={
                  shown && isCorrect
                    ? "option correct"
                    : shown && isPicked && !isCorrect
                      ? "option wrong"
                      : isPicked
                        ? "option selected"
                        : "option"
                }
                onClick={() => {
                  if (picked) return;
                  setPicked(optionId);
                }}
              >
                <strong>{equation.label}</strong>
                <code>{equation.expression}</code>
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className="feedback">
            {picked === current.correctId ? "Correct choice." : "Not the best fit."}{" "}
            {current.explanation}
          </div>
        )}
        <div className="row-actions">
          <button
            onClick={() => {
              setPicked(null);
              setIndex((value) => Math.max(value - 1, 0));
            }}
            disabled={index === 0}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setPicked(null);
              setIndex((value) => Math.min(value + 1, items.length - 1));
            }}
            disabled={index === items.length - 1}
          >
            Next
          </button>
          <button
            onClick={() => {
              setPicked(null);
              setIndex(0);
            }}
          >
            Restart
          </button>
        </div>
      </section>
    </div>
  );
}

function CalculatorTab({ chapter }: { chapter: Chapter }) {
  const drills = chapter.calculatorDrills;
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<null | boolean>(null);
  const drill = drills[index];
  const challenge = drill.challenge;

  return (
    <div className="content-stack">
      <section className="panel">
        <div className="quiz-head">
          <span>
            Drill {index + 1} / {drills.length}
          </span>
          <span>Focus: TI Nspire CX II workflow</span>
        </div>
        <h3>{drill.title}</h3>
        <p>{drill.goal}</p>
        <ol>
          {drill.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="hint">
          <strong>Check:</strong> {drill.check}
        </p>
      </section>

      {challenge && (
        <section className="panel">
          <h3>Quick Numeric Check</h3>
          <p>{challenge.prompt}</p>
          <div className="challenge-row">
            <input
              className="text-entry"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setStatus(null);
              }}
              placeholder="Enter numeric answer"
            />
            <button
              onClick={() => {
                const numeric = Number(input);
                if (Number.isNaN(numeric)) {
                  setStatus(false);
                  return;
                }
                const difference = Math.abs(numeric - challenge.answer);
                setStatus(difference <= challenge.tolerance);
              }}
            >
              Check Answer
            </button>
          </div>
          {status !== null && (
            <div className={`feedback ${status ? "good" : "bad"}`}>
              {status
                ? "Correct."
                : `Close, but not inside tolerance. Target is about ${challenge.answer}${
                    challenge.units ? ` ${challenge.units}` : ""
                  }.`}
            </div>
          )}
        </section>
      )}

      <div className="row-actions">
        <button
          onClick={() => {
            setInput("");
            setStatus(null);
            setIndex((value) => Math.max(value - 1, 0));
          }}
          disabled={index === 0}
        >
          Previous
        </button>
        <button
          onClick={() => {
            setInput("");
            setStatus(null);
            setIndex((value) => Math.min(value + 1, drills.length - 1));
          }}
          disabled={index === drills.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function ChapterTabContent({ chapter, tab }: { chapter: Chapter; tab: TabId }) {
  if (tab === "learn") return <LearnTab chapter={chapter} />;
  if (tab === "flashcards") return <FlashcardsTab chapter={chapter} />;
  if (tab === "quiz") return <QuizTab chapter={chapter} />;
  if (tab === "fill") return <FillBlanksTab chapter={chapter} />;
  if (tab === "equation") return <EquationPickerTab chapter={chapter} />;
  if (tab === "lab") {
    return (
      <div className="content-stack">
        <section className="panel">
          <h2>Interactive Diagram Lab</h2>
          <p>
            This lab changes based on the chapter and lets you see equations
            move as circuit values change.
          </p>
        </section>
        <ChapterLab chapterId={chapter.id} />
      </div>
    );
  }
  return <CalculatorTab chapter={chapter} />;
}

export function StudyWorkbench() {
  const [chapterId, setChapterId] = useState(chapterOrder[0]);
  const [tab, setTab] = useState<TabId>("learn");
  const chapter = chapterById[chapterId];

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">AC Circuits Study App</p>
          <h1>Chapters 10, 11, 13, 14, 15, 16, 17</h1>
          <p>
            Built from your textbook scope for simple, practical study. Focus on
            concept familiarity, equation choice, and calculator confidence.
          </p>
        </div>
      </header>

      <main className="app-main">
        <aside className="chapter-rail">
          {chapterOrder.map((id) => {
            const item = chapterById[id];
            const active = id === chapterId;
            return (
              <button
                className={active ? "chapter-btn active" : "chapter-btn"}
                key={id}
                onClick={() => {
                  setChapterId(id);
                  setTab("learn");
                }}
              >
                <span className="chapter-num">Chapter {item.id}</span>
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </button>
            );
          })}
        </aside>

        <section className="work-area" key={`${chapterId}-${tab}`}>
          <div className="tab-row">
            {tabs.map((entry) => (
              <button
                key={entry.id}
                className={tab === entry.id ? "tab active" : "tab"}
                onClick={() => setTab(entry.id)}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <ChapterTabContent chapter={chapter} tab={tab} />
        </section>
      </main>
    </div>
  );
}
