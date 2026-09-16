import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "assets/images/logo-main.png";
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
      navigate("/admin/overview");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand_secondary flex items-center justify-center px-4">
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-[20px] p-8 w-full max-w-[400px]"
      >
        <img src={Logo} alt="Home Doc" className="w-[9rem] mb-8" />

        <h1 className="font-publica_sans_m text-20 text-brand_secondary mb-1">Admin sign in</h1>
        <p className="font-publica_sans_l text-14 text-border_stroke_2 mb-8">
          Manage care requests, enquiries and pricing.
        </p>

        <label className="block font-publica_sans_l text-12 text-border_stroke_2 mb-1">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-neutral_stroke_1 rounded-[8px] px-3 py-[10px] mb-4 font-publica_sans_l text-14 focus:outline-none focus:border-brand_primary"
          autoFocus
        />

        <label className="block font-publica_sans_l text-12 text-border_stroke_2 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-neutral_stroke_1 rounded-[8px] px-3 py-[10px] mb-4 font-publica_sans_l text-14 focus:outline-none focus:border-brand_primary"
        />

        {error && (
          <p className="bg-error_tint text-error font-publica_sans_l text-12 rounded-[8px] px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !username || !password}
          className="w-full bg-brand_primary text-white rounded-[50px] py-3 font-publica_sans_r text-14 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </motion.form>
    </div>
  );
};

export default AdminLogin;
