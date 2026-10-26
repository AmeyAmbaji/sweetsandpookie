import { motion } from 'framer-motion';

/**
 * Boarding Pass — Mumbai → Sydney, 5 October.
 * The flight on which Pookie became Pookie.
 */
export function WorldMap() {
  const W = 440;
  const H = 240;

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ borderRadius: 18, display: 'block' }}
    >
      <defs>
        <linearGradient id="ticket-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1b1140" />
          <stop offset="100%" stopColor="#0d0620" />
        </linearGradient>
        <linearGradient id="ticket-stripe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8fb3" />
          <stop offset="100%" stopColor="#c9a0ff" />
        </linearGradient>
        <linearGradient id="path-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f6d8a0" />
          <stop offset="50%" stopColor="#ff8fb3" />
          <stop offset="100%" stopColor="#8fe3ff" />
        </linearGradient>
        <filter id="soft-glow">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* ----- Ticket body ----- */}
      <rect
        x="2"
        y="2"
        width={W - 4}
        height={H - 4}
        rx="18"
        fill="url(#ticket-bg)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />

      {/* decorative stripe on left */}
      <rect x="2" y="2" width="4" height={H - 4} rx="2" fill="url(#ticket-stripe)" />

      {/* ----- Header ----- */}
      <text
        x="26"
        y="30"
        fontSize="9"
        letterSpacing="4"
        fill="#ffb6c1"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
      >
        BOARDING PASS
      </text>
      <text
        x="26"
        y="46"
        fontSize="8"
        letterSpacing="2"
        fill="rgba(255,255,255,0.5)"
        fontFamily="Inter, sans-serif"
      >
        PASSENGER · AMEY "POOKIE"
      </text>

      {/* airline tag top right */}
      <g transform={`translate(${W - 26}, 30)`}>
        <text
          fontSize="9"
          letterSpacing="3"
          fill="rgba(246,216,160,0.9)"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          textAnchor="end"
        >
          Love Airways · 05.OCT
        </text>
      </g>

      {/* ----- FROM / TO row ----- */}
      <g transform="translate(0, 70)">
        {/* FROM */}
        <text
          x="30"
          y="0"
          fontSize="8"
          letterSpacing="3"
          fill="rgba(255,255,255,0.45)"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
        >
          FROM
        </text>
        <text
          x="30"
          y="38"
          fontSize="46"
          fill="#ffe4c0"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="600"
          letterSpacing="2"
        >
          BOM
        </text>
        <text
          x="30"
          y="58"
          fontSize="11"
          fill="#ffb6c1"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
          letterSpacing="2"
        >
          MUMBAI
        </text>
        <text
          x="30"
          y="74"
          fontSize="8"
          fill="rgba(255,255,255,0.5)"
          fontFamily="Inter, sans-serif"
          letterSpacing="1.5"
        >
          19.08°N · 72.87°E
        </text>

        {/* TO */}
        <text
          x={W - 30}
          y="0"
          fontSize="8"
          letterSpacing="3"
          fill="rgba(255,255,255,0.45)"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
          textAnchor="end"
        >
          TO
        </text>
        <text
          x={W - 30}
          y="38"
          fontSize="46"
          fill="#ffe4c0"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="600"
          letterSpacing="2"
          textAnchor="end"
        >
          SYD
        </text>
        <text
          x={W - 30}
          y="58"
          fontSize="11"
          fill="#8fe3ff"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
          letterSpacing="2"
          textAnchor="end"
        >
          SYDNEY
        </text>
        <text
          x={W - 30}
          y="74"
          fontSize="8"
          fill="rgba(255,255,255,0.5)"
          fontFamily="Inter, sans-serif"
          letterSpacing="1.5"
          textAnchor="end"
        >
          33.87°S · 151.21°E
        </text>
      </g>

      {/* ----- Flight path arc (below coordinates, no plane) ----- */}
      {/* Mumbai dot */}
      <circle cx="105" cy="170" r="4" fill="#ff8fb3" />
      <motion.circle
        cx="105"
        cy="170"
        r="4"
        fill="#ff8fb3"
        opacity="0.5"
        animate={{ r: [4, 11, 4], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Sydney dot */}
      <circle cx={W - 105} cy="170" r="4" fill="#8fe3ff" />
      <motion.circle
        cx={W - 105}
        cy="170"
        r="4"
        fill="#8fe3ff"
        opacity="0.5"
        animate={{ r: [4, 11, 4], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      />
      {/* Arc glow underlay */}
      <path
        d={`M 105 170 Q ${W / 2} 152 ${W - 105} 170`}
        stroke="url(#path-grad)"
        strokeWidth="5"
        fill="none"
        opacity="0.45"
        filter="url(#soft-glow)"
      />
      {/* Arc dashed line that draws itself in */}
      <motion.path
        d={`M 105 170 Q ${W / 2} 152 ${W - 105} 170`}
        stroke="url(#path-grad)"
        strokeWidth="1.8"
        strokeDasharray="4 4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      />
      {/* Singapore layover marker — where Pookie was born */}
      <circle cx={W / 2} cy="156" r="3.5" fill="#f6d8a0" />
      <motion.circle
        cx={W / 2}
        cy="156"
        r="3.5"
        fill="#f6d8a0"
        opacity="0.5"
        animate={{ r: [3.5, 10, 3.5], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <text
        x={W / 2}
        y="144"
        fontSize="7.5"
        fill="#f6d8a0"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        textAnchor="middle"
        letterSpacing="2"
      >
        SIN
      </text>
      <text
        x={W / 2}
        y="192"
        fontSize="6.5"
        fill="rgba(255,180,220,0.7)"
        fontFamily="Cormorant Garamond, serif"
        fontStyle="italic"
        textAnchor="middle"
        letterSpacing="1"
      >
        where Pookie was born
      </text>

      {/* ----- Perforation line ----- */}
      <line
        x1="20"
        x2={W - 20}
        y1={H - 48}
        y2={H - 48}
        stroke="rgba(255,255,255,0.2)"
        strokeDasharray="2 3"
        strokeWidth="1"
      />

      {/* ----- Footer stats ----- */}
      <g transform={`translate(0, ${H - 36})`}>
        <text
          x="30"
          y="0"
          fontSize="7"
          fill="rgba(255,255,255,0.45)"
          fontFamily="Inter, sans-serif"
          letterSpacing="2.5"
          fontWeight="500"
        >
          DISTANCE
        </text>
        <text
          x="30"
          y="18"
          fontSize="13"
          fill="#ffe4c0"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          letterSpacing="1"
        >
          10,355 km
        </text>

        <text
          x={W / 2}
          y="0"
          fontSize="7"
          fill="rgba(255,255,255,0.45)"
          fontFamily="Inter, sans-serif"
          letterSpacing="2.5"
          fontWeight="500"
          textAnchor="middle"
        >
          DURATION
        </text>
        <text
          x={W / 2}
          y="18"
          fontSize="13"
          fill="#ffe4c0"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
        >
          13h 25m
        </text>

        <text
          x={W - 30}
          y="0"
          fontSize="7"
          fill="rgba(255,255,255,0.45)"
          fontFamily="Inter, sans-serif"
          letterSpacing="2.5"
          fontWeight="500"
          textAnchor="end"
        >
          SEAT
        </text>
        <text
          x={W - 30}
          y="18"
          fontSize="13"
          fill="#ff8fb3"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="end"
        >
          2 of ∞
        </text>
      </g>
    </svg>
  );
}
