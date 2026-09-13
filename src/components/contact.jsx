"use client";

import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Loader2,
  CheckCircle2,
  XCircle,
  User,
  MessageSquareText,
  Pencil,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/magnetic-button";
import HoverText from "@/components/hover-text";

const ease = [0.16, 1, 0.3, 1];
const MIN_FILL_MS = 2500;
const COOLDOWN_MS = 60_000;

const contactLinks = [
  { icon: Mail, label: "Email", value: "angelicasutiwhiharto@gmail.com", href: "mailto:angelicasutiwhiharto@gmail.com" },
  { icon: FaGithub, label: "GitHub", value: "github.com/hwasyui", href: "https://github.com/hwasyui" },
  { icon: FaLinkedin, label: "LinkedIn", value: "in/angelicawhiharto", href: "https://www.linkedin.com/in/angelicawhiharto" },
];

const Contact = () => {
  const form = useRef();
  const mountedAt = useRef(Date.now());
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (status === "success" || status === "error") {
      const t = setTimeout(() => setStatus("idle"), 2500);
      return () => clearTimeout(t);
    }
  }, [status]);

  const sendEmail = (e) => {
    e.preventDefault();

    // honeypot field: only bots fill in a hidden input
    if (new FormData(form.current).get("company")) return;

    // real users can't fill the form this fast
    if (Date.now() - mountedAt.current < MIN_FILL_MS) return;

    const lastSent = Number(localStorage.getItem("contact-last-sent") || 0);
    if (Date.now() - lastSent < COOLDOWN_MS) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    emailjs
      .sendForm("service_wcnd53j", "template_zhyq30r", form.current, "UnfzHsk4UdmX4s44E")
      .then(
        () => {
          localStorage.setItem("contact-last-sent", String(Date.now()));
          setStatus("success");
          form.current.reset();
        },
        () => setStatus("error")
      );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-white px-6 md:px-16 py-20 md:py-28">
      <div className="fixed top-20 right-5 z-50 w-72">
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3, ease }}
              className="bg-zinc-900 text-white px-5 py-4 rounded-xl shadow-xl flex items-start gap-3"
            >
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold mb-0.5">Message sent</div>
                <p className="text-xs text-zinc-300 leading-snug">Thanks, I&apos;ll get back to you soon.</p>
              </div>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3, ease }}
              className="bg-white border border-zinc-200 text-zinc-900 px-5 py-4 rounded-xl shadow-xl flex items-start gap-3"
            >
              <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-zinc-400" />
              <div>
                <div className="text-sm font-semibold mb-0.5">Failed to send</div>
                <p className="text-xs text-zinc-400 leading-snug">Please try again later.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 md:mb-14"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease }}
            className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3"
          >
            Contact
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
              transition={{ duration: 0.7, ease }}
              className="text-4xl md:text-6xl font-semibold text-zinc-900 leading-[0.95] tracking-tight"
            >
              <HoverText text="Let's talk." />
            </motion.h2>
          </div>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
            className="text-sm text-zinc-500 mt-5 max-w-md leading-relaxed"
          >
            Have a role, a project, or just a question. I read everything that comes in.
          </motion.p>
        </motion.div>

        <div className="rounded-[28px] border border-zinc-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="bg-zinc-50 flex flex-col justify-between p-8 md:p-10 border-b md:border-b-0 md:border-r border-zinc-200">
            <div>
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-6">Reach me directly</p>
              <div className="space-y-1">
                {contactLinks.map(({ icon: Icon, label, value, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.4, ease, delay: 0.1 + i * 0.06 }}
                    className="group flex items-center gap-3 py-3.5 border-b border-zinc-200 last:border-b-0 no-underline"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-zinc-200 group-hover:bg-zinc-900 group-hover:border-zinc-900 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                      <Icon size={15} className="text-zinc-700 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-zinc-400">{label}</div>
                      <div className="text-[13px] font-medium text-zinc-900 leading-tight truncate">{value}</div>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <span className="text-xs text-zinc-400">Angelica Suti Whiharto</span>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 flex flex-col justify-center">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-2">Drop a message</p>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-8">
              <HoverText text="Get in touch" />
            </h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <label className="text-xs font-medium text-zinc-500 block mb-1.5">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                  <Input name="name" placeholder="e.g. John Doe" className="pl-9 bg-white border-zinc-200 focus-visible:border-zinc-900 focus-visible:ring-zinc-900/10" required />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-500 block mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                  <Input name="email" type="email" placeholder="e.g. john@gmail.com" className="pl-9 bg-white border-zinc-200 focus-visible:border-zinc-900 focus-visible:ring-zinc-900/10" required />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-500 block mb-1.5">Subject</label>
                <div className="relative">
                  <Pencil className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                  <Input name="subject" placeholder="e.g. Collaboration inquiry" className="pl-9 bg-white border-zinc-200 focus-visible:border-zinc-900 focus-visible:ring-zinc-900/10" required />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-500 block mb-1.5">Message</label>
                <div className="relative">
                  <MessageSquareText className="absolute left-3 top-3 text-zinc-400" size={15} />
                  <Textarea name="message" placeholder="Write your message..." className="pl-9 pt-2 h-[130px] resize-none bg-white border-zinc-200 focus-visible:border-zinc-900 focus-visible:ring-zinc-900/10" required />
                </div>
              </div>

              <MagneticButton
                type="submit"
                strength={0.15}
                disabled={status === "loading"}
                className="w-full flex items-center justify-center bg-zinc-900 hover:bg-zinc-700 disabled:opacity-60 text-white text-sm font-medium rounded-full py-3 transition-colors duration-150"
              >
                {status === "loading" ? (
                  <><Loader2 className="animate-spin mr-2" size={15} /> Sending...</>
                ) : "Send message"}
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
