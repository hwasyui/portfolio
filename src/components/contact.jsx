"use client";

import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Loader2,
  CheckCircle2,
  XCircle,
  User,
  MessageSquareText,
  Pencil,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

const contactLinks = [
  { icon: Mail,       label: "Email",    value: "angelicasutiwhiharto@gmail.com", href: "mailto:angelicasutiwhiharto@gmail.com" },
  { icon: Phone,      label: "WhatsApp", value: "+62 852-8304-3970",              href: "https://wa.me/6285283043970" },
  { icon: FaGithub,   label: "GitHub",   value: "github.com/hwasyui",             href: "https://github.com/hwasyui" },
  { icon: FaLinkedin, label: "LinkedIn", value: "in/angelicawhiharto",            href: "https://www.linkedin.com/in/angelicawhiharto" },
];

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (status === "success" || status === "error") {
      const t = setTimeout(() => setStatus("idle"), 2000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("loading");
    emailjs
      .sendForm("service_wcnd53j", "template_zhyq30r", form.current, "UnfzHsk4UdmX4s44E")
      .then(() => { setStatus("success"); form.current.reset(); }, () => setStatus("error"));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">

      <div className="fixed top-5 right-5 z-50 w-72">
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-pink-hot text-white px-5 py-4 rounded-2xl shadow-2xl flex items-start gap-3"
            >
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bebas tracking-[3px] text-[11px] mb-0.5">Message Sent</div>
                <p className="text-xs text-white/85 leading-snug">Thanks! I'll get back to you soon.</p>
              </div>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-zinc-900 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-start gap-3"
            >
              <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-pink-candy" />
              <div>
                <div className="font-bebas tracking-[3px] text-[11px] text-pink-candy mb-0.5">Failed to Send</div>
                <p className="text-xs text-zinc-400 leading-snug">Please try again later.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-pink-deep relative overflow-hidden flex flex-col justify-between p-10 md:p-16">

        <div
          className="absolute bottom-0 right-0 font-bebas leading-none text-white/10 pointer-events-none select-none text-[120px] md:text-[180px] lg:text-[220px]"
          aria-hidden
        >
          07
        </div>

        <div className="relative z-10">
          <div className="font-bebas text-[9px] tracking-[5px] text-pink-candy mb-4">Chapter VII</div>
          <h2
            className="font-playfair font-black text-white leading-[0.88] tracking-tight text-[44px] md:text-[66px] lg:text-[88px]"
          >
            Let's<br />
            <span style={{ WebkitTextStroke: "2px white", color: "transparent" }}>Make</span><br />
            Magic.
          </h2>
        </div>

        <div className="relative z-10 space-y-3 mt-8">
          {contactLinks.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/20 rounded hover:bg-white/20 hover:translate-x-1 transition-all duration-200 group no-underline"
            >
              <div className="w-9 h-9 rounded-md bg-white flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-pink-deep" />
              </div>
              <div>
                <div className="font-bebas text-[9px] tracking-[3px] text-white/50">{label}</div>
                <div className="font-sans text-[13px] font-semibold text-white leading-tight">{value}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="relative z-10 mt-6">
          <div className="flex items-center gap-3">
            <span className="font-bebas text-[9px] tracking-[3px] text-white/30">Angelica Suti Whiharto</span>
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-bebas text-[9px] tracking-[3px] text-white/30">10</span>
          </div>
        </div>
      </div>

      <div className="bg-pink-pale p-10 md:p-16 flex flex-col justify-center">
        <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-2">Drop a message</div>
        <h3 className="font-playfair font-bold text-2xl md:text-3xl text-zinc-900 mb-8">
          Get in Touch
        </h3>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-600 block mb-1.5">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
              <Input name="name" placeholder="e.g. John Doe" className="pl-9 border-zinc-200 focus:border-pink-hot focus:ring-pink-hot/20" required />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-600 block mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
              <Input name="email" type="email" placeholder="e.g. john@gmail.com" className="pl-9 border-zinc-200 focus:border-pink-hot focus:ring-pink-hot/20" required />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-600 block mb-1.5">Subject</label>
            <div className="relative">
              <Pencil className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
              <Input name="subject" placeholder="e.g. Collaboration Inquiry" className="pl-9 border-zinc-200 focus:border-pink-hot focus:ring-pink-hot/20" required />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-600 block mb-1.5">Message</label>
            <div className="relative">
              <MessageSquareText className="absolute left-3 top-3 text-zinc-400" size={15} />
              <Textarea name="message" placeholder="Write your message..." className="pl-9 pt-2 h-[130px] resize-none border-zinc-200 focus:border-pink-hot focus:ring-pink-hot/20" required />
            </div>
          </div>

          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-pink-hot hover:bg-pink-deep text-white font-semibold transition-all duration-200 hover:scale-[1.02]"
          >
            {status === "loading" ? (
              <><Loader2 className="animate-spin mr-2" size={15} /> Sending...</>
            ) : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
