// src/pages/Profile.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUser as UserRound,
  FiPackage as Package,
  FiMapPin as MapPin,
  FiHeart as Heart,
  FiShield as ShieldCheck,
  FiLogOut as LogOut,
  FiEdit as Pencil,
  FiPlus as Plus,
  FiChevronRight as ChevronRight,
  FiMail as Mail,
  FiPhone as Phone,
  FiCalendar as CalendarClock,
} from "react-icons/fi";
import { PRODUCTS } from "../components/Data/ProductData";

/* pull in non-component things only */
import {
  cx,
  currency,
  buildIndex,
  MOCK_USER,
  MOCK_ADDRESSES,
  MOCK_ORDERS,
  NAV as NAV_META,
} from "../features/Profile/profile.helpers";

/* ---------------- small components (no exports here) ---------------- */
const Initials = ({ name = "", className = "" }) => {
  const init = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={cx(
        "grid place-items-center rounded-full bg-[#3B312A]/90 text-[#F6F2EC] font-semibold",
        className
      )}
    >
      {init || "U"}
    </div>
  );
};

const Status = ({ value }) => {
  const map = {
    processing: "bg-amber-100 text-amber-900 ring-amber-200",
    shipped: "bg-blue-100 text-blue-900 ring-blue-200",
    delivered: "bg-emerald-100 text-emerald-900 ring-emerald-200",
    cancelled: "bg-rose-100 text-rose-900 ring-rose-200",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ring-1",
        map[value] || "bg-zinc-100 text-zinc-800 ring-zinc-200"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {value[0].toUpperCase() + value.slice(1)}
    </span>
  );
};

const Section = ({ title, description, children, action }) => (
  <section className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
    <div className="flex items-start justify-between gap-4 border-b border-black/5 p-5 md:p-6">
      <div>
        <h3 className="text-lg font-semibold text-[#3B312A]">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-[#6B5E54]">{description}</p>
        )}
      </div>
      {action}
    </div>
    <div className="p-5 md:p-6">{children}</div>
  </section>
);

