import React from 'react';
import '../Styles/Register.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function Login() {

  const [currentUser, setCurrentUser] = useState();
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    client.get("/auth")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);



  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/auth/login",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }


  if (currentUser) {
    return (
      <div>
        
  
          <div className="center">
            <h2>You're logged in!</h2>
          </div>
        </div>
    );
  }
  return (
    <div className="container-register">
      <div className="card-login border-light">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12">
            <div className="padding mt-3">
              <h2 className="text-center">Welcome back</h2>
              <p className="lead text-center mt-2">Welcome back! Please enter your details.</p>
              <form className="justify-content-center mt-3" autoComplete="off">
                <div className="mb-2">
                  <label htmlFor="emailaddress" className="form-label">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="emailaddress"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-2 link1">
                  <a href="">Forget your password</a>
                </div>
                <div className="mb-2 text-center">
                  <button className="btn mb-3 text-center" type="submit" s>
                    Sign up
                  </button>
                </div>
                <div className="mb-3 text-center">
                  <button className="btn-gogle-auth btn-icon text-center">
                    <img src="../assets/images/google.png" alt ="google"className="img-google" />
                    Sign up with Google
                  </button>
                </div>
                <div className="mb-2">
                  <p className="lead p1">
                    Don’t have an account? <a href="/sign1" className="link2">Sign up</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="padding align-items-center ser">
              <img src="../assets/images/Serops-Logo.png" alt="logo" className="logo" />
              <img src="./assets/images/Serops-img.png" alt="serops" className="img-ser" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
