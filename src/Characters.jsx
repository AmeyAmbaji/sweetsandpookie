import { motion } from 'framer-motion';

/* ============================================================
   APPLE MEMOJI STYLE AVATARS
   Properly layered: skin gradient + face shading + volumetric hair
   with highlights + large expressive eyes with full iris, pupil,
   catchlights + nose shading + full lips + cheek blush.
   ============================================================ */

/* Shared eye helper — big round Memoji eyes with full detail */
function MemojiEye({ cx, cy, blinkDelay = 0, scale = 1 }) {
  const r = 5.4 * scale;
  const ir = 4 * scale;
  const pr = 2.3 * scale;
  return (
    <motion.g
      animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
      transition={{
        duration: 4.5,
        times: [0, 0.47, 0.5, 0.53, 1],
        repeat: Infinity,
        delay: blinkDelay,
      }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* eye white — a crisp big circle */}
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 1.05} fill="#ffffff" />
      <ellipse cx={cx} cy={cy - 0.6} rx={r} ry={r * 0.95} fill="#f5e8dc" opacity="0.5" />
      {/* iris — brown with lighter rim and darker inner */}
      <circle cx={cx} cy={cy + 0.4} r={ir} fill="#3a1f10" />
      <circle cx={cx} cy={cy + 0.4} r={ir - 0.3} fill="url(#iris-grad)" />
      {/* pupil */}
      <circle cx={cx} cy={cy + 0.6} r={pr} fill="#0d0603" />
      {/* big top catchlight */}
      <ellipse
        cx={cx - 1.4}
        cy={cy - 1.8}
        rx={1.9 * scale}
        ry={2.2 * scale}
        fill="#fff"
      />
      {/* small bottom catchlight */}
      <circle cx={cx + 1.8} cy={cy + 2} r={0.7 * scale} fill="#fff" opacity="0.75" />
    </motion.g>
  );
}

/* ============================================================
   AMEY — Memoji style
   ============================================================ */
