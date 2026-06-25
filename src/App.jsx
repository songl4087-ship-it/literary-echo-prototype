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
  hidden: { opacity: 0, y: 32, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const resultStackVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.72,
      delayChildren: 0.18,
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
  const width = 1600;
  const height = 2000;
  const padding = 148;
  const innerWidth = width - padding * 2;
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
  background.addColorStop(0.48, "#0b0f13");
  background.addColorStop(1, "#171b21");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const glowA = context.createRadialGradient(300, 300, 40, 300, 300, 560);
  glowA.addColorStop(0, "rgba(94, 123, 136, 0.28)");
  glowA.addColorStop(1, "rgba(94, 123, 136, 0)");
  context.fillStyle = glowA;
  context.fillRect(0, 0, width, height);

  const glowB = context.createRadialGradient(1260, 1600, 40, 1260, 1600, 460);
  glowB.addColorStop(0, "rgba(188, 142, 97, 0.2)");
  glowB.addColorStop(1, "rgba(188, 142, 97, 0)");
  context.fillStyle = glowB;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(216, 209, 194, 0.1)";
  context.lineWidth = 1;
  context.strokeRect(56, 56, width - 112, height - 112);

  context.fillStyle = "rgba(245, 241, 232, 0.34)";
  context.font = '500 26px "Manrope", "Noto Sans SC", sans-serif';
  context.fillText("回声打捞", padding, 120);

  context.fillStyle = "rgba(216, 209, 194, 0.18)";
  context.fillRect(padding, 162, innerWidth, 1);

  context.fillStyle = "rgba(245, 241, 232, 0.24)";
  context.font = '500 23px "Manrope", "Noto Sans SC", sans-serif';
  context.fillText(result.title, width - padding - context.measureText(result.title).width, 120);

  context.fillStyle = "rgba(216, 209, 194, 0.22)";
  context.fillRect(padding, 228, 1, 1250);

  context.fillStyle = "rgba(216, 209, 194, 0.3)";
  context.font = '500 22px "Manrope", "Noto Sans SC", sans-serif';
  context.save();
  context.translate(padding - 34, 332);
  context.rotate(-Math.PI / 2);
  context.fillText("SINK AND EMERGE", 0, 0);
  context.restore();

  let cursorY = 306;
  cursorY = drawWrappedText(context, result.echo, {
    x: padding + 72,
    y: cursorY,
    maxWidth: innerWidth - 112,
    lineHeight: 92,
    font: '600 76px "Cormorant Garamond", "Noto Serif SC", serif',
    fillStyle: "rgba(245, 241, 232, 0.96)",
  });

  cursorY += 84;
  cursorY = drawWrappedText(context, result.decipher, {
    x: padding + 72,
    y: cursorY,
    maxWidth: innerWidth - 238,
    lineHeight: 50,
    font: '500 30px "Manrope", "Noto Sans SC", sans-serif',
    fillStyle: "rgba(216, 209, 194, 0.64)",
  });

  cursorY += 72;
  cursorY = drawWrappedText(context, result.relief, {
    x: padding + 72,
    y: cursorY,
    maxWidth: innerWidth - 196,
    lineHeight: 58,
    font: '500 35px "Manrope", "Noto Sans SC", sans-serif',
    fillStyle: "rgba(245, 241, 232, 0.84)",
  });

  const sourceY = Math.min(cursorY + 84, height - 438);
  drawWrappedText(context, result.source_signature, {
    x: padding + 72,
    y: sourceY,
    maxWidth: innerWidth - 72,
    lineHeight: 36,
    font: '400 24px "Noto Serif SC", "Cormorant Garamond", serif',
    fillStyle: "rgba(216, 209, 194, 0.42)",
    align: "right",
  });

  const noteTop = height - 340;
  context.fillStyle = "rgba(216, 209, 194, 0.2)";
  context.fillRect(padding + 72, noteTop - 44, innerWidth - 72, 1);

  context.fillStyle = "rgba(216, 209, 194, 0.38)";
  context.font = '500 22px "Manrope", "Noto Sans SC", sans-serif';
  context.fillText("你写下的是", padding + 72, noteTop);

  drawWrappedText(context, `“${submittedText}”`, {
    x: padding + 72,
    y: noteTop + 64,
    maxWidth: innerWidth - 132,
    lineHeight: 42,
    font: '500 27px "Noto Serif SC", "Cormorant Garamond", serif',
    fillStyle: "rgba(245, 241, 232, 0.62)",
  });

  context.fillStyle = "rgba(216, 209, 194, 0.24)";
  context.font = '500 20px "Manrope", "Noto Sans SC", sans-serif';
  const footerText = "Generated from the prototype of literary echo";
  context.fillText(
    footerText,
    width - padding - context.measureText(footerText).width,
    height - 122,
  );

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
  const { x, y, maxWidth, lineHeight, font, fillStyle, align = "left" } = options;

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
        drawAlignedText(context, line, x, cursorY, maxWidth, align);
        line = unit;
        cursorY += lineHeight;
      } else {
        line = candidate;
      }

      if (unitIndex === units.length - 1 && line) {
        drawAlignedText(context, line, x, cursorY, maxWidth, align);
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

function drawAlignedText(context, text, x, y, maxWidth, align) {
  if (align === "right") {
    const textWidth = context.measureText(text).width;
    context.fillText(text, x + maxWidth - textWidth, y);
    return;
  }

  context.fillText(text, x, y);
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

      <div className="pointer-events-none atmospheric-noise absolute inset-0 opacity-[0.16]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,9,0.22),rgba(6,7,9,0.9))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_0%,rgba(6,7,9,0.12)_38%,rgba(6,7,9,0.42)_100%)]" />

      <div className="pointer-events-none absolute left-1/2 top-7 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.52em] text-mist-200/22 sm:top-9">
        回声打捞
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-7 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            {showInput ? (
              <motion.section
                key="idle"
                initial={{ opacity: 0, y: 24 }}
                animate={
                  phase === "idle"
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 180, scale: 0.978, filter: "blur(10px)" }
                }
                exit={{ opacity: 0, y: 180, transition: { duration: 1.1 } }}
                transition={{
                  duration: phase === "loading" ? 2.3 : 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto flex min-h-[56vh] max-w-4xl items-center justify-center"
              >
                <div className="w-full">
                  <div className="mx-auto max-w-3xl px-2 py-6 sm:px-4 sm:py-8">
                    <textarea
                      ref={textareaRef}
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={handleTextareaKeyDown}
                      placeholder="写下此刻的烦恼..."
                      rows={4}
                      className="literary-input h-[10rem] w-full resize-none bg-transparent text-center font-serif text-[1.72rem] leading-[2.08] tracking-[0.055em] text-mist-50/92 outline-none placeholder:font-sans placeholder:text-[1.08rem] placeholder:tracking-[0.24em] placeholder:text-mist-100/22 sm:h-[11rem] sm:text-[2.08rem] lg:h-[12rem] lg:text-[2.72rem]"
                    />

                    <p className="mt-9 text-center font-sans text-[10px] tracking-[0.32em] text-mist-300/24 sm:text-[11px]">
                      按 Enter 沉入。Shift + Enter 换行。
                    </p>
                  </div>

                  <AnimatePresence>
                    {phase === "loading" ? (
                      <motion.p
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.6, delay: 0.38 }}
                        className="mt-10 text-center font-serif text-sm tracking-[0.18em] text-mist-300/32 sm:text-[0.95rem]"
                      >
                        正从更久远的夜色里，缓慢为你打捞一句回声。
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
                transition={{ duration: 1 }}
                className="mx-auto flex min-h-[76vh] max-w-5xl items-center"
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
        className={`absolute right-4 top-4 z-20 rounded-full px-3 py-3 text-mist-100/18 transition-all duration-700 hover:text-mist-50/42 sm:right-7 sm:top-7 ${
          phase === "idle"
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100"
        }`}
        aria-label="重新倾诉"
      >
        <span className="block font-sans text-lg leading-none">↺</span>
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
        className="absolute left-[-18%] top-[-12%] h-[38rem] w-[38rem] rounded-full bg-tide-300/14 blur-3xl"
        animate={{
          x: loading ? 70 : result ? 32 : 0,
          y: loading ? 110 : result ? 56 : 0,
          scale: loading ? 1.24 : result ? 1.1 : 1,
          opacity: loading ? 0.52 : result ? 0.34 : 0.24,
        }}
        transition={{
          duration: loading ? 2.6 : 6.8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[-16%] right-[-12%] h-[34rem] w-[34rem] rounded-full bg-ember-300/10 blur-3xl"
        animate={{
          x: loading ? -58 : result ? -26 : 0,
          y: loading ? -86 : result ? -36 : 0,
          scale: loading ? 1.28 : result ? 1.16 : 1,
          opacity: loading ? 0.34 : result ? 0.22 : 0.16,
        }}
        transition={{
          duration: loading ? 2.9 : 7.2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl"
        animate={{
          scale: loading ? 0.92 : result ? 1.08 : 1,
          opacity: loading ? 0.12 : result ? 0.07 : 0.04,
        }}
        transition={{
          duration: loading ? 2.2 : 8.4,
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
                  "radial-gradient(circle at 18% 24%, rgba(107,135,145,0.12), transparent 34%), radial-gradient(circle at 82% 16%, rgba(160,109,71,0.09), transparent 24%), radial-gradient(circle at 56% 82%, rgba(214,180,138,0.06), transparent 28%)",
                  "radial-gradient(circle at 26% 30%, rgba(107,135,145,0.16), transparent 36%), radial-gradient(circle at 76% 20%, rgba(160,109,71,0.09), transparent 24%), radial-gradient(circle at 50% 80%, rgba(214,180,138,0.08), transparent 26%)",
                ]
              : [
                  "radial-gradient(circle at 20% 16%, rgba(69,91,99,0.18), transparent 34%), radial-gradient(circle at 84% 14%, rgba(146,94,60,0.12), transparent 22%), radial-gradient(circle at 56% 86%, rgba(214,180,138,0.06), transparent 24%)",
                  "radial-gradient(circle at 32% 36%, rgba(69,91,99,0.24), transparent 38%), radial-gradient(circle at 70% 18%, rgba(146,94,60,0.15), transparent 24%), radial-gradient(circle at 46% 74%, rgba(214,180,138,0.08), transparent 26%)",
                ],
        }}
        transition={{
          duration: loading ? 2.3 : 10.5,
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
      className="group relative w-full lg:grid lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:gap-10"
    >
      <motion.aside
        variants={layerVariants}
        transition={{ ...layerVariants.visible.transition, delay: 0.1 }}
        className="hidden lg:flex lg:min-h-[36rem] lg:flex-col lg:justify-between"
      >
        <div className="space-y-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-mist-300/24">
            {result.title}
          </p>
          <div className="h-24 w-px bg-white/10" />
        </div>
        <p className="vertical-note font-sans text-[10px] uppercase tracking-[0.38em] text-mist-300/16">
          Sink and Emerge
        </p>
      </motion.aside>

      <div>
        <motion.div
          variants={layerVariants}
          transition={{ ...layerVariants.visible.transition, delay: 0.15 }}
          className="mb-14 flex min-h-[2rem] items-start justify-between gap-4"
        >
          <p className="max-w-xl font-sans text-[10px] leading-[1.9] tracking-[0.24em] text-mist-300/24 sm:text-[11px]">
            你写下的是
            <span className="mx-2 font-serif text-mist-100/38">“{submittedText}”</span>
          </p>

          <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-mist-300/16 lg:hidden">
            {result.title}
          </p>
        </motion.div>

        <motion.div variants={resultStackVariants} className="poem-column max-w-[49rem]">
          <motion.div variants={layerVariants}>
            <h1 className="echo-title font-serif text-[2.9rem] leading-[1.16] tracking-[0.03em] text-mist-50/97 sm:text-[4rem] lg:text-[5.55rem]">
              {result.echo}
            </h1>
          </motion.div>

          <motion.p
            variants={layerVariants}
            className="mt-12 max-w-[40rem] font-sans text-[1.02rem] leading-[2.18] tracking-[0.055em] text-mist-100/58 sm:text-[1.12rem] lg:text-[1.22rem]"
          >
            {result.decipher}
          </motion.p>

          <motion.p
            variants={layerVariants}
            className="mt-12 max-w-[41rem] font-sans text-[1.08rem] leading-[2.36] tracking-[0.065em] text-mist-50/84 sm:text-[1.18rem] lg:text-[1.3rem]"
          >
            {result.relief}
          </motion.p>

          <motion.p
            variants={layerVariants}
            className="mt-16 flex justify-end pr-1 font-serif text-[0.82rem] tracking-[0.14em] text-mist-100/34 sm:mt-20 sm:text-sm"
          >
            {result.source_signature}
          </motion.p>
        </motion.div>

        <motion.div
          variants={layerVariants}
          transition={{ ...layerVariants.visible.transition, delay: 2.15 }}
          className="result-actions mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6 font-sans text-[10px] uppercase tracking-[0.34em] text-mist-300/18 transition-opacity duration-700 group-hover:text-mist-300/28 sm:text-[11px]"
        >
          <button
            type="button"
            onClick={onExport}
            disabled={exportState === "working"}
            className="ghost-action disabled:cursor-wait disabled:text-mist-300/12"
          >
            {exportState === "working"
              ? "正在留存..."
              : exportState === "done"
                ? "已留存此页"
                : exportState === "error"
                  ? "留存失败，重试"
                  : "留存此页"}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="ghost-action"
          >
            重新倾诉
          </button>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default App;
