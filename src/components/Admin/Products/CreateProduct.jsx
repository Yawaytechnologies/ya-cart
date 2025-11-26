    // src/pages/Admin/ProductCreate.jsx
import React, { useState } from "react";

const ProductCreate = () => {
  const [publish, setPublish] = useState(true);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Breadcrumb + title */}
      <div className="space-y-1">
        <h1 className="text-lg font-semibold text-slate-900">
          Create a new product
        </h1>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <span>Dashboard</span>
          <span>/</span>
          <span>Product</span>
          <span>/</span>
          <span className="text-orange-500 font-medium">Create</span>
        </div>
      </div>

      {/* DETAILS CARD */}
      <Card>
        <CardHeader title="Details" subtitle="Title, short description, images…" />
        <CardBody className="space-y-4">
          {/* Product name */}
          <div className="space-y-1 text-sm">
            <label className="text-slate-600">Product name</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300"
              placeholder="Cloud Lounge Sofa"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-1 text-sm">
            <label className="text-slate-600">Sub description</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300"
              placeholder="Short one-line highlight for this product"
            />
          </div>

          {/* Content / rich text (fake) */}
          <div className="space-y-1 text-sm">
            <label className="text-slate-600">Content</label>

            {/* Toolbar */}
            <div className="rounded-t-lg border border-b-0 border-slate-200 bg-slate-50 px-3 py-1.5 flex items-center gap-2 text-xs text-slate-500">
              <select className="h-7 rounded border border-slate-200 bg-white px-2 text-xs focus:outline-none">
                <option>Paragraph</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
              </select>
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <ToolbarButton label="B" bold />
                <ToolbarButton label="I" italic />
                <ToolbarButton label="U" underline />
                <ToolbarButton label="•" />
                <ToolbarButton label="1." />
                <ToolbarButton label="⎇" />
              </div>
            </div>

            {/* Editor area */}
            <textarea
              rows={5}
              className="w-full rounded-b-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300"
              placeholder="Write something awesome..."
            />
          </div>

          {/* Images (dropzone fake) */}
          <div className="space-y-1 text-sm">
            <label className="text-slate-600">Images</label>
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center py-10 text-center">
              <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-sm font-medium text-slate-700">
                Drop or select files
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Drag files here, or{" "}
                <button className="text-orange-500 hover:underline">
                  browse
                </button>{" "}
                your device.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* PROPERTIES CARD */}
      <Card>
        <CardHeader
          title="Properties"
          subtitle="Additional features and attributes…"
        />
        <CardBody className="space-y-4">
          {/* top row: code + SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Field label="Product code" placeholder="PRD-001" />
            <Field label="Product SKU" placeholder="SOFA-CL-3S" />
          </div>

          {/* second row: quantity + category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Field label="Quantity" type="number" placeholder="0" />
            <SelectField
              label="Category"
              options={["Sofa", "Bed", "Table", "Chair"]}
            />
          </div>

          {/* third row: colors + size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <SelectField
              label="Colors"
              options={["Mint", "Sand", "Charcoal", "Custom…"]}
            />
            <SelectField
              label="Sizes"
              options={["2-seater", "3-seater", "L-shape"]}
            />
          </div>

          {/* Tags */}
          <div className="space-y-1 text-sm">
            <label className="text-slate-600">Tags</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300"
              placeholder="sofa, living-room, fabric"
            />
          </div>

          {/* Gender checkboxes */}
          <div className="space-y-2 text-sm">
            <label className="text-slate-600">Gender</label>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <Checkbox label="Men" />
              <Checkbox label="Women" />
              <Checkbox label="Kids" />
            </div>
          </div>

          {/* Sale / label toggles (fake switches) */}
          <ToggleTextField label="Sale label" placeholder="Sale" />
          <ToggleTextField label="New label" placeholder="New arrival" />
        </CardBody>
      </Card>

      {/* PRICING CARD */}
      <Card>
        <CardHeader title="Pricing" subtitle="Price related inputs" />
        <CardBody className="space-y-4 text-sm">
          <Field label="Regular price" placeholder="$ 0.00" />
          <Field label="Sale price" placeholder="$ 0.00" />

          {/* tax */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <input
              id="taxIncluded"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
            />
            <label htmlFor="taxIncluded">Price includes taxes</label>
          </div>

          <Field label="Tax (%)" placeholder="0.00" />
        </CardBody>
      </Card>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-between pt-2 pb-8">
        {/* Publish toggle */}
        <button
          type="button"
          onClick={() => setPublish((v) => !v)}
          className="inline-flex items-center gap-2 text-sm"
        >
          <span
            className={[
              "relative inline-flex h-5 w-9 items-center rounded-full transition",
              publish ? "bg-emerald-500" : "bg-slate-300",
            ].join(" ")}
          >
            <span
              className={[
                "inline-block h-4 w-4 transform rounded-full bg-white shadow transition",
                publish ? "translate-x-4" : "translate-x-1",
              ].join(" ")}
            />
          </span>
          <span className="text-slate-600">Publish</span>
        </button>

        {/* Submit */}
        <button className="inline-flex items-center rounded-lg bg-slate-900 hover:bg-slate-800 text-sm font-medium text-white px-5 py-2.5 shadow-sm">
          Create product
        </button>
      </div>
    </div>
  );
};

/* ---------- Reusable pieces ---------- */

const Card = ({ children }) => (
  <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    {children}
  </section>
);

const CardHeader = ({ title, subtitle }) => (
  <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
    <div>
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      {subtitle && (
        <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>
      )}
    </div>
    {/* fake collapse icon */}
    <span className="text-slate-300 text-lg leading-none">⋮</span>
  </div>
);

const CardBody = ({ children, className = "" }) => (
  <div className={`px-5 py-4 ${className}`}>{children}</div>
);

const Field = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-1">
    <label className="text-slate-600">{label}</label>
    <input
      type={type}
      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300"
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, options }) => (
  <div className="space-y-1">
    <label className="text-slate-600">{label}</label>
    <select
      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300"
      defaultValue=""
    >
      <option value="" disabled>
        Select {label.toLowerCase()}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const Checkbox = ({ label }) => (
  <label className="inline-flex items-center gap-1.5 cursor-pointer">
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
    />
    <span>{label}</span>
  </label>
);

const ToggleTextField = ({  placeholder }) => (
  <div className="flex items-center gap-3">
    <button
      type="button"
      className="relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full bg-slate-300"
    >
      <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white shadow" />
    </button>
    <div className="flex-1">
      <input
        type="text"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300"
        placeholder={placeholder}
      />
    </div>
  </div>
);

const ToolbarButton = ({ label, bold, italic, underline }) => (
  <button
    type="button"
    className="h-7 w-7 inline-flex items-center justify-center rounded border border-transparent text-[11px] font-medium text-slate-500 hover:border-slate-300 hover:bg-white"
    style={{
      fontWeight: bold ? 700 : 500,
      fontStyle: italic ? "italic" : "normal",
      textDecoration: underline ? "underline" : "none",
    }}
  >
    {label}
  </button>
);

export default ProductCreate;
