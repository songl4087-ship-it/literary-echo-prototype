import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const mockArchive = [
  {
    id: "inward-world",
    title: "向内栖居",
    keywords: [
      "孤独",
      "孤单",
      "一个人",
      "内耗",
      "空虚",
      "迷茫",
      "封闭",
      "社交",
      "疏离",
      "没有人懂",
      "lonely",
      "alone",
      "empty",
      "anxious",
    ],
    echo: "Ich kehre in mich selbst zurück, und finde eine Welt.",
    source_signature: "—— 约翰·沃尔夫冈·冯·歌德 《少年维特的烦恼》 (1774年)",
    decipher:
      "“我退回到自己的内心，并在那里发现了一个世界。” 在维特那种近乎灼伤自己的敏感里，向内收缩既是孤绝，也是自保。不是所有撤退都意味着失去，有些沉默本身就是一种临时的庇护。",
    relief:
      "你未必必须立刻重新向世界证明自己。有时先回到内心，把自己从喧嚣里轻轻收回，反而能让呼吸重新整齐。今天如果外界太吵，就先在自己的世界里点一盏灯。",
  },
  {
    id: "endurance",
    title: "承压前行",
    keywords: [
      "工作",
      "加班",
      "压力",
      "疲惫",
      "累",
      "崩溃",
      "业绩",
      "考核",
      "deadline",
      "burnout",
      "stress",
      "job",
      "career",
      "老板",
      "上班",
      "学习",
      "考试",
    ],
    echo: "What matters is not what we bear, but how we bear it.",
    source_signature: "—— 塞内加《论天意》",
    decipher:
      "塞内加不把苦难浪漫化，他只是提醒人们：命运给出的重量并不总能选择，但承受的姿态仍有余地。人的尊严，有时就藏在不肯被压垮的那一小寸意志里。",
    relief:
      "你现在觉得沉，很可能不是因为你不够强，而是因为你已经扛了太久。先别急着要求自己更高效，先允许自己被看见为一个会疲惫的人。把今天拆小一点，只完成下一步。",
  },
  {
    id: "uncertainty",
    title: "穿过未知",
    keywords: [
      "未来",
      "方向",
      "选择",
      "不知道",
      "犹豫",
      "决定",
      "转行",
      "离职",
      "读研",
      "出国",
      "uncertain",
      "future",
      "choice",
      "lost",
      "confused",
      "path",
    ],
    echo: "I am not afraid of storms, for I am learning how to sail my ship.",
    source_signature: "—— 路易莎·梅·奥尔科特 《小妇人》 (1868年)",
    decipher:
      "在奥尔科特笔下，成长不是忽然知道答案，而是在风浪里慢慢学会掌舵。未知没有立刻消失，但人会在摸索中长出新的手感，直到曾经的害怕变成可以穿越的天气。",
    relief:
      "你不需要先把整张人生地图看清，才配继续向前。很多方向感，本来就是在走动中形成的。允许自己带着尚未完成的答案前进，路会在脚下慢慢显形。",
  },
  {
    id: "heartbreak",
    title: "失去之后",
    keywords: [
      "分手",
      "喜欢",
      "感情",
      "爱情",
      "想念",
      "离开",
      "失去",
      "被拒绝",
      "心碎",
      "relationship",
      "breakup",
      "love",
      "miss",
      "left",
      "heartbroken",
    ],
    echo: "The wound is the place where the Light enters you.",
    source_signature: "—— 鲁米",
    decipher:
      "鲁米总能把伤口说成一扇门。不是因为疼痛本身值得歌颂，而是因为人常在破碎之后，第一次真正看见自己依赖过什么、害怕过什么，又仍然保留了什么。",
    relief:
      "你现在的难过并不证明你软弱，只说明你认真爱过。别急着要求自己体面地翻篇，疼痛也有自己的节奏。先把失去安放好，光会从那道裂缝里慢慢进来。",
  },
  {
    id: "self-doubt",
    title: "自我怀疑",
    keywords: [
      "不够好",
      "失败",
      "自卑",
      "比较",
      "怀疑自己",
      "没用",
      "做不好",
      "能力",
      "自信",
      "inferior",
      "failure",
      "worthless",
      "compare",
      "confidence",
      "not good enough",
    ],
    echo: "There is a crack in everything, that's how the light gets in.",
    source_signature: "—— 莱昂纳德·科恩《Anthem》",
    decipher:
      "科恩并不要求人无懈可击，他反而承认裂缝是普遍状态。所谓完整，从来不是毫无瑕疵，而是带着自己的缺口，仍愿意让光线、经验与新的理解继续进入生命。",
    relief:
      "你不是因为完美才值得被爱、被认可，也不是因为这阵子的失手就被整体否定。今天先把评价自己的语气放轻一点。裂缝并不只意味着破损，也意味着尚可进入的光。",
  },
  {
    id: "family-distance",
    title: "亲密裂隙",
    keywords: [
      "家人",
      "父母",
      "妈妈",
      "爸爸",
      "争吵",
      "沟通",
      "理解",
      "家庭",
      "亲人",
      "mother",
      "father",
      "family",
      "parents",
      "argument",
      "home",
    ],
    echo: "We are homesick most for the places we have never known.",
    source_signature: "—— 卡森·麦卡勒斯《伤心咖啡馆之歌》",
    decipher:
      "麦卡勒斯写过一种很深的乡愁，它并不总指向地理意义上的故乡，也可能指向一种从未真正获得过的理解与靠近。人与家人的错位，常常正是因为彼此都在等待被懂得。",
    relief:
      "你难受，也许不是因为不在乎，而恰恰是因为太想靠近。亲密关系里最难的，不是谁立刻认输，而是谁先把防御放下一点。你可以先从一句更诚实、更小声的话开始。",
  },
];

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