export function Pookie({ size = 180, waving = false, blushing = true }) {
  return (
    <motion.svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* skin — warm, sunlit, gradient from top-left highlight to lower shadow */}
        <radialGradient id="a-skin" cx="40%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#ffe0c2" />
          <stop offset="55%" stopColor="#eab28c" />
          <stop offset="100%" stopColor="#b67a4e" />
        </radialGradient>
        {/* face bright highlight */}
        <radialGradient id="a-face-hi" cx="30%" cy="25%" r="40%">
          <stop offset="0%" stopColor="#fff2dc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff2dc" stopOpacity="0" />
        </radialGradient>
        {/* chin / lower shadow */}
        <radialGradient id="a-face-shadow" cx="50%" cy="90%" r="60%">
          <stop offset="0%" stopColor="#4a2010" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4a2010" stopOpacity="0" />
        </radialGradient>
        {/* hair — rich dark brown with sheen */}
        <linearGradient id="a-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2214" />
          <stop offset="100%" stopColor="#0e0603" />
        </linearGradient>
        <linearGradient id="a-hair-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        {/* sweater */}
        <linearGradient id="a-shirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b8bc0" />
          <stop offset="100%" stopColor="#1f3a68" />
        </linearGradient>
        <radialGradient id="a-shirt-hi" cx="35%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        {/* iris */}
        <radialGradient id="iris-grad" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#8a4a2a" />
          <stop offset="65%" stopColor="#4a2412" />
          <stop offset="100%" stopColor="#1a0a04" />
        </radialGradient>
        {/* lips */}
        <linearGradient id="a-lip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c87560" />
          <stop offset="100%" stopColor="#8a3f30" />
        </linearGradient>
        {/* subtle drop shadow for head */}
        <filter id="a-headshadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* soft floor shadow */}
      <ellipse cx="100" cy="215" rx="55" ry="5" fill="rgba(169,125,255,0.3)" />

      {/* ---- BODY / SWEATER (behind head) ---- */}
      <motion.g
        animate={{ y: [0, -1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M38 220 Q38 160 70 148 Q85 142 100 142 Q115 142 130 148 Q162 160 162 220 Z"
          fill="url(#a-shirt)"
        />
        <path
          d="M38 220 Q38 160 70 148 Q85 142 100 142 Q115 142 130 148 Q162 160 162 220 Z"
          fill="url(#a-shirt-hi)"
        />
        {/* collar shadow */}
        <path
          d="M72 148 Q100 162 128 148 Q118 156 100 156 Q82 156 72 148 Z"
          fill="rgba(0,0,0,0.3)"
        />
      </motion.g>

      {/* ---- NECK ---- */}
      <path d="M82 118 Q82 140 100 144 Q118 140 118 118 Z" fill="url(#a-skin)" />
      <path
        d="M82 118 Q100 128 118 118 Q110 142 100 142 Q90 142 82 118 Z"
        fill="rgba(70,30,10,0.2)"
      />

      {/* ---- HEAD (face + hair, animated head bob) ---- */}
      <motion.g
        animate={{ rotate: [0, 1.5, 0, -1.5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '100px 80px' }}
        filter="url(#a-headshadow)"
      >
        {/* back-of-hair shadow extending beyond face */}
        <path
          d="M44 76 Q42 42 72 28 Q100 18 128 28 Q158 42 156 76 L156 110 Q152 92 148 86 L144 70 Q130 56 124 56 L120 62 Q110 50 100 50 Q90 50 80 62 L76 56 Q70 56 56 70 L52 86 Q48 92 44 110 Z"
          fill="url(#a-hair)"
        />

        {/* ears */}
        <ellipse cx="52" cy="88" rx="6" ry="10" fill="url(#a-skin)" />
        <ellipse cx="148" cy="88" rx="6" ry="10" fill="url(#a-skin)" />
        <ellipse cx="52" cy="90" rx="2.5" ry="5" fill="rgba(70,30,10,0.35)" />
        <ellipse cx="148" cy="90" rx="2.5" ry="5" fill="rgba(70,30,10,0.35)" />

        {/* face oval */}
        <ellipse cx="100" cy="85" rx="46" ry="52" fill="url(#a-skin)" />
        {/* face bright highlight (forehead/cheek) */}
        <ellipse cx="82" cy="68" rx="26" ry="30" fill="url(#a-face-hi)" />
        {/* face chin shadow */}
        <ellipse cx="100" cy="120" rx="38" ry="18" fill="url(#a-face-shadow)" />

        {/* hair front — chunky but with proper fringe */}
        <path
          d="M48 76 Q50 42 80 32 Q96 26 112 32 Q146 42 148 78 Q142 60 128 56 Q118 66 108 60 Q100 50 100 50 Q90 54 92 62 Q82 68 72 60 Q60 60 48 76 Z"
          fill="url(#a-hair)"
        />
        {/* hair front highlight */}
        <path
          d="M60 56 Q90 42 128 50"
          stroke="url(#a-hair-shine)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* eyebrows — bold curved */}
        <path
          d="M64 74 Q78 68 90 73"
          stroke="#1a0f08"
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M110 73 Q122 68 136 74"
          stroke="#1a0f08"
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* eyes */}
        <MemojiEye cx={78} cy={88} />
        <MemojiEye cx={122} cy={88} blinkDelay={0.05} />

        {/* nose — bridge shade + tip + nostrils */}
        <path
          d="M100 92 Q96 102 95 110"
          stroke="rgba(90,45,20,0.22)"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M94 110 Q100 116 106 110 Q104 114 100 114 Q96 114 94 110 Z"
          fill="rgba(90,45,20,0.3)"
        />
        <circle cx="97" cy="113" r="0.8" fill="rgba(50,20,10,0.5)" />
        <circle cx="103" cy="113" r="0.8" fill="rgba(50,20,10,0.5)" />
        {/* nose highlight */}
        <ellipse cx="99" cy="100" rx="1.2" ry="4" fill="#fff" opacity="0.3" />

        {/* cheek blush */}
        {blushing && (
          <>
            <ellipse cx="68" cy="108" rx="10" ry="6" fill="#ff8fb3" opacity="0.4" />
            <ellipse cx="132" cy="108" rx="10" ry="6" fill="#ff8fb3" opacity="0.4" />
          </>
        )}

        {/* mouth — upper + lower lip with highlight */}
        {/* upper lip */}
        <path
          d="M86 122 Q92 118 100 120 Q108 118 114 122 Q108 126 100 125 Q92 126 86 122 Z"
          fill="url(#a-lip)"
        />
        {/* lower lip */}
        <path
          d="M86 122 Q92 132 100 133 Q108 132 114 122 Q108 128 100 128 Q92 128 86 122 Z"
          fill="url(#a-lip)"
        />
        {/* lip highlight */}
        <ellipse cx="100" cy="124" rx="4" ry="0.8" fill="#fff" opacity="0.4" />
        {/* teeth / smile line */}
        <path
          d="M90 122 Q100 125 110 122"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="0.7"
          fill="none"
        />
      </motion.g>

      {/* waving arm */}
      <motion.g
        animate={waving ? { rotate: [0, -18, 0, -18, 0] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '158px 160px' }}
      >
        <path
          d="M158 160 Q178 172 180 198"
          stroke="url(#a-skin)"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="180" cy="200" r="7" fill="url(#a-skin)" />
      </motion.g>
    </motion.svg>
  );
}

/* ============================================================
   SMRUTI — Memoji style
   ============================================================ */
export function Sweets({ size = 180, waving = false, blushing = true }) {
  return (
    <motion.svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="s-skin" cx="40%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#fff0d8" />
          <stop offset="55%" stopColor="#f3bf96" />
          <stop offset="100%" stopColor="#b67e58" />
        </radialGradient>
        <radialGradient id="s-face-hi" cx="30%" cy="25%" r="40%">
          <stop offset="0%" stopColor="#fff5e2" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff5e2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="s-face-shadow" cx="50%" cy="90%" r="60%">
          <stop offset="0%" stopColor="#4a2010" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4a2010" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="s-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1810" />
          <stop offset="100%" stopColor="#0a0402" />
        </linearGradient>
        <linearGradient id="s-hair-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#c9a0ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="s-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7aa0" />
          <stop offset="100%" stopColor="#9a2a52" />
        </linearGradient>
        <radialGradient id="s-top-hi" cx="35%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="s-lip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e35479" />
          <stop offset="100%" stopColor="#a02854" />
        </linearGradient>
        <radialGradient id="s-ear" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#fff6d5" />
          <stop offset="100%" stopColor="#c99a3a" />
        </radialGradient>
        <filter id="s-headshadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* floor shadow */}
      <ellipse cx="100" cy="215" rx="55" ry="5" fill="rgba(255,143,179,0.35)" />

      {/* long hair back */}
      <path
        d="M50 90 Q38 170 58 215 L78 215 Q68 170 72 100 Z"
        fill="url(#s-hair)"
      />
      <path
        d="M150 90 Q162 170 142 215 L122 215 Q132 170 128 100 Z"
        fill="url(#s-hair)"
      />
      {/* hair shine streaks */}
      <path d="M58 130 Q58 175 68 210" stroke="url(#s-hair-shine)" strokeWidth="4" fill="none" />
      <path d="M142 130 Q142 175 132 210" stroke="url(#s-hair-shine)" strokeWidth="4" fill="none" />

      {/* ---- BODY / TOP ---- */}
      <motion.g
        animate={{ y: [0, -1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        <path
          d="M38 220 Q38 160 70 148 Q85 142 100 142 Q115 142 130 148 Q162 160 162 220 Z"
          fill="url(#s-top)"
        />
        <path
          d="M38 220 Q38 160 70 148 Q85 142 100 142 Q115 142 130 148 Q162 160 162 220 Z"
          fill="url(#s-top-hi)"
        />
        {/* V-neck */}
        <path
          d="M76 148 Q100 170 124 148 Q114 158 100 158 Q86 158 76 148 Z"
          fill="rgba(0,0,0,0.25)"
        />
      </motion.g>

      {/* neck */}
      <path d="M82 118 Q82 140 100 144 Q118 140 118 118 Z" fill="url(#s-skin)" />
      <path
        d="M82 118 Q100 128 118 118 Q110 142 100 142 Q90 142 82 118 Z"
        fill="rgba(70,30,10,0.2)"
      />

      {/* ---- HEAD ---- */}
      <motion.g
        animate={{ rotate: [0, -1.5, 0, 1.5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ transformOrigin: '100px 80px' }}
        filter="url(#s-headshadow)"
      >
        {/* ears */}
        <ellipse cx="54" cy="90" rx="6" ry="10" fill="url(#s-skin)" />
        <ellipse cx="146" cy="90" rx="6" ry="10" fill="url(#s-skin)" />

        {/* face */}
        <ellipse cx="100" cy="85" rx="44" ry="52" fill="url(#s-skin)" />
        {/* highlight */}
        <ellipse cx="82" cy="68" rx="26" ry="30" fill="url(#s-face-hi)" />
        {/* chin shadow */}
        <ellipse cx="100" cy="120" rx="36" ry="18" fill="url(#s-face-shadow)" />

        {/* hair top — center-parted volume */}
        <path
          d="M52 76 Q46 32 80 24 Q100 18 120 24 Q154 32 148 76 Q144 50 132 44 Q122 56 108 50 Q102 40 100 40 Q98 40 92 50 Q78 56 68 44 Q56 50 52 76 Z"
          fill="url(#s-hair)"
        />
        {/* center parting */}
        <path d="M100 24 L100 48" stroke="rgba(0,0,0,0.5)" strokeWidth="1.3" />
        {/* side bangs over ears */}
        <path d="M52 76 Q48 108 54 118 Q58 100 60 82 Z" fill="url(#s-hair)" />
        <path d="M148 76 Q152 108 146 118 Q142 100 140 82 Z" fill="url(#s-hair)" />
        {/* hair front shine */}
        <path
          d="M62 50 Q100 36 138 50"
          stroke="url(#s-hair-shine)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* gold stud earrings */}
        <circle cx="54" cy="100" r="3" fill="url(#s-ear)" />
        <circle cx="146" cy="100" r="3" fill="url(#s-ear)" />
        <circle cx="53" cy="99" r="0.9" fill="#fff" opacity="0.9" />
        <circle cx="145" cy="99" r="0.9" fill="#fff" opacity="0.9" />

        {/* bindi — proper center forehead */}
        <circle cx="100" cy="60" r="2.8" fill="#d6314e" />
        <circle cx="99.2" cy="59.2" r="0.7" fill="#fff" opacity="0.75" />

        {/* eyebrows — curved feminine */}
        <path
          d="M66 73 Q78 67 90 72"
          stroke="#140a05"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M110 72 Q122 67 134 73"
          stroke="#140a05"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* eyes — slightly larger for feminine look */}
        <MemojiEye cx={78} cy={88} scale={1.05} />
        <MemojiEye cx={122} cy={88} blinkDelay={0.05} scale={1.05} />

        {/* eyelashes — proper curved flicks */}
        <path
          d="M71 82 L68 79 M75 81 L74 78 M79 81 L80 78 M83 81 L85 78"
          stroke="#140a05"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M115 81 L113 78 M119 81 L120 78 M123 81 L126 78 M127 82 L130 79"
          stroke="#140a05"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />

        {/* nose */}
        <path
          d="M100 92 Q96 102 95 110"
          stroke="rgba(90,45,20,0.22)"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M94 110 Q100 115 106 110 Q104 113 100 113 Q96 113 94 110 Z"
          fill="rgba(90,45,20,0.28)"
        />
        <circle cx="97" cy="112.5" r="0.7" fill="rgba(50,20,10,0.5)" />
        <circle cx="103" cy="112.5" r="0.7" fill="rgba(50,20,10,0.5)" />
        <ellipse cx="99" cy="100" rx="1.2" ry="4" fill="#fff" opacity="0.35" />

        {/* cheek blush — more vivid for Sweets */}
        {blushing && (
          <>
            <ellipse cx="68" cy="108" rx="11" ry="7" fill="#ff8fb3" opacity="0.55" />
            <ellipse cx="132" cy="108" rx="11" ry="7" fill="#ff8fb3" opacity="0.55" />
          </>
        )}

        {/* lips — fuller, with Cupid's bow */}
        {/* upper lip with cupid's bow */}
        <path
          d="M84 123 Q90 118 94 120 Q97 117 100 120 Q103 117 106 120 Q110 118 116 123 Q110 125 100 124 Q90 125 84 123 Z"
          fill="url(#s-lip)"
        />
        {/* lower lip - fuller */}
        <path
          d="M84 123 Q90 134 100 136 Q110 134 116 123 Q110 128 100 128 Q90 128 84 123 Z"
          fill="url(#s-lip)"
        />
        {/* lip highlight */}
        <ellipse cx="100" cy="126" rx="5" ry="1" fill="#fff" opacity="0.5" />
        <path
          d="M88 123 Q100 125 112 123"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="0.7"
          fill="none"
        />
      </motion.g>

      {/* waving arm */}
      <motion.g
        animate={waving ? { rotate: [0, 18, 0, 18, 0] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '158px 160px' }}
      >
        <path
          d="M158 160 Q178 172 180 198"
          stroke="url(#s-skin)"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="180" cy="200" r="7" fill="url(#s-skin)" />
      </motion.g>
    </motion.svg>
  );
}

/* ============================================================
   Scene vignettes (unchanged in look, kept here)
   ============================================================ */

export function HeartIcon({ size = 48, pulse = true }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      animate={pulse ? { scale: [1, 1.15, 1] } : {}}
      transition={{ duration: 1.4, repeat: Infinity }}
    >
      <defs>
        <radialGradient id="heart-grad">
          <stop offset="0%" stopColor="#ffd4e0" />
          <stop offset="60%" stopColor="#ff8fb3" />
          <stop offset="100%" stopColor="#d63b65" />
        </radialGradient>
      </defs>
      <path
        d="M24 42 C8 30 4 20 10 13 C15 7 22 10 24 15 C26 10 33 7 38 13 C44 20 40 30 24 42 Z"
        fill="url(#heart-grad)"
      />
      {/* highlight */}
      <ellipse cx="16" cy="18" rx="4" ry="6" fill="#fff" opacity="0.45" transform="rotate(-20 16 18)" />
    </motion.svg>
  );
}

export function PhoneScene() {
  return (
    <svg width="110" height="90" viewBox="0 0 110 90">
      <rect x="12" y="12" width="30" height="55" rx="6" fill="#2a1f3a" stroke="#c9a0ff" strokeWidth="1.5" />
      <rect x="68" y="22" width="30" height="55" rx="6" fill="#2a1f3a" stroke="#ff8fb3" strokeWidth="1.5" />
      <circle cx="27" cy="35" r="3" fill="#8fe3ff" />
      <circle cx="83" cy="45" r="3" fill="#ff8fb3" />
      <motion.path
        d="M42 32 Q55 20 68 32"
        stroke="#f6d8a0"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
        animate={{ strokeDashoffset: [0, -12] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      <text x="55" y="18" textAnchor="middle" fontSize="12" fill="#f6d8a0">💬</text>
    </svg>
  );
}

export function PlaneScene() {
  return (
    <svg width="340" height="220" viewBox="0 0 340 220" style={{ borderRadius: 14 }}>
      <defs>
        {/* ocean background */}
        <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1040" />
          <stop offset="60%" stopColor="#120a2e" />
          <stop offset="100%" stopColor="#0a0618" />
        </linearGradient>
        {/* land fill */}
        <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255, 220, 180, 0.42)" />
          <stop offset="100%" stopColor="rgba(201, 160, 255, 0.22)" />
        </linearGradient>
        <linearGradient id="land-aus" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(246, 216, 160, 0.42)" />
          <stop offset="100%" stopColor="rgba(255, 143, 179, 0.25)" />
        </linearGradient>
        {/* path glow */}
        <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8fb3" />
          <stop offset="50%" stopColor="#f6d8a0" />
          <stop offset="100%" stopColor="#8fe3ff" />
        </linearGradient>
        <radialGradient id="city-glow">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="40%" stopColor="#f6d8a0" />
          <stop offset="100%" stopColor="#f6d8a0" stopOpacity="0" />
        </radialGradient>
        <filter id="path-glow">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      {/* ===== Ocean background ===== */}
      <rect x="0" y="0" width="340" height="220" fill="url(#ocean)" />

      {/* subtle lat/long grid for map feel */}
      {[40, 80, 120, 160, 200].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="340" y2={y} stroke="rgba(201,160,255,0.06)" strokeWidth="0.5" strokeDasharray="2 4" />
      ))}
      {[60, 120, 180, 240, 300].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="220" stroke="rgba(201,160,255,0.06)" strokeWidth="0.5" strokeDasharray="2 4" />
      ))}

      {/* "Indian Ocean" label */}
      <text x="110" y="150" fontSize="7" fill="rgba(143,227,255,0.4)" fontFamily="Cormorant Garamond, serif" fontStyle="italic" letterSpacing="2">
        INDIAN  OCEAN
      </text>

      {/* ===== Asia hint (Pakistan, China top edge) ===== */}
      <path
        d="M0 0 L340 0 L340 30 Q280 36 220 32 Q160 38 100 34 Q60 36 0 42 Z"
        fill="rgba(201,160,255,0.1)"
        stroke="rgba(201,160,255,0.15)"
        strokeWidth="0.5"
      />

      {/* ===== INDIA ===== */}
      {/* subcontinent shape, top-left */}
      <path
        d="M30 32
           Q38 24 54 24
           L82 22
           Q104 20 118 28
           Q128 32 124 42
           L116 48
           Q108 44 102 48
           L96 56
           Q104 68 104 80
           Q102 92 94 102
           L84 118
           Q78 128 70 124
           Q64 118 62 108
           L56 96
           Q50 88 42 84
           L34 72
           Q28 60 30 50
           Z"
        fill="url(#land)"
        stroke="rgba(255,220,180,0.55)"
        strokeWidth="0.9"
      />
      {/* Sri Lanka */}
      <ellipse cx="88" cy="128" rx="4" ry="6" fill="url(#land)" stroke="rgba(255,220,180,0.5)" strokeWidth="0.7" />

      {/* India label */}
      <text x="78" y="68" fontSize="9" fill="#ffe4c0" fontFamily="Inter, sans-serif" fontWeight="500" letterSpacing="1" textAnchor="middle" opacity="0.85">
        India
      </text>

      {/* Mumbai dot */}
      <motion.g
        animate={{ scale: [1, 1.5, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        style={{ transformOrigin: '48px 76px' }}
      >
        <circle cx="48" cy="76" r="10" fill="url(#city-glow)" opacity="0.5" />
        <circle cx="48" cy="76" r="3" fill="#f6d8a0" />
        <circle cx="48" cy="76" r="1.2" fill="#fff" />
      </motion.g>
      <text x="20" y="78" fontSize="8" fill="#f6d8a0" fontFamily="Inter, sans-serif" fontWeight="500" textAnchor="end">
        Mumbai
      </text>

      {/* ===== Southeast Asia (Thailand / Malaysia / Indonesia / PNG hints) ===== */}
      {/* Thailand/Malaysia peninsula */}
      <path
        d="M150 60 Q160 70 158 86 Q156 100 162 112 Q164 120 170 124 Q172 128 168 132 Q162 134 158 128 Q152 118 150 104 Q148 90 146 76 Z"
        fill="url(#land)"
        stroke="rgba(255,220,180,0.5)"
        strokeWidth="0.8"
      />
      {/* Sumatra */}
      <path
        d="M170 130 Q180 128 192 136 Q202 144 208 156 Q210 162 204 164 Q194 160 184 154 Q174 148 170 140 Z"
        fill="url(#land)"
        stroke="rgba(255,220,180,0.5)"
        strokeWidth="0.8"
      />
      {/* Borneo */}
      <path
        d="M200 118 Q216 114 226 122 Q232 132 226 142 Q218 148 208 144 Q202 136 200 128 Z"
        fill="url(#land)"
        stroke="rgba(255,220,180,0.5)"
        strokeWidth="0.8"
      />
      {/* Java */}
      <path
        d="M210 164 L240 162 Q250 164 254 170 Q244 170 230 170 Q220 170 210 168 Z"
        fill="url(#land)"
        stroke="rgba(255,220,180,0.5)"
        strokeWidth="0.8"
      />
      {/* Sulawesi */}
      <path
        d="M242 130 Q250 134 248 144 Q252 150 246 154 Q242 148 242 138 Z"
        fill="url(#land)"
        stroke="rgba(255,220,180,0.5)"
        strokeWidth="0.7"
      />
      {/* PNG hint */}
      <path
        d="M290 140 Q310 138 322 146 Q328 152 322 156 Q308 154 294 150 Z"
        fill="url(#land)"
        stroke="rgba(255,220,180,0.5)"
        strokeWidth="0.7"
      />

      {/* ===== AUSTRALIA ===== */}
      <path
        d="M212 174
           Q222 164 240 164
           L270 162
           Q296 160 316 166
           Q328 172 328 184
           Q326 196 316 202
           L298 208
           Q280 212 262 210
           L240 208
           Q222 206 214 198
           Q208 190 212 174 Z"
        fill="url(#land-aus)"
        stroke="rgba(246,216,160,0.6)"
        strokeWidth="1"
      />
      {/* Tasmania */}
      <ellipse cx="300" cy="214" rx="5" ry="3" fill="url(#land-aus)" stroke="rgba(246,216,160,0.5)" strokeWidth="0.7" />

      {/* Australia label */}
      <text x="268" y="194" fontSize="9" fill="#ffe4c0" fontFamily="Inter, sans-serif" fontWeight="500" letterSpacing="1" textAnchor="middle" opacity="0.85">
        Australia
      </text>

      {/* Sydney dot (east coast) */}
      <motion.g
        animate={{ scale: [1, 1.5, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 0.6 }}
        style={{ transformOrigin: '320px 200px' }}
      >
        <circle cx="320" cy="200" r="10" fill="url(#city-glow)" opacity="0.5" />
        <circle cx="320" cy="200" r="3" fill="#8fe3ff" />
        <circle cx="320" cy="200" r="1.2" fill="#fff" />
      </motion.g>
      <text x="318" y="214" fontSize="8" fill="#8fe3ff" fontFamily="Inter, sans-serif" fontWeight="500" textAnchor="end">
        Sydney
      </text>

      {/* ===== Flight arc (Mumbai -> Sydney) ===== */}
      {/* glowing underline */}
      <path
        d="M 48 76 Q 190 60 320 200"
        stroke="url(#arc-grad)"
        strokeWidth="4"
        fill="none"
        opacity="0.5"
        filter="url(#path-glow)"
      />
      <motion.path
        d="M 48 76 Q 190 60 320 200"
        stroke="url(#arc-grad)"
        strokeWidth="1.8"
        strokeDasharray="5 4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3.5, ease: 'easeOut' }}
      />

      {/* ===== Plane flying along the arc ===== */}
      <motion.g
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          offsetPath: "path('M 48 76 Q 190 60 320 200')",
          offsetRotate: 'auto',
        }}
      >
        <g transform="translate(-10, -6)">
          {/* trail */}
          <path d="M-14 6 L0 6" stroke="rgba(255,246,213,0.6)" strokeWidth="1" strokeLinecap="round" />
          {/* plane */}
          <path
            d="M0 6 L10 2 L16 0 L14 10 L22 6 L12 14 L0 12 Z"
            fill="#fff6d5"
            stroke="#f6d8a0"
            strokeWidth="0.6"
          />
        </g>
      </motion.g>

      {/* ===== Compass rose (top-right) ===== */}
      <g transform="translate(314, 20)" opacity="0.5">
        <circle r="10" fill="none" stroke="rgba(201,160,255,0.4)" strokeWidth="0.6" />
        <path d="M0 -10 L2 0 L0 10 L-2 0 Z" fill="rgba(246,216,160,0.6)" />
        <text y="-13" fontSize="5" fill="rgba(246,216,160,0.8)" fontFamily="Inter, sans-serif" textAnchor="middle">N</text>
      </g>

      {/* frame border */}
      <rect x="0.5" y="0.5" width="339" height="219" fill="none" stroke="rgba(201,160,255,0.25)" strokeWidth="1" rx="14" />
    </svg>
  );
}

export function HarbourScene() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2, y: 10 }}
      whileInView={{ opacity: 1, rotate: -1.5, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'inline-block',
        padding: '0.75rem 0.75rem 1.75rem',
        background: 'linear-gradient(145deg, #fdf6e8 0%, #f5e8d0 100%)',
        borderRadius: 10,
        boxShadow:
          '0 30px 60px rgba(0,0,0,0.55), 0 0 40px rgba(255,143,179,0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
        maxWidth: 320,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          borderRadius: 4,
          lineHeight: 0,
        }}
      >
        <img
          src="/darling-harbour.jpg"
          alt="Darling Harbour, Sydney"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            filter: 'saturate(1.05) contrast(1.03)',
          }}
          loading="lazy"
        />
        {/* subtle vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.25) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* tiny heart pin */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '18%',
            right: '8%',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path
              d="M12 21 C4 15 2 10 5 6 C8 3 11 5 12 7 C13 5 16 3 19 6 C22 10 20 15 12 21 Z"
              fill="#ff5a85"
              stroke="#fff"
              strokeWidth="1.2"
            />
          </svg>
        </motion.div>
      </div>
      {/* polaroid caption */}
      <div
        style={{
          marginTop: '0.6rem',
          textAlign: 'center',
          fontFamily: "'Dancing Script', cursive",
          fontSize: '1.1rem',
          color: '#2d1a4a',
          letterSpacing: '0.02em',
        }}
      >
        Darling Harbour · 14 Oct
      </div>
    </motion.div>
  );
}

