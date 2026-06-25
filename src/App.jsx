import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const mockResult = {
  echo: "Ich kehre in mich selbst zurück, und finde eine Welt.",
  source_signature: "—— 约翰·沃尔夫冈·冯·歌德 《少年维特的烦恼》 (1774年)",
  decipher:
    "“我退回到自己的内心，并在那里发现了一个世界。” 1774年的那个5月，陷入孤绝与内耗的维特，在向内求索中获得了一种近乎自毁的平静。",
  relief:
    "当外界的喧嚣让你感到无所适从时，向内收缩并不是逃避，而是一种自救。你的内心本身就是一个足够辽阔的宇宙，今天就在那里安营扎寨吧。",
};

const loadingDurationMs = 2600;

const layerVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const resultStackVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.65,
      delayChildren: 0.05,
    },
  },
};

function App() {
  const [phase, setPhase] = useState("idle");
  const [draft, setDraft] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const timeoutRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (phase === "idle") {
      textareaRef.current?.focus();
    }
  }, [phase]);

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && phase !== "idle") {
        resetExperience();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase]);

  const submitTrouble = () => {
    const cleaned = draft.trim();

    if (!cleaned || phase === "loading") {
      return;
    }

    setSubmittedText(cleaned);
    setPhase("loading");
    timeoutRef.current = window.setTimeout(() => {
      setPhase("result");
    }, loadingDurationMs);
  };

  const resetExperience = () => {
    window.clearTimeout(timeoutRef.current);
    setPhase("idle");
    setDraft("");
    setSubmittedText("");
  };

  const handleTextareaKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitTrouble();
    }
  };

  const showInput = phase === "idle" || phase === "loading";

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-ink-950 text-mist-50 transition-colors duration-[2200ms] ${
        phase === "loading" ? "bg-[#020305]" : "bg-ink-950"
      }`}
    >
      <AnimatedBackdrop phase={phase} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,9,0.36),rgba(6,7,9,0.92))]" />

      <div className="relative flex min-h-screen items-center justify-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            {showInput ? (
              <motion.section
                key="idle"
                initial={{ opacity: 0, y: 24 }}
                animate={
                  phase === "idle"
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 140, scale: 0.985 }
                }
                exit={{ opacity: 0, y: 160, transition: { duration: 0.9 } }}
                transition={{ duration: phase === "loading" ? 1.9 : 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex min-h-[48vh] max-w-3xl items-center justify-center"
              >
                <div className="w-full">
                  <div className="mb-5 flex items-center justify-between text-[11px] uppercase tracking-[0.42em] text-mist-300/45">
                    <span>回声打捞</span>
                    <span className="font-serif normal-case tracking-[0.18em] text-ember-200/40">
                      Sink and Emerge
                    </span>
                  </div>

                  <div className="px-1 py-4 sm:px-2 sm:py-6">
                    <textarea
                      ref={textareaRef}
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={handleTextareaKeyDown}
                      placeholder="写下此刻的烦恼..."
                      rows={4}
                      className="h-[9.5rem] w-full resize-none bg-transparent font-serif text-[1.65rem] leading-[1.95] tracking-prose text-mist-50/92 outline-none placeholder:font-sans placeholder:text-[1.1rem] placeholder:tracking-[0.18em] placeholder:text-mist-100/28 sm:h-[11rem] sm:text-[2rem] lg:text-[2.35rem]"
                    />

                    <p className="mt-5 text-xs tracking-[0.22em] text-mist-300/35">
                      按 Enter 沉入，Shift + Enter 换行
                    </p>
                  </div>

                  <AnimatePresence>
                    {phase === "loading" ? (
                      <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="mt-8 text-center font-sans text-sm tracking-[0.28em] text-mist-300/40"
                      >
                        正从更久远的夜色中，为你打捞一句回声
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.section>
            ) : (
              <motion.section
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="mx-auto flex min-h-[70vh] max-w-4xl items-center"
              >
                <ResultPanel
                  result={mockResult}
                  submittedText={submittedText}
                  onReset={resetExperience}
                />
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>

      <button
        type="button"
        onClick={resetExperience}
        className={`absolute right-4 top-4 z-20 rounded-full px-3 py-3 text-mist-100/25 transition-all duration-700 hover:text-mist-50/65 sm:right-7 sm:top-7 ${
          phase === "idle"
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100"
        }`}
        aria-label="重新倾诉"
      >
        <span className="block font-sans text-xl leading-none">↺</span>
      </button>

      <button
        type="button"
        onClick={resetExperience}
        className={`absolute inset-y-0 left-0 z-10 w-12 transition-opacity duration-700 ${
          phase === "result" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="回到输入状态"
      />
    </main>
  );
}

