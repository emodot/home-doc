import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAdminPlans, createPlan, updatePlan, deletePlan } from "services/apiService";
import { formatNaira } from "utils/formatMoney";
import Spinner from "components/Spinner";
import DataTable from "components/Admin/DataTable";
import SideModal from "components/Admin/SideModal";
import ConfirmModal from "components/Admin/ConfirmModal";
import ServicesSection from "components/Admin/ServicesSection";
import { ReactComponent as DeleteIcon } from "assets/icons/delete-icon-red.svg";

const EMPTY_PLAN = {
  name: "",
  priceNaira: "",
  period: "/month",
  bestFor: "",
  featuresText: "",
  icon: "other",
  highlight: false,
  sortOrder: 0,
  isActive: true,
};

const inputClass =
  "w-full border border-neutral_stroke_1 rounded-[8px] px-3 py-2 font-publica_sans_l text-14 focus:outline-none focus:border-brand_primary";
const labelClass = "block font-publica_sans_l text-12 text-border_stroke_2 mb-1";

const Plans = () => {
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_PLAN);
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () =>
    fetchAdminPlans()
      .then((result) => setPlans(result.data))
      .catch((err) => setError(err.message || "Failed to load plans"));

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm({ ...EMPTY_PLAN, sortOrder: (plans?.length || 0) + 1 });
    setEditing("new");
  };

  const openEdit = (plan) => {
    setForm({
      name: plan.name,
      priceNaira: String(plan.priceKobo / 100),
      period: plan.period,
      bestFor: plan.bestFor,
      featuresText: plan.features.join("\n"),
      icon: plan.icon,
      highlight: plan.highlight,
      sortOrder: plan.sortOrder,
      isActive: plan.isActive,
    });
    setEditing(plan);
  };

  const handleSave = async () => {
    const features = form.featuresText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const priceNaira = Number(form.priceNaira);

    if (!form.name.trim() || !form.bestFor.trim() || features.length === 0) {
      toast.error("Name, best for, and at least one feature are required.");
      return;
    }
    if (!Number.isFinite(priceNaira) || priceNaira <= 0) {
      toast.error("Enter a valid price.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      priceKobo: Math.round(priceNaira * 100),
      period: form.period.trim() || "/month",
      bestFor: form.bestFor.trim(),
      features,
      icon: form.icon,
      highlight: form.highlight,
      sortOrder: Number(form.sortOrder) || 0,
      isActive: form.isActive,
    };

    setSaving(true);
    try {
      if (editing === "new") {
        await createPlan(payload);
        toast.success("Plan created.");
      } else {
        await updatePlan(editing.id, payload);
        toast.success("Plan updated.");
      }
      await load();
      setEditing(null);
    } catch (err) {
      toast.error(err.message || "Failed to save plan");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deletePlan(pendingDelete.id);
      setPlans((current) => current.filter((item) => item.id !== pendingDelete.id));
      toast.success("Plan deleted.");
      setPendingDelete(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete plan");
    } finally {
      setDeleting(false);
    }
  };

  if (error) {
    return <p className="font-publica_sans_l text-14 text-error">{error}</p>;
  }

  if (!plans) {
    return (
      <div className="flex justify-center py-[4rem]">
        <Spinner />
      </div>
    );
  }

  const columns = [
    {
      key: "name",
      label: "Plan",
      render: (row) => (
        <span className="font-publica_sans_r flex items-center gap-2">
          {row.name}
          {row.highlight && (
            <span className="bg-[#DAFFDD] text-[#3AD848] text-12 font-publica_sans_r px-2 py-[2px] rounded-full">
              Best
            </span>
          )}
        </span>
      ),
    },
    { key: "priceKobo", label: "Price", render: (row) => formatNaira(row.priceKobo) },
    { key: "period", label: "Period" },
    { key: "features", label: "Features", render: (row) => `${row.features.length} items` },
    { key: "sortOrder", label: "Order" },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <span
          className={`inline-block font-publica_sans_r text-12 px-3 py-1 rounded-full ${
            row.isActive ? "bg-success_fade text-success_900" : "bg-neutral_disabled text-border_stroke_2"
          }`}
        >
          {row.isActive ? "Live" : "Hidden"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <button
          onClick={(event) => {
            event.stopPropagation();
            setPendingDelete(row);
          }}
          className="w-[18px]"
          aria-label="Delete plan"
        >
          <DeleteIcon />
        </button>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="font-publica_sans_m text-24 text-brand_secondary mb-1">Plans & Pricing</h1>
          <p className="font-publica_sans_l text-14 text-border_stroke_2">
            These plans power the public pricing page and the request flow. Changes go live
            immediately.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-brand_primary text-white font-publica_sans_r text-14 px-5 py-[10px] rounded-[8px]"
        >
          Add plan
        </button>
      </div>

      <DataTable
        columns={columns}
        rows={plans}
        onRowClick={openEdit}
        emptyMessage="No plans yet. Add one to get started."
      />

      <SideModal
        open={Boolean(editing)}
        title={editing === "new" ? "Add plan" : "Edit plan"}
        subtitle={editing && editing !== "new" ? editing.name : "Shown on the public pricing page"}
        onClose={() => setEditing(null)}
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setEditing(null)}
              disabled={saving}
              className="font-publica_sans_r text-14 px-4 py-2 rounded-[8px] border border-neutral_stroke_1 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="font-publica_sans_r text-14 px-4 py-2 rounded-[8px] bg-brand_secondary text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save plan"}
            </button>
          </div>
        }
      >
        <div className="mb-4">
          <label className={labelClass}>Plan name</label>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Gold Plan"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className={labelClass}>Price (₦)</label>
            <input
              className={inputClass}
              type="number"
              value={form.priceNaira}
              onChange={(e) => setForm({ ...form, priceNaira: e.target.value })}
              placeholder="62000"
            />
          </div>
          <div>
            <label className={labelClass}>Period</label>
            <input
              className={inputClass}
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
              placeholder="/month"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className={labelClass}>Best for</label>
          <input
            className={inputClass}
            value={form.bestFor}
            onChange={(e) => setForm({ ...form, bestFor: e.target.value })}
            placeholder="Light support and regular check-ins"
          />
        </div>

        <div className="mb-4">
          <label className={labelClass}>Features (one per line)</label>
          <textarea
            className={`${inputClass} min-h-[160px]`}
            value={form.featuresText}
            onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
            placeholder={"1 doctor home visit/month\n2 virtual consultations/month"}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className={labelClass}>Icon</label>
            <select
              className={inputClass}
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            >
              <option value="other">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Display order</label>
            <input
              className={inputClass}
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 mb-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.highlight}
            onChange={(e) => setForm({ ...form, highlight: e.target.checked })}
          />
          <span className="font-publica_sans_l text-14">Mark as “Best Plan”</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          <span className="font-publica_sans_l text-14">Show on public pricing page</span>
        </label>
      </SideModal>

      <ConfirmModal
        open={Boolean(pendingDelete)}
        title="Delete this plan?"
        message={
          pendingDelete
            ? `“${pendingDelete.name}” will be removed from the public pricing page and the request flow. Existing care requests keep their record of it. This cannot be undone.`
            : ""
        }
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <ServicesSection />
    </motion.div>
  );
};

export default Plans;
