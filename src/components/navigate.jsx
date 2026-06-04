"use client";

import React, { useState, useEffect } from "react";
import { FileDown } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";

const chapters = [
  { id: "landing",     num: "00", label: "Home"       },
  { id: "about",       num: "01", label: "About"      },
  { id: "skills",      num: "02", label: "Skills"     },
  { id: "educations",  num: "03", label: "Education"  },
  { id: "experiences", num: "04", label: "Experience" },
  { id: "projects",    num: "05", label: "Projects"   },
  { id: "others",      num: "06", label: "Others"     },
  { id: "contacts",    num: "07", label: "Contact"    },
];

const socials = [
  { href: "https://github.com/hwasyui",                   icon: FaGithub,    label: "GitHub"    },
  { href: "https://www.linkedin.com/in/angelicawhiharto", icon: FaLinkedin,  label: "LinkedIn"  },
  { href: "https://www.instagram.com/angelstwhr",         icon: FaInstagram, label: "Instagram" },
];

const Navigate = () => {
  const [open, setOpen] = useState(false);
  const [showTab, setShowTab] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // show the INDEX tab only after the landing section scrolls out of view
  useEffect(() => {
    const landing = document.getElementById("landing");
    if (!landing) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowTab(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(landing);
    return () => observer.disconnect();
  }, []);

  // scrolls to the section by id, navigates home first if on another page
  const handleNavClick = (id) => {
    setOpen(false);
    setTimeout(() => {
      if (pathname !== "/") {
        router.push("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 350);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 180);
  };

  // creates a temporary anchor to trigger the pdf download
  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Angelica Suti Whiharto CV 2026Q1.pdf";
    link.download = "Angelica Suti Whiharto CV 2026Q1.pdf";
    link.click();
  };

  return (
    <>
      {/* vertical tab on the left edge, only shows after scrolling past the landing */}
      <button
        onClick={() => setOpen(true)}
        title="Navigation Index"
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-40
                   bg-pink-hot hover:bg-pink-deep
                   py-5 px-2.5 rounded-r-lg shadow-md
                   hover:px-3 flex flex-col items-center
                   transition-all duration-300
                   ${showTab ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"}`}
      >
        <span
          className="font-bebas text-[9px] tracking-[5px] text-white"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          INDEX
        </span>
      </button>

      {/* toc sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-white border-r border-pink-hot/20 flex flex-col">

          {/* header strip */}
          <div className="bg-pink-hot px-6 py-5">
            <div className="font-bebas text-[9px] tracking-[5px] text-white/60 mb-1">PORTFOLIO</div>
            <div className="font-playfair italic text-white text-lg leading-tight">Angelica Suti Whiharto</div>
            <div className="font-bebas text-[9px] tracking-[3px] text-white/50 mt-1">Table of Contents</div>
          </div>

          {/* chapters */}
          <div className="flex-1 px-6 py-5 overflow-y-auto">
            <div className="font-bebas text-[9px] tracking-[4px] text-zinc-400 mb-3">Chapters</div>
            <nav className="space-y-1">
              {chapters.map(({ id, num, label }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg text-left
                             hover:bg-pink-pale group transition-colors duration-150"
                >
                  <span className="font-bebas text-[11px] tracking-[2px] text-pink-hot w-6 flex-shrink-0">{num}</span>
                  <span className="font-playfair font-bold text-sm text-zinc-700 group-hover:text-pink-hot transition-colors">{label}</span>
                </button>
              ))}
            </nav>

            <div className="my-5 h-px bg-pink-hot/15" />

            {/* resume download */}
            <div className="font-bebas text-[9px] tracking-[4px] text-zinc-400 mb-3">Actions</div>
            <button
              onClick={downloadResume}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-pink-pale transition-colors text-left"
            >
              <FileDown size={15} className="text-pink-hot flex-shrink-0" />
              <span className="text-sm text-zinc-600 font-medium">Download CV</span>
            </button>

            <div className="my-5 h-px bg-pink-hot/15" />

            {/* social links */}
            <div className="font-bebas text-[9px] tracking-[4px] text-zinc-400 mb-3">Links</div>
            <div className="flex gap-2">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="w-9 h-9 rounded-full border border-pink-hot/30 flex items-center justify-center
                             text-zinc-500 hover:bg-pink-hot hover:text-white hover:border-pink-hot
                             transition-all duration-150"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* footer */}
          <div className="px-6 py-4 border-t border-pink-hot/10">
            <div className="flex items-center justify-between">
              <span className="font-bebas text-[8px] tracking-[3px] text-zinc-300">Angelica</span>
              <div className="flex-1 h-px bg-zinc-100 mx-3" />
              <span className="font-bebas text-[8px] tracking-[3px] text-zinc-300">Portfolio</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navigate;
