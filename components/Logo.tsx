interface LogoProps {
  size?: number;
  className?: string;
  title?: string;
}

export function Logo({
  size = 72,
  className = "",
  title = "Hand Betting Game",
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="#1a2332"
        stroke="#d4a853"
        strokeWidth="1.5"
      />
      <path d="M32 5 L37 13 L27 13 Z" fill="#3d9970" />
      <rect x="30" y="13" width="4" height="5" rx="1" fill="#3d9970" />
      <path d="M32 59 L37 51 L27 51 Z" fill="#c44536" />
      <rect x="30" y="46" width="4" height="5" rx="1" fill="#c44536" />
      <g transform="rotate(-14 18 36)">
        <rect
          x="7"
          y="22"
          width="20"
          height="28"
          rx="3"
          fill="#faf6ee"
          stroke="#c9b896"
          strokeWidth="1.2"
        />
        <line x1="11" y1="30" x2="23" y2="30" stroke="#3d9970" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="36" x2="23" y2="36" stroke="#3d9970" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="42" x2="23" y2="42" stroke="#3d9970" strokeWidth="2" strokeLinecap="round" />
      </g>
      <rect
        x="22"
        y="18"
        width="20"
        height="28"
        rx="3"
        fill="#faf6ee"
        stroke="#c9b896"
        strokeWidth="1.2"
      />
      <rect x="27" y="26" width="10" height="12" rx="1" fill="#c44536" />
      <line x1="32" y1="28" x2="32" y2="36" stroke="#faf6ee" strokeWidth="1.5" />
      <line x1="29" y1="32" x2="35" y2="32" stroke="#faf6ee" strokeWidth="1.5" />
      <g transform="rotate(14 46 36)">
        <rect
          x="37"
          y="22"
          width="20"
          height="28"
          rx="3"
          fill="#faf6ee"
          stroke="#c9b896"
          strokeWidth="1.2"
        />
        <circle cx="43" cy="30" r="2.2" fill="#5b9bd5" />
        <circle cx="51" cy="30" r="2.2" fill="#5b9bd5" />
        <circle cx="47" cy="38" r="2.2" fill="#5b9bd5" />
        <circle cx="43" cy="44" r="2.2" fill="#5b9bd5" />
        <circle cx="51" cy="44" r="2.2" fill="#5b9bd5" />
      </g>
    </svg>
  );
}
