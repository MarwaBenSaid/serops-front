import React, {
  useState, useEffect
} from "react";
import '../Styles/Register.css'
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  


const submit = (e) => {
    setLoading(true);
    setError('');

    e.preventDefault();
    AuthService.login(email, password)
        .then(response => {
            console.log(response.data)
                localStorage.setItem("token", response.data.token);
                navigate('/')
            })
  
        .catch((error) => {
            console.log(error.response.data.message)
            setError(error.response.data.message);
            setLoading(false);
        })
}
  const navigate = useNavigate();
  const handleSignupClick = (event) => {
    navigate('/register');
    event.preventDefault();
  };

  

    return (
    <div className="container-register">
      <div className="card-login border-light">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12">
            <div className="padding mt-5">
              <h2 className="text-center">Welcome back</h2>
              <p className="lead text-center mt-2">Welcome back! Please enter your details.</p>
              <form className="justify-content-center mt-3" onSubmit = {submit }>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input onChange ={(e) => 
    setEmail(e.target.value)}
                    className="form-control"
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                   
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input  onChange ={(e) => 
    setPassword(e.target.value)}
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    
                  />
                </div>
                <div className="mt-2 link1">
                  <a >Forget your password</a>
                </div>
                <div className="mb-2 text-center">
                  <button className="btn mb-3 text-center" type="submit">
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
                    Don’t have an account? <a  className="link2" onClick={handleSignupClick}>Sign up</a>
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
