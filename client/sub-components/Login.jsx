import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  console.log('props for login:', props);
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:1234/user/login", {
        email,
        password,
      })
      .then((response) => {
        console.log('respp==>>', response.data)
        localStorage.setItem("userId", response.data.userId);
        props.history.push("/dashboard");
        //props.setupSocket();
      })
      .catch((err) => {
        console.log(err);
        // props.history.push("/dashboard");
        alert("incorrect username or password")
        // props.history.push("/register");
      });
  };

  const register = () => {
    props.history.push("/register");
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={loginUser}>Login</button>
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default withRouter(Login);