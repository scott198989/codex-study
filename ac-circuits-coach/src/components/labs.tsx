"use client";

import { useMemo, useState } from "react";

type Complex = {
  re: number;
  im: number;
};

function complex(re: number, im: number): Complex {
  return { re, im };
}

function cAdd(a: Complex, b: Complex): Complex {
  return complex(a.re + b.re, a.im + b.im);
}

function cMul(a: Complex, b: Complex): Complex {
  return complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
}

function cDiv(a: Complex, b: Complex): Complex {
  const den = b.re * b.re + b.im * b.im;
  return complex(
    (a.re * b.re + a.im * b.im) / den,
    (a.im * b.re - a.re * b.im) / den
  );
}

function cMag(z: Complex): number {
  return Math.sqrt(z.re * z.re + z.im * z.im);
}

function cAngDeg(z: Complex): number {
  return (Math.atan2(z.im, z.re) * 180) / Math.PI;
}

function formatNum(value: number, digits = 3): string {
  return Number(value).toFixed(digits).replace(/\.?0+$/, "");
}

function toRect(z: Complex): string {
  const sign = z.im >= 0 ? "+" : "-";
  return `${formatNum(z.re)} ${sign} j${formatNum(Math.abs(z.im))}`;
}

function toPolar(z: Complex): string {
  return `${formatNum(cMag(z))} ∠ ${formatNum(cAngDeg(z), 2)}°`;
}

