// src/components/Admin/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const groups = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    path: "/admin",
    items: [],
  },
  {
    key: "product",
    label: "Product",
    icon: "product",
    items: [
      { label: "List", path: "/admin/products/list" },
      { label: "Details", path: "/admin/products/details" },
      { label: "Create", path: "/admin/products/create" },
    ],
  },
  {
    key: "order",
    label: "Order",
    icon: "order",
    items: [
      { label: "List", path: "/admin/orders/list" },
      { label: "Details", path: "/admin/orders/details" },
    ],
  },
  {
    key: "invoice",
    label: "Invoice",
    icon: "invoice",
    items: [
      { label: "List", path: "/admin/invoices/list" },
      { label: "Details", path: "/admin/invoices/details" },
    ],
  },
  
];

const Sidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openKey, setOpenKey] = useState(() => {
    const p = location.pathname;
    if (p.startsWith("/admin/products")) return "product";
    if (p.startsWith("/admin/orders")) return "order";
    if (p.startsWith("/admin/invoices")) return "invoice";
    if (p.startsWith("/admin/users")) return "user";
    return "dashboard";
  });

  // For mobile dropup
  const [mobileOpenKey, setMobileOpenKey] = useState("");

  const isGroupActive = (group) => {
    const p = location.pathname;

    if (group.path && p.startsWith(group.path)) return true;

    if (group.items && group.items.length > 0) {
      return group.items.some((item) => p.startsWith(item.path));
    }

    return false;
  };

  const getGroupDefaultPath = (group) => {
    if (group.path) return group.path;
    if (group.items && group.items.length > 0) return group.items[0].path;
    return "/admin";
  };

  const activeDropupGroup =
    groups.find(
      (g) => g.key === mobileOpenKey && g.items && g.items.length > 0
    ) || null;

  return (
    <>
      {/* Desktop / tablet sidebar on the left */}
      <aside className="hidden md:flex h-full flex-col bg-white">
        <nav
          className={[
            "flex-1 overflow-y-auto py-4 space-y-2",
            sidebarOpen ? "px-3" : "px-2",
          ].join(" ")}
        >
          {groups.map((group) => {
            const isOpen = openKey === group.key;
            const hasChildren = group.items && group.items.length > 0;

            const handleGroupClick = () => {
              if (group.path && !hasChildren) {
                navigate(group.path);
                setOpenKey("dashboard");
              } else {
                setOpenKey((prev) => (prev === group.key ? "" : group.key));
              }
            };

            return (
              <div key={group.key} className="rounded-2xl overflow-hidden">
                {/* Top group row */}
                <button
                  type="button"
                  onClick={handleGroupClick}
                  className={[
                    "w-full flex items-center justify-between px-3 py-2 text-[15px] font-medium transition",
                    isOpen
                      ? "bg-orange-50 text-slate-900 border border-orange-100 shadow-[0_1px_4px_rgba(248,180,75,0.25)]"
                      : "bg-white text-slate-800 hover:bg-orange-50/60 border border-transparent",
                    !sidebarOpen && "justify-center",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "flex items-center gap-2",
                      !sidebarOpen && "justify-center",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "inline-flex h-7 w-7 items-center justify-center rounded-lg border text-[13px]",
                        isOpen
                          ? "bg-white border-orange-200 text-orange-500"
                          : "bg-orange-50 border-orange-100 text-orange-400",
                      ].join(" ")}
                    >
                      <SidebarIcon type={group.icon} />
                    </span>
                    {/* hide label when collapsed */}
                    {sidebarOpen && <span>{group.label}</span>}
                  </div>

                  {/* chevron only when expanded sidebar & group has children */}
                  {sidebarOpen && hasChildren && (
                    <span
                      className={[
                        "text-xs transition-transform",
                        isOpen
                          ? "text-orange-500 rotate-90"
                          : "text-slate-400",
                      ].join(" ")}
                    >
                      ▸
                    </span>
                  )}
                </button>

                {/* Tree-style children: only show when sidebarOpen */}
                {sidebarOpen && isOpen && hasChildren && (
                  <div className="bg-white">
                    <div className="ml-5 border-l-2 border-orange-100">
                      {group.items.map((item) => {
                        const isActive =
                          item.path &&
                          location.pathname.startsWith(item.path);

                        return (
                          <div
                            key={item.label}
                            onClick={() => item.path && navigate(item.path)}
                            className={[
                              "relative pl-4 pr-3 py-1.5 text-sm cursor-pointer transition",
                              isActive
                                ? "bg-orange-50 text-orange-700"
                                : "text-slate-500 hover:bg-orange-50 hover:text-orange-700",
                            ].join(" ")}
                          >
                            <div className="absolute left-[-2px] top-0 h-full w-4">
                              <div className="h-1 w-full bg-white" />
                              <div className="border-l-2 border-orange-100 h-full rounded-bl-xl" />
                            </div>

                            {item.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Mobile dropup for group children */}
      {activeDropupGroup && (
        <div className="fixed inset-x-0 bottom-14 z-50 px-3 pb-2 md:hidden">
          <div className="mx-3 rounded-2xl border border-orange-100 bg-white shadow-lg shadow-orange-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 text-xs font-semibold text-slate-600 bg-orange-50/60 border-b border-orange-100">
              <span>{activeDropupGroup.label}</span>
              <button
                type="button"
                onClick={() => setMobileOpenKey("")}
                className="text-[11px] px-2 py-0.5 rounded-full border border-orange-200 text-orange-600"
              >
                Close
              </button>
            </div>
            <div className="py-1">
              {activeDropupGroup.items.map((item) => {
                const isActive =
                  item.path && location.pathname.startsWith(item.path);

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (item.path) {
                        navigate(item.path);
                        setMobileOpenKey("");
                      }
                    }}
                    className={[
                      "w-full text-left px-4 py-2 text-[13px] flex items-center justify-between transition",
                      isActive
                        ? "bg-orange-50 text-orange-700"
                        : "text-slate-600 hover:bg-orange-50 hover:text-orange-700",
                    ].join(" ")}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="text-[10px] uppercase tracking-wide text-orange-500">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 md:hidden">
        <div className="flex justify-around items-stretch py-1.5">
          {groups.map((group) => {
            const active = isGroupActive(group);
            const hasChildren = group.items && group.items.length > 0;

            const handleMobileClick = () => {
              if (hasChildren) {
                setMobileOpenKey((prev) =>
                  prev === group.key ? "" : group.key
                );
              } else {
                const target = getGroupDefaultPath(group);
                navigate(target);
                setMobileOpenKey("");
              }
            };

            const isDropupOpen = mobileOpenKey === group.key;

            return (
              <button
                key={group.key}
                type="button"
                onClick={handleMobileClick}
                className={[
                  "flex flex-col items-center justify-center flex-1 gap-0.5 text-[11px] py-1",
                  active || isDropupOpen
                    ? "text-orange-600"
                    : "text-slate-500 hover:text-orange-500",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex h-7 w-7 items-center justify-center rounded-full border text-[13px]",
                    active || isDropupOpen
                      ? "bg-orange-50 border-orange-200"
                      : "bg-slate-50 border-slate-200",
                  ].join(" ")}
                >
                  <SidebarIcon type={group.icon} />
                </span>
                <span className="leading-none mt-0.5">{group.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

/* icons unchanged */
const SidebarIcon = ({ type }) => {
  switch (type) {
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <rect x="4" y="4" width="6" height="6" rx="1.5" fill="currentColor" />
          <rect
            x="14"
            y="4"
            width="6"
            height="6"
            rx="1.5"
            fill="currentColor"
            opacity="0.7"
          />
          <rect
            x="4"
            y="14"
            width="6"
            height="6"
            rx="1.5"
            fill="currentColor"
            opacity="0.7"
          />
          <rect
            x="14"
            y="14"
            width="6"
            height="6"
            rx="1.5"
            fill="currentColor"
            opacity="0.55"
          />
        </svg>
      );
    case "product":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            d="M11 6a1 1 0 0 1 2 0c0 .6-.4 1-1 1-.6 0-1 .4-1 1 0 .4.2.7.5.9L13 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M5 11.5 3.6 15a1 1 0 0 0 .9 1.4h15a1 1 0 0 0 .9-1.4L19 11.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "order":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <circle cx="9" cy="19" r="1.1" fill="currentColor" />
          <circle cx="17" cy="19" r="1.1" fill="currentColor" />
          <path
            d="M4 5h2l1.2 8.5a1 1 0 0 0 1 .9H17a1 1 0 0 0 1-.8L19 9H8.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "invoice":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            d="M7 4h10v15l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2V4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 8.5h5M9.5 11h3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "user":
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <circle
            cx="12"
            cy="9"
            r="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M6 18c.7-2.2 3-4 6-4s5.3 1.8 6 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

export default Sidebar;
