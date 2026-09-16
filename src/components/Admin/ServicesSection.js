import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  fetchAdminServices,
  createService,
  updateService,
  deleteService,
} from "services/apiService";
import { formatNaira } from "utils/formatMoney";
import Spinner from "components/Spinner";
import DataTable from "components/Admin/DataTable";
import SideModal from "components/Admin/SideModal";
import ConfirmModal from "components/Admin/ConfirmModal";
import { ReactComponent as DeleteIcon } from "assets/icons/delete-icon-red.svg";

const EMPTY_SERVICE = { name: "", priceNaira: "", sortOrder: 0, isActive: true };

const inputClass =
  "w-full border border-neutral_stroke_1 rounded-[8px] px-3 py-2 font-publica_sans_l text-14 focus:outline-none focus:border-brand_primary";
const labelClass = "block font-publica_sans_l text-12 text-border_stroke_2 mb-1";

const ServicesSection = () => {
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_SERVICE);
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () =>
    fetchAdminServices()
      .then((result) => setServices(result.data))
      .catch((err) => setError(err.message || "Failed to load services"));

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm({ ...EMPTY_SERVICE, sortOrder: (services?.length || 0) + 1 });
    setEditing("new");
  };

  const openEdit = (service) => {
    setForm({
      name: service.name,
      priceNaira: String(service.priceKobo / 100),
      sortOrder: service.sortOrder,
      isActive: service.isActive,
    });
    setEditing(service);
  };

  const handleSave = async () => {
    const priceNaira = Number(form.priceNaira);

    if (!form.name.trim()) {
      toast.error("Service name is required.");
      return;
    }
    if (!Number.isFinite(priceNaira) || priceNaira <= 0) {
      toast.error("Enter a valid price.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      priceKobo: Math.round(priceNaira * 100),
      sortOrder: Number(form.sortOrder) || 0,
      isActive: form.isActive,
    };

    setSaving(true);
    try {
      if (editing === "new") {
        await createService(payload);
        toast.success("Service created.");
      } else {
        await updateService(editing.id, payload);
        toast.success("Service updated.");
      }
      await load();
      setEditing(null);
    } catch (err) {
      toast.error(err.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteService(pendingDelete.id);
      setServices((current) => current.filter((item) => item.id !== pendingDelete.id));
      toast.success("Service deleted.");
      setPendingDelete(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete service");
    } finally {
      setDeleting(false);
    }
  };

  if (error) {
    return <p className="font-publica_sans_l text-14 text-error">{error}</p>;
  }

  if (!services) {
    return (
      <div className="flex justify-center py-[3rem]">
        <Spinner />
      </div>
    );
  }

  const columns = [
    { key: "name", label: "Service", render: (row) => <span className="font-publica_sans_r">{row.name}</span> },
    { key: "priceKobo", label: "Price", render: (row) => formatNaira(row.priceKobo) },
    { key: "sortOrder", label: "Order" },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <span
          className={`inline-block font-publica_sans_r text-12 px-3 py-1 rounded-full ${
            row.isActive
              ? "bg-success_fade text-success_900"
              : "bg-neutral_disabled text-border_stroke_2"
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
          aria-label="Delete service"
        >
          <DeleteIcon />
        </button>
      ),
    },
  ];

  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h2 className="font-publica_sans_m text-18 text-brand_secondary mb-1">
            One-Time Services
          </h2>
          <p className="font-publica_sans_l text-14 text-border_stroke_2">
            On-demand prices shown below the plans on the public pricing page.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-brand_primary text-white font-publica_sans_r text-14 px-5 py-[10px] rounded-[8px]"
        >
          Add service
        </button>
      </div>

      <DataTable
        columns={columns}
        rows={services}
        onRowClick={openEdit}
        emptyMessage="No one-time services yet. Add one to get started."
      />

      <SideModal
        open={Boolean(editing)}
        title={editing === "new" ? "Add service" : "Edit service"}
        subtitle={
          editing && editing !== "new" ? editing.name : "Shown on the public pricing page"
        }
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
              {saving ? "Saving..." : "Save service"}
            </button>
          </div>
        }
      >
        <div className="mb-4">
          <label className={labelClass}>Service name</label>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="At-Home Visit (per session)"
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
              placeholder="20000"
            />
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
        title="Delete this service?"
        message={
          pendingDelete
            ? `“${pendingDelete.name}” will be removed from the public pricing page. This cannot be undone.`
            : ""
        }
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default ServicesSection;
