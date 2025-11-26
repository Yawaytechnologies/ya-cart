import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ---- Data ---- //

const personas = [
  {
    key: "product",
    label: "Product teams",
    line: "You have a growing backlog and no time for messy rewrites.",
  },
  {
    key: "ops",
    label: "Operations",
    line: "You live in spreadsheets and want a system that actually fits reality.",
  },
  {
    key: "founder",
    label: "Founders",
    line: "You need a platform that scales without burning your team out.",
  },
];

const stats = [
  { label: "Projects", value: 3 },
  { label: "Clients", value: 5 },
  { label: "Years experience", value: 7, suffix: "+" },
];

const clients = [
  { name: "Skyline Retail", industry: "Retail & E-Commerce" },
  { name: "Nova HR Suite", industry: "HR & Payroll" },
  { name: "FinSight Capital", industry: "FinTech" },
  { name: "EduVerse LMS", industry: "EdTech" },
  { name: "CloudAxis", industry: "Cloud & Infra" },
];

const projects = [
  {
    title: "End-to-End HR & Payroll Platform",
    client: "Nova HR Suite",
    industry: "HR & Payroll",
    description:
      "Self-service HR and payroll portal with automation and compliance dashboards.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
    outcome: "Payroll time reduced by 60%.",
    link: "#",
  },
  {
    title: "AI-Driven Lead Insights Dashboard",
    client: "FinSight Capital",
    industry: "FinTech",
    description:
      "Lead scoring and analytics from CRM + campaigns in one clean dashboard.",
    techStack: ["React", "Vite", "Python API", "PostgreSQL"],
    outcome: "3x better prioritisation for sales.",
    link: "#",
  },
  {
    title: "Multi-Tenant Retail Admin Console",
    client: "Skyline Retail",
    industry: "Retail & E-Commerce",
    description:
      "Control center for catalog, inventory, pricing, and campaigns across stores.",
    techStack: ["React", "Node.js", "REST APIs", "Redis"],
    outcome: "New store onboarding 2x faster.",
    link: "#",
  },
];

const services = [
  {
    title: "Web & App Development",
    description: "Dashboards, portals, and internal tools on modern JS stacks.",
  },
  {
    title: "Cloud & DevOps",
    description: "Cloud-native setups, CI/CD, and smooth deployments.",
  },
  {
    title: "AI & Automation",
    description: "Predictive analytics and workflow automation.",
  },
  {
    title: "Digital Strategy",
    description: "Architecture and roadmaps that match your business.",
  },
  {
    title: "HR & Payroll Systems",
    description: "HR and payroll tools tied to your real workflows.",
  },
  {
    title: "Ongoing Support",
    description: "Long-term product ownership and iteration.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    text: "We understand your teams, tools, and bottlenecks.",
  },
  {
    step: "02",
    title: "Blueprint",
    text: "We design the architecture, tech stack, and rollout plan.",
  },
  {
    step: "03",
    title: "Build",
    text: "Short sprints, frequent demos, and fast feedback loops.",
  },
  {
    step: "04",
    title: "Launch",
    text: "Staged rollout, docs, and handover to internal teams.",
  },
  {
    step: "05",
    title: "Scale",
    text: "We stay in, tune, and ship new capabilities.",
  },
];

const testimonials = [
  {
    quote:
      "Yaway felt like an extension of our internal team. Calm, fast, and reliable.",
    name: "HR Director",
    company: "Nova HR Suite",
  },
  {
    quote:
      "The dashboards changed our review meetings. Everyone finally sees the same numbers.",
    name: "VP – Growth",
    company: "FinSight Capital",
  },
  {
    quote:
      "They understood retail first, then built tech around it. That’s rare.",
    name: "Founder",
    company: "Skyline Retail",
  },
];

const techStack = [
  "React",
  "Vite",
  "TailwindCSS",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "REST APIs",
  "Docker",
  "AWS / Azure",
  "CI/CD",
];

const signalMetrics = [
  {
    label: "Manual work removed",
    value: 80,
    note: "Automating routine ops and HR flows.",
  },
  {
    label: "Meetings replaced by dashboards",
    value: 65,
    note: "Leaders check metrics instead of chasing updates.",
  },
  {
    label: "Incidents after launch",
    value: 10,
    note: "Lower is better — we aim for boring releases.",
  },
];

