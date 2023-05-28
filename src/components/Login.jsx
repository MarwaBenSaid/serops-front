import React, {useContext} from 'react'
import AuthContext from '../Context/AuthContext'
import '../Styles/Register.css'
const Login = () => {
  let {loginUser} = useContext(AuthContext)
    return (
    <div className="container-register">
      <div className="card-login border-light">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12">
            <div className="padding mt-3">
              <h2 className="text-center">Welcome back</h2>
              <p className="lead text-center mt-2">Welcome back! Please enter your details.</p>
              <form className="justify-content-center mt-3" onSubmit={loginUser} >
                <div className="mb-2">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    required
                    placeholder="Enter your email"
                   
                    
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
                   
                  />
                </div>
                <div className="mt-2 link1">
                  <a href="">Forget your password</a>
                </div>
                <div className="mb-2 text-center">
                  <button  className="btn mb-3 text-center" type="submit">
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
