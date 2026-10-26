import { useRef, useMemo, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { timeline } from './timeline';
import {
  HeartIcon,
  PhoneScene,
  HarbourScene,
  FlowerScene,
  RingScene,
  BeachScene,
  PhuketScene,
  AdmireScene,
} from './Characters';

const WorldMap = lazy(() => import('./WorldMap').then((m) => ({ default: m.WorldMap })));

function HeroEmblem() {
  return (
    <div className="hero-emblem">
      <motion.svg
        width="420"
        height="240"
        viewBox="0 0 420 240"
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="mono-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6f6ff" />
            <stop offset="55%" stopColor="#8fe3ff" />
            <stop offset="100%" stopColor="#3a7fb5" />
          </linearGradient>
          <linearGradient id="mono-pink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff0f5" />
            <stop offset="55%" stopColor="#ff8fb3" />
            <stop offset="100%" stopColor="#c43052" />
          </linearGradient>
          <radialGradient id="aurora" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(201, 160, 255, 0.3)" />
            <stop offset="40%" stopColor="rgba(255, 143, 179, 0.15)" />
            <stop offset="100%" stopColor="rgba(10, 6, 24, 0)" />
          </radialGradient>
        </defs>

        {/* Aurora halo */}
        <motion.ellipse
          cx="210"
          cy="110"
          rx="200"
          ry="90"
          fill="url(#aurora)"
          animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '210px 110px' }}
        />

        {/* Orbiting sparkles */}
        {[15, 75, 135, 195, 255, 315, 45, 165, 285].map((angle, i) => {
          const r = 170 + (i % 3) * 10;
          const sz = i % 3 === 0 ? 2 : 1.2;
          return (
            <motion.circle
              key={i}
              cx={210 + Math.cos((angle * Math.PI) / 180) * r}
              cy={110 + Math.sin((angle * Math.PI) / 180) * (r * 0.55)}
              r={sz}
              fill={i % 3 === 0 ? '#f6d8a0' : i % 3 === 1 ? '#ffffff' : '#ffb6d4'}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.6, 0.8] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.25 }}
            />
          );
        })}

        {/* AA monogram — his */}
        <motion.text
          x="95"
          y="138"
          fontSize="82"
          fontFamily="'Cormorant Garamond', serif"
          fontWeight="500"
          fontStyle="italic"
          fill="url(#mono-blue)"
          textAnchor="middle"
          style={{
            letterSpacing: '-0.02em',
            filter: 'drop-shadow(0 4px 24px rgba(143, 227, 255, 0.4))',
          }}
          animate={{ y: [138, 134, 138] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          AA
        </motion.text>

        {/* Script ampersand — gold, centered */}
        <motion.text
          x="210"
          y="128"
          fontSize="54"
          fontFamily="'Dancing Script', cursive"
          fontWeight="700"
          fill="#f6d8a0"
          textAnchor="middle"
          style={{ filter: 'drop-shadow(0 0 20px rgba(246, 216, 160, 0.75))' }}
          animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.04, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          &amp;
        </motion.text>

        {/* SJ monogram — hers */}
        <motion.text
          x="325"
          y="138"
          fontSize="82"
          fontFamily="'Cormorant Garamond', serif"
          fontWeight="500"
          fontStyle="italic"
          fill="url(#mono-pink)"
          textAnchor="middle"
          style={{
            letterSpacing: '-0.02em',
            filter: 'drop-shadow(0 4px 24px rgba(255, 143, 179, 0.45))',
          }}
          animate={{ y: [138, 134, 138] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          SJ
        </motion.text>

        {/* delicate underline flourish */}
        <g transform="translate(210, 185)">
          <line x1="-100" x2="-14" y1="0" y2="0" stroke="rgba(246,216,160,0.5)" strokeWidth="0.6" />
          <circle cx="-8" cy="0" r="1.4" fill="#f6d8a0" />
          <circle cx="0" cy="0" r="2" fill="#f6d8a0" />
          <circle cx="8" cy="0" r="1.4" fill="#f6d8a0" />
          <line x1="14" x2="100" y1="0" y2="0" stroke="rgba(246,216,160,0.5)" strokeWidth="0.6" />
        </g>

        {/* seal date */}
        <text
          x="210"
          y="208"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
          fill="rgba(246, 216, 160, 0.85)"
          textAnchor="middle"
          style={{ letterSpacing: '0.32em' }}
        >
          SINCE 26 · 09 · 2026
        </text>
      </motion.svg>
      <div className="hero-emblem-caption">Sweets &amp; Pookie</div>
    </div>
  );
}

function LoveRings() {
  const heartD =
    'M0 24 C-25 10 -35 -3 -28 -16 C-21 -27 -9 -26 -1 -16 C-0.5 -16 0.5 -16 1 -16 C9 -26 21 -27 28 -16 C35 -3 25 10 0 24 Z';
  return (
    <svg width="170" height="90" viewBox="0 0 170 90">
      <defs>
        <radialGradient id="lr-blue" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#d4f3ff" />
          <stop offset="60%" stopColor="#8fe3ff" />
          <stop offset="100%" stopColor="#3a7fb5" />
        </radialGradient>
        <radialGradient id="lr-pink" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffe0ec" />
          <stop offset="60%" stopColor="#ff8fb3" />
          <stop offset="100%" stopColor="#c43052" />
        </radialGradient>
      </defs>
      <motion.g
        transform="translate(60, 48)"
        animate={{ scale: [1, 1.05, 1], rotate: [-3, 3, -3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '0 0' }}
      >
        <path d={heartD} fill="url(#lr-blue)" />
        <text
          x="0"
          y="6"
          fontSize="18"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="600"
          fill="#fff"
          textAnchor="middle"
        >
          AA
        </text>
      </motion.g>
      <motion.g
        transform="translate(110, 48)"
        animate={{ scale: [1, 1.05, 1], rotate: [3, -3, 3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        style={{ transformOrigin: '0 0' }}
      >
        <path d={heartD} fill="url(#lr-pink)" />
        <text
          x="0"
          y="6"
          fontSize="18"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="600"
          fill="#fff"
          textAnchor="middle"
        >
          SJ
        </text>
      </motion.g>
    </svg>
  );
}

function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        d: 2 + Math.random() * 4,
        delay: Math.random() * 3,
        size: 1 + Math.random() * 2,
      })),
    [],
  );
  return (
    <div className="stars">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            '--d': `${s.d}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        d: 10 + Math.random() * 18,
        delay: Math.random() * 15,
        size: 10 + Math.random() * 16,
        color: ['#ff8fb3', '#c9a0ff', '#f6d8a0', '#8fe3ff'][i % 4],
      })),
    [],
  );
  return (
    <>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="particle"
          style={{
            left: `${h.left}%`,
            bottom: 0,
            '--d': `${h.d}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <svg width={h.size} height={h.size} viewBox="0 0 24 24">
            <path
              d="M12 21 C4 15 2 10 5 6 C8 3 11 5 12 7 C13 5 16 3 19 6 C22 10 20 15 12 21 Z"
              fill={h.color}
            />
          </svg>
        </div>
      ))}
    </>
  );
}