const capabilityBands = [
  {
    label: "Core platforms",
    items: ["HR & payroll", "Internal tools", "Client portals"],
  },
  {
    label: "Analytics",
    items: ["Executive dashboards", "Ops KPIs", "Lead scoring"],
  },
  {
    label: "Enablement",
    items: ["Design systems", "Component libraries", "Developer handover"],
  },
];

const faqItems = [
  {
    q: "Do you only work with big companies?",
    a: "No. We work with funded startups, mid-size teams, and business units inside larger orgs. The common pattern is: you have real users and real stakes.",
  },
  {
    q: "Can you join our existing team?",
    a: "Yes. We often plug into in-house teams as a product squad — owning a specific stream like internal tools or analytics.",
  },
  {
    q: "What tech stacks do you prefer?",
    a: "Modern JS (React-based frontends) with Node / Python backends, backed by SQL/NoSQL as needed. But we integrate into what you already have instead of forcing a rewrite.",
  },
];

// ---- Animation helpers ---- //

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay },
  },
});

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

// ---- Small interactive components ---- //

const Counter = ({ target, suffix = "" }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 800;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const current = Math.floor(progress * target);
      setValue(current);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
};

// ---- Page ---- //

const YawayPortfolio = () => {
  const [activePersona, setActivePersona] = useState(personas[0]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const filters = ["All", ...Array.from(new Set(projects.map((p) => p.industry)))];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.industry === activeFilter);

  const currentTestimonial = testimonials[testimonialIndex];

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900">
      {/* Colorful blurred blobs in the background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-[-40px] h-72 w-72 rounded-full bg-pink-300/40 blur-3xl" />
        <div className="absolute top-40 right-[-40px] h-72 w-72 rounded-full bg-sky-300/40 blur-3xl" />
        <div className="absolute bottom-[-40px] left-1/3 h-72 w-72 rounded-full bg-emerald-300/40 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-16 pt-8 md:px-6 lg:px-0">
        {/* Simple top nav */}
        <header className="mb-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-emerald-500 text-sm font-bold text-white">
              Y
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Yaway Technologies
              </p>
              <p className="text-[11px] text-slate-500">
                Platforms • Dashboards • Systems
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-4 text-[11px] text-slate-600 md:flex">
            <a href="#projects" className="hover:text-sky-600">
              Projects
            </a>
            <a href="#services" className="hover:text-sky-600">
              Services
            </a>
            <a href="#process" className="hover:text-sky-600">
              Process
            </a>
            <a href="#signals" className="hover:text-sky-600">
              Signals
            </a>
            <a href="#contact" className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-white hover:bg-sky-700">
              Talk to us
            </a>
          </nav>
        </header>

        {/* Hero */}
        <motion.section
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/70 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-sky-700 shadow-sm shadow-sky-100 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
              Portfolio • In production, not on Figma
            </div>

            <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Vibrant{" "}
              <span className="bg-gradient-to-r from-sky-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
                digital systems
              </span>{" "}
              for teams that can&apos;t afford chaos.
            </h1>

            {/* Persona switcher */}
            <div className="space-y-3 rounded-2xl bg-white/80 p-3 shadow-md shadow-slate-200 backdrop-blur">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                You might be…
              </p>
              <div className="flex flex-wrap gap-2">
                {personas.map((persona) => {
                  const active = activePersona.key === persona.key;
                  return (
                    <button
                      key={persona.key}
                      onClick={() => setActivePersona(persona)}
                      className={`rounded-full px-3 py-1 text-[11px] transition ${
                        active
                          ? "bg-sky-500 text-white shadow-sm shadow-sky-300"
                          : "bg-sky-50 text-sky-800 border border-sky-100 hover:bg-sky-100"
                      }`}
                    >
                      {persona.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-700">{activePersona.line}</p>
            </div>

            <p className="max-w-xl text-sm text-slate-700 md:text-base">
              We design and build platforms, dashboards, and systems for teams
              that want fewer vendors and more real partners. No vanity case
              studies — just things running in production.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:hr@yawaytech.com"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-sky-300/60 transition hover:brightness-110"
              >
                Book a conversation
              </a>
              <a
                href="#projects"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-5 py-2 text-sm font-medium text-slate-800 shadow-sm backdrop-blur transition hover:border-sky-400 hover:bg-sky-50"
              >
                View case studies
              </a>
            </div>
          </div>

          {/* Stats + capability cluster */}
          <div className="mt-2 flex w-full flex-col gap-4 md:mt-0 md:w-[360px]">
            {/* Stats block with counters */}
            <div className="grid grid-cols-3 gap-3 rounded-3xl bg-white/90 p-4 shadow-xl shadow-sky-100 backdrop-blur">
              {stats.map((item, idx) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp(0.1 * idx)}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-start border-l border-slate-200 pl-3 first:border-l-0 first:pl-0"
                >
                  <span className="text-[11px] text-slate-500">
                    {item.label}
                  </span>
                  <span className="mt-1 bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-lg font-semibold text-transparent">
                    <Counter target={item.value} suffix={item.suffix || ""} />
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Capability bands */}
            <div className="space-y-2 rounded-3xl bg-gradient-to-br from-sky-100 via-pink-100 to-emerald-100 p-4 shadow-md shadow-slate-200">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-600">
                Where we usually plug in
              </p>
              <div className="space-y-2 text-[11px] text-slate-800">
                {capabilityBands.map((band) => (
                  <div key={band.label} className="flex flex-wrap items-center gap-1">
                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-700">
                      {band.label}
                    </span>
                    <span className="text-slate-600">·</span>
                    {band.items.map((item, idx) => (
                      <span key={item} className="text-slate-700">
                        {item}
                        {idx < band.items.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Clients */}
        <motion.section
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4"
        >
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 md:text-2xl">
                Clients
              </h2>
              <p className="max-w-md text-xs text-slate-600 md:text-sm">
                A small set of long-term partners across HR, finance, retail,
                and education.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              5 active partnerships
            </span>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            {clients.map((client, idx) => (
              <motion.div
                key={client.name}
                variants={fadeUp(0.05 * idx)}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-md shadow-slate-100 backdrop-blur"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 via-pink-100 to-emerald-100 text-[11px] font-semibold text-slate-800">
                  {client.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-900">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {client.industry}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Projects with filter */}
        <motion.section
          id="projects"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-5"
        >
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 md:text-2xl">
                Selected projects
              </h2>
              <p className="max-w-md text-xs text-slate-600 md:text-sm">
                Filter by type to see what matches your world.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-3 py-1 text-[11px] transition ${
                    activeFilter === filter
                      ? "bg-sky-500 text-white shadow-sm shadow-sky-300"
                      : "bg-white/80 text-slate-700 border border-slate-200 hover:bg-sky-50 hover:border-sky-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.title}
                variants={fadeUp(0.1 * idx)}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group flex flex-col rounded-3xl bg-white/95 p-5 shadow-xl shadow-slate-200 backdrop-blur"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 md:text-lg">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {project.client} • {project.industry}
                    </p>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-[11px] font-medium text-sky-600 underline-offset-4 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  )}
                </div>

                <p className="mt-3 text-sm text-slate-700">
                  {project.description}
                </p>
                {project.outcome && (
                  <p className="mt-2 text-xs text-emerald-700">
                    Result: {project.outcome}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] uppercase tracking-wide text-sky-700 border border-sky-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Services */}
        <motion.section
          id="services"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-5"
        >
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 md:text-2xl">
                Services
              </h2>
              <p className="max-w-md text-xs text-slate-600 md:text-sm">
                Plug us in as your product squad, not just ticket-takers.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                variants={fadeUp(0.05 * idx)}
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm shadow-md shadow-slate-100 backdrop-blur"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] bg-gradient-to-r from-violet-500 via-sky-500 to-emerald-500 bg-clip-text font-semibold text-transparent">
                  {service.title}
                </span>
                <p className="text-xs text-slate-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Process – interactive stepper */}
        <motion.section
          id="process"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 md:text-2xl">
                How we work
              </h2>
              <p className="max-w-md text-xs text-slate-600 md:text-sm">
                Click through the steps to see how an engagement usually flows.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
            {/* Steps list */}
            <div className="flex flex-wrap gap-3">
              {processSteps.map((step, idx) => {
                const active = idx === activeStepIndex;
                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`flex-1 min-w-[120px] rounded-2xl border px-3 py-3 text-left text-xs transition ${
                      active
                        ? "border-sky-500 bg-sky-50 shadow-sm shadow-sky-100"
                        : "border-slate-200 bg-white/80 hover:border-sky-300 hover:bg-sky-50"
                    }`}
                  >
                    <div className="text-[10px] font-medium tracking-[0.22em] text-slate-500">
                      {step.step}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-slate-900">
                      {step.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active step detail */}
            <motion.div
              key={processSteps[activeStepIndex].step}
              variants={fadeUp(0.05)}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-md shadow-slate-100 text-sm"
            >
              <div className="text-[11px] font-medium tracking-[0.22em] text-slate-500">
                {processSteps[activeStepIndex].step}
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {processSteps[activeStepIndex].title}
              </div>
              <p className="mt-2 text-xs text-slate-700">
                {processSteps[activeStepIndex].text}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Signals vs vanity */}
        <motion.section
          id="signals"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-5"
        >
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 md:text-2xl">
                Signals, not vanity
              </h2>
              <p className="max-w-md text-xs text-slate-600 md:text-sm">
                We don&apos;t count pageviews. We look at friction removed from
                your day-to-day.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {signalMetrics.map((metric, idx) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-xs shadow-md shadow-slate-100 backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-slate-800">
                    {metric.label}
                  </p>
                  <p className="text-[11px] font-semibold text-sky-700">
                    {metric.value}%
                  </p>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 * idx }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-600">{metric.note}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials – carousel */}
        <motion.section
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-5"
        >
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 md:text-2xl">
                What our clients say
              </h2>
              <p className="max-w-md text-xs text-slate-600 md:text-sm">
                Swipe through the feedback from some of our ongoing partners.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={prevTestimonial}
                className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:border-sky-400 hover:bg-sky-50"
              >
                ◀
              </button>
              <button
                onClick={nextTestimonial}
                className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:border-sky-400 hover:bg-sky-50"
              >
                ▶
              </button>
            </div>
          </div>

          <motion.div
            key={testimonialIndex}
            variants={fadeUp(0.05)}
            initial="hidden"
            animate="visible"
            className="rounded-2xl bg-white/95 p-5 text-sm shadow-md shadow-slate-200 backdrop-blur border border-slate-200 max-w-3xl"
          >
            <p className="text-sm italic text-slate-800">
              “{currentTestimonial.quote}”
            </p>
            <div className="mt-3 text-[11px]">
              <p className="font-semibold text-slate-900">
                {currentTestimonial.name}
              </p>
              <p className="text-slate-500">{currentTestimonial.company}</p>
            </div>
            <p className="mt-2 text-[10px] text-slate-400">
              {testimonialIndex + 1} / {testimonials.length}
            </p>
          </motion.div>
        </motion.section>

        {/* Tech stack */}
        <motion.section
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-slate-900 md:text-2xl">
            Tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((item, idx) => (
              <motion.span
                key={item}
                variants={fadeUp(0.02 * idx)}
                whileHover={{ y: -2 }}
                className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] text-slate-800 shadow-sm shadow-slate-100 backdrop-blur"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-slate-900 md:text-2xl">
            Questions teams usually ask
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const open = openFaqIndex === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm shadow-slate-100"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="text-xs font-medium text-slate-900">
                      {item.q}
                    </span>
                    <span className="text-xs text-slate-500">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open && (
                    <p className="mt-2 text-[11px] text-slate-600">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Contact / CTA */}
        <motion.section
          id="contact"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4 border-t border-slate-200 pt-8"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-900 md:text-2xl">
                Ready for your next platform?
              </h2>
              <p className="max-w-xl text-xs text-slate-600 md:text-sm">
                Send a short note about your team, stack, and what&apos;s
                slowing you down. We&apos;ll reply with a concrete next step.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 text-sm">
              <a
                href="mailto:hr@yawaytech.com"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-200/70 transition hover:brightness-110"
              >
                Email Yaway
              </a>
              <span className="text-[11px] text-slate-500">
                Prefer a call? Mention your preferred time in the mail.
              </span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default YawayPortfolio;
