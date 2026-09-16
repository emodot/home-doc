import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminSession,
  fetchCareRequests,
  fetchContactSubmissions,
  adminLogout,
} from "services/apiService";

function formatDate(value) {
  return new Date(value).toLocaleString();
}

function CareRequestRow({ request }) {
  const [expanded, setExpanded] = useState(false);
  const recipientLabel = request.isForSelf
    ? request.requester.firstName + " " + request.requester.lastName
    : request.beneficiaries.map((b) => `${b.firstName} ${b.lastName}`).join(", ");

  return (
    <div className="border border-[#DFE2E2] rounded-lg mb-3">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex justify-between items-center px-4 py-3 text-left"
      >
        <div>
          <p className="text-[14px] font-publica_sans_r">
            {request.planName} — {recipientLabel}
          </p>
          <p className="text-[12px] text-[#00000099]">{formatDate(request.createdAt)}</p>
        </div>
        <span className="text-[12px] text-brand_primary">{expanded ? "Hide" : "View"}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 text-[13px] font-publica_sans_l space-y-3">
          <div>
            <p className="text-[#00000099] mb-1">Requester</p>
            <p>{request.requester.firstName} {request.requester.lastName}</p>
            <p>{request.requester.email} · {request.requester.phoneNumber}</p>
            {request.isForSelf && (
              <p>
                Age {request.requester.age} · {request.requester.gender} · {request.requester.address}, {request.requester.lga}, {request.requester.state}
              </p>
            )}
          </div>

          {!request.isForSelf &&
            request.beneficiaries.map((b) => (
              <div key={b.id}>
                <p className="text-[#00000099] mb-1">Beneficiary ({b.relationship})</p>
                <p>{b.firstName} {b.lastName} · {b.phoneNumber}</p>
                <p>Age {b.age} · {b.gender} · {b.address}, {b.lga}, {b.state}</p>
              </div>
            ))}

          <div>
            <p className="text-[#00000099] mb-1">Payment</p>
            <p>
              {request.paymentCurrency} {(request.paymentAmount / 100).toLocaleString()} · {request.paymentStatus} · ref: {request.paymentReference}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactSubmissionRow({ submission }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-[#DFE2E2] rounded-lg mb-3">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex justify-between items-center px-4 py-3 text-left"
      >
        <div>
          <p className="text-[14px] font-publica_sans_r">
            {submission.firstName} {submission.lastName}
          </p>
          <p className="text-[12px] text-[#00000099]">{formatDate(submission.createdAt)}</p>
        </div>
        <span className="text-[12px] text-brand_primary">{expanded ? "Hide" : "View"}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 text-[13px] font-publica_sans_l space-y-1">
          <p>{submission.email} · {submission.phoneNumber}</p>
          <p className="text-[#00000099] mt-2">{submission.message}</p>
        </div>
      )}
    </div>
  );
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking");
  const [careRequests, setCareRequests] = useState([]);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [tab, setTab] = useState("care-requests");
  const [error, setError] = useState(null);

  useEffect(() => {
    getAdminSession()
      .then(() => {
        setStatus("ready");
        return Promise.all([fetchCareRequests(), fetchContactSubmissions()]);
      })
      .then(([careRequestsResult, contactResult]) => {
        setCareRequests(careRequestsResult.data);
        setContactSubmissions(contactResult.data);
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate("/admin/login");
        } else {
          setError(err.message || "Failed to load data");
          setStatus("ready");
        }
      });
  }, [navigate]);

  const handleLogout = async () => {
    await adminLogout().catch(() => {});
    navigate("/admin/login");
  };

  if (status === "checking") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F9F9F8] px-4 py-8">
      <div className="max-w-[900px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[24px] font-publica_sans_r">Home Doc Admin</h1>
          <button onClick={handleLogout} className="text-[14px] text-brand_primary">
            Log out
          </button>
        </div>

        {error && <p className="text-red-500 text-[14px] mb-4">{error}</p>}

        <div className="flex space-x-6 mb-6 border-b border-[#DFE2E2]">
          <button
            onClick={() => setTab("care-requests")}
            className={`pb-3 text-[14px] font-publica_sans_r ${
              tab === "care-requests" ? "border-b-2 border-brand_secondary" : "text-[#00000099]"
            }`}
          >
            Care Requests ({careRequests.length})
          </button>
          <button
            onClick={() => setTab("contact")}
            className={`pb-3 text-[14px] font-publica_sans_r ${
              tab === "contact" ? "border-b-2 border-brand_secondary" : "text-[#00000099]"
            }`}
          >
            Contact Submissions ({contactSubmissions.length})
          </button>
        </div>

        {tab === "care-requests" &&
          (careRequests.length === 0 ? (
            <p className="text-[14px] text-[#00000099]">No care requests yet.</p>
          ) : (
            careRequests.map((request) => <CareRequestRow key={request.id} request={request} />)
          ))}

        {tab === "contact" &&
          (contactSubmissions.length === 0 ? (
            <p className="text-[14px] text-[#00000099]">No contact submissions yet.</p>
          ) : (
            contactSubmissions.map((submission) => (
              <ContactSubmissionRow key={submission.id} submission={submission} />
            ))
          ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
