import { useEffect, useMemo, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// This faithfully mirrors the original Python program's data + logic.
// Nothing about the code's behavior or its printed wording has been changed —
// only wrapped in a playable, animated terminal-style website.
// ---------------------------------------------------------------------------

const ALPHABET = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
];

const ENCRYPTED_MESSAGE =
  ' znkxk gxk suxk vuyyohrk inkyy mgsky zngt gzusy ot znk uhykxbghrk atobkxyk ! ';

const SHIFT_AMOUNT = 6;

const ART_LOGO = String.raw`   ____ _       _
  / ___(_)_ __ | |__   ___ _ __
 | |   | | '_ \| '_ \ / _ \ '__|
 | |___| | |_) | | | |  __/ |
  \____|_| .__/|_| |_|\___|_|
         |_|`;

function decrypt(message: string, shiftAmount: number): string {
  let outputText = '';
  for (const letter of message) {
    if (!ALPHABET.includes(letter)) {
      outputText += letter;
    } else {
      let shiftedPosition = ALPHABET.indexOf(letter) - shiftAmount;
      shiftedPosition =
        ((shiftedPosition % ALPHABET.length) + ALPHABET.length) %
        ALPHABET.length;
      outputText += ALPHABET[shiftedPosition];
    }
  }
  return outputText;
}

const SOURCE_CODE = `import art
alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
print("Welcome to this program !")
print(art.logo)
flag = True
while flag == True :
    number = int(input("Choose a number between 0-9 to decrypt the message : "))
    encrypted_message = " znkxk gxk suxk vuyyohrk inkyy mgsky zngt gzusy ot znk uhykxbghrk atobkxyk ! "
    print(encrypted_message)

    output_text = ""
    shift_amount = 6
    if number == 4 :
        for letter in encrypted_message :
            if letter not in alphabet:
                output_text += letter
            else :
                shifted_position = alphabet.index(letter) - shift_amount
                shifted_position %= len(alphabet)
                output_text += alphabet[shifted_position]
        print(f"Good job you got it ! The encrypted message was : {output_text}")
        flag = False
    else :
        print("Sorry try again !")`;

type LogLine = {
  id: number;
  text: string;
  tone: 'system' | 'input' | 'success' | 'fail' | 'logo' | 'prompt';
};

