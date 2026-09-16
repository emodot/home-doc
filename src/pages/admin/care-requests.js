import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchCareRequests } from "services/apiService";
import { formatNaira } from "utils/formatMoney";
import { formatDate } from "utils/formatDate";
import Spinner from "components/Spinner";
import DataTable from "components/Admin/DataTable";
import SideModal from "components/Admin/SideModal";

const Field = ({ label, value }) => (
  <div className="mb-3">
    <p className="font-publica_sans_l text-12 text-border_stroke_2 mb-1">{label}</p>
    <p className="font-publica_sans_l text-14 text-black break-words">{value || "—"}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-6">
    <p className="font-publica_sans_m text-14 text-brand_secondary mb-3 pb-2 border-b border-neutral_stroke_1">
      {title}
    </p>
    {children}
  </div>
);

const CareRequests = () => {
  const [requests, setRequests] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCareRequests()
      .then((result) => setRequests(result.data))
      .catch((err) => setError(err.message || "Failed to load care requests"));
  }, []);

  if (error) {
    return <p className="font-publica_sans_l text-14 text-error">{error}</p>;
  }

  if (!requests) {
    return (
      <div className="flex justify-center py-[4rem]">
        <Spinner />
      </div>
    );
  }

  const columns = [
    {
      key: "requester",
      label: "Requester",
      render: (row) => (
        <span className="font-publica_sans_r">
          {row.requester.firstName} {row.requester.lastName}
        </span>
      ),
    },
    {
      key: "careFor",
      label: "Care for",
      render: (row) =>
        row.isForSelf
          ? "Self"
          : row.beneficiaries.map((b) => `${b.firstName} ${b.lastName}`).join(", "),
    },
    { key: "planName", label: "Plan" },
    { key: "paymentAmount", label: "Amount", render: (row) => formatNaira(row.paymentAmount) },
    {
      key: "paymentStatus",
      label: "Status",
      render: (row) => (
        <span className="inline-block bg-success_fade text-success_900 font-publica_sans_r text-12 px-3 py-1 rounded-full capitalize">
          {row.paymentStatus}
        </span>
      ),
    },
    { key: "createdAt", label: "Date", render: (row) => formatDate(row.createdAt) },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-publica_sans_m text-24 text-brand_secondary mb-1">Care Requests</h1>
      <p className="font-publica_sans_l text-14 text-border_stroke_2 mb-8">
        {requests.length} paid {requests.length === 1 ? "request" : "requests"}. Select a row to see
        full details.
      </p>

      <DataTable
        columns={columns}
        rows={requests}
        onRowClick={setSelected}
        emptyMessage="No care requests have come in yet."
      />

      <SideModal
        open={Boolean(selected)}
        title={
          selected ? `${selected.requester.firstName} ${selected.requester.lastName}` : ""
        }
        subtitle={selected ? `${selected.planName} · ${formatDate(selected.createdAt)}` : ""}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <>
            <Section title="Requester">
              <Field
                label="Name"
                value={`${selected.requester.firstName} ${selected.requester.lastName}`}
              />
              <Field label="Email" value={selected.requester.email} />
              <Field label="Phone" value={selected.requester.phoneNumber} />
              {selected.isForSelf && (
                <>
                  <Field label="Age" value={selected.requester.age} />
                  <Field label="Gender" value={selected.requester.gender} />
                  <Field label="Address" value={selected.requester.address} />
                  <Field
                    label="Location"
                    value={
                      selected.requester.lga && selected.requester.state
                        ? `${selected.requester.lga}, ${selected.requester.state}`
                        : null
                    }
                  />
                </>
              )}
            </Section>

            {!selected.isForSelf &&
              selected.beneficiaries.map((beneficiary, index) => (
                <Section key={beneficiary.id} title={`Beneficiary ${index + 1}`}>
                  <Field
                    label="Name"
                    value={`${beneficiary.firstName} ${beneficiary.lastName}`}
                  />
                  <Field label="Relationship" value={beneficiary.relationship} />
                  <Field label="Phone" value={beneficiary.phoneNumber} />
                  <Field label="Age" value={beneficiary.age} />
                  <Field label="Gender" value={beneficiary.gender} />
                  <Field label="Address" value={beneficiary.address} />
                  <Field label="Location" value={`${beneficiary.lga}, ${beneficiary.state}`} />
                </Section>
              ))}

            <Section title="Payment">
              <Field label="Plan" value={selected.planName} />
              <Field label="Amount" value={formatNaira(selected.paymentAmount)} />
              <Field label="Currency" value={selected.paymentCurrency} />
              <Field label="Status" value={selected.paymentStatus} />
              <Field label="Reference" value={selected.paymentReference} />
            </Section>
          </>
        )}
      </SideModal>
    </motion.div>
  );
};

export default CareRequests;
