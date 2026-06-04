"use client";

const strips = {
  default: { wide: "bg-pink-hot",   narrow: "bg-pink-candy",  wt: "text-white",      nt: "text-pink-deep" },
  dark:    { wide: "bg-zinc-900",   narrow: "bg-pink-hot",    wt: "text-pink-candy", nt: "text-white"     },
  deep:    { wide: "bg-pink-deep",  narrow: "bg-pink-barbie", wt: "text-white",       nt: "text-pink-deep" },
  blush:   { wide: "bg-pink-blush", narrow: "bg-pink-hot",    wt: "text-pink-deep",  nt: "text-white"     },
};

const SectionStrip = ({ chapter, label, colors = "default" }) => {
  const t = strips[colors] ?? strips.default;
  return (
    <div className="flex h-11 w-full overflow-hidden relative z-10">
      <div className={`flex-[3] flex items-center gap-3 px-6 ${t.wide}`}>
        <span className={`${t.wt} text-sm leading-none opacity-60`}>·</span>
        <span className={`font-bebas text-[9px] tracking-[5px] uppercase ${t.wt}`}>
          Chapter {chapter} · {label}
        </span>
        <span className={`${t.wt} text-sm leading-none opacity-60`}>·</span>
      </div>
      <div className={`flex items-center justify-center px-8 ${t.narrow}`}>
        <span className={`font-bebas text-[10px] tracking-[3px] uppercase ${t.nt}`}>
          {label}
        </span>
      </div>
    </div>
  );
};

export default SectionStrip;
