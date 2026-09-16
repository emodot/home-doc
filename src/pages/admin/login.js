import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "services/apiService";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await adminLogin(username, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F8] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm rounded-2xl p-8 w-full max-w-[360px]"
      >
        <h1 className="text-[20px] font-publica_sans_r mb-6">Home Doc Admin</h1>

        <label className="block text-[14px] font-publica_sans_l mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-[#DFE2E2] rounded-lg px-3 py-2 mb-4 text-[14px]"
          autoFocus
        />

        <label className="block text-[14px] font-publica_sans_l mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[#DFE2E2] rounded-lg px-3 py-2 mb-4 text-[14px]"
        />

        {error && <p className="text-red-500 text-[13px] mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading || !username || !password}
          className="w-full bg-brand_secondary text-white rounded-lg py-2 text-[14px] font-publica_sans_r disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