function SceneArt({ type, event }) {
  switch (type) {
    case 'profiles':
      return (
        <svg width="150" height="90" viewBox="0 0 150 90">
          <rect x="5" y="12" width="60" height="70" rx="8" fill="rgba(255,255,255,0.08)" stroke="#c9a0ff" strokeWidth="1" />
          <rect x="85" y="12" width="60" height="70" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ff8fb3" strokeWidth="1" />
          <circle cx="35" cy="35" r="12" fill="#4a6fa5" />
          <circle cx="115" cy="35" r="12" fill="#e85a7a" />
          <rect x="18" y="55" width="34" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
          <rect x="18" y="63" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
          <rect x="98" y="55" width="34" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
          <rect x="98" y="63" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
          <motion.g
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ transformOrigin: '75px 47px' }}
          >
            <HeartIcon size={28} pulse={false} />
            <g transform="translate(61, 33)"><HeartIcon size={28} pulse={false} /></g>
          </motion.g>
        </svg>
      );
    case 'chat':
      return (
        <svg width="150" height="90" viewBox="0 0 150 90">
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <rect x="8" y="12" width="70" height="22" rx="11" fill="#4a6fa5" />
            <text x="18" y="27" fontSize="10" fill="#fff">Hi 👋</text>
          </motion.g>
          <motion.g
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <rect x="72" y="42" width="70" height="22" rx="11" fill="#e85a7a" />
            <text x="82" y="57" fontSize="10" fill="#fff">Hi there 💫</text>
          </motion.g>
          <motion.circle
            cx="40"
            cy="78"
            r="2"
            fill="#c9a0ff"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.circle
            cx="48"
            cy="78"
            r="2"
            fill="#c9a0ff"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.circle
            cx="56"
            cy="78"
            r="2"
            fill="#c9a0ff"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </svg>
      );
    case 'phone':
      return <PhoneScene />;
    case 'plane':
      return (
        <Suspense fallback={<div style={{ width: 360, height: 220 }} />}>
          <WorldMap />
        </Suspense>
      );
    case 'flower':
      return <FlowerScene />;
    case 'harbour':
      return <HarbourScene />;
    case 'love':
      return <LoveRings />;
    case 'videolove':
      return (
        <svg width="160" height="90" viewBox="0 0 160 90">
          <rect x="10" y="12" width="60" height="60" rx="6" fill="#1a0d38" stroke="#c9a0ff" strokeWidth="1.5" />
          <rect x="90" y="12" width="60" height="60" rx="6" fill="#1a0d38" stroke="#ff8fb3" strokeWidth="1.5" />
          <circle cx="40" cy="38" r="10" fill="#e3b088" />
          <path d="M30 55 Q40 65 50 55 L50 72 L30 72 Z" fill="#4a6fa5" />
          <circle cx="120" cy="38" r="10" fill="#f0c4a8" />
          <path d="M110 55 Q120 65 130 55 L130 72 L110 72 Z" fill="#e85a7a" />
          <motion.g
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <text x="80" y="48" textAnchor="middle" fontSize="20">💗</text>
          </motion.g>
        </svg>
      );
    case 'daily':
      return (
        <svg width="170" height="90" viewBox="0 0 170 90">
          {/* dumbbell */}
          <rect x="8" y="35" width="4" height="20" fill="#c9a0ff" />
          <rect x="22" y="35" width="4" height="20" fill="#c9a0ff" />
          <rect x="12" y="42" width="10" height="6" fill="#8fe3ff" />
          {/* quilling swirl */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '70px 45px' }}
          >
            <path d="M70 25 Q90 25 90 45 Q90 65 70 65 Q55 65 55 50 Q55 40 65 40 Q72 40 72 48" stroke="#ff8fb3" strokeWidth="2" fill="none" />
          </motion.g>
          {/* heart */}
          <motion.g
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ transformOrigin: '135px 45px' }}
          >
            <path d="M135 60 C125 52 123 45 127 40 C131 36 134 38 135 41 C136 38 139 36 143 40 C147 45 145 52 135 60 Z" fill="#ff8fb3" />
          </motion.g>
        </svg>
      );
    case 'ring':
      return (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <BeachScene />
          <RingScene />
        </div>
      );
    case 'phuket':
      return <PhuketScene />;
    case 'admire':
      return <AdmireScene quote={event?.quote} traits={event?.traits} signature={event?.signature} accent={event?.accent} glow={event?.glow} />;
    default:
      return null;
  }
}

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const sceneRise = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function TimelineEvent({ event, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const side = index % 2 === 0 ? 'left' : 'right';
  const chapter = String(index + 1).padStart(2, '0');

  return (
    <div ref={ref} className={`timeline-event ${side}`}>
      <motion.div
        className="event-card"
        variants={cardStagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.span className="event-ghost-date" variants={rise}>{event.date}</motion.span>
        <motion.div className="event-head" variants={rise}>
          <span className="event-chapter">{chapter}<i> / {String(total).padStart(2, '0')}</i></span>
        </motion.div>
        <motion.h3 className="event-title" variants={rise} dangerouslySetInnerHTML={{ __html: event.title }} />
        <motion.p className="event-body" variants={rise} dangerouslySetInnerHTML={{ __html: event.body }} />
        <motion.div className="event-foot" variants={rise}>
          <span className="event-tag">{event.tag}</span>
          {event.scene && (
            <motion.div className="event-scene" variants={sceneRise}>
              <SceneArt type={event.scene} event={event} />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <div className="event-dot-wrap">
        <motion.div
          className="event-heart"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
        >
          <svg width="56" height="52" viewBox="0 0 56 52" style={{ overflow: 'visible' }}>
            <defs>
              <radialGradient id={`heart-fill-${index}`} cx="35%" cy="25%" r="85%">
                <stop offset="0%" stopColor="#fff2f7" />
                <stop offset="45%" stopColor="#ff8fb3" />
                <stop offset="100%" stopColor="#8a2a48" />
              </radialGradient>
            </defs>
            {/* classic plump heart */}
            <path
              d="M28 48 C6 34 2 20 10 11 C18 2 26 8 28 14 C30 8 38 2 46 11 C54 20 50 34 28 48 Z"
              fill={`url(#heart-fill-${index})`}
              stroke="rgba(246, 216, 160, 0.75)"
              strokeWidth="0.8"
            />
            {/* top-left specular highlight */}
            <ellipse cx="18" cy="14" rx="4" ry="2.5" fill="#fff" opacity="0.5" transform="rotate(-30 18 14)" />
            <text
              x="28"
              y="29"
              fontSize="13"
              fontFamily="'Inter', sans-serif"
              fontWeight="700"
              fill="#fff"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                letterSpacing: '0.02em',
                paintOrder: 'stroke',
                stroke: 'rgba(138, 42, 72, 0.6)',
                strokeWidth: 2,
                strokeLinejoin: 'round',
              }}
            >
              {chapter}
            </text>
          </svg>
          <span className="event-heart-tip">{event.tag}</span>
        </motion.div>
      </div>

      <div className="event-spacer" />
    </div>
  );
}

export default function App() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start center', 'end center'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const { scrollYProgress: pageProgress } = useScroll();
  const pageScale = useTransform(pageProgress, [0, 1], [0, 1]);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: pageScale }} />
      <Starfield />
      <FloatingHearts />

      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="hero-tag">A Modern Love Story · 2026</div>
          <div className="hero-eyebrow" style={{ marginTop: '1rem' }}>chapter one, a yes</div>
          <h1 className="hero-title">
            A Love <em>Story</em>
          </h1>
          <div className="hero-names">Sweets <span>&amp;</span> Pookie</div>
          <p className="hero-sub">
            A story that began with a yes, a message, a voice,
            and somehow became forever in a single, unforgettable month.
            This is the story of a Mumbai girl and a Sydney boy
            who found each other at exactly the right time.
          </p>
        </motion.div>

        <HeroEmblem />
        {/* fallback love scenes: hearts needed by other scenes */}
        {false && <HeartIcon size={56} />}

        <div className="scroll-cue">
          <span>Scroll</span>
          <div className="arrow" />
        </div>
      </section>

      <section className="timeline-section">
        <div className="timeline-wrap" ref={lineRef}>
          <motion.div
            className="timeline-line"
            style={{ scaleY: lineScale }}
          />
          {timeline.map((event, i) => (
            <TimelineEvent key={i} event={event} index={i} total={timeline.length} />
          ))}
        </div>
      </section>

      <Finale />
    </>
  );
}

function Finale() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section className="finale" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
      >
        <div className="finale-eyebrow">And this is only the beginning…</div>
        <h2 className="finale-title">
          To <em>be continued</em>.
        </h2>
        <p className="finale-body">
          From a profile match to a lifetime in the making, every day has felt
          like the universe quietly saying, <em>finally</em>. Here's to Phuket,
          and to every sunrise after that one. Two hearts, one story.
        </p>
        <div className="finale-heart">
          <HeartIcon size={120} />
        </div>
        <div className="footer-note">26 · 09 · ∞</div>
      </motion.div>
    </section>
  );
}
