"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Cell = "X" | "O" | null;
type GamePhase = "playing" | "won" | "draw";

const PLAYER: Cell = "X";
const CPU: Cell = "O";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

const EMPTY_BOARD: Cell[] = Array(9).fill(null);
const SCROLL_HIDE_THRESHOLD = 80;
const AI_DELAY_MS = 520;

function getWinningLine(board: Cell[]): number[] | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [...line];
    }
  }
  return null;
}

function checkWinner(board: Cell[]): Cell | null {
  const line = getWinningLine(board);
  return line ? board[line[0]] : null;
}

function getAvailableMoves(board: Cell[]): number[] {
  return board.map((c, i) => (c ? -1 : i)).filter((i) => i >= 0);
}

function minimax(board: Cell[], maximizing: boolean): number {
  const winner = checkWinner(board);
  if (winner === CPU) return 10;
  if (winner === PLAYER) return -10;
  if (getAvailableMoves(board).length === 0) return 0;

  if (maximizing) {
    let best = -Infinity;
    for (const move of getAvailableMoves(board)) {
      board[move] = CPU;
      best = Math.max(best, minimax(board, false));
      board[move] = null;
    }
    return best;
  }

  let best = Infinity;
  for (const move of getAvailableMoves(board)) {
    board[move] = PLAYER;
    best = Math.min(best, minimax(board, true));
    board[move] = null;
  }
  return best;
}

function getBestAiMove(board: Cell[]): number {
  let bestScore = -Infinity;
  let bestMove = getAvailableMoves(board)[0] ?? 0;

  for (const move of getAvailableMoves(board)) {
    board[move] = CPU;
    const score = minimax(board, false);
    board[move] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

function useDesktopOnly() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function useNearTop(threshold = SCROLL_HIDE_THRESHOLD) {
  const [nearTop, setNearTop] = useState(true);

  useEffect(() => {
    const readScroll = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setNearTop(y <= threshold);
    };

    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });
    document.addEventListener("scroll", readScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", readScroll);
      document.removeEventListener("scroll", readScroll);
    };
  }, [threshold]);

  return nearTop;
}

function MarkIcon({ mark, winning }: { mark: Cell; winning?: boolean }) {
  if (mark === "X") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <motion.line
          x1="6"
          y1="6"
          x2="18"
          y2="18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        />
        <motion.line
          x1="18"
          y1="6"
          x2="6"
          y2="18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.28, delay: 0.08, ease: "easeOut" }}
        />
      </svg>
    );
  }

  if (mark === "O") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <motion.circle
          cx="12"
          cy="12"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            scale: winning ? [1, 1.12, 1] : 1,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </svg>
    );
  }

  return null;
}

function GameCell({
  index,
  cell,
  winning,
  disabled,
  reduceMotion,
  onPlay,
}: {
  index: number;
  cell: Cell;
  winning: boolean;
  disabled: boolean;
  reduceMotion: boolean | null;
  onPlay: (index: number) => void;
}) {
  const isX = cell === "X";
  const isO = cell === "O";

  return (
    <motion.button
      type="button"
      onClick={() => onPlay(index)}
      disabled={disabled || Boolean(cell)}
      aria-label={cell ? `Cell ${index + 1}, ${cell}` : `Empty cell ${index + 1}`}
      className={cn(
        "group relative h-[46px] w-[46px] [perspective:420px]",
        "disabled:cursor-default"
      )}
      whileHover={
        !disabled && !cell && !reduceMotion
          ? { scale: 1.06, rotateX: -6, rotateY: 6, z: 12 }
          : undefined
      }
      whileTap={!disabled && !cell ? { scale: 0.94 } : undefined}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-xl border transition-all duration-300",
          "bg-gradient-to-br from-white/[0.07] to-white/[0.02]",
          winning
            ? "border-deweb-cyan/70 shadow-[0_0_22px_rgba(0,242,255,0.45)]"
            : "border-white/10 group-hover:border-deweb-cyan/35",
          !cell && !disabled && "group-hover:shadow-[0_0_16px_rgba(0,242,255,0.15)]"
        )}
        style={{ transform: "translateZ(0)" }}
      />

      <AnimatePresence mode="wait">
        {cell && (
          <motion.div
            key={`${index}-${cell}`}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, rotateY: -90, scale: 0.6, z: 20 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, rotateY: 0, scale: 1, z: 20 }
            }
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-xl",
              isX && "text-deweb-cyan drop-shadow-[0_0_10px_rgba(0,242,255,0.55)]",
              isO && "text-sky-300 drop-shadow-[0_0_10px_rgba(125,211,252,0.45)]",
              winning && "animate-pulse"
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            <MarkIcon mark={cell} winning={winning} />
          </motion.div>
        )}
      </AnimatePresence>

      {!cell && !disabled && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="h-1.5 w-1.5 rounded-full bg-deweb-cyan/50 shadow-[0_0_8px_rgba(0,242,255,0.6)]" />
        </span>
      )}
    </motion.button>
  );
}

