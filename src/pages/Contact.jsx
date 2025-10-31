// src/pages/Contact.jsx
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMessageCircle,
  FiMapPin,
  FiArrowRight,
  FiSend,
  FiClock,
} from "react-icons/fi";

/* ---------- theme helpers (respect your CSS variables) ---------- */
const PAPER = "bg-[var(--paper,#ffffff)]";
const INK = "text-[color:var(--ink,#4B3A32)]";
const SUB = "text-[color:var(--ink,#4B3A32)]/70";
const LINE = "border-[color:var(--line-strong,#9F917F)]/60";
const SURFACE = "bg-[#F6F2EC]"; // page background
const WELL = "bg-white";

/* ---------- motion variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

/* ---------- tiny building blocks ---------- */
function Title({ eyebrow = "[ CONTACT ]", title = "We’re here to help" }) {
  return (
    <div className="mb-8 md:mb-12">
      <motion.p variants={fadeUp} className={`text-xs tracking-[0.28em] uppercase ${SUB}`}>
        {eyebrow}
      </motion.p>
      <motion.h1 variants={fadeUp} className={`mt-3 text-3xl md:text-4xl font-semibold ${INK}`}>
        {title}
      </motion.h1>
    </div>
  );
}

/* icon is a React node (element), avoiding the no-unused-vars lint */
function HelpTile({ icon, title, desc, href }) {
  const core = (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      className={`${WELL} border ${LINE} p-4 sm:p-5 hover:shadow-sm`}
    >
      <div className={`flex items-center gap-3 ${INK}`}>
        <div className={`${WELL} border ${LINE} w-10 h-10 grid place-items-center`}>
          <span className="text-[18px] leading-none">{icon}</span>
        </div>
        <div className="font-semibold">{title}</div>
      </div>
      {desc && <p className={`mt-2 text-[14px] ${SUB}`}>{desc}</p>}
      <div className="mt-3 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-wide">
        <span className={INK}>Get Support</span>
        <FiArrowRight className={INK} />
      </div>
    </motion.div>
  );
  return href ? (
    <a href={href} className="block" target="_blank" rel="noreferrer">
      {core}
    </a>
  ) : (
    core
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-[2px] text-[18px] ${INK}`}>{icon}</div>
      <div>
        <div className={`text-[13px] uppercase tracking-wide ${SUB}`}>{label}</div>
        <div className={`${INK} font-medium`}>{value}</div>
      </div>
    </div>
  );
}

/* ============================ PAGE ============================ */
export default function Contact() {
  return (
    <section className={`w-full ${SURFACE} ${INK}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <Title />

          {/* Help options */}
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <HelpTile
              icon={<FiMail />}
              title="Email Support"
              desc="We reply within one business day."
              href="mailto:support@yacart.example"
            />
            <HelpTile
              icon={<FiPhone />}
              title="Call Us"
              desc="+91 98765 43210 (10am–6pm, Mon–Sat)"
              href="tel:+919876543210"
            />
            <HelpTile
              icon={<FiMessageCircle />}
              title="Live Chat"
              desc="Instant answers from our team."
              href="#live-chat"
            />
            <HelpTile
              icon={<FiMapPin />}
              title="Store & Pickup"
              desc="Visit our experience center."
              href="#store"
            />
          </motion.div>

          {/* Form + side info */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            {/* Contact form */}
            <motion.form
              variants={fadeUp}
              onSubmit={(e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                const payload = Object.fromEntries(form.entries());
                console.log("Contact form submit:", payload);
                alert("Thanks! We received your message.");
                e.currentTarget.reset();
              }}
              className={`${WELL} border ${LINE} p-5 md:p-6`}
            >
              <h2 className="text-xl font-semibold">Send us a message</h2>
              <p className={`mt-1 text-[14px] ${SUB}`}>We typically respond within a day.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className={`text-[13px] ${SUB}`}>Your Name</label>
                  <input
                    name="name"
                    required
                    className={`${WELL} mt-1 w-full border ${LINE} px-3 h-11 outline-none focus:ring-2 focus:ring-black/10`}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={`text-[13px] ${SUB}`}>Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className={`${WELL} mt-1 w-full border ${LINE} px-3 h-11 outline-none focus:ring-2 focus:ring-black/10`}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={`text-[13px] ${SUB}`}>Phone (optional)</label>
                  <input
                    name="phone"
                    className={`${WELL} mt-1 w-full border ${LINE} px-3 h-11 outline-none focus:ring-2 focus:ring-black/10`}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={`text-[13px] ${SUB}`}>Subject</label>
                  <input
                    name="subject"
                    className={`${WELL} mt-1 w-full border ${LINE} px-3 h-11 outline-none focus:ring-2 focus:ring-black/10`}
                    placeholder="Order, product, or general"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={`text-[13px] ${SUB}`}>Message</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className={`${WELL} mt-1 w-full border ${LINE} px-3 py-3 outline-none resize-y focus:ring-2 focus:ring-black/10`}
                    placeholder="Tell us a bit about what you need help with…"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex items-center gap-2 h-11 px-4 bg-neutral-900 text-white tracking-wide uppercase text-[13px]"
              >
                <FiSend className="text-[18px]" />
                Send Message
              </button>
            </motion.form>

            {/* Sidebar: store info + map */}
            <motion.aside variants={stagger} className="space-y-6">
              <motion.div variants={fadeUp} className={`${WELL} border ${LINE} p-5 md:p-6`}>
                <h3 className="text-lg font-semibold">Visit our store</h3>
                <p className={`mt-1 text-[14px] ${SUB}`}>Experience the furniture in person.</p>

                <div className="mt-5 space-y-4">
                  <InfoRow
                    icon={<FiMapPin />}
                    label="Address"
                    value={
                      <>
                        221B, Paper Street, Chennai<br /> Tamil Nadu 600001
                      </>
                    }
                  />
                  <InfoRow icon={<FiPhone />} label="Phone" value="+91 98765 43210" />
                  <InfoRow icon={<FiMail />} label="Email" value="support@yacart.example" />
                  <InfoRow icon={<FiClock />} label="Hours" value="Mon–Sat, 10:00 AM – 6:00 PM" />
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-wide"
                >
                  <span>Open in Maps</span>
                  <FiArrowRight />
                </a>
              </motion.div>

              {/* Map (placeholder box that looks premium; replace src with your embed when ready) */}
              <motion.div variants={fadeUp} className={`${WELL} border ${LINE} overflow-hidden`}>
                <div className="aspect-[16/10] bg-[url('https://tile.openstreetmap.org/5/29/21.png')] bg-center bg-cover" />
                <div className="px-4 py-3 border-t ${LINE} text-[13px] ${SUB}`}">
                  Map preview — plug your Google Maps embed here.
                </div>
              </motion.div>
            </motion.aside>
          </div>

          {/* FAQ / micro-trust (optional, nice finishing touch) */}
          <motion.div variants={fadeUp} className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["Easy Returns", "30-day hassle-free returns on eligible items."],
              ["Secure Checkout", "256-bit encryption. Multiple payment options."],
              ["Fast Support", "Average first response time under 12 hours."],
            ].map(([t, d]) => (
              <div key={t} className={`${WELL} border ${LINE} p-5`}>
                <div className="font-semibold">{t}</div>
                <p className={`mt-1 text-[14px] ${SUB}`}>{d}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
