import React, { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';
import axios from 'axios';

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCopy, setNewPasswordCopy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/password', {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_copy: newPasswordCopy,
      });

      // Password updated successfully
      console.log(response.data.success);
    } catch (error) {
      // Error updating password
      console.log(error.response.data.error);
    }
  };

  return (
    <div>
                <h2 className="text-center">Update Password</h2>
                <form autoComplete="off" onSubmit={handleSubmit}>

                <div className="mb-2">
          <label htmlFor="old_password" className="form-label">
            Old Password
          </label>
          <input
            className="form-control"
            type="password"
            id="old_password"
            required
            placeholder="Enter your password"
          />
        </div>
                <div className="mb-2">
          <label htmlFor="new_password" className="form-label">
            New Password
          </label>
          <input
            className="form-control"
            type="password"
            id="new_password"
            required
            placeholder="Enter your new password"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="copy_new_password" className="form-label">
            Repeat your new Password
          </label>
          <input
            className="form-control"
            type="password"
            id="copy_new_password"
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-2 mb-0 text-center">
                  <button className="btn mb-3 mb-0 text-center" type="button"  >
                    Change Password
                  </button>
                </div>
                </form>
              </div>
  );
}

export default UpdatePassword;
