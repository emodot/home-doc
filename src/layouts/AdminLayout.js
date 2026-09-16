import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "assets/images/logo-main.png";
import Spinner from "components/Spinner";
import ChangePasswordModal from "components/Admin/ChangePasswordModal";
import { getAdminSession, adminLogout } from "services/apiService";

const navItems = [
  { label: "Overview", to: "/admin/overview" },
  { label: "Care Requests", to: "/admin/care-requests" },
  { label: "Contact Submissions", to: "/admin/contact-submissions" },
  { label: "Plans & Pricing", to: "/admin/plans" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    getAdminSession()
      .then((result) => {
        setSession(result.data);
        setChecking(false);
      })
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  const handleLogout = async () => {
    await adminLogout().catch(() => {});
    navigate("/admin/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex">
      <aside className="hidden lg:flex flex-col w-[260px] bg-brand_secondary min-h-screen fixed left-0 top-0 px-6 py-8">
        <img src={Logo} alt="Home Doc" className="w-[8.5rem] mb-10 brightness-0 invert" />

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `font-publica_sans_l text-14 px-4 py-3 rounded-[10px] transition-colors ${
                  isActive
                    ? "bg-brand_primary text-white font-publica_sans_r"
                    : "text-[#FFFFFFB2] hover:bg-[#FFFFFF14]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[#FFFFFF26] pt-4">
          <p className="font-publica_sans_l text-12 text-[#FFFFFF80] mb-3">
            Signed in as {session?.username}
          </p>
          <button
            onClick={() => setChangingPassword(true)}
            className="font-publica_sans_l text-14 text-[#FFFFFFB2] hover:text-white block mb-2"
          >
            Change password
          </button>
          <button
            onClick={handleLogout}
            className="font-publica_sans_r text-14 text-brand_primary"
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-[260px] min-w-0">
        <header className="lg:hidden bg-brand_secondary px-4 py-4 flex justify-between items-center">
          <img src={Logo} alt="Home Doc" className="w-[7rem] brightness-0 invert" />
          <div className="flex items-center gap-4">
            <button
              onClick={() => setChangingPassword(true)}
              className="font-publica_sans_l text-12 text-[#FFFFFFB2]"
            >
              Password
            </button>
            <button
              onClick={handleLogout}
              className="font-publica_sans_r text-12 text-brand_primary"
            >
              Log out
            </button>
          </div>
        </header>

        <nav className="lg:hidden flex gap-2 overflow-x-auto px-4 py-3 bg-white border-b border-neutral_stroke_1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `font-publica_sans_l text-12 px-3 py-2 rounded-full whitespace-nowrap ${
                  isActive ? "bg-brand_secondary text-white" : "bg-neutral_disabled text-black"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="px-4 lg:px-10 py-6 lg:py-10">
          <Outlet />
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      <ChangePasswordModal
        open={changingPassword}
        onClose={() => setChangingPassword(false)}
        onSuccess={() => {
          setChangingPassword(false);
          toast.success("Password updated. Other devices have been signed out.");
        }}
      />
    </div>
  );
};

export default AdminLayout;
