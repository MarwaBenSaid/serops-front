import React from 'react';

function RegisterPart1({ formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: {
        ...prevFormData.user,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      {/* First name field */}
      <div className="mb-2">
        <label htmlFor="first_name" className="form-label">
          First name
        </label>
        <input
          className="form-control"
          type="text"
          id="first_name"
          name="first_name"
          required
          placeholder="Enter your first name"
          value={formData.user.first_name}
          onChange={handleInputChange}
        />
      </div>
      {/* Last name field */}
      <div className="mb-2">
        <label htmlFor="last_name" className="form-label">
          Last name
        </label>
        <input
          className="form-control"
          type="text"
          id="last_name"
          name="last_name"
          required
          placeholder="Enter your last name"
          value={formData.user.last_name}
          onChange={handleInputChange}
        />
      </div>
      {/* Email field */}
      <div className="mb-2">
        <label htmlFor="emailaddress" className="form-label">
          Email address
        </label>
        <input
          className="form-control"
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email"
          value={formData.user.email}
          onChange={handleInputChange}
        />
      </div>
      {/* Company name field */}
      <div className="mb-2">
        <label htmlFor="organisation" className="form-label">
          Company name
        </label>
        <input
          className="form-control"
          type="text"
          id="organisation"
          name="organisation"
          required
          placeholder="Enter your company name"
          value={formData.organisation.name}
          onChange={(e) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              organisation: {
                ...prevFormData.organisation,
                name: e.target.value,
              },
            }));
          }}
        />
      </div>
      {/* Phone number field */}
      <div className="mb-2">
        <label htmlFor="phone" className="form-label">
          Phone Number
        </label>
        <input
          className="form-control"
          type="text"
          id="phone"
          name="phone"
          required
          placeholder="+216 | Enter your Phone Number"
          value={formData.user.phone}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default RegisterPart1;