function normalizeInput(value) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function hashString(value) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 2147483647;
  }

  return Math.abs(hash);
}

function pickResonance(input, previousId) {
  const normalized = normalizeInput(input);

  const scoredEntries = mockArchive.map((entry, index) => {
    const keywordHits = entry.keywords.reduce((score, keyword) => {
      const normalizedKeyword = normalizeInput(keyword);

      if (!normalizedKeyword) {
        return score;
      }

      return normalized.includes(normalizedKeyword) ? score + normalizedKeyword.length : score;
    }, 0);

    const titleHit = normalized.includes(normalizeInput(entry.title)) ? 8 : 0;

    return {
      entry,
      index,
      score: keywordHits + titleHit,
    };
  });

  scoredEntries.sort((left, right) => right.score - left.score);

  const bestMatch = scoredEntries[0];

  if (bestMatch.score > 0) {
    if (bestMatch.entry.id !== previousId || scoredEntries.length === 1) {
      return bestMatch.entry;
    }

    const alternate = scoredEntries.find(
      (candidate) => candidate.entry.id !== previousId && candidate.score >= Math.max(bestMatch.score - 2, 1),
    );

    return alternate?.entry || bestMatch.entry;
  }

  const fallbackIndex = hashString(normalized || input) % mockArchive.length;
  const fallback = mockArchive[fallbackIndex];

  if (fallback.id !== previousId || mockArchive.length === 1) {
    return fallback;
  }

  return mockArchive[(fallbackIndex + 1) % mockArchive.length];
}