function WinLineOverlay({ line }: { line: number[] }) {
  const lineIndex = WIN_LINES.findIndex(
    (l) => l[0] === line[0] && l[1] === line[1] && l[2] === line[2]
  );
  if (lineIndex < 0) return null;

  const cell = 46;
  const gap = 6;
  const pad = 4;
  const center = (i: number) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    return {
      x: pad + col * (cell + gap) + cell / 2,
      y: pad + row * (cell + gap) + cell / 2,
    };
  };

  const a = center(line[0]);
  const c = center(line[2]);
  const x1 = a.x;
  const y1 = a.y;
  const x2 = c.x;
  const y2 = c.y;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
      aria-hidden
    >
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#win-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ filter: "drop-shadow(0 0 8px rgba(0,242,255,0.9))" }}
      />
      <defs>
        <linearGradient id="win-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,242,255,0.2)" />
          <stop offset="50%" stopColor="#00f2ff" />
          <stop offset="100%" stopColor="rgba(0,242,255,0.2)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TicTacToeFloating() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useDesktopOnly();
  const nearTop = useNearTop();
  const [mounted, setMounted] = useState(false);
  const [board, setBoard] = useState<Cell[]>(EMPTY_BOARD);
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [aiThinking, setAiThinking] = useState(false);
  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    return () => {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    };
  }, []);

  const winner = useMemo(() => checkWinner(board), [board]);
  const winningLine = useMemo(() => getWinningLine(board), [board]);
  const canPlay = phase === "playing" && !winner && !aiThinking;

  const statusText = useMemo(() => {
    if (aiThinking) return "CPU thinking…";
    if (winner === PLAYER) return "You win!";
    if (winner === CPU) return "CPU wins";
    if (phase === "draw") return "Draw";
    return "Your turn";
  }, [aiThinking, winner, phase]);

  const reset = useCallback(() => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    setBoard(EMPTY_BOARD);
    setPhase("playing");
    setAiThinking(false);
  }, []);

  const finishRound = useCallback((next: Cell[]) => {
    const w = checkWinner(next);
    if (w) {
      setPhase("won");
      return;
    }
    if (next.every(Boolean)) {
      setPhase("draw");
    }
  }, []);

  const runAiTurn = useCallback(
    (currentBoard: Cell[]) => {
      setAiThinking(true);
      aiTimerRef.current = setTimeout(() => {
        const move = getBestAiMove([...currentBoard]);
        const next = [...currentBoard] as Cell[];
        next[move] = CPU;
        setBoard(next);
        setAiThinking(false);
        finishRound(next);
      }, AI_DELAY_MS);
    },
    [finishRound]
  );

  const playCell = useCallback(
    (index: number) => {
      if (!canPlay || board[index]) return;

      const next = [...board] as Cell[];
      next[index] = PLAYER;
      setBoard(next);

      const w = checkWinner(next);
      if (w || next.every(Boolean)) {
        finishRound(next);
        return;
      }

      runAiTurn(next);
    },
    [board, canPlay, finishRound, runAiTurn]
  );

  const visible = mounted && isDesktop && nearTop;
  const showWinBanner = phase === "won" && winner;

  if (!mounted || typeof document === "undefined") return null;
  if (!isDesktop) return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          key="tic-tac-toe-floating"
          initial={reduceMotion ? false : { opacity: 0, x: -20, y: -10, rotateY: -12 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, rotateY: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -20, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed left-6 z-[45] w-[180px] [perspective:900px]"
          style={{ top: "120px" }}
        >
          <motion.div
            className={cn(
              "pointer-events-auto relative overflow-hidden rounded-2xl border p-3",
              "border-deweb-cyan/25 bg-[rgba(8,14,26,0.9)] backdrop-blur-xl",
              "shadow-[0_0_0_1px_rgba(0,242,255,0.08)_inset,0_12px_40px_rgba(0,0,0,0.55),0_0_32px_rgba(0,242,255,0.1)]",
              "transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(0,242,255,0.14)_inset,0_16px_48px_rgba(0,0,0,0.6),0_0_44px_rgba(0,242,255,0.16)]"
            )}
            style={{ transformStyle: "preserve-3d" }}
            animate={
              reduceMotion
                ? undefined
                : {
                    rotateX: [0, 2, 0, -1, 0],
                    rotateY: [0, -3, 0, 2, 0],
                  }
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            role="application"
            aria-label="Mini tic-tac-toe game versus CPU"
          >
            <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-deweb-cyan/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-sky-500/10 blur-2xl" />

            <div className="relative mb-2.5 flex items-center justify-between gap-2">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-deweb-cyan/70">
                  Tic Tac Toe
                </p>
                <p className="text-[10px] text-white/45">You · X vs CPU · O</p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-white/55 transition-all hover:border-deweb-cyan/40 hover:text-deweb-cyan hover:shadow-[0_0_12px_rgba(0,242,255,0.2)]"
                aria-label="Reset game"
              >
                Reset
              </button>
            </div>

            <div className="relative mb-2.5 h-5 overflow-hidden rounded-full border border-white/8 bg-black/25 px-2">
              <motion.p
                key={statusText}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "text-center text-[10px] font-semibold leading-5",
                  winner === PLAYER && "text-deweb-cyan",
                  winner === CPU && "text-sky-300",
                  phase === "draw" && "text-white/60",
                  !winner && phase === "playing" && "text-white/65"
                )}
              >
                {statusText}
              </motion.p>
            </div>

            <div className="relative mx-auto w-fit [perspective:600px]">
              <motion.div
                className="relative grid grid-cols-3 gap-1.5 rounded-xl p-1"
                style={{ transformStyle: "preserve-3d" }}
                animate={
                  aiThinking && !reduceMotion
                    ? { rotateX: 4, rotateY: -2, scale: 0.98 }
                    : { rotateX: 0, rotateY: 0, scale: 1 }
                }
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {winningLine && <WinLineOverlay line={winningLine} />}

                {board.map((cell, i) => (
                  <GameCell
                    key={i}
                    index={i}
                    cell={cell}
                    winning={Boolean(winningLine?.includes(i))}
                    disabled={!canPlay}
                    reduceMotion={reduceMotion}
                    onPlay={playCell}
                  />
                ))}
              </motion.div>

              <AnimatePresence>
                {showWinBanner && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, rotateX: -40 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={cn(
                        "rounded-xl border px-4 py-2 text-center shadow-2xl backdrop-blur-md",
                        winner === PLAYER
                          ? "border-deweb-cyan/60 bg-deweb-cyan/15 text-deweb-cyan shadow-[0_0_30px_rgba(0,242,255,0.45)]"
                          : "border-sky-400/50 bg-sky-500/15 text-sky-200 shadow-[0_0_30px_rgba(56,189,248,0.35)]"
                      )}
                    >
                      <p className="text-lg font-black uppercase tracking-[0.25em]">
                        {winner === PLAYER ? "Win" : "Loss"}
                      </p>
                      <p className="text-[9px] font-medium uppercase tracking-widest opacity-70">
                        {winner === PLAYER ? "Nice move!" : "Try again"}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