function AnimatedBackdrop({ phase }) {
  const loading = phase === "loading";
  const result = phase === "result";

  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute left-[-18%] top-[-12%] h-[34rem] w-[34rem] rounded-full bg-tide-300/18 blur-3xl"
        animate={{
          x: loading ? 60 : result ? 28 : 0,
          y: loading ? 90 : result ? 48 : 0,
          scale: loading ? 1.18 : result ? 1.08 : 1,
          opacity: loading ? 0.58 : result ? 0.42 : 0.32,
        }}
        transition={{
          duration: loading ? 2.8 : 5.4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[-16%] right-[-12%] h-[30rem] w-[30rem] rounded-full bg-ember-300/12 blur-3xl"
        animate={{
          x: loading ? -44 : result ? -20 : 0,
          y: loading ? -70 : result ? -32 : 0,
          scale: loading ? 1.22 : result ? 1.14 : 1,
          opacity: loading ? 0.4 : result ? 0.28 : 0.22,
        }}
        transition={{
          duration: loading ? 3.1 : 6.2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-80"
        animate={{
          background:
            phase === "idle"
              ? [
                  "radial-gradient(circle at 20% 24%, rgba(107,135,145,0.16), transparent 34%), radial-gradient(circle at 82% 18%, rgba(160,109,71,0.12), transparent 24%), radial-gradient(circle at 54% 82%, rgba(214,180,138,0.08), transparent 28%)",
                  "radial-gradient(circle at 28% 28%, rgba(107,135,145,0.19), transparent 36%), radial-gradient(circle at 78% 22%, rgba(160,109,71,0.11), transparent 24%), radial-gradient(circle at 52% 80%, rgba(214,180,138,0.1), transparent 26%)",
                ]
              : [
                  "radial-gradient(circle at 22% 18%, rgba(69,91,99,0.22), transparent 34%), radial-gradient(circle at 84% 14%, rgba(146,94,60,0.14), transparent 22%), radial-gradient(circle at 56% 86%, rgba(214,180,138,0.08), transparent 24%)",
                  "radial-gradient(circle at 34% 34%, rgba(69,91,99,0.28), transparent 38%), radial-gradient(circle at 70% 20%, rgba(146,94,60,0.17), transparent 24%), radial-gradient(circle at 48% 74%, rgba(214,180,138,0.1), transparent 26%)",
                ],
        }}
        transition={{
          duration: loading ? 2.4 : 9,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

function ResultPanel({ result, submittedText, onReset }) {
  return (
    <motion.article
      initial="hidden"
      animate="visible"
      className="relative w-full"
    >
      <motion.p
        variants={layerVariants}
        transition={{ ...layerVariants.visible.transition, delay: 0.15 }}
        className="mb-12 max-w-2xl font-sans text-xs tracking-[0.22em] text-mist-300/34 sm:text-sm"
      >
        你刚刚交付的烦恼是：
        <span className="ml-2 font-serif text-mist-100/46">{submittedText}</span>
      </motion.p>

      <motion.div variants={resultStackVariants}>
        <motion.div variants={layerVariants} className="max-w-4xl">
          <h1 className="font-serif text-[2.6rem] leading-[1.22] tracking-echo text-mist-50/96 sm:text-[3.4rem] lg:text-[4.7rem]">
            {result.echo}
          </h1>
        </motion.div>

        <motion.p
          variants={layerVariants}
          className="mt-10 max-w-3xl font-sans text-[1.02rem] leading-[2] tracking-prose text-mist-100/68 sm:text-[1.15rem] lg:text-[1.26rem]"
        >
          {result.decipher}
        </motion.p>

        <motion.p
          variants={layerVariants}
          className="mt-10 max-w-3xl font-sans text-[1.08rem] leading-[2.2] tracking-[0.06em] text-mist-50/86 sm:text-[1.18rem] lg:text-[1.3rem]"
        >
          {result.relief}
        </motion.p>

        <motion.p
          variants={layerVariants}
          className="mt-12 flex justify-end font-serif text-sm tracking-[0.12em] text-mist-100/42 sm:mt-16"
        >
          {result.source_signature}
        </motion.p>
      </motion.div>

      <motion.button
        type="button"
        onClick={onReset}
        variants={layerVariants}
        transition={{ ...layerVariants.visible.transition, delay: 2.15 }}
        whileHover={{ opacity: 1 }}
        className="mt-16 font-sans text-xs tracking-[0.32em] text-mist-300/28 transition-opacity duration-500 hover:text-mist-50/62"
      >
        重新倾诉
      </motion.button>
    </motion.article>
  );
}

export default App;