async function downloadResultCard(result, submittedText) {
  const width = 1440;
  const height = 1800;
  const padding = 132;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is not available in this browser.");
  }

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  canvas.width = width;
  canvas.height = height;

  const background = context.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, "#060709");
  background.addColorStop(0.55, "#0c1015");
  background.addColorStop(1, "#151a1f");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const glowA = context.createRadialGradient(280, 260, 60, 280, 260, 480);
  glowA.addColorStop(0, "rgba(94, 123, 136, 0.36)");
  glowA.addColorStop(1, "rgba(94, 123, 136, 0)");
  context.fillStyle = glowA;
  context.fillRect(0, 0, width, height);

  const glowB = context.createRadialGradient(1140, 1480, 40, 1140, 1480, 420);
  glowB.addColorStop(0, "rgba(188, 142, 97, 0.26)");
  glowB.addColorStop(1, "rgba(188, 142, 97, 0)");
  context.fillStyle = glowB;
  context.fillRect(0, 0, width, height);

  context.fillStyle = "rgba(245, 241, 232, 0.42)";
  context.font = '500 30px "Manrope", "Noto Sans SC", sans-serif';
  context.letterSpacing = "0.16em";
  context.fillText("回声打捞", padding, 112);

  context.fillStyle = "rgba(245, 241, 232, 0.28)";
  context.font = '400 26px "Noto Serif SC", "Cormorant Garamond", serif';
  context.fillText(result.title, padding, 186);

  let cursorY = 300;
  cursorY = drawWrappedText(context, result.echo, {
    x: padding,
    y: cursorY,
    maxWidth: width - padding * 2,
    lineHeight: 84,
    font: '600 70px "Cormorant Garamond", "Noto Serif SC", serif',
    fillStyle: "rgba(245, 241, 232, 0.96)",
  });

  cursorY += 72;
  cursorY = drawWrappedText(context, result.decipher, {
    x: padding,
    y: cursorY,
    maxWidth: width - padding * 2,
    lineHeight: 48,
    font: '500 31px "Manrope", "Noto Sans SC", sans-serif',
    fillStyle: "rgba(216, 209, 194, 0.72)",
  });

  cursorY += 62;
  cursorY = drawWrappedText(context, result.relief, {
    x: padding,
    y: cursorY,
    maxWidth: width - padding * 2,
    lineHeight: 54,
    font: '500 34px "Manrope", "Noto Sans SC", sans-serif',
    fillStyle: "rgba(245, 241, 232, 0.88)",
  });

  const noteTop = height - 290;
  context.fillStyle = "rgba(216, 209, 194, 0.26)";
  context.fillRect(padding, noteTop - 36, width - padding * 2, 1);

  context.fillStyle = "rgba(216, 209, 194, 0.44)";
  context.font = '500 24px "Manrope", "Noto Sans SC", sans-serif';
  context.fillText("你写下的烦恼", padding, noteTop + 20);

  drawWrappedText(context, `“${submittedText}”`, {
    x: padding,
    y: noteTop + 78,
    maxWidth: width - padding * 2,
    lineHeight: 44,
    font: '500 28px "Noto Serif SC", "Cormorant Garamond", serif',
    fillStyle: "rgba(245, 241, 232, 0.72)",
  });

  context.fillStyle = "rgba(216, 209, 194, 0.46)";
  context.font = '400 24px "Noto Serif SC", "Cormorant Garamond", serif';
  drawWrappedText(context, result.source_signature, {
    x: padding,
    y: height - 118,
    maxWidth: width - padding * 2,
    lineHeight: 34,
    font: '400 24px "Noto Serif SC", "Cormorant Garamond", serif',
    fillStyle: "rgba(216, 209, 194, 0.46)",
  });

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((generatedBlob) => {
      if (generatedBlob) {
        resolve(generatedBlob);
        return;
      }

      reject(new Error("Unable to create image blob."));
    }, "image/png");
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `literary-echo-${result.id}.png`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function drawWrappedText(context, text, options) {
  const { x, y, maxWidth, lineHeight, font, fillStyle } = options;

  context.font = font;
  context.fillStyle = fillStyle;

  const paragraphs = text.split("\n");
  let cursorY = y;

  paragraphs.forEach((paragraph, paragraphIndex) => {
    const units = /[\u4e00-\u9fff]/.test(paragraph) ? paragraph.split("") : paragraph.split(" ");
    let line = "";

    units.forEach((unit, unitIndex) => {
      const candidate = /[\u4e00-\u9fff]/.test(paragraph)
        ? `${line}${unit}`
        : `${line}${line ? " " : ""}${unit}`;

      if (context.measureText(candidate).width > maxWidth && line) {
        context.fillText(line, x, cursorY);
        line = unit;
        cursorY += lineHeight;
      } else {
        line = candidate;
      }

      if (unitIndex === units.length - 1 && line) {
        context.fillText(line, x, cursorY);
        cursorY += lineHeight;
      }
    });

    if (!units.length) {
      cursorY += lineHeight;
    }

    if (paragraphIndex < paragraphs.length - 1) {
      cursorY += lineHeight * 0.42;
    }
  });

  return cursorY;
}