export default function Terminal() {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [value, setValue] = useState('');
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [booted, setBooted] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const nextId = () => {
    idRef.current += 1;
    return idRef.current;
  };

  const push = (text: string, tone: LogLine['tone']) => {
    setLines((prev) => [...prev, { id: nextId(), text, tone }]);
  };

  useEffect(() => {
    push('Welcome to this program !', 'system');
    push(ART_LOGO, 'logo');
    const t = setTimeout(() => setBooted(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [lines]);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (solved) return;
    const raw = value.trim();
    if (raw === '') return;

    // Mirrors Python's int(input(...)): only a fully valid integer literal
    // parses; anything else raises (here, just treated as a failed guess).
    const isValidInt = /^[+-]?\d+$/.test(raw);
    const number = isValidInt ? parseInt(raw, 10) : NaN;
    push(raw, 'input');
    setValue('');

    // The Python loop prints encrypted_message on every iteration, right
    // after reading input.
    push(ENCRYPTED_MESSAGE, 'system');

    if (number === 4) {
      const decoded = decrypt(ENCRYPTED_MESSAGE, SHIFT_AMOUNT);
      push(
        `Good job you got it ! The encrypted message was : ${decoded}`,
        'success',
      );
      setSolved(true);
    } else {
      push('Sorry try again !', 'fail');
      setAttempts((a) => a + 1);
    }
  };

  const confetti = useMemo(() => {
    if (!solved) return [];
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 2.4 + Math.random() * 1.8,
      char: '#$%&01¤*+'[Math.floor(Math.random() * 9)],
      hue: Math.floor(Math.random() * 360),
    }));
  }, [solved]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#04070a] text-[#39ff88] font-mono selection:bg-[#39ff88] selection:text-black">
      <ScanlineOverlay />
      <GridBackdrop />

      {solved && (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
          {confetti.map((c) => (
            <span
              key={c.id}
              className="absolute top-[-5%] text-lg font-bold"
              style={{
                left: `${c.left}%`,
                animation: `cipher-fall ${c.duration}s linear ${c.delay}s infinite`,
                color: `hsl(${c.hue} 90% 60%)`,
                textShadow: '0 0 6px currentColor',
              }}
            >
              {c.char}
            </span>
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#39ff88]/60">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#39ff88]" />
            live decoder terminal
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#39ff88] sm:text-3xl">
            <span className="text-[#39ff88]/40">$</span> the obscurable
            universe cipher
          </h1>
          <p className="text-sm text-[#39ff88]/50">
            A Caesar-shift decoding game, ported straight from a Python
            console script — same logic, same wording, zero changes.
          </p>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-[#39ff88]/25 bg-black/60 shadow-[0_0_40px_-10px_rgba(57,255,136,0.35)] backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-[#39ff88]/20 bg-[#39ff88]/5 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 text-xs text-[#39ff88]/60">
              python3 cipher_game.py
            </span>
            <span className="ml-auto text-xs text-[#39ff88]/40">
              attempts: {attempts}
            </span>
          </div>

          <div
            ref={scrollRef}
            className="min-h-[360px] flex-1 space-y-2 overflow-y-auto px-4 py-4 text-sm leading-relaxed sm:text-[15px]"
            data-testid="terminal-output"
          >
            {lines.map((line) => (
              <TerminalLine key={line.id} line={line} />
            ))}

            {!solved && booted && (
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 pt-1"
              >
                <span className="text-[#39ff88]/70">
                  Choose a number between 0-9 to decrypt the message :
                </span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  inputMode="numeric"
                  autoComplete="off"
                  className="w-16 border-none bg-transparent text-[#39ff88] caret-[#39ff88] outline-none placeholder:text-[#39ff88]/30"
                  placeholder="_"
                  data-testid="input-number"
                  aria-label="Choose a number between 0-9 to decrypt the message"
                />
              </form>
            )}

            {solved && (
              <div className="pt-2 text-xs text-[#39ff88]/50">
                flag = False — program complete.
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#39ff88]/20 bg-[#39ff88]/5 px-4 py-3">
            <button
              onClick={() => setShowSource((s) => !s)}
              data-testid="button-toggle-source"
              className="rounded border border-[#39ff88]/30 px-3 py-1.5 text-xs uppercase tracking-wider text-[#39ff88]/80 transition-colors hover:border-[#39ff88] hover:bg-[#39ff88]/10 hover:text-[#39ff88]"
            >
              {showSource ? 'hide source.py' : 'view source.py'}
            </button>
            {solved && (
              <button
                onClick={() => window.location.reload()}
                data-testid="button-restart"
                className="rounded border border-[#39ff88] bg-[#39ff88]/10 px-3 py-1.5 text-xs uppercase tracking-wider text-[#39ff88] shadow-[0_0_15px_-3px_rgba(57,255,136,0.6)] transition-colors hover:bg-[#39ff88]/20"
              >
                run it again
              </button>
            )}
          </div>
        </div>

        {showSource && (
          <div className="mt-6 overflow-hidden rounded-lg border border-[#39ff88]/25 bg-black/70">
            <div className="border-b border-[#39ff88]/20 bg-[#39ff88]/5 px-4 py-2 text-xs text-[#39ff88]/60">
              cipher_game.py — unmodified
            </div>
            <pre className="overflow-x-auto px-4 py-4 text-xs leading-relaxed text-[#39ff88]/80 sm:text-[13px]">
              <code>{SOURCE_CODE}</code>
            </pre>
          </div>
        )}

        <footer className="mt-6 text-center text-xs text-[#39ff88]/30">
          shift amount is a secret. the console never lies, it just waits for
          the right number.
        </footer>
      </div>

      <style>{`
        @keyframes cipher-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

function TerminalLine({ line }: { line: LogLine }) {
  if (line.tone === 'logo') {
    return (
      <pre className="whitespace-pre text-[#39ff88]/90 text-[11px] leading-tight sm:text-sm">
        {line.text}
      </pre>
    );
  }
  if (line.tone === 'input') {
    return (
      <div className="text-[#39ff88]/80">
        <span className="text-[#39ff88]/40">&gt; </span>
        {line.text}
      </div>
    );
  }
  if (line.tone === 'success') {
    return (
      <div
        className="font-semibold text-[#7dffb0]"
        data-testid="text-success"
      >
        {line.text}
      </div>
    );
  }
  if (line.tone === 'fail') {
    return (
      <div className="text-[#ff6b6b]" data-testid="text-fail">
        {line.text}
      </div>
    );
  }
  if (line.tone === 'prompt') {
    return <div className="text-[#39ff88]/70">{line.text}</div>;
  }
  return <div className="whitespace-pre-wrap text-[#39ff88]/70">{line.text}</div>;
}

function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 opacity-[0.06]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, #39ff88 0px, transparent 1px, transparent 2px, #39ff88 3px)',
      }}
    />
  );
}

function GridBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.08]"
      style={{
        backgroundImage:
          'linear-gradient(#39ff88 1px, transparent 1px), linear-gradient(90deg, #39ff88 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />
  );
}
