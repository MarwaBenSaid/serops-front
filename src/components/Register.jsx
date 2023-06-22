import React, { useEffect, useState } from 'react';
import RegisterPart1 from './RegisterPart1';
import RegisterPart2 from './RegisterPart2';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    user: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
    },
    organisation: {
      name: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const FormTitles = ["Sign Up", "Create your password"];
  
  useEffect(() => {
    if (AuthService.getUser()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    AuthService.register(formData)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        navigate("/register_verif");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  const PageDisplay = () => {
    if (page === 0) {
      return <RegisterPart1 formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <RegisterPart2 formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div>
      <div className="container-register mt-0">
        <div className="card-login border-light">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-12">
              <div className="padding">
                <h2 className="text-center">{FormTitles[page]}</h2>
                <form autoComplete="off" onSubmit={handleSubmit}>
                  {PageDisplay()}

                  <div className="mb-2 text-center">
                    <button
                      className="btn mb-3 text-center"
                      type="button"
                      onClick={(e) => {
                        if (page === FormTitles.length - 1) {
                          handleSubmit(e);
                          console.log(formData);
                        } else {
                          setPage((currPage) => currPage + 1);
                        }
                      }}
                    >
                      {page === FormTitles.length - 1 ? "Sign up" : "Continue"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="padding align-items-center ser">
                <img
                  src="../assets/images/Serops-Logo.png"
                  alt=""
                  className="logo"
                />
                <img
                  src="./assets/images/Serops-img.png"
                  alt=""
                  className="img-ser"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
