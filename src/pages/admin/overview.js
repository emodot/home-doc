import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchOverview } from "services/apiService";
import { formatNaira } from "utils/formatMoney";
import { formatDate } from "utils/formatDate";
import Spinner from "components/Spinner";
import DataTable from "components/Admin/DataTable";

const StatCard = ({ label, value, accent }) => (
  <div className="bg-white border border-neutral_stroke_1 rounded-[16px] px-6 py-5">
    <p className="font-publica_sans_l text-12 text-border_stroke_2 uppercase tracking-wide mb-2">
      {label}
    </p>
    <p
      className={`font-publica_sans_m text-28 ${
        accent ? "text-brand_primary" : "text-brand_secondary"
      }`}
    >
      {value}
    </p>
  </div>
);

const Overview = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOverview()
      .then((result) => setData(result.data))
      .catch((err) => setError(err.message || "Failed to load overview"));
  }, []);

  if (error) {
    return <p className="font-publica_sans_l text-14 text-error">{error}</p>;
  }

  if (!data) {
    return (
      <div className="flex justify-center py-[4rem]">
        <Spinner />
      </div>
    );
  }

  const recentColumns = [
    {
      key: "requester",
      label: "Requester",
      render: (row) => `${row.requester.firstName} ${row.requester.lastName}`,
    },
    { key: "planName", label: "Plan" },
    {
      key: "paymentAmount",
      label: "Amount",
      render: (row) => formatNaira(row.paymentAmount),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => formatDate(row.createdAt),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-publica_sans_m text-24 text-brand_secondary mb-1">Overview</h1>
      <p className="font-publica_sans_l text-14 text-border_stroke_2 mb-8">
        A snapshot of care requests, enquiries and revenue.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Care Requests" value={data.careRequestCount} />
        <StatCard label="Total Revenue" value={formatNaira(data.totalRevenueKobo)} accent />
        <StatCard label="Contact Enquiries" value={data.contactCount} />
        <StatCard label="Active Plans" value={data.planCount} />
      </div>

      {data.planBreakdown.length > 0 && (
        <div className="mb-10">
          <h2 className="font-publica_sans_m text-18 text-brand_secondary mb-4">Requests by plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.planBreakdown.map((row) => (
              <div
                key={row.planName}
                className="bg-white border border-neutral_stroke_1 rounded-[16px] px-6 py-4"
              >
                <p className="font-publica_sans_r text-14 text-black mb-1">{row.planName}</p>
                <p className="font-publica_sans_m text-20 text-brand_primary">{row.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="font-publica_sans_m text-18 text-brand_secondary mb-4">Recent care requests</h2>
      <DataTable
        columns={recentColumns}
        rows={data.recentRequests}
        emptyMessage="No care requests have come in yet."
      />
    </motion.div>
  );
};

export default Overview;
