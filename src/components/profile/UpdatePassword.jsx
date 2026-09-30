import { useContext, useState } from "react";
import Styles from "./_profile.module.css";
import { AuthContext } from "../../state-mangement/contextApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const { updatePassword } = useContext(AuthContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updatePassword({
        oldPassword,
        newPassword
      });

      toast.success(response?.message || "Password updated successfully");

      setOldPassword("");
      setNewPassword("");

      navigate("/user/profile");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Incorrect old password"
      );
    }
  };

  return (
    <aside className={Styles.content}>
      <main className={Styles.updateForm}>
        <h1>Update Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>

            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              placeholder="Enter old password"
              required
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>

            <input
              type="password"
              id="newPassword"
              value={newPassword}
              placeholder="Enter new password"
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button type="submit">
              Update Password
            </button>
          </div>
        </form>
      </main>
    </aside>
  );
};

export default UpdatePassword;