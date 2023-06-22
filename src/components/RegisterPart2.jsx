import React from 'react';

function RegisterPart2({ formData, setFormData }) {
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: {
        ...prevFormData.user,
        password: value,
      },
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: {
        ...prevFormData.user,
        password_confirmation: value,
      },
    }));
  };

  return (
    <div>
      <h2 className="text-center mt-5"></h2>
      <form autoComplete="off">
        <div className="mb-2">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            required
            placeholder="Enter your password"
            value={formData.user.password}
            onChange={handlePasswordChange}
          />
          <p className="lead mt-2">
            The password must have at least 10 characters with 1 lowercase, 1 uppercase, and 1 number.
          </p>
        </div>
        <div className="mt-3 mb-2">
          <label htmlFor="confirmPassword" className="form-label">
            Repeat your password
          </label>
          <input
            className="form-control"
            type="password"
            id="password_confirmation"
            required
            placeholder="Repeat your password"
            value={formData.user.password_confirmation}
            onChange={handleConfirmPasswordChange}
          />
        </div>
      </form>
    </div>
  );
}

export default RegisterPart2;