function buildLinePath(
  values: number[],
  maxX: number,
  maxY: number,
  width = 460,
  height = 210
): string {
  if (values.length < 2 || maxX <= 0 || maxY <= 0) {
    return "";
  }
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - (value / maxY) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  unit,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="lab-slider">
      <span>
        {label}: <strong>{formatNum(value, 4)}</strong> {unit}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function RcLab() {
  const [e, setE] = useState(12);
  const [r, setR] = useState(2200);
  const [cMicro, setCMicro] = useState(47);
  const [tMs, setTMs] = useState(40);

  const c = cMicro * 1e-6;
  const tau = r * c;
  const t = tMs / 1000;
  const decay = Math.exp(-t / tau);
  const vc = e * (1 - decay);
  const ic = (e / r) * decay;

  const { voltagePath, currentPath } = useMemo(() => {
    const sampleCount = 72;
    const maxTime = tau * 5;
    const voltages: number[] = [];
    const currents: number[] = [];
    for (let i = 0; i < sampleCount; i += 1) {
      const time = (i / (sampleCount - 1)) * maxTime;
      const d = Math.exp(-time / tau);
      voltages.push(e * (1 - d));
      currents.push((e / r) * d * 1000);
    }
    return {
      voltagePath: buildLinePath(voltages, maxTime, Math.max(e, 0.001)),
      currentPath: buildLinePath(currents, maxTime, Math.max((e / r) * 1000, 0.001)),
    };
  }, [e, r, tau]);

  return (
    <div className="lab-shell">
      <p className="lab-intro">
        RC charging lab. Move values and watch how time constant changes both
        voltage rise and current decay.
      </p>
      <div className="lab-grid">
        <Slider label="Source E" min={1} max={30} step={0.5} value={e} unit="V" onChange={setE} />
        <Slider
          label="Resistance R"
          min={100}
          max={12000}
          step={100}
          value={r}
          unit="ohm"
          onChange={setR}
        />
        <Slider
          label="Capacitance C"
          min={1}
          max={220}
          step={1}
          value={cMicro}
          unit="uF"
          onChange={setCMicro}
        />
        <Slider
          label="Probe time t"
          min={0}
          max={250}
          step={1}
          value={tMs}
          unit="ms"
          onChange={setTMs}
        />
      </div>
      <div className="lab-stats">
        <div>
          <span>tau</span>
          <strong>{formatNum(tau * 1000, 3)} ms</strong>
        </div>
        <div>
          <span>vc(t)</span>
          <strong>{formatNum(vc, 3)} V</strong>
        </div>
        <div>
          <span>ic(t)</span>
          <strong>{formatNum(ic * 1000, 3)} mA</strong>
        </div>
      </div>
      <div className="lab-chart-wrap">
        <div>
          <h4>Capacitor Voltage</h4>
          <svg viewBox="0 0 460 210" role="img" aria-label="RC charging voltage curve">
            <rect x="0" y="0" width="460" height="210" fill="transparent" />
            <path d={voltagePath} fill="none" stroke="var(--accent-strong)" strokeWidth="3" />
          </svg>
        </div>
        <div>
          <h4>Charging Current</h4>
          <svg viewBox="0 0 460 210" role="img" aria-label="RC charging current curve">
            <rect x="0" y="0" width="460" height="210" fill="transparent" />
            <path d={currentPath} fill="none" stroke="var(--accent-cool)" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RlLab() {
  const [e, setE] = useState(18);
  const [r, setR] = useState(120);
  const [lMilli, setLMilli] = useState(120);
  const [tMs, setTMs] = useState(8);

  const l = lMilli / 1000;
  const tau = l / r;
  const t = tMs / 1000;
  const decay = Math.exp(-t / tau);
  const i = (e / r) * (1 - decay);
  const vl = e * decay;

  const { currentPath, voltagePath } = useMemo(() => {
    const sampleCount = 72;
    const maxTime = tau * 5;
    const currents: number[] = [];
    const voltages: number[] = [];
    for (let idx = 0; idx < sampleCount; idx += 1) {
      const time = (idx / (sampleCount - 1)) * maxTime;
      const d = Math.exp(-time / tau);
      currents.push((e / r) * (1 - d) * 1000);
      voltages.push(e * d);
    }
    return {
      currentPath: buildLinePath(currents, maxTime, Math.max((e / r) * 1000, 0.001)),
      voltagePath: buildLinePath(voltages, maxTime, Math.max(e, 0.001)),
    };
  }, [e, r, tau]);

  return (
    <div className="lab-shell">
      <p className="lab-intro">
        RL storage phase lab. Current rises with time, while inductor voltage
        falls as the field settles.
      </p>
      <div className="lab-grid">
        <Slider label="Source E" min={1} max={40} step={0.5} value={e} unit="V" onChange={setE} />
        <Slider
          label="Resistance R"
          min={20}
          max={500}
          step={5}
          value={r}
          unit="ohm"
          onChange={setR}
        />
        <Slider
          label="Inductance L"
          min={10}
          max={500}
          step={5}
          value={lMilli}
          unit="mH"
          onChange={setLMilli}
        />
        <Slider
          label="Probe time t"
          min={0}
          max={40}
          step={0.2}
          value={tMs}
          unit="ms"
          onChange={setTMs}
        />
      </div>
      <div className="lab-stats">
        <div>
          <span>tau</span>
          <strong>{formatNum(tau * 1000, 3)} ms</strong>
        </div>
        <div>
          <span>iL(t)</span>
          <strong>{formatNum(i * 1000, 3)} mA</strong>
        </div>
        <div>
          <span>vL(t)</span>
          <strong>{formatNum(vl, 3)} V</strong>
        </div>
      </div>
      <div className="lab-chart-wrap">
        <div>
          <h4>Inductor Current Rise</h4>
          <svg viewBox="0 0 460 210" role="img" aria-label="RL current rise">
            <path d={currentPath} fill="none" stroke="var(--accent-strong)" strokeWidth="3" />
          </svg>
        </div>
        <div>
          <h4>Inductor Voltage Decay</h4>
          <svg viewBox="0 0 460 210" role="img" aria-label="RL voltage decay">
            <path d={voltagePath} fill="none" stroke="var(--accent-cool)" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SineLab() {
  const [amplitude, setAmplitude] = useState(10);
  const [frequency, setFrequency] = useState(60);
  const [phaseDeg, setPhaseDeg] = useState(20);
  const [probeMs, setProbeMs] = useState(4);

  const omega = 2 * Math.PI * frequency;
  const probe = probeMs / 1000;
  const phaseRad = (phaseDeg * Math.PI) / 180;
  const value = amplitude * Math.sin(omega * probe + phaseRad);
  const period = 1 / frequency;

  const path = useMemo(() => {
    const points = 240;
    const yValues: number[] = [];
    for (let i = 0; i < points; i += 1) {
      const t = (i / (points - 1)) * period;
      yValues.push(amplitude * Math.sin(omega * t + phaseRad) + amplitude);
    }
    return buildLinePath(yValues, period, amplitude * 2);
  }, [amplitude, omega, period, phaseRad]);

  return (
    <div className="lab-shell">
      <p className="lab-intro">
        Sine-wave lab for chapter 13. Explore amplitude, frequency, and phase
        shift in plain time-domain form.
      </p>
      <div className="lab-grid">
        <Slider
          label="Amplitude Xm"
          min={1}
          max={20}
          step={0.5}
          value={amplitude}
          unit="units"
          onChange={setAmplitude}
        />
        <Slider
          label="Frequency f"
          min={5}
          max={240}
          step={1}
          value={frequency}
          unit="Hz"
          onChange={setFrequency}
        />
        <Slider
          label="Phase theta"
          min={-180}
          max={180}
          step={1}
          value={phaseDeg}
          unit="deg"
          onChange={setPhaseDeg}
        />
        <Slider
          label="Probe t"
          min={0}
          max={1000 / frequency}
          step={0.01}
          value={probeMs}
          unit="ms"
          onChange={setProbeMs}
        />
      </div>
      <div className="lab-stats">
        <div>
          <span>omega</span>
          <strong>{formatNum(omega, 3)} rad/s</strong>
        </div>
        <div>
          <span>period T</span>
          <strong>{formatNum(period * 1000, 3)} ms</strong>
        </div>
        <div>
          <span>x(t)</span>
          <strong>{formatNum(value, 3)}</strong>
        </div>
      </div>
      <div className="lab-chart-wrap one-col">
        <div>
          <h4>Waveform Over One Cycle</h4>
          <svg viewBox="0 0 460 210" role="img" aria-label="Sine waveform">
            <line x1="0" y1="105" x2="460" y2="105" stroke="var(--ink-soft)" strokeWidth="1" />
            <path d={path} fill="none" stroke="var(--accent-strong)" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SeriesImpedanceLab() {
  const [r, setR] = useState(25);
  const [lMilli, setLMilli] = useState(80);
  const [cMicro, setCMicro] = useState(10);
  const [f, setF] = useState(60);
  const [eRms, setERms] = useState(120);

  const l = lMilli / 1000;
  const c = cMicro * 1e-6;
  const xl = 2 * Math.PI * f * l;
  const xc = 1 / (2 * Math.PI * f * c);
  const z = complex(r, xl - xc);
  const zMag = cMag(z);
  const theta = cAngDeg(z);
  const i = eRms / zMag;
  const pf = Math.cos((theta * Math.PI) / 180);

  const xScale = 180 / Math.max(r, 1);
  const yScale = 120 / Math.max(Math.abs(xl - xc), 1);
  const x = r * xScale;
  const y = (xl - xc) * yScale;

  return (
    <div className="lab-shell">
      <p className="lab-intro">
        Series impedance lab (chapters 14-15). See how frequency shifts net
        reactance, phase angle, and current.
      </p>
      <div className="lab-grid">
        <Slider label="R" min={1} max={120} step={1} value={r} unit="ohm" onChange={setR} />
        <Slider
          label="L"
          min={1}
          max={400}
          step={1}
          value={lMilli}
          unit="mH"
          onChange={setLMilli}
        />
        <Slider
          label="C"
          min={1}
          max={220}
          step={1}
          value={cMicro}
          unit="uF"
          onChange={setCMicro}
        />
        <Slider label="f" min={10} max={2000} step={1} value={f} unit="Hz" onChange={setF} />
        <Slider label="E(rms)" min={5} max={240} step={1} value={eRms} unit="V" onChange={setERms} />
      </div>
      <div className="lab-stats">
        <div>
          <span>XL</span>
          <strong>{formatNum(xl, 3)} ohm</strong>
        </div>
        <div>
          <span>XC</span>
          <strong>{formatNum(xc, 3)} ohm</strong>
        </div>
        <div>
          <span>Z</span>
          <strong>{toRect(z)}</strong>
        </div>
        <div>
          <span>|Z|</span>
          <strong>{formatNum(zMag, 3)} ohm</strong>
        </div>
        <div>
          <span>theta</span>
          <strong>{formatNum(theta, 2)} deg</strong>
        </div>
        <div>
          <span>I(rms)</span>
          <strong>{formatNum(i, 3)} A</strong>
        </div>
        <div>
          <span>PF</span>
          <strong>{formatNum(pf, 3)}</strong>
        </div>
      </div>
      <div className="lab-chart-wrap one-col">
        <div>
          <h4>Impedance Triangle</h4>
          <svg viewBox="0 0 460 240" role="img" aria-label="Impedance triangle">
            <line x1="40" y1="200" x2="420" y2="200" stroke="var(--ink-soft)" strokeWidth="1" />
            <line x1="40" y1="30" x2="40" y2="220" stroke="var(--ink-soft)" strokeWidth="1" />
            <line x1="40" y1="200" x2={40 + x} y2="200" stroke="var(--accent-cool)" strokeWidth="4" />
            <line
              x1={40 + x}
              y1="200"
              x2={40 + x}
              y2={200 - y}
              stroke="var(--accent-warm)"
              strokeWidth="4"
            />
            <line x1="40" y1="200" x2={40 + x} y2={200 - y} stroke="var(--accent-strong)" strokeWidth="4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ParallelAdmittanceLab() {
  const [r, setR] = useState(120);
  const [lMilli, setLMilli] = useState(180);
  const [cMicro, setCMicro] = useState(22);
  const [f, setF] = useState(60);
  const [eRms, setERms] = useState(120);

  const l = lMilli / 1000;
  const c = cMicro * 1e-6;
  const xl = 2 * Math.PI * f * l;
  const xc = 1 / (2 * Math.PI * f * c);
  const yR = complex(1 / r, 0);
  const yL = complex(0, -1 / xl);
  const yC = complex(0, 1 / xc);
  const yT = cAdd(cAdd(yR, yL), yC);
  const zT = cDiv(complex(1, 0), yT);
  const iT = cMul(complex(eRms, 0), yT);
  const iR = eRms / r;
  const iL = eRms / xl;
  const iC = eRms / xc;

  return (
    <div className="lab-shell">
      <p className="lab-intro">
        Parallel admittance lab (chapter 16). Track G and B contributions and
        how branch currents build the source current vector.
      </p>
      <div className="lab-grid">
        <Slider label="R" min={20} max={500} step={5} value={r} unit="ohm" onChange={setR} />
        <Slider
          label="L"
          min={10}
          max={500}
          step={5}
          value={lMilli}
          unit="mH"
          onChange={setLMilli}
        />
        <Slider
          label="C"
          min={1}
          max={120}
          step={1}
          value={cMicro}
          unit="uF"
          onChange={setCMicro}
        />
        <Slider label="f" min={10} max={2000} step={1} value={f} unit="Hz" onChange={setF} />
        <Slider label="E(rms)" min={5} max={240} step={1} value={eRms} unit="V" onChange={setERms} />
      </div>
      <div className="lab-stats">
        <div>
          <span>YR</span>
          <strong>{toRect(yR)} S</strong>
        </div>
        <div>
          <span>YL</span>
          <strong>{toRect(yL)} S</strong>
        </div>
        <div>
          <span>YC</span>
          <strong>{toRect(yC)} S</strong>
        </div>
        <div>
          <span>YT</span>
          <strong>{toRect(yT)} S</strong>
        </div>
        <div>
          <span>ZT</span>
          <strong>{toPolar(zT)} ohm</strong>
        </div>
        <div>
          <span>IT</span>
          <strong>{toPolar(iT)} A</strong>
        </div>
        <div>
          <span>IR / IL / IC</span>
          <strong>
            {formatNum(iR, 3)} / {formatNum(iL, 3)} / {formatNum(iC, 3)} A
          </strong>
        </div>
      </div>
    </div>
  );
}

function MixedNetworkLab() {
  const [r1, setR1] = useState(8);
  const [x1, setX1] = useState(6);
  const [r2, setR2] = useState(16);
  const [x2, setX2] = useState(-10);
  const [eRms, setERms] = useState(90);

  const z1 = complex(r1, x1);
  const z2 = complex(r2, x2);
  const zEq = cDiv(cMul(z1, z2), cAdd(z1, z2));
  const iSource = cDiv(complex(eRms, 0), zEq);

  return (
    <div className="lab-shell">
      <p className="lab-intro">
        Mixed-network lab (chapter 17). Tune two series branches in parallel
        and watch equivalent impedance and source current move.
      </p>
      <div className="lab-grid">
        <Slider label="R1" min={1} max={60} step={1} value={r1} unit="ohm" onChange={setR1} />
        <Slider
          label="X1 (L:+, C:-)"
          min={-80}
          max={80}
          step={1}
          value={x1}
          unit="ohm"
          onChange={setX1}
        />
        <Slider label="R2" min={1} max={60} step={1} value={r2} unit="ohm" onChange={setR2} />
        <Slider
          label="X2 (L:+, C:-)"
          min={-80}
          max={80}
          step={1}
          value={x2}
          unit="ohm"
          onChange={setX2}
        />
        <Slider label="E(rms)" min={5} max={240} step={1} value={eRms} unit="V" onChange={setERms} />
      </div>
      <div className="lab-stats">
        <div>
          <span>Z1</span>
          <strong>{toRect(z1)} ohm</strong>
        </div>
        <div>
          <span>Z2</span>
          <strong>{toRect(z2)} ohm</strong>
        </div>
        <div>
          <span>Zeq</span>
          <strong>{toPolar(zEq)} ohm</strong>
        </div>
        <div>
          <span>Isource</span>
          <strong>{toPolar(iSource)} A</strong>
        </div>
      </div>
      <ol className="lab-steps">
        <li>Build branch impedances: Z1=R1+jX1 and Z2=R2+jX2.</li>
        <li>Parallel-combine with Zeq=(Z1*Z2)/(Z1+Z2).</li>
        <li>Find source current using Is=E/Zeq.</li>
        <li>Back-solve branch voltages/currents if needed.</li>
      </ol>
    </div>
  );
}

export function ChapterLab({ chapterId }: { chapterId: number }) {
  if (chapterId === 10) return <RcLab />;
  if (chapterId === 11) return <RlLab />;
  if (chapterId === 13) return <SineLab />;
  if (chapterId === 16) return <ParallelAdmittanceLab />;
  if (chapterId === 17) return <MixedNetworkLab />;
  return <SeriesImpedanceLab />;
}
