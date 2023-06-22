import React from 'react';
import '../Styles/Register.css';
import { useNavigate } from 'react-router';
import AuthService from "../services/auth.service";

function RegisterPart3() {
  const navigate = useNavigate();

  const handleResendEmail = () => {
    AuthService.resendVerify()
      .then(response => {
        console.log('Email resent successfully');
      })
      .catch(error => {
        console.error('Failed to resend email', error);
      });
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div>
      <div className="container-register mt-0">
        <div className="card-login border-light">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-12">
              <div className="padding">
                <h2 className="text-center"></h2>
                <img src="../assets/images/subtract.png" alt="" className=" img2" />
                <h3 className="text-center mt-4">Verify by Email</h3>
                <p className="lead  mt-2 ">
                  Please check your email and follow the instructions to verify your account.
                  If you did not receive an email or if it has expired, you can resend one.
                </p>
                <div className="mb-2 mb-0 text-center">
                  <button className="btn mb-3 mb-0 text-center" type="button" onClick={handleResendEmail}>
                    Resend my verification email!
                  </button>
                </div>
                <div className="mb-2 mb-0 text-center">
                  <button className="btn mb-3 mb-0 text-center" type="button" onClick={handleSignIn}>
                    Sign In
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="padding align-items-center ser">
                <img src="../assets/images/Serops-Logo.png" alt="" className="logo" />
                <img src="./assets/images/Serops-img.png" alt="" className="img-ser" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPart3;