/* ---------------- responsive order card ---------------- */
function OrderCard({ order, resolver }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="grid gap-1 sm:flex sm:items-center sm:gap-3">
        <div className="text-base sm:text-sm font-semibold text-[#3B312A]">
          {order.id}
        </div>
        <div className="text-xs sm:text-sm text-[#6B5E54]">
          {new Date(order.date).toLocaleDateString()}
        </div>

        <div className="sm:ml-auto flex items-center justify-between gap-3">
          <Status value={order.status} />
          <span className="text-sm sm:text-base font-semibold text-[#3B312A]">
            {currency(order.total)}
          </span>
        </div>
      </div>

      {/* Products row */}
      <div className="mt-4 overflow-x-auto no-scrollbar sm:overflow-visible">
        <div className="flex gap-3 pb-2 snap-x snap-mandatory sm:flex-wrap sm:snap-none">
          {order.items.map((it, idx) => {
            const p = resolver(it);
            const img = p?.img;
            const title = it.title || p?.title || "Product";
            const price = it.price ?? p?.price ?? 0;
            const qty = it.qty ?? 1;

            return (
              <div
                key={order.id + "-" + idx}
                className="
                  flex-none snap-center
                  basis-[260px]
                  sm:basis-auto sm:flex-initial
                  flex items-center gap-3 rounded-xl border border-black/10
                  bg-[#FDFBF7] p-2 pr-3
                "
              >
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-md ring-1 ring-black/5 bg-white shrink-0">
                  {img ? (
                    <img
                      src={img}
                      alt={title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-xs text-[#6B5E54]">
                      No image
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-[#3B312A]">
                    {title}
                  </div>
                  <div className="text-xs text-[#6B5E54]">Qty: {qty}</div>
                  <div className="text-xs font-medium">{currency(price)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm text-[#6B5E54]">
        <span>
          {order.items.length} {order.items.length > 1 ? "items" : "item"}
        </span>
        <span>Order total includes tax & shipping (if any)</span>
      </div>
    </div>
  );
}

/* ---------------- page ---------------- */
export default function Profile() {
  const [tab, setTab] = useState("overview");
  const [profile, setProfile] = useState({
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    phone: MOCK_USER.phone,
  });
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [addingAddress, setAddingAddress] = useState(false);

  const idx = useMemo(() => buildIndex(PRODUCTS), []);
  const joined = useMemo(
    () =>
      new Date(MOCK_USER.joinedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    []
  );

  const resolveProduct = (item) =>
    idx.byId.get(item.productId) ||
    idx.bySlug.get(item.slug) ||
    idx.byTitle.get(idx.norm(item.title));

  const onProfileSave = (e) => {
    e.preventDefault();
    console.log("Profile saved", profile);
  };

  const onAddAddress = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const a = {
      id: crypto.randomUUID(),
      label: d.get("label"),
      line1: d.get("line1"),
      line2: d.get("line2"),
      city: d.get("city"),
      state: d.get("state"),
      zip: d.get("zip"),
      country: d.get("country"),
      isDefault: addresses.length === 0,
    };
    setAddresses((p) => [...p, a]);
    setAddingAddress(false);
    e.currentTarget.reset();
  };

  const makeDefault = (id) =>
    setAddresses((all) => all.map((a) => ({ ...a, isDefault: a.id === id })));

  // enrich NAV with icon refs here (helpers are icon-less)
  const NAV = [
    { ...NAV_META[0], icon: UserRound },
    { ...NAV_META[1], icon: Package },
    { ...NAV_META[2], icon: MapPin },
    { ...NAV_META[3], icon: Heart },
    { ...NAV_META[4], icon: ShieldCheck },
  ];

  return (
    <main className="min-h-screen bg-[#F6F2EC] text-[#3B312A] pt-14 ">
      {/* header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-8 md:py-10">
          <nav className="text-sm text-[#6B5E54]">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#3B312A]">Profile</span>
          </nav>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            My Account
          </h1>
          <p className="mt-1 text-[#6B5E54]">
            Manage your profile, orders and addresses.
          </p>
        </div>
      </div>

      {/* layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-12 gap-6">
          {/* sidebar (sticky only on md+) */}
          <aside className="col-span-12 md:col-span-4 lg:col-span-3 md:sticky md:top-28 self-start">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-4">
                <Initials name={profile.name} className="h-12 w-12" />
                <div>
                  <div className="font-semibold">{profile.name}</div>
                  <div className="text-xs text-[#6B5E54]">
                    Member since {joined}
                  </div>
                </div>
              </div>

              <div className="my-5 h-px bg-black/5" />

              <nav className="grid gap-1">
                {NAV.map(({ key, label, icon: IconComponent, href }) =>
                  href ? (
                    <Link
                      key={key}
                      to={href}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#3B312A] hover:bg-[#3B312A]/5"
                    >
                      {IconComponent && (
                        <IconComponent size={18} className="opacity-80" />
                      )}
                      {label}
                      <ChevronRight className="ml-auto size-4 opacity-40 group-hover:opacity-70" />
                    </Link>
                  ) : (
                    <button
                      key={key}
                      onClick={() => setTab(key)}
                      aria-selected={tab === key}
                      className={cx(
                        "flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm",
                        tab === key
                          ? "bg-[#3B312A] text-[#F6F2EC]"
                          : "text-[#3B312A] hover:bg-[#3B312A]/5"
                      )}
                    >
                      {IconComponent && (
                        <IconComponent
                          size={18}
                          className={tab === key ? "opacity-90" : "opacity-80"}
                        />
                      )}
                      {label}
                    </button>
                  )
                )}
              </nav>

              <div className="my-5 h-px bg-black/5" />

              {/* medium-width sign out */}
              <button
                onClick={() => console.log("logout")}
                className="flex w-36 mx-auto items-center justify-center gap-2 rounded-xl bg-[#3B312A] px-4 py-2 text-sm font-medium text-[#F6F2EC] hover:opacity-95"
              >
                <LogOut size={18} />
                Sign out
              </button>
            </div>
          </aside>

          {/* content */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-6">
            {tab === "overview" && (
              <>
                <Section
                  title="Profile"
                  description="Basic information for your account."
                  action={
                    <button
                      onClick={() => setTab("security")}
                      className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm hover:bg-black/5"
                    >
                      <ShieldCheck size={16} />
                      Security
                    </button>
                  }
                >
                  <form
                    onSubmit={onProfileSave}
                    className="grid gap-4 md:grid-cols-2"
                  >
                    <label className="grid gap-1">
                      <span className="text-sm text-[#6B5E54]">Full name</span>
                      <input
                        className="rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B312A]/20"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                      />
                    </label>
                    <label className="grid gap-1">
                      <span className="text-sm text-[#6B5E54]">Email</span>
                      <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2">
                        <Mail size={16} className="opacity-60" />
                        <input
                          className="w-full bg-transparent focus:outline-none"
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile((p) => ({ ...p, email: e.target.value }))
                          }
                          required
                        />
                      </div>
                    </label>
                    <label className="grid gap-1 md:col-span-2">
                      <span className="text-sm text-[#6B5E54]">Phone</span>
                      <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2">
                        <Phone size={16} className="opacity-60" />
                        <input
                          className="w-full bg-transparent focus:outline-none"
                          type="tel"
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile((p) => ({ ...p, phone: e.target.value }))
                          }
                        />
                      </div>
                    </label>
                    <div className="grid gap-1">
                      <span className="text-sm text-[#6B5E54]">
                        Member since
                      </span>
                      <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2 text-sm text-[#6B5E54]">
                        <CalendarClock size={16} className="opacity-60" />
                        {joined}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <button className="inline-flex items-center gap-2 rounded-xl bg-[#3B312A] px-4 py-2 text-sm font-medium text-[#F6F2EC] hover:opacity-95">
                        <Pencil size={16} />
                        Save changes
                      </button>
                    </div>
                  </form>
                </Section>

                <Section
                  title="Recent orders"
                  description="Track status and view purchased products."
                  action={
                    <button
                      onClick={() => setTab("orders")}
                      className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm hover:bg-black/5"
                    >
                      View all
                      <ChevronRight size={16} />
                    </button>
                  }
                >
                  <div className="grid gap-4">
                    {MOCK_ORDERS.slice(0, 3).map((o) => (
                      <OrderCard
                        key={o.id}
                        order={o}
                        resolver={resolveProduct}
                      />
                    ))}
                  </div>
                </Section>
              </>
            )}

            {tab === "orders" && (
              <Section title="Orders" description="Your complete order history.">
                <div className="grid gap-4">
                  {MOCK_ORDERS.map((o) => (
                    <OrderCard key={o.id} order={o} resolver={resolveProduct} />
                  ))}
                </div>
              </Section>
            )}

            {tab === "addresses" && (
              <Section
                title="Addresses"
                description="Add or edit your shipping addresses."
                action={
                  !addingAddress && (
                    <button
                      onClick={() => setAddingAddress(true)}
                      className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm hover:bg-black/5"
                    >
                      <Plus size={16} />
                      Add new
                    </button>
                  )
                }
              >
                {addingAddress && (
                  <form
                    onSubmit={onAddAddress}
                    className="mb-6 grid gap-4 md:grid-cols-2"
                  >
                    <label className="grid gap-1">
                      <span className="text-sm text-[#6B5E54]">Label</span>
                      <input
                        name="label"
                        placeholder="Home / Office"
                        className="rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2"
                        required
                      />
                    </label>
                    <label className="grid gap-1 md:col-span-2">
                      <span className="text-sm text-[#6B5E54]">
                        Address line 1
                      </span>
                      <input
                        name="line1"
                        className="rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2"
                        required
                      />
                    </label>
                    <label className="grid gap-1 md:col-span-2">
                      <span className="text-sm text-[#6B5E54]">
                        Address line 2
                      </span>
                      <input
                        name="line2"
                        className="rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2"
                      />
                    </label>
                    <label className="grid gap-1">
                      <span className="text-sm text-[#6B5E54]">City</span>
                      <input
                        name="city"
                        className="rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2"
                        required
                      />
                    </label>
                    <label className="grid gap-1">
                      <span className="text-sm text-[#6B5E54]">State</span>
                      <input
                        name="state"
                        className="rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2"
                        required
                      />
                    </label>
                    <label className="grid gap-1">
                      <span className="text-sm text-[#6B5E54]">ZIP</span>
                      <input
                        name="zip"
                        className="rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2"
                        required
                      />
                    </label>
                    <label className="grid gap-1">
                      <span className="text-sm text-[#6B5E54]">Country</span>
                      <input
                        name="country"
                        className="rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2"
                        defaultValue="India"
                        required
                      />
                    </label>
                    <div className="md:col-span-2 flex gap-3">
                      <button className="rounded-xl bg-[#3B312A] px-4 py-2 text-sm font-medium text-[#F6F2EC] hover:opacity-95">
                        Save address
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddingAddress(false)}
                        className="rounded-xl border border-black/10 px-4 py-2 text-sm hover:bg-black/5"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  {addresses.map((a) => (
                    <div
                      key={a.id}
                      className={cx(
                        "rounded-xl border p-4 shadow-sm",
                        a.isDefault
                          ? "border-[#3B312A]/30 bg-[#3B312A]/5"
                          : "border-black/10 bg-white"
                      )}
                    >
                      <div className="mb-2 flex items-center gap-2 font-medium">
                        <MapPin size={16} className="opacity-70" />
                        {a.label}
                        {a.isDefault && (
                          <span className="ml-2 rounded-full bg-[#3B312A] px-2 py-0.5 text-xs text-[#F6F2EC]">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#6B5E54]">
                        {a.line1}
                        {a.line2 ? `, ${a.line2}` : ""}
                        <br />
                        {a.city}, {a.state} {a.zip}
                        <br />
                        {a.country}
                      </p>
                      {!a.isDefault && (
                        <button
                          onClick={() => makeDefault(a.id)}
                          className="mt-3 text-sm text-[#3B312A] underline underline-offset-4"
                        >
                          Make default
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {tab === "security" && (
              <Section
                title="Security"
                description="Update your password to keep your account protected."
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Password updated");
                  }}
                  className="grid max-w-lg gap-4"
                >
                  <label className="grid gap-1">
                    <span className="text-sm text-[#6B5E54]">
                      Current password
                    </span>
                    <input
                      type="password"
                      className="rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2"
                      required
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm text-[#6B5E54]">New password</span>
                    <input
                      type="password"
                      className="rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2"
                      required
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm text-[#6B5E54]">
                      Confirm password
                    </span>
                    <input
                      type="password"
                      className="rounded-xl border border-black/10 bg-[#FDFBF7] px-3 py-2"
                      required
                    />
                  </label>
                  <div className="flex gap-3">
                    <button className="rounded-xl bg-[#3B312A] px-4 py-2 text-sm font-medium text-[#F6F2EC] hover:opacity-95">
                      Update password
                    </button>
                    <Link
                      to="/contact"
                      className="rounded-xl border border-black/10 px-4 py-2 text-sm hover:bg-black/5"
                    >
                      Contact support
                    </Link>
                  </div>
                </form>
              </Section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
