import { Chapter } from "./types";

export const chapters: Chapter[] = [
  {
    id: 10,
    title: "Capacitors",
    subtitle: "Charge storage, RC timing, and transient behavior",
    printedPages: "395-454",
    sections: [
      "10.1 Introduction",
      "10.2 Electric fields and flux",
      "10.3 Capacitance",
      "10.4 Capacitors",
      "10.5 RC transients: charging",
      "10.6 RC transients: discharging",
      "10.7 Initial conditions",
      "10.8 Instantaneous values",
      "10.9 Thevenin equivalent and tau = RthC",
      "10.10 Current relation",
      "10.11 Series/parallel capacitors",
      "10.12 Energy stored",
      "10.13 Stray capacitance",
      "10.14 Applications"
    ],
    whyItMatters:
      "Capacitors drive timing and filtering in AC circuits. If you can read RC curves, you can predict what a circuit does right after switching and after it settles.",
    keyIdeas: [
      "Capacitance is charge per volt: C = Q/V.",
      "Capacitor voltage cannot jump instantly.",
      "RC charge/discharge follows exponential curves.",
      "Tau controls speed: tau = Rth*C.",
      "Series C gets smaller, parallel C adds up.",
      "Energy in capacitor is electric-field energy."
    ],
    pitfalls: [
      "Using the charging equation for a discharging case.",
      "Forgetting to use Rth seen by the capacitor.",
      "Unit errors: uF, nF, pF mix-ups.",
      "Assuming iC is always zero in DC networks."
    ],
    workflow: [
      "Find initial and final capacitor voltage.",
      "Compute Rth seen by C.",
      "Compute tau = Rth*C.",
      "Write vc(t) and ic(t) with the right sign.",
      "Check at t=0+ and t>>tau."
    ],
    equations: [
      {
        id: "c_basic",
        label: "Capacitance definition",
        expression: "C = Q / V",
        whenToUse: "Convert between charge, voltage, capacitance.",
        memoryTip: "Capacitance means charge per volt.",
        variables: ["C", "Q", "V"]
      },
      {
        id: "tau_rc",
        label: "RC time constant",
        expression: "tau = Rth * C",
        whenToUse: "Find transient speed.",
        memoryTip: "Big R or big C means slower response.",
        variables: ["tau", "Rth", "C"]
      },
      {
        id: "vc_charge",
        label: "Charging capacitor voltage",
        expression: "vc(t) = E*(1-e^(-t/tau))",
        whenToUse: "Voltage during charging.",
        memoryTip: "Starts low, climbs toward E.",
        variables: ["vc", "E", "t", "tau"]
      },
      {
        id: "vc_discharge",
        label: "Discharging capacitor voltage",
        expression: "vc(t) = V0*e^(-t/tau)",
        whenToUse: "Voltage decay from initial value.",
        memoryTip: "Starts at V0, decays toward zero.",
        variables: ["vc", "V0", "t", "tau"]
      },
      {
        id: "ic_dvdt",
        label: "Capacitor current relation",
        expression: "ic = C*(dvc/dt)",
        whenToUse: "Current from voltage slope.",
        memoryTip: "More slope means more current.",
        variables: ["ic", "C", "dvc/dt"]
      },
      {
        id: "wc",
        label: "Stored energy",
        expression: "Wc = 0.5*C*V^2",
        whenToUse: "Compute joules in capacitor.",
        memoryTip: "Half C V squared.",
        variables: ["Wc", "C", "V"]
      }
    ],
    flashcards: [
      {
        front: "After one tau of RC charging, vc is about what percent of final?",
        back: "About 63.2%.",
        tag: "Rule"
      },
      {
        front: "Can capacitor voltage jump instantly?",
        back: "No. Voltage is continuous at switching instants.",
        tag: "Concept"
      },
      {
        front: "Series capacitors increase or decrease total C?",
        back: "Decrease total C.",
        tag: "Combination"
      },
      {
        front: "Energy formula for capacitor",
        back: "W = 0.5*C*V^2",
        tag: "Equation"
      }
    ],
    quiz: [
      {
        question: "At t=0+ for an uncharged capacitor in RC charging, which is true?",
        options: ["vc is max", "vc=0 and i is max", "i=0", "vc jumps to source voltage"],
        answerIndex: 1,
        explanation: "Initially capacitor acts like a short for voltage; current starts high."
      },
      {
        question: "If R doubles and C stays same, tau does what?",
        options: ["Halves", "Doubles", "No change", "Goes to zero"],
        answerIndex: 1,
        explanation: "Tau is proportional to R."
      },
      {
        question: "Which equation gives capacitor discharge voltage?",
        options: ["E*(1-e^(-t/tau))", "V0*e^(-t/tau)", "V0+t/tau", "C*dv/dt"],
        answerIndex: 1,
        explanation: "Discharge decays exponentially from V0."
      },
      {
        question: "After about how many tau is RC transient essentially done?",
        options: ["1", "2", "5", "10"],
        answerIndex: 2,
        explanation: "5 tau is the standard practical completion rule."
      }
    ],
    fillBlanks: [
      {
        prompt: "Time constant formula: tau = ____ * C",
        answers: ["R", "Rth", "r", "rth"],
        hint: "Use equivalent resistance seen by the capacitor.",
        explanation: "Complex circuits use Thevenin resistance."
      },
      {
        prompt: "Charging voltage shape includes: 1 - ____",
        answers: ["e^(-t/tau)", "exp(-t/tau)", "e^-t/tau"],
        hint: "Exponential decay term.",
        explanation: "Subtracting the decay gives a rising curve."
      },
      {
        prompt: "Capacitor current relation uses derivative of ____",
        answers: ["voltage", "v", "vc"],
        hint: "Slope term in ic=C*d()/dt.",
        explanation: "Current is tied to voltage rate of change."
      }
    ],
    equationChallenges: [
      {
        scenario: "Need voltage during charging at any time t.",
        options: ["tau_rc", "vc_charge", "vc_discharge", "wc"],
        correctId: "vc_charge",
        explanation: "Charging uses 1 - e^(-t/tau)."
      },
      {
        scenario: "Need remaining voltage after source removed.",
        options: ["vc_discharge", "vc_charge", "c_basic", "ic_dvdt"],
        correctId: "vc_discharge",
        explanation: "Discharge starts from V0 and decays."
      },
      {
        scenario: "Given dv/dt across capacitor, need current.",
        options: ["ic_dvdt", "tau_rc", "wc", "c_basic"],
        correctId: "ic_dvdt",
        explanation: "Current is proportional to slope."
      }
    ],
    calculatorDrills: [
      {
        title: "Evaluate exponential terms",
        goal: "Compute e^(-t/tau) quickly on TI-Nspire.",
        steps: [
          "Use exp(-t/tau) in Calculator app.",
          "Check that t and tau are both in seconds.",
          "Use result in vc or ic equations.",
          "Sanity check: at t=tau, value should be about 0.368."
        ],
        check: "At t=tau, exp(-1) should appear.",
        challenge: {
          prompt: "Compute exp(-2).",
          answer: 0.1353,
          tolerance: 0.001
        }
      },
      {
        title: "Unit conversion guardrail",
        goal: "Avoid 1000x mistakes from mixed units.",
        steps: [
          "Convert uF to F before calculating tau.",
          "Convert ms to s before using exponential.",
          "Store converted values as variables.",
          "Round at the end, not in the middle."
        ],
        check: "Always inspect powers of ten once before final answer.",
        challenge: {
          prompt: "Convert 47 uF to farads.",
          answer: 0.000047,
          tolerance: 0.0000005,
          units: "F"
        }
      }
    ]
  },
  {
    id: 11,
    title: "Inductors",
    subtitle: "Magnetic energy, RL transients, and current continuity",
    printedPages: "455-498",
    sections: [
      "11.1 Introduction",
      "11.2 Magnetic field",
      "11.3 Inductance",
      "11.4 Induced voltage",
      "11.5 RL transients: storage",
      "11.6 Initial conditions",
      "11.7 RL transients: release",
      "11.8 Thevenin equivalent and tau = L/Rth",
      "11.9 Instantaneous values",
      "11.10 Average induced voltage",
      "11.11 Series/parallel inductors",
      "11.12 Steady state",
      "11.13 Energy stored",
      "11.14 Applications"
    ],
    whyItMatters:
      "Inductors are key in AC behavior and filters. Learning RL timing gives you control over current ramps, stored energy, and switching response.",
    keyIdeas: [
      "Inductors oppose sudden current change.",
      "Inductor current cannot jump instantly.",
      "RL transient speed is tau = L/Rth.",
      "In DC steady state, ideal inductor behaves like a short.",
      "Inductor energy is magnetic: 0.5*L*I^2.",
      "vL depends on current slope: L*di/dt."
    ],
    pitfalls: [
      "Using wrong sign for inductor voltage.",
      "Ignoring initial current at t=0+.",
      "Using source resistance instead of Rth seen by L.",
      "Mixing mH and H."
    ],
    workflow: [
      "Find iL(0-) and carry it to iL(0+).",
      "Find Rth seen by inductor and compute tau.",
      "Write iL(t) with initial/final values.",
      "Compute vL via L*di/dt or loop equations.",
      "Check long-time behavior."
    ],
    equations: [
      {
        id: "vl",
        label: "Inductor law",
        expression: "vL = L*(di/dt)",
        whenToUse: "Voltage from current slope.",
        memoryTip: "Slope drives inductor voltage.",
        variables: ["vL", "L", "di/dt"]
      },
      {
        id: "tau_rl",
        label: "RL time constant",
        expression: "tau = L/Rth",
        whenToUse: "Transient speed for RL circuits.",
        memoryTip: "Big L slows, big R speeds.",
        variables: ["tau", "L", "Rth"]
      },
      {
        id: "il_general",
        label: "General RL current",
        expression: "iL(t) = If + (Ii-If)*e^(-t/tau)",
        whenToUse: "Any first-order RL with known endpoints.",
        memoryTip: "Start at Ii, move to If.",
        variables: ["Ii", "If", "tau", "t"]
      },
      {
        id: "il_decay",
        label: "Release current",
        expression: "iL(t) = I0*e^(-t/tau)",
        whenToUse: "Current decay after source removal.",
        memoryTip: "Starts at I0 and decays.",
        variables: ["I0", "tau", "t"]
      },
      {
        id: "wl",
        label: "Energy in inductor",
        expression: "WL = 0.5*L*I^2",
        whenToUse: "Stored magnetic energy.",
        memoryTip: "Half L I squared.",
        variables: ["WL", "L", "I"]
      }
    ],
    flashcards: [
      {
        front: "Can inductor current jump instantly?",
        back: "No. It is continuous through switching.",
        tag: "Core"
      },
      {
        front: "RL time constant",
        back: "tau = L/Rth",
        tag: "Equation"
      },
      {
        front: "Inductor voltage law",
        back: "vL = L*di/dt",
        tag: "Equation"
      },
      {
        front: "Steady-state DC model of ideal inductor",
        back: "Short circuit.",
        tag: "Steady state"
      }
    ],
    quiz: [
      {
        question: "Inductor mainly opposes sudden change in:",
        options: ["Voltage", "Current", "Resistance", "Power"],
        answerIndex: 1,
        explanation: "That is the defining behavior of inductance."
      },
      {
        question: "If L doubles with same R, tau:",
        options: ["Halves", "Doubles", "No change", "Becomes zero"],
        answerIndex: 1,
        explanation: "Tau is proportional to L."
      },
      {
        question: "At t=0+, iL equals:",
        options: ["0 always", "iL(0-)", "Infinity", "E/R"],
        answerIndex: 1,
        explanation: "Current continuity at switching."
      },
      {
        question: "Energy in inductor depends on:",
        options: ["L and I", "R only", "f only", "phase only"],
        answerIndex: 0,
        explanation: "WL = 0.5*L*I^2."
      }
    ],
    fillBlanks: [
      {
        prompt: "RL time constant: tau = L / ____",
        answers: ["R", "Rth", "r", "rth"],
        hint: "Equivalent resistance seen by L.",
        explanation: "Same first-order idea as RC, with L in numerator."
      },
      {
        prompt: "Inductor law: vL = L*d____/dt",
        answers: ["i", "current"],
        hint: "Current is the state variable for L.",
        explanation: "Voltage tracks the slope of current."
      },
      {
        prompt: "Energy formula: W = 0.5*L*____^2",
        answers: ["I", "i", "current"],
        hint: "Current term.",
        explanation: "Stored magnetic energy scales with current squared."
      }
    ],
    equationChallenges: [
      {
        scenario: "Given current waveform, find inductor voltage.",
        options: ["vl", "tau_rl", "il_decay", "wl"],
        correctId: "vl",
        explanation: "Differentiate current and multiply by L."
      },
      {
        scenario: "Need decay current after switch opens.",
        options: ["il_decay", "il_general", "vl", "wl"],
        correctId: "il_decay",
        explanation: "Release phase current is pure exponential decay from I0."
      },
      {
        scenario: "Need transition speed in an RL network.",
        options: ["tau_rl", "wl", "vl", "il_general"],
        correctId: "tau_rl",
        explanation: "Tau determines how fast current moves toward final value."
      }
    ],
    calculatorDrills: [
      {
        title: "Finite-slope voltage estimate",
        goal: "Approximate vL using delta i / delta t.",
        steps: [
          "Compute delta i from two current points.",
          "Compute delta t.",
          "Use vL approx L*(delta i/delta t).",
          "Check sign from rise or fall direction."
        ],
        check: "Rising current gives positive vL under passive sign convention.",
        challenge: {
          prompt: "L=0.2 H, i changes 0.5 A in 0.02 s. Find vL.",
          answer: 5,
          tolerance: 0.1,
          units: "V"
        }
      },
      {
        title: "Exponential current check",
        goal: "Compute iL quickly at specific times.",
        steps: [
          "Enter I0 and tau as variables.",
          "Evaluate I0*exp(-t/tau).",
          "Check at t=tau for about 36.8%.",
          "Use same method for multiple times in a table."
        ],
        check: "At one tau, value should be near 0.368*I0.",
        challenge: {
          prompt: "If I0=3 A, estimate i at t=tau.",
          answer: 1.104,
          tolerance: 0.05,
          units: "A"
        }
      }
    ]
  },
  {
    id: 13,
    title: "Sinusoidal Alternating Waveforms",
    subtitle: "Frequency, phase, RMS, and waveform interpretation",
    printedPages: "525-574",
    sections: [
      "13.1 Introduction",
      "13.2 Sinusoidal AC definitions",
      "13.3 Frequency spectrum",
      "13.4 The sinusoidal waveform",
      "13.5 General waveform format",
      "13.6 Phase relations",
      "13.7 Average value",
      "13.8 Effective (RMS) values",
      "13.9 Converters and inverters",
      "13.10 AC meters and instruments",
      "13.11 Applications"
    ],
    whyItMatters:
      "AC circuits are built on waveform literacy. Knowing frequency, phase, and RMS keeps later impedance and power problems straightforward.",
    keyIdeas: [
      "Frequency and period are inverses: f=1/T.",
      "Angular frequency is omega=2*pi*f.",
      "General sine is x(t)=Xm*sin(omega*t+theta).",
      "Phase shift tells lead/lag timing.",
      "Full-cycle sine average is zero.",
      "RMS maps AC to equivalent DC heating effect."
    ],
    pitfalls: [
      "Using radians when calculator is in degree mode, or vice versa.",
      "Mixing peak and RMS values in the same equation.",
      "Confusing positive phase shift with lagging.",
      "Using average instead of RMS for power work."
    ],
    workflow: [
      "Read given waveform constants (Xm, f or omega, theta).",
      "Convert between f, T, omega if needed.",
      "Use omega*t+theta for instantaneous value.",
      "Convert peak to RMS when required.",
      "Check signs and units."
    ],
    equations: [
      {
        id: "f_t",
        label: "Frequency-period relation",
        expression: "f = 1/T",
        whenToUse: "Move between period and frequency.",
        memoryTip: "Shorter period means higher frequency.",
        variables: ["f", "T"]
      },
      {
        id: "omega",
        label: "Angular frequency",
        expression: "omega = 2*pi*f",
        whenToUse: "Build time-domain sine expressions.",
        memoryTip: "2*pi radians per cycle.",
        variables: ["omega", "f"]
      },
      {
        id: "sin_general",
        label: "General sinusoid",
        expression: "x(t) = Xm*sin(omega*t + theta)",
        whenToUse: "Represent AC voltage/current over time.",
        memoryTip: "Amplitude times sine of angle.",
        variables: ["x", "Xm", "omega", "t", "theta"]
      },
      {
        id: "xrms",
        label: "RMS for a sine",
        expression: "Xrms = Xm/sqrt(2)",
        whenToUse: "Peak-to-RMS conversion.",
        memoryTip: "0.707 times peak.",
        variables: ["Xrms", "Xm"]
      },
      {
        id: "xavg_half",
        label: "Average (rectified half-cycle)",
        expression: "Xavg = 0.637*Xm",
        whenToUse: "Average over a positive half-cycle (or full-wave rectified).",
        memoryTip: "0.637 of peak.",
        variables: ["Xavg", "Xm"]
      }
    ],
    flashcards: [
      {
        front: "General sine-wave formula",
        back: "x(t)=Xm*sin(omega*t+theta)",
        tag: "Equation"
      },
      {
        front: "How are f and T related?",
        back: "f=1/T and T=1/f",
        tag: "Definition"
      },
      {
        front: "RMS of a pure sine in terms of peak",
        back: "Xrms=Xm/sqrt(2)",
        tag: "RMS"
      },
      {
        front: "Average over one full pure sine cycle",
        back: "Zero",
        tag: "Average"
      }
    ],
    quiz: [
      {
        question: "If f=50 Hz, what is T?",
        options: ["0.2 s", "0.02 s", "2 s", "20 s"],
        answerIndex: 1,
        explanation: "T=1/50=0.02 s."
      },
      {
        question: "If peak voltage is 170 V, RMS is about:",
        options: ["120 V", "170 V", "85 V", "240 V"],
        answerIndex: 0,
        explanation: "170/sqrt(2) is about 120."
      },
      {
        question: "Which equation is correct?",
        options: ["omega=pi*f", "omega=2*pi*f", "omega=f/(2*pi)", "omega=T*f"],
        answerIndex: 1,
        explanation: "One cycle spans 2*pi radians."
      },
      {
        question: "A wave leading by +30 deg appears in time as:",
        options: ["Later", "Earlier", "No shift", "Half-cycle delay"],
        answerIndex: 1,
        explanation: "Leading wave is shifted left, so it happens earlier."
      }
    ],
    fillBlanks: [
      {
        prompt: "Frequency relation: f = 1/____",
        answers: ["T", "t", "period"],
        hint: "One-cycle time.",
        explanation: "Frequency is cycles per second."
      },
      {
        prompt: "Angular frequency: omega = 2*pi*____",
        answers: ["f", "frequency"],
        hint: "In hertz.",
        explanation: "Convert cycles per second to radians per second."
      },
      {
        prompt: "RMS conversion: Xrms = Xm / ____",
        answers: ["sqrt(2)", "1.414", "root2"],
        hint: "About 1.414.",
        explanation: "Standard sine-wave RMS factor."
      }
    ],
    equationChallenges: [
      {
        scenario: "Given T, need f.",
        options: ["f_t", "omega", "xrms", "sin_general"],
        correctId: "f_t",
        explanation: "Use inverse relation directly."
      },
      {
        scenario: "Given f, need omega for time-domain equation.",
        options: ["omega", "f_t", "xavg_half", "xrms"],
        correctId: "omega",
        explanation: "Multiply frequency by 2*pi."
      },
      {
        scenario: "Need equivalent DC heating value from peak current.",
        options: ["xrms", "sin_general", "omega", "f_t"],
        correctId: "xrms",
        explanation: "Use RMS conversion for power-equivalent value."
      }
    ],
    calculatorDrills: [
      {
        title: "Angle mode discipline",
        goal: "Prevent wrong trig outputs on TI-Nspire.",
        steps: [
          "Set Degree mode for degree-based phase values.",
          "Set Radian mode for omega*t expressions in radians.",
          "Confirm with a known value like sin(30 deg)=0.5.",
          "Write mode choice in your solution notes."
        ],
        check: "Wrong mode is a top source of AC errors.",
        challenge: {
          prompt: "Compute sin(30 deg).",
          answer: 0.5,
          tolerance: 0.001
        }
      },
      {
        title: "Peak-RMS conversion routine",
        goal: "Switch fast between peak and RMS.",
        steps: [
          "Define Xrms:=Xm/sqrt(2).",
          "Define Xm:=Xrms*sqrt(2).",
          "Evaluate with voltage and current values.",
          "Use RMS values for power equations."
        ],
        check: "170 V peak should map to about 120 V RMS.",
        challenge: {
          prompt: "RMS of 28.3 A peak is about:",
          answer: 20,
          tolerance: 0.05,
          units: "A"
        }
      }
    ]
  },
  {
    id: 14,
    title: "The Basic Elements and Phasors",
    subtitle: "R, L, C response with complex-number AC analysis",
    printedPages: "575-620",
    sections: [
      "14.1 Introduction",
      "14.2 R/L/C response to sinusoidal input",
      "14.3 Frequency response of basic elements",
      "14.4 Average power and power factor",
      "14.5 Complex numbers",
      "14.6 Rectangular form",
      "14.7 Polar form",
      "14.8 Conversion between forms",
      "14.9 Complex arithmetic",
      "14.10 Calculator methods",
      "14.11 Phasors"
    ],
    whyItMatters:
      "This chapter is the launch point for practical AC solving. Once you are fluent in phasors and complex numbers, large circuit problems become manageable.",
    keyIdeas: [
      "Resistor current and voltage are in phase.",
      "Inductor current lags voltage by 90 deg.",
      "Capacitor current leads voltage by 90 deg.",
      "XL rises with frequency, XC falls with frequency.",
      "Complex form keeps magnitude and angle together.",
      "Real power depends on RMS values and cos(theta)."
    ],
    pitfalls: [
      "Dropping j signs when moving between forms.",
      "Adding polar values directly when rectangular is needed.",
      "Using peak values in real-power formulas.",
      "Confusing lagging with leading sign."
    ],
    workflow: [
      "Compute XL and XC at the given frequency.",
      "Represent quantities in rectangular/polar form.",
      "Use rectangular for +/-, polar for */.",
      "Convert back for interpretation.",
      "Check PF and power for physical reasonableness."
    ],
    equations: [
      {
        id: "xl",
        label: "Inductive reactance",
        expression: "XL = 2*pi*f*L",
        whenToUse: "Find inductor AC opposition.",
        memoryTip: "Higher f means bigger XL.",
        variables: ["XL", "f", "L"]
      },
      {
        id: "xc",
        label: "Capacitive reactance",
        expression: "XC = 1/(2*pi*f*C)",
        whenToUse: "Find capacitor AC opposition.",
        memoryTip: "Higher f means smaller XC.",
        variables: ["XC", "f", "C"]
      },
      {
        id: "p_real",
        label: "Real power",
        expression: "P = Vrms*Irms*cos(theta)",
        whenToUse: "Compute true watts.",
        memoryTip: "RMS and PF together.",
        variables: ["P", "Vrms", "Irms", "theta"]
      },
      {
        id: "pf",
        label: "Power factor",
        expression: "PF = cos(theta)",
        whenToUse: "Convert phase angle to efficiency-like metric.",
        memoryTip: "Theta close to zero means PF close to one.",
        variables: ["PF", "theta"]
      },
      {
        id: "rect_to_polar",
        label: "Rectangular to polar",
        expression: "|Z|=sqrt(X^2+Y^2), angle=atan2(Y,X)",
        whenToUse: "Convert X+jY to magnitude-angle.",
        memoryTip: "Pythagorean plus atan2.",
        variables: ["X", "Y", "|Z|", "angle"]
      }
    ],
    flashcards: [
      {
        front: "In pure inductor, current is ____ voltage by 90 deg.",
        back: "Lagging",
        tag: "Phase"
      },
      {
        front: "In pure capacitor, current is ____ voltage by 90 deg.",
        back: "Leading",
        tag: "Phase"
      },
      {
        front: "Reactance trend for XL with frequency",
        back: "XL increases as frequency increases.",
        tag: "Reactance"
      },
      {
        front: "Reactance trend for XC with frequency",
        back: "XC decreases as frequency increases.",
        tag: "Reactance"
      }
    ],
    quiz: [
      {
        question: "If frequency rises, XL does what?",
        options: ["Drops", "Rises", "No change", "Becomes zero"],
        answerIndex: 1,
        explanation: "XL=2*pi*f*L grows with f."
      },
      {
        question: "If frequency rises, XC does what?",
        options: ["Rises", "Drops", "No change", "Equals R"],
        answerIndex: 1,
        explanation: "XC is inverse with frequency."
      },
      {
        question: "Real AC power is:",
        options: ["VI", "VI*sin(theta)", "VI*cos(theta)", "I^2*X"],
        answerIndex: 2,
        explanation: "Use RMS values with cosine of phase angle."
      },
      {
        question: "Best form for complex addition is usually:",
        options: ["Polar", "Rectangular", "Either with no difference", "Exponential only"],
        answerIndex: 1,
        explanation: "Rectangular keeps real and imaginary parts separate for +/-."
      }
    ],
    fillBlanks: [
      {
        prompt: "Inductive reactance: XL = 2*pi*f*____",
        answers: ["L", "inductance"],
        hint: "Inductor value in henries.",
        explanation: "Reactance grows with both f and L."
      },
      {
        prompt: "Capacitive reactance: XC = 1/(2*pi*f*____)",
        answers: ["C", "capacitance"],
        hint: "Capacitor value in farads.",
        explanation: "Larger C means lower XC."
      },
      {
        prompt: "Power factor: PF = cos(____)",
        answers: ["theta", "phase", "angle"],
        hint: "V-I phase angle.",
        explanation: "PF captures phase impact on real power."
      }
    ],
    equationChallenges: [
      {
        scenario: "Need inductor reactance from f and L.",
        options: ["xl", "xc", "pf", "p_real"],
        correctId: "xl",
        explanation: "Use XL equation directly."
      },
      {
        scenario: "Need capacitor reactance from f and C.",
        options: ["xc", "xl", "p_real", "pf"],
        correctId: "xc",
        explanation: "Inverse frequency-capacitance relation."
      },
      {
        scenario: "Need true watts from Vrms, Irms, theta.",
        options: ["p_real", "pf", "rect_to_polar", "xl"],
        correctId: "p_real",
        explanation: "Real power uses cosine term."
      }
    ],
    calculatorDrills: [
      {
        title: "Complex-number mode basics",
        goal: "Use TI-Nspire for phasor arithmetic.",
        steps: [
          "Enter complex values as a+bi.",
          "Use abs(z) for magnitude and arg(z) for angle.",
          "Use parentheses aggressively in multi-step expressions.",
          "Keep angle mode consistent for arg outputs."
        ],
        check: "abs(3+4i) should return 5.",
        challenge: {
          prompt: "Find abs(5+12i).",
          answer: 13,
          tolerance: 0.001
        }
      },
      {
        title: "PF sanity routine",
        goal: "Quickly check if PF answer is realistic.",
        steps: [
          "Compute PF = cos(theta).",
          "Confirm PF magnitude is between 0 and 1.",
          "If theta near 0, PF should be near 1.",
          "If theta near 90 deg, PF should be near 0."
        ],
        check: "PF outside [0,1] (by magnitude) flags a mistake.",
        challenge: {
          prompt: "Compute PF for theta=36.87 deg.",
          answer: 0.8,
          tolerance: 0.01
        }
      }
    ]
  },
  {
    id: 15,
    title: "Series AC Circuits",
    subtitle: "Impedance addition, divider rules, and phase in series networks",
    printedPages: "621-664",
    sections: [
      "15.1 Introduction",
      "15.2 Resistive elements",
      "15.3 Inductive elements",
      "15.4 Capacitive elements",
      "15.5 Impedance diagram",
      "15.6 Series configuration",
      "15.7 Voltage divider rule",
      "15.8 Frequency response",
      "15.9 Summary",
      "15.10 Phase measurements",
      "15.11 Applications"
    ],
    whyItMatters:
      "Series AC analysis appears everywhere in labs and homework. Mastering total impedance and phase lets you solve quickly and correctly.",
    keyIdeas: [
      "Series impedances add as complex values.",
      "Current is same through all series elements.",
      "Net reactance is XL-XC.",
      "ZT angle sets lead/lag and power factor.",
      "Use AC voltage divider with impedances.",
      "Frequency changes shift phase and magnitude."
    ],
    pitfalls: [
      "Adding only impedance magnitudes.",
      "Forgetting capacitor sign (-jXC).",
      "Using DC divider formula without impedances.",
      "Dropping phasor angles in intermediate steps."
    ],
    workflow: [
      "Compute XL and XC for the operating frequency.",
      "Build ZT=R+j(XL-XC).",
      "Find I=E/ZT.",
      "Find element voltages with Vx=I*Zx or divider form.",
      "Check PF and phase direction."
    ],
    equations: [
      {
        id: "zt_series",
        label: "Series RLC impedance",
        expression: "ZT = R + j(XL-XC)",
        whenToUse: "Total impedance for series branch.",
        memoryTip: "L positive j, C negative j.",
        variables: ["ZT", "R", "XL", "XC"]
      },
      {
        id: "zmag_series",
        label: "Impedance magnitude",
        expression: "|ZT| = sqrt(R^2 + (XL-XC)^2)",
        whenToUse: "Current magnitude from source voltage.",
        memoryTip: "Impedance triangle hypotenuse.",
        variables: ["|ZT|", "R", "XL", "XC"]
      },
      {
        id: "theta_series",
        label: "Phase angle",
        expression: "theta = atan((XL-XC)/R)",
        whenToUse: "Determine lead/lag and PF.",
        memoryTip: "Reactance over resistance.",
        variables: ["theta", "XL", "XC", "R"]
      },
      {
        id: "i_series",
        label: "Series current",
        expression: "I = E/ZT",
        whenToUse: "Source current in series circuit.",
        memoryTip: "One current path for all elements.",
        variables: ["I", "E", "ZT"]
      },
      {
        id: "vdivider_ac",
        label: "AC voltage divider",
        expression: "Vx = E*(Zx/ZT)",
        whenToUse: "Voltage across one element/group.",
        memoryTip: "Same divider idea, with impedance.",
        variables: ["Vx", "E", "Zx", "ZT"]
      }
    ],
    flashcards: [
      {
        front: "Series AC: what stays the same in every element?",
        back: "Current",
        tag: "Core"
      },
      {
        front: "Total series RLC impedance form",
        back: "ZT=R+j(XL-XC)",
        tag: "Equation"
      },
      {
        front: "If XL>XC, overall circuit is:",
        back: "Inductive (current lags voltage)",
        tag: "Phase"
      },
      {
        front: "Voltage divider in AC uses:",
        back: "Impedance ratios, not pure resistance ratios",
        tag: "Method"
      }
    ],
    quiz: [
      {
        question: "In series AC, total impedance is found by:",
        options: ["Adding magnitudes", "Adding complex impedances", "Multiplying impedances", "Averaging reactances"],
        answerIndex: 1,
        explanation: "Series values add directly in complex form."
      },
      {
        question: "Capacitive reactance contributes what sign in Z?",
        options: ["+jXC", "-jXC", "+XC real", "No contribution"],
        answerIndex: 1,
        explanation: "Capacitor reactance is negative imaginary."
      },
      {
        question: "Formula for source current in series AC:",
        options: ["I=E*ZT", "I=E/ZT", "I=ZT/E", "I=E/(R+XL+XC)"],
        answerIndex: 1,
        explanation: "Phasor Ohm's law."
      },
      {
        question: "Voltage across one element in series AC is best found with:",
        options: ["DC resistor divider only", "Vx=E*(Zx/ZT)", "Vx=E*(R/ZT)", "No divider works"],
        answerIndex: 1,
        explanation: "Use impedance divider for AC."
      }
    ],
    fillBlanks: [
      {
        prompt: "Series net reactance term is (____ - ____)",
        answers: ["XL-XC", "xl-xc", "xL-xC"],
        hint: "Inductive minus capacitive.",
        explanation: "This determines inductive vs capacitive net behavior."
      },
      {
        prompt: "Source current formula: I = E / ____",
        answers: ["ZT", "zt", "z"],
        hint: "Total impedance.",
        explanation: "Single series path current uses full Z."
      },
      {
        prompt: "AC divider: Vx = E*(____/ZT)",
        answers: ["Zx", "zx", "z"],
        hint: "Target element impedance.",
        explanation: "The same structure as divider, with complex quantities."
      }
    ],
    equationChallenges: [
      {
        scenario: "Need full complex impedance of series RLC.",
        options: ["zt_series", "i_series", "vdivider_ac", "theta_series"],
        correctId: "zt_series",
        explanation: "Always build Z first before current and voltages."
      },
      {
        scenario: "Need source current after Z is known.",
        options: ["i_series", "zmag_series", "vdivider_ac", "theta_series"],
        correctId: "i_series",
        explanation: "Use I=E/Z."
      },
      {
        scenario: "Need voltage across a single element from source E.",
        options: ["vdivider_ac", "zt_series", "i_series", "zmag_series"],
        correctId: "vdivider_ac",
        explanation: "Divider in impedance form gives branch drop."
      }
    ],
    calculatorDrills: [
      {
        title: "Complex impedance to current",
        goal: "Compute I from E and Z with angle intact.",
        steps: [
          "Enter Z as complex number.",
          "Enter E as phasor in complex form.",
          "Compute I=E/Z.",
          "Use abs(I), arg(I) for magnitude and phase."
        ],
        check: "If E angle is 0, I angle should be negative of Z angle.",
        challenge: {
          prompt: "If E=120 and Z=6+j8, find |I|.",
          answer: 12,
          tolerance: 0.05,
          units: "A"
        }
      },
      {
        title: "Impedance-triangle quick check",
        goal: "Validate Z calculations before moving on.",
        steps: [
          "Compute net X = XL-XC.",
          "Compute |Z| with sqrt(R^2+X^2).",
          "Compute theta with atan(X/R).",
          "Cross-check against abs() and arg() on complex Z."
        ],
        check: "Manual and calculator results should agree closely.",
        challenge: {
          prompt: "R=8, XL=14, XC=6. Find |Z|.",
          answer: 11.314,
          tolerance: 0.05,
          units: "ohm"
        }
      }
    ]
  },
  {
    id: 16,
    title: "Parallel AC Circuits",
    subtitle: "Admittance, current division, and branch behavior",
    printedPages: "665-704",
    sections: [
      "16.1 Introduction",
      "16.2 Total impedance",
      "16.3 Total admittance",
      "16.4 Parallel AC networks",
      "16.5 Current divider rule",
      "16.6 Frequency response",
      "16.7 Summary",
      "16.8 Equivalent circuits",
      "16.9 Applications"
    ],
    whyItMatters:
      "Parallel AC networks are easier with admittance methods. This chapter reduces heavy algebra and makes branch-current analysis much cleaner.",
    keyIdeas: [
      "Voltage is common to all parallel branches.",
      "Branch currents add phasorially.",
      "Admittances add directly: YT=sum(Yk).",
      "ZT is reciprocal of YT.",
      "Current divider works with complex impedances.",
      "Net current lead/lag sets circuit character."
    ],
    pitfalls: [
      "Adding impedances directly in parallel.",
      "Ignoring branch-current phase angles.",
      "Mixing signs of inductive/capacitive susceptance.",
      "Forgetting reciprocal step from Y to Z."
    ],
    workflow: [
      "Convert branches to Y or Z (Y preferred).",
      "Add total Y.",
      "Find source current with I=E*YT.",
      "Find branch currents with Ibranch=E*Ybranch.",
      "Invert Y if equivalent Z is needed."
    ],
    equations: [
      {
        id: "yt_sum",
        label: "Total admittance",
        expression: "YT = Y1+Y2+...+Yn",
        whenToUse: "Combine parallel branches.",
        memoryTip: "Parallel likes Y addition.",
        variables: ["YT", "Y1..Yn"]
      },
      {
        id: "zt_from_y",
        label: "Equivalent impedance",
        expression: "ZT = 1/YT",
        whenToUse: "Convert summed admittance back to impedance.",
        memoryTip: "Z and Y are reciprocals.",
        variables: ["ZT", "YT"]
      },
      {
        id: "i_from_y",
        label: "Source current",
        expression: "I = E*YT",
        whenToUse: "Find total current in parallel AC.",
        memoryTip: "Ohm's law in Y form.",
        variables: ["I", "E", "YT"]
      },
      {
        id: "cdivider",
        label: "Two-branch current divider",
        expression: "I1 = IT*(Z2/(Z1+Z2))",
        whenToUse: "Split current between two branches.",
        memoryTip: "Use opposite branch impedance.",
        variables: ["I1", "IT", "Z1", "Z2"]
      },
      {
        id: "pf_parallel",
        label: "Power factor",
        expression: "PF = cos(theta)",
        whenToUse: "Source V-I phase relation.",
        memoryTip: "Use total source angle.",
        variables: ["PF", "theta"]
      }
    ],
    flashcards: [
      {
        front: "In parallel circuits, what is common?",
        back: "Voltage",
        tag: "Core"
      },
      {
        front: "Best quantity to add in parallel AC",
        back: "Admittance",
        tag: "Method"
      },
      {
        front: "Equivalent impedance from total admittance",
        back: "ZT=1/YT",
        tag: "Equation"
      },
      {
        front: "Source current relation in admittance form",
        back: "I=E*YT",
        tag: "Equation"
      }
    ],
    quiz: [
      {
        question: "In parallel AC, easiest sum is usually:",
        options: ["R", "X", "Y", "I"],
        answerIndex: 2,
        explanation: "Admittance adds directly in parallel."
      },
      {
        question: "If you know YT, equivalent ZT is:",
        options: ["YT", "1/YT", "YT^2", "YT/2"],
        answerIndex: 1,
        explanation: "Reciprocal relation."
      },
      {
        question: "Branch currents combine by:",
        options: ["Scalar addition only", "Phasor addition", "Multiplication", "Subtraction only"],
        answerIndex: 1,
        explanation: "Angles matter, so use phasors."
      },
      {
        question: "Current divider numerator uses:",
        options: ["Same branch Z", "Opposite branch Z", "Sum of all Y only", "No impedance"],
        answerIndex: 1,
        explanation: "Classic opposite-branch form."
      }
    ],
    fillBlanks: [
      {
        prompt: "Parallel sum equation: YT = Y1 + Y2 + ... + ____",
        answers: ["Yn", "yn", "last branch"],
        hint: "All branch admittances.",
        explanation: "This is the core method for chapter 16."
      },
      {
        prompt: "Equivalent impedance: ZT = ____/YT",
        answers: ["1", "one"],
        hint: "Reciprocal relation.",
        explanation: "Z is inverse of Y."
      },
      {
        prompt: "Source current: I = E*____",
        answers: ["YT", "yt"],
        hint: "Total admittance.",
        explanation: "Parallel Ohm's-law form."
      }
    ],
    equationChallenges: [
      {
        scenario: "Need to combine three parallel branches quickly.",
        options: ["yt_sum", "zt_from_y", "cdivider", "pf_parallel"],
        correctId: "yt_sum",
        explanation: "Add branch admittances."
      },
      {
        scenario: "Need equivalent impedance after finding YT.",
        options: ["zt_from_y", "yt_sum", "i_from_y", "cdivider"],
        correctId: "zt_from_y",
        explanation: "Take reciprocal of YT."
      },
      {
        scenario: "Need total source current from E and YT.",
        options: ["i_from_y", "yt_sum", "pf_parallel", "zt_from_y"],
        correctId: "i_from_y",
        explanation: "I equals E times YT."
      }
    ],
    calculatorDrills: [
      {
        title: "Admittance-first method",
        goal: "Cut algebra errors in parallel networks.",
        steps: [
          "Convert each branch impedance to Y=1/Z.",
          "Add all branch Y values.",
          "Compute I=E*YT.",
          "Compute ZT=1/YT only if requested."
        ],
        check: "This method is usually faster and cleaner than repeated reciprocal sums.",
        challenge: {
          prompt: "Y1=0.1-j0.2, Y2=0.05+j0.1. Real part of YT?",
          answer: 0.15,
          tolerance: 0.001,
          units: "S"
        }
      },
      {
        title: "KCL phasor verification",
        goal: "Validate branch currents against source current.",
        steps: [
          "Compute each branch current as E*Ybranch.",
          "Add branch currents as complex numbers.",
          "Compare with source current from E*YT.",
          "If mismatch, check angle signs first."
        ],
        check: "KCL in phasor form is the fastest error detector.",
        challenge: {
          prompt: "If I1=3+j4 A and I2=1-j2 A, magnitude of IT?",
          answer: 4.472,
          tolerance: 0.02,
          units: "A"
        }
      }
    ]
  },
  {
    id: 17,
    title: "Series-Parallel AC Networks",
    subtitle: "Mixed-network reduction, ladder solving, and grounding",
    printedPages: "705-726",
    sections: [
      "17.1 Introduction",
      "17.2 Illustrative examples",
      "17.3 Ladder networks",
      "17.4 Grounding",
      "17.5 Applications"
    ],
    whyItMatters:
      "Most practical circuits are mixed topologies. This chapter gives the step-by-step reduction process needed for real-world AC problems.",
    keyIdeas: [
      "Solve mixed networks by reducing one block at a time.",
      "Use series and parallel equivalents repeatedly.",
      "Keep phasor angle information at every step.",
      "Ladder networks are easiest from far end inward.",
      "Grounding sets reference and improves safety.",
      "Always verify with KCL/KVL or power checks."
    ],
    pitfalls: [
      "Reducing branches in a messy order.",
      "Dropping phase angles during intermediate steps.",
      "Forgetting reference node when reporting voltages.",
      "Skipping final consistency checks."
    ],
    workflow: [
      "Define target unknowns and source phasor.",
      "Reduce deepest series/parallel blocks first.",
      "Solve total current/voltage at source level.",
      "Back-solve branch values step by step.",
      "Run at least one independent check."
    ],
    equations: [
      {
        id: "z_series_add",
        label: "Series equivalent",
        expression: "Zeq = Z1+Z2+...",
        whenToUse: "Combine series impedances.",
        memoryTip: "Direct complex sum.",
        variables: ["Zeq", "Z1..Zn"]
      },
      {
        id: "z_parallel_two",
        label: "Two-branch parallel equivalent",
        expression: "Zeq = (Z1*Z2)/(Z1+Z2)",
        whenToUse: "Combine two parallel branches.",
        memoryTip: "Product over sum.",
        variables: ["Zeq", "Z1", "Z2"]
      },
      {
        id: "ohm_phasor",
        label: "Phasor Ohm's law",
        expression: "V = I*Z",
        whenToUse: "Find branch voltage/current.",
        memoryTip: "Same law, complex quantities.",
        variables: ["V", "I", "Z"]
      },
      {
        id: "p_general",
        label: "Real power",
        expression: "P = Vrms*Irms*cos(theta)",
        whenToUse: "Source or total real power in mixed AC circuits.",
        memoryTip: "RMS with phase cosine.",
        variables: ["P", "Vrms", "Irms", "theta"]
      },
      {
        id: "pf_general",
        label: "Power factor",
        expression: "PF = cos(theta)",
        whenToUse: "Net leading/lagging characterization.",
        memoryTip: "Source angle tells PF.",
        variables: ["PF", "theta"]
      }
    ],
    flashcards: [
      {
        front: "Best approach for mixed AC topology",
        back: "Stepwise reduction",
        tag: "Method"
      },
      {
        front: "Two-branch parallel equivalent",
        back: "Zeq=(Z1*Z2)/(Z1+Z2)",
        tag: "Equation"
      },
      {
        front: "Phasor Ohm's law",
        back: "V=I*Z",
        tag: "Equation"
      },
      {
        front: "Why grounding matters",
        back: "Reference consistency and safety",
        tag: "Practical"
      }
    ],
    quiz: [
      {
        question: "For mixed AC networks, strongest solving strategy is:",
        options: ["Solve all at once", "Stepwise reduction", "Ignore angles", "Use magnitudes only"],
        answerIndex: 1,
        explanation: "Systematic reduction keeps errors low."
      },
      {
        question: "Parallel equivalent for two impedances is:",
        options: ["Z1+Z2", "Z1*Z2/(Z1+Z2)", "(Z1+Z2)/2", "Z1/Z2"],
        answerIndex: 1,
        explanation: "Use product-over-sum with complex numbers."
      },
      {
        question: "After solving, best validation is:",
        options: ["No check needed", "Only one branch check", "KCL/KVL and power consistency", "Round everything"],
        answerIndex: 2,
        explanation: "Independent checks catch hidden mistakes."
      },
      {
        question: "Ground node is primarily:",
        options: ["Decoration", "Reference potential", "Always current source", "Always zero current"],
        answerIndex: 1,
        explanation: "Ground provides voltage reference and safety context."
      }
    ],
    fillBlanks: [
      {
        prompt: "Series combine rule: Zeq = Z1 + Z2 + ____",
        answers: ["...", "more terms", "zn"],
        hint: "All series elements add.",
        explanation: "Series path means direct complex sum."
      },
      {
        prompt: "Two-branch parallel equivalent denominator is: ____",
        answers: ["Z1+Z2", "z1+z2"],
        hint: "Product over this sum.",
        explanation: "Classic two-branch parallel formula."
      },
      {
        prompt: "Phasor Ohm's law: V = I * ____",
        answers: ["Z", "z", "impedance"],
        hint: "Complex opposition term.",
        explanation: "Use complex values for AC calculations."
      }
    ],
    equationChallenges: [
      {
        scenario: "Need equivalent of two parallel branches.",
        options: ["z_parallel_two", "z_series_add", "ohm_phasor", "pf_general"],
        correctId: "z_parallel_two",
        explanation: "Use product-over-sum."
      },
      {
        scenario: "Need voltage across a solved branch from current and impedance.",
        options: ["ohm_phasor", "z_parallel_two", "p_general", "pf_general"],
        correctId: "ohm_phasor",
        explanation: "Direct phasor Ohm's law."
      },
      {
        scenario: "Need total real power from Vrms, Irms, and phase.",
        options: ["p_general", "pf_general", "z_series_add", "ohm_phasor"],
        correctId: "p_general",
        explanation: "Use VIcos(theta)."
      }
    ],
    calculatorDrills: [
      {
        title: "Block naming for long reductions",
        goal: "Keep complex mixed-network algebra organized.",
        steps: [
          "Name intermediate blocks Z12, Z34, Zleft, Zright.",
          "Compute one block at a time.",
          "Avoid overwriting source values.",
          "Back-substitute carefully for branch values."
        ],
        check: "Clear variable names prevent major rework.",
        challenge: {
          prompt: "For Z1=4+j3 and Z2=6-j3 in parallel, estimate |Zeq|.",
          answer: 3.35,
          tolerance: 0.08,
          units: "ohm"
        }
      },
      {
        title: "Reference and check routine",
        goal: "Avoid sign/reference errors in final answers.",
        steps: [
          "Mark the ground/reference node before solving.",
          "Report each voltage with its reference.",
          "Run KCL or KVL in at least one location.",
          "Compare source power with sum of branch real powers."
        ],
        check: "Reference mistakes often look like random angle mistakes.",
        challenge: {
          prompt: "If branch currents are (2+j1) A and (1-j4) A, find |Itotal|.",
          answer: 3.162,
          tolerance: 0.02,
          units: "A"
        }
      }
    ]
  }
];

export const chapterById = Object.fromEntries(
  chapters.map((chapter) => [chapter.id, chapter])
) as Record<number, Chapter>;

export const chapterOrder = chapters.map((chapter) => chapter.id);
