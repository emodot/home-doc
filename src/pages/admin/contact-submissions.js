import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchContactSubmissions, deleteContactSubmission } from "services/apiService";
import { formatDate } from "utils/formatDate";
import Spinner from "components/Spinner";
import DataTable from "components/Admin/DataTable";
import SideModal from "components/Admin/SideModal";
import ConfirmModal from "components/Admin/ConfirmModal";
import { ReactComponent as DeleteIcon } from "assets/icons/delete-icon-red.svg";

const Field = ({ label, value }) => (
  <div className="mb-3">
    <p className="font-publica_sans_l text-12 text-border_stroke_2 mb-1">{label}</p>
    <p className="font-publica_sans_l text-14 text-black break-words whitespace-pre-wrap">
      {value || "—"}
    </p>
  </div>
);

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState(null);
  const [selected, setSelected] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContactSubmissions()
      .then((result) => setSubmissions(result.data))
      .catch((err) => setError(err.message || "Failed to load contact submissions"));
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteContactSubmission(pendingDelete.id);
      setSubmissions((current) => current.filter((item) => item.id !== pendingDelete.id));
      if (selected?.id === pendingDelete.id) setSelected(null);
      toast.success("Submission deleted.");
      setPendingDelete(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete submission");
    } finally {
      setDeleting(false);
    }
  };

  if (error) {
    return <p className="font-publica_sans_l text-14 text-error">{error}</p>;
  }

  if (!submissions) {
    return (
      <div className="flex justify-center py-[4rem]">
        <Spinner />
      </div>
    );
  }

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (row) => (
        <span className="font-publica_sans_r">
          {row.firstName} {row.lastName}
        </span>
      ),
    },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
    {
      key: "message",
      label: "Message",
      render: (row) => (
        <span className="block max-w-[280px] truncate">{row.message}</span>
      ),
    },
    { key: "createdAt", label: "Date", render: (row) => formatDate(row.createdAt) },
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
          aria-label="Delete submission"
        >
          <DeleteIcon />
        </button>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="font-publica_sans_m text-24 text-brand_secondary mb-1">
        Contact Submissions
      </h1>
      <p className="font-publica_sans_l text-14 text-border_stroke_2 mb-8">
        {submissions.length} {submissions.length === 1 ? "enquiry" : "enquiries"}. Select a row to
        read the full message.
      </p>

      <DataTable
        columns={columns}
        rows={submissions}
        onRowClick={setSelected}
        emptyMessage="No contact enquiries yet."
      />

      <SideModal
        open={Boolean(selected)}
        title={selected ? `${selected.firstName} ${selected.lastName}` : ""}
        subtitle={selected ? formatDate(selected.createdAt) : ""}
        onClose={() => setSelected(null)}
        footer={
          selected && (
            <button
              onClick={() => setPendingDelete(selected)}
              className="font-publica_sans_r text-14 text-error"
            >
              Delete submission
            </button>
          )
        }
      >
        {selected && (
          <>
            <Field label="Email" value={selected.email} />
            <Field label="Phone" value={selected.phoneNumber} />
            <Field label="Message" value={selected.message} />
          </>
        )}
      </SideModal>

      <ConfirmModal
        open={Boolean(pendingDelete)}
        title="Delete this submission?"
        message={
          pendingDelete
            ? `The enquiry from ${pendingDelete.firstName} ${pendingDelete.lastName} will be permanently removed. This cannot be undone.`
            : ""
        }
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </motion.div>
  );
};

export default ContactSubmissions;
