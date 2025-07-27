export const EmailIllustration = () => {
  return (
    <div className="relative max-w-lg mx-auto mt-1">
      <svg
        viewBox="0 0 400 500"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Email Container */}
        <rect
          x="20"
          y="40"
          width="360"
          height="420"
          rx="12"
          fill="white"
          stroke="purple"
          strokeWidth="1"
        />
        
        {/* Header */}
        <rect
          x="20"
          y="40"
          width="360"
          height="50"
          rx="12"
          fill="#7c3bed"
        />
        
        {/* Gmail dots */}
        <circle cx="50" cy="65" r="4" fill="white" opacity="0.8" />
        <circle cx="65" cy="65" r="4" fill="white" opacity="0.8" />
        <circle cx="80" cy="65" r="4" fill="white" opacity="0.8" />
        
        {/* Email title */}
        <text x="120" y="70" fill="white" fontSize="14" fontWeight="600">
          Gmail - Job Application Update
        </text>
        
        {/* First Email - Rejection */}
        <rect
          x="40"
          y="110"
          width="320"
          height="140"
          rx="8"
          fill="#f2f6fa"
          stroke="#7c3bed"
          strokeWidth="1"
        />
        
        {/* From line */}
        <text x="50" y="130" fill="hsl(var(--muted-foreground))" fontSize="12" fontWeight="600">
          From: hr@techcorp.com
        </text>
        <text x="50" y="145" fill="hsl(var(--muted-foreground))" fontSize="10">
          To: john.doe@email.com
        </text>
        <text x="50" y="160" fill="hsl(var(--muted-foreground))" fontSize="10">
          Subject: Re: Software Engineer Position
        </text>
        
        {/* Email content */}
        <text x="50" y="180" fill="hsl(var(--foreground))" fontSize="11">
          Dear John,
        </text>
        <text x="50" y="195" fill="hsl(var(--foreground))" fontSize="11">
          Thank you for your interest in our Software
        </text>
        <text x="50" y="210" fill="hsl(var(--foreground))" fontSize="11">
          Engineer position. After careful consideration,
        </text>
        <text x="50" y="225" fill="hsl(var(--foreground))" fontSize="11">
          we've decided to move forward with another
        </text>
        <text x="50" y="240" fill="hsl(var(--foreground))" fontSize="11">
          candidate whose experience more closely...
        </text>
        
        {/* Reply Email */}
        <rect
          x="40"
          y="270"
          width="320"
          height="120"
          rx="8"
          fill="#f2f6fa"
          stroke="#7c3bed"
          strokeWidth="1"
          opacity="0.9"
        />
        
        {/* Reply header */}
        <text x="50" y="290" fill="hsl(var(--accent-foreground))" fontSize="12" fontWeight="600">
          From: john.doe@email.com
        </text>
        <text x="50" y="305" fill="hsl(var(--muted-foreground))" fontSize="10">
          To: hr@techcorp.com
        </text>
        <text x="50" y="320" fill="hsl(var(--muted-foreground))" fontSize="10">
          Subject: Re: Software Engineer Position
        </text>
        
        {/* Reply content */}
        <text x="50" y="340" fill="hsl(var(--accent-foreground))" fontSize="11">
          Thank you for the thoughtful response!
        </text>
        <text x="50" y="355" fill="hsl(var(--accent-foreground))" fontSize="11">
          I really appreciate you taking the time to
        </text>
        <text x="50" y="370" fill="hsl(var(--accent-foreground))" fontSize="11">
          provide feedback instead of ghosting. 😊
        </text>
        
        {/* Floating elements */}
        <g opacity="0.6">
          {/* Heart */}
          <path
            d="M 320 140 C 320 135, 325 130, 330 130 C 335 130, 340 135, 340 140 C 340 145, 330 155, 330 155 C 330 155, 320 145, 320 140"
            fill="#f08b8c"
          />
          
          {/* Thumbs up */}
          <g transform="translate(320, 300)">
            <rect x="0" y="10" width="6" height="15" rx="3" fill="red" />
            <rect x="6" y="15" width="12" height="10" rx="2" fill="red" />
            <path d="M 6 15 C 6 10, 10 8, 12 10 L 12 15" fill="red" />
          </g>
          
          {/* Sparkles */}
          <g opacity="0.8">
            <circle cx="90" cy="420" r="2" fill="purple" />
            <circle cx="350" cy="420" r="1.5" fill="purple" />
            <circle cx="60" cy="100" r="1" fill="purple" />
          </g>
        </g>
        
        {/* Decorative lines */}
        <defs>
          <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="blue" stopOpacity="0" />
            <stop offset="50%" stopColor="blue" stopOpacity="0.6" />
            <stop offset="100%" stopColor="blue" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="40" y1="410" x2="360" y2="410" stroke="url(#gradientLine)" strokeWidth="1" />
        
        {/* AI Generation indicator */}
        <g transform="translate(300, 440)">
          <rect x="0" y="0" width="60" height="20" rx="10" fill="purple" opacity="0.2" />
          <text x="30" y="12" textAnchor="middle" fill="black" fontSize="8" fontWeight="600">
            AI Generated
          </text>
        </g>
      </svg>
    </div>
  );
};