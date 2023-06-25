import React, { useEffect, useState } from "react";
import "../Styles/Profil.css";
import { FaCamera } from "react-icons/fa";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    ProfileService.getOne(AuthService.getUser()._id)
      .then((res) => {
        setUser(res.data);
        setFormData(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = () => {
    // Perform validation or additional checks if needed

    ProfileService.update(AuthService.getUser()._id, formData)
      .then((res) => {
        setUser(res.data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="card-profil">
          <div className="">
            <img
              className="img1"
              src="../assets/images/users/avatar-10.jpg"
              alt="Profile photo"
            />
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="card-body mt-3">
              <form autoComplete="off">
                <div className="mb-2">
                  <label htmlFor="first_name" className="form-label">
                    First name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="last_name" className="form-label">
                    Last name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                

                <div className="mb-2">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </form>
              <div>
                {!isEditing && (
                  <button
                    className="btn text-center"
                    type="button"
                    onClick={handleEditButtonClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
                      />
                    </svg>
                    Edit
                  </button>
                )}
                {isEditing && (
                  <button
                    className="btn text-center"
                    type="button"
                    onClick={handleSaveButtonClick}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
