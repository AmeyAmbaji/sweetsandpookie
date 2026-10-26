import { useEffect, useRef, useState } from 'react';

const KEY = 'snp-unlock';
const PASS = '260926';

export default function Gate({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    try { return localStorage.getItem(KEY) === '1'; } catch { return false; }
  });
  const [value, setValue] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!unlocked) inputRef.current?.focus();
  }, [unlocked]);

  if (unlocked) return children;

  const submit = (e) => {
    e.preventDefault();
    if (value === PASS) {
      try { localStorage.setItem(KEY, '1'); } catch {}
      setUnlocked(true);
    } else {
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="gate">
      <form className={`gate-card ${shake ? 'shake' : ''}`} onSubmit={submit}>
        <div className="gate-emblem" aria-hidden="true">
          <svg width="48" height="44" viewBox="0 0 56 52">
            <defs>
              <radialGradient id="gate-heart" cx="35%" cy="25%" r="85%">
                <stop offset="0%" stopColor="#fff2f7" />
                <stop offset="55%" stopColor="#ff8fb3" />
                <stop offset="100%" stopColor="#8a2a48" />
              </radialGradient>
            </defs>
            <path
              d="M28 48 C6 34 2 20 10 11 C18 2 26 8 28 14 C30 8 38 2 46 11 C54 20 50 34 28 48 Z"
              fill="url(#gate-heart)"
              stroke="rgba(246, 216, 160, 0.7)"
              strokeWidth="0.8"
            />
          </svg>
        </div>
        <div className="gate-eyebrow">a love letter</div>
        <h1 className="gate-title">Sweets &amp; Pookie</h1>
        <p className="gate-sub">
          A private little corner of the internet. Enter the key to come inside.
        </p>
        <input
          ref={inputRef}
          className="gate-input"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          placeholder="• • • • • •"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Password"
        />
        <button className="gate-btn" type="submit">Unlock</button>
      </form>
    </div>
  );
}
