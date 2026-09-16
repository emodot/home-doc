import { useState } from "react";
import SideModal from "components/Admin/SideModal";
import { changeAdminPassword } from "services/apiService";

const inputClass =
  "w-full border border-neutral_stroke_1 rounded-[8px] px-3 py-2 font-publica_sans_l text-14 focus:outline-none focus:border-brand_primary";
const labelClass = "block font-publica_sans_l text-12 text-border_stroke_2 mb-1";

const ChangePasswordModal = ({ open, onClose, onSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
  };

  const close = () => {
    reset();
    onClose();
  };

  const handleSave = async () => {
    setError(null);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      await changeAdminPassword(currentPassword, newPassword);
      reset();
      onSuccess();
    } catch (err) {
      setError(err.message || "Could not change password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SideModal
      open={open}
      title="Change password"
      subtitle="You'll stay signed in here; other devices will be signed out."
      onClose={close}
      footer={
        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            disabled={saving}
            className="font-publica_sans_r text-14 px-4 py-2 rounded-[8px] border border-neutral_stroke_1 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !currentPassword || !newPassword || !confirmPassword}
            className="font-publica_sans_r text-14 px-4 py-2 rounded-[8px] bg-brand_secondary text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update password"}
          </button>
        </div>
      }
    >
      <div className="mb-4">
        <label className={labelClass}>Current password</label>
        <input
          type="password"
          className={inputClass}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className={labelClass}>New password</label>
        <input
          type="password"
          className={inputClass}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="At least 8 characters"
        />
      </div>

      <div className="mb-4">
        <label className={labelClass}>Confirm new password</label>
        <input
          type="password"
          className={inputClass}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && (
        <p className="bg-error_tint text-error font-publica_sans_l text-12 rounded-[8px] px-3 py-2">
          {error}
        </p>
      )}
    </SideModal>
  );
};

export default ChangePasswordModal;
