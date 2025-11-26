import React from "react";

const SEARCH_ITEMS = [
  { label: "App", path: "/dashboard" },
  { label: "Ecommerce", path: "/dashboard/ecommerce" },
  { label: "Analytics", path: "/dashboard/analytics" },
  { label: "Banking", path: "/dashboard/banking" },
  { label: "Booking", path: "/dashboard/booking" },
];

const AdminHeader = ({ onToggleSidebar, sidebarOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <>
      <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6">
        {/* LEFT: logo + arrow aligned with sidebar width */}
        <div
          className={[
            "flex items-center justify-between transition-all duration-200",
            sidebarOpen ? "w-64" : "w-20",
          ].join(" ")}
        >
          {/* Peach logo */}
          <div className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-orange-300 via-orange-400 to-rose-400 shadow-sm">
            <span className="text-white font-bold text-lg leading-none">M</span>
          </div>

          {/* Sidebar toggle arrow at end of sidebar width */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition"
          >
            <span className="text-slate-500 text-sm">
              {sidebarOpen ? "\u2039" : "\u203A"}
            </span>
          </button>
        </div>

        {/* Middle spacer */}
        <div className="flex-1" />

        {/* RIGHT: search pill, gear icon, profile */}
        <div className="flex items-center gap-3">
          {/* Search pill – click opens command palette */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 border border-slate-100 shadow-sm"
          >
            {/* circular icon container */}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-slate-200">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-slate-500"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
                <line
                  x1="14.8"
                  y1="14.8"
                  x2="18"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-[11px] font-medium tracking-[0.18em] text-slate-500 uppercase">
              ⌘K
            </span>
          </button>

          {/* Gear icon */}
          <button
            type="button"
            className="group inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-50 transition"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-slate-500 transform transition-transform duration-300 group-hover:rotate-90"
              aria-hidden="true"
            >
              <path
                d="M9.7 3.3 9.4 5.2a1 1 0 0 1-.7.8l-1.7.6a1 1 0 0 0-.6.6l-.6 1.7a1 1 0 0 1-.8.7L3.3 9.7A1 1 0 0 0 2.5 11v2a1 1 0 0 0 .8 1.1l1.7.3a1 1 0 0 1 .8.7l.6 1.7a1 1 0 0 0 .6.6l1.7.6a1 1 0 0 1 .7.8l.3 1.7A1 1 0 0 0 11 21h2a1 1 0 0 0 1-.8l.3-1.7a1 1 0 0 1 .7-.8l1.7-.6a1 1 0 0 0 .6-.6l.6-1.7a1 1 0 0 1 .8-.7l1.7-.3a1 1 0 0 0 .8-1.1v-2a1 1 0 0 0-.8-1.1l-1.7-.3a1 1 0 0 1-.8-.7l-.6-1.7a1 1 0 0 0-.6-.6l-1.7-.6a1 1 0 0 1-.7-.8L14.3 3.3A1 1 0 0 0 13.3 2h-2a1 1 0 0 0-.9 1.3Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </button>

          {/* Profile avatar */}
          <button
            type="button"
            className="h-9 w-9 rounded-full p-[2px] bg-gradient-to-br from-orange-300 via-orange-400 to-rose-400"
          >
            <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-semibold text-slate-700">
              JF
            </div>
          </button>
        </div>
      </header>

      {/* Search command palette overlay */}
      {isSearchOpen && (
        <SearchOverlay onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
};

/* ------------ Search overlay component ------------ */

const SearchOverlay = ({ onClose }) => {
  const [query, setQuery] = React.useState("");

  // close on ESC
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const filtered = SEARCH_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      {/* click backdrop to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-2xl mx-auto rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Top search input row */}
        <div className="flex items-center px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3 flex-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-slate-500"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
                <line
                  x1="14.8"
                  y1="14.8"
                  x2="18"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-500"
          >
            Esc
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[22rem] overflow-y-auto text-sm">
          {filtered.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-6 py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 cursor-pointer"
            >
              <div>
                <div className="text-slate-800">{item.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {item.path}
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
                Overview
              </span>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-6 py-6 text-center text-xs text-slate-400">
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