function App() {
  const [phase, setPhase] = useState("idle");
  const [draft, setDraft] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [currentResult, setCurrentResult] = useState(mockArchive[0]);
  const [exportState, setExportState] = useState("idle");
  const timeoutRef = useRef(null);
  const textareaRef = useRef(null);
  const previousResultIdRef = useRef(null);

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

    const nextResult = pickResonance(cleaned, previousResultIdRef.current);
    previousResultIdRef.current = nextResult.id;

    setSubmittedText(cleaned);
    setCurrentResult(nextResult);
    setExportState("idle");
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
    setExportState("idle");
  };

  const handleTextareaKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitTrouble();
    }
  };

  const handleExport = async () => {
    setExportState("working");

    try {
      await downloadResultCard(currentResult, submittedText);
      setExportState("done");
      window.setTimeout(() => {
        setExportState("idle");
      }, 1800);
    } catch (error) {
      console.error(error);
      setExportState("error");
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
                transition={{
                  duration: phase === "loading" ? 1.9 : 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
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

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs tracking-[0.22em] text-mist-300/35">
                      <p>按 Enter 沉入，Shift + Enter 换行</p>
                      <p className="font-sans text-[10px] tracking-[0.18em] text-mist-300/22">
                        以关键词匹配 Mock 回声
                      </p>
                    </div>
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
                  exportState={exportState}
                  onExport={handleExport}
                  onReset={resetExperience}
                  result={currentResult}
                  submittedText={submittedText}
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

function ResultPanel({ result, submittedText, onReset, onExport, exportState }) {
  return (
    <motion.article
      initial="hidden"
      animate="visible"
      className="relative w-full"
    >
      <motion.div
        variants={layerVariants}
        transition={{ ...layerVariants.visible.transition, delay: 0.15 }}
        className="mb-12 flex flex-wrap items-center justify-between gap-4"
      >
        <p className="max-w-2xl font-sans text-xs tracking-[0.22em] text-mist-300/34 sm:text-sm">
          你刚刚交付的烦恼是：
          <span className="ml-2 font-serif text-mist-100/46">{submittedText}</span>
        </p>

        <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-ember-200/34">
          {result.title}
        </p>
      </motion.div>

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

      <motion.div
        variants={layerVariants}
        transition={{ ...layerVariants.visible.transition, delay: 2.15 }}
        className="mt-16 flex flex-wrap items-center gap-6 font-sans text-xs tracking-[0.32em]"
      >
        <button
          type="button"
          onClick={onExport}
          disabled={exportState === "working"}
          className="text-mist-300/34 transition-opacity duration-500 hover:text-mist-50/68 disabled:cursor-wait disabled:text-mist-300/22"
        >
          {exportState === "working"
            ? "导出中..."
            : exportState === "done"
              ? "卡片已下载"
              : exportState === "error"
                ? "导出失败，重试"
                : "导出卡片"}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="text-mist-300/28 transition-opacity duration-500 hover:text-mist-50/62"
        >
          重新倾诉
        </button>
      </motion.div>
    </motion.article>
  );
}

export default App;