export function FlowerScene() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90">
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '45px 45px' }}
      >
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="45"
            cy="25"
            rx="8"
            ry="14"
            fill="#ff8fb3"
            opacity="0.85"
            transform={`rotate(${a} 45 45)`}
          />
        ))}
      </motion.g>
      <circle cx="45" cy="45" r="7" fill="#f6d8a0" />
    </svg>
  );
}

export function RingScene() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <defs>
        <radialGradient id="diamond">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#8fe3ff" />
        </radialGradient>
      </defs>
      <ellipse cx="40" cy="55" rx="20" ry="18" stroke="#f6d8a0" strokeWidth="3" fill="none" />
      <motion.g
        animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ transformOrigin: '40px 32px' }}
      >
        <polygon points="40,20 46,32 40,44 34,32" fill="url(#diamond)" />
        <polygon points="40,20 46,32 40,32" fill="#fff" opacity="0.6" />
      </motion.g>
      <motion.circle
        cx="40"
        cy="32"
        r="18"
        fill="#fff"
        opacity="0"
        animate={{ opacity: [0, 0.3, 0], scale: [0.5, 1.4, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </svg>
  );
}

export function AdmireScene({
  quote = 'I look up to you, Pookie.',
  traits = ['family', 'kindness', 'care', 'discipline', 'softness'],
  signature = 'from Sweets, with love',
  accent = '#ff8fb3',
  glow = 'rgba(255, 143, 179, 0.5)',
} = {}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.3 }}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '0.6rem',
        maxWidth: 300,
      }}
    >
      {/* floating script line */}
      <div
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: '1.5rem',
          color: accent,
          textAlign: 'center',
          letterSpacing: '0.02em',
          textShadow: `0 0 24px ${glow}`,
        }}
      >
        {quote}
      </div>

      {/* trait pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.4rem',
        }}
      >
        {traits.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            viewport={{ once: true }}
            style={{
              padding: '0.3rem 0.75rem',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#ffe4e8',
              background: `linear-gradient(135deg, ${accent}2e, rgba(201,160,255,0.1))`,
              border: `1px solid ${accent}5a`,
              borderRadius: 999,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            {t}
          </motion.span>
        ))}
      </div>

      {/* heart signature */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          marginTop: '0.2rem',
          fontFamily: "'Dancing Script', cursive",
          color: accent,
          fontSize: '1rem',
          opacity: 0.9,
        }}
      >
        {signature}
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{ display: 'inline-block' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path
              d="M12 21 C4 15 2 10 5 6 C8 3 11 5 12 7 C13 5 16 3 19 6 C22 10 20 15 12 21 Z"
              fill={accent}
            />
          </svg>
        </motion.span>
      </div>
    </motion.div>
  );
}

export function PhuketScene() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 2, y: 10 }}
      whileInView={{ opacity: 1, rotate: 1.5, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'inline-block',
        padding: '0.75rem 0.75rem 1.75rem',
        background: 'linear-gradient(145deg, #fdf6e8 0%, #f5e8d0 100%)',
        borderRadius: 10,
        boxShadow:
          '0 30px 60px rgba(0,0,0,0.55), 0 0 50px rgba(143,227,255,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
        maxWidth: 300,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          borderRadius: 4,
          lineHeight: 0,
        }}
      >
        <img
          src="/phuket.jpg"
          alt="Phuket, Thailand"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            filter: 'saturate(1.05) contrast(1.03)',
          }}
          loading="lazy"
        />
        {/* soft vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.3) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* "Coming Soon" badge */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '0.3rem 0.65rem',
            background: 'linear-gradient(135deg, #ff8fb3, #d6314e)',
            borderRadius: 999,
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#fff',
            textTransform: 'uppercase',
            boxShadow: '0 4px 14px rgba(214,49,78,0.5)',
          }}
        >
          Coming Soon
        </motion.div>
        {/* bottom overlay "To Be Continued" */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '1.5rem 0.75rem 0.5rem',
            background:
              'linear-gradient(180deg, transparent, rgba(0,0,0,0.75))',
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '0.85rem',
            color: '#ffe4bd',
            letterSpacing: '0.08em',
          }}
        >
          ✨ to be continued ✨
        </div>
      </div>
      {/* polaroid caption */}
      <div
        style={{
          marginTop: '0.6rem',
          textAlign: 'center',
          fontFamily: "'Dancing Script', cursive",
          fontSize: '1.1rem',
          color: '#2d1a4a',
          letterSpacing: '0.02em',
        }}
      >
        Phuket · 29.Dec → 02.Jan
      </div>
    </motion.div>
  );
}

export function BeachScene() {
  return (
    <svg width="160" height="80" viewBox="0 0 160 80">
      <defs>
        <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8fb3" />
          <stop offset="60%" stopColor="#f6d8a0" />
          <stop offset="100%" stopColor="#8fe3ff" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="160" height="55" fill="url(#sunset)" opacity="0.9" />
      <circle cx="80" cy="40" r="14" fill="#fff8dc" opacity="0.95" />
      <rect x="0" y="55" width="160" height="25" fill="#2a4a6a" opacity="0.85" />
      <motion.path
        d="M0 60 Q20 56 40 60 T 80 60 T 120 60 T 160 60"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        fill="none"
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <path d="M20 55 L22 30" stroke="#4a3020" strokeWidth="2" />
      <path d="M22 30 Q10 24 6 28 M22 30 Q34 24 38 28 M22 30 Q14 20 10 18 M22 30 Q30 20 34 18" stroke="#2d6a4f" strokeWidth="2" fill="none" />
    </svg>
  );
}
