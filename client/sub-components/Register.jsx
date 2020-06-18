import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";



const Register = (props) => {
    console.log('props for register:', props);
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    let history = useHistory();

    const registerUser = (props) => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (name.length < 0 || email.length < 0 || password.length < 0) {
            alert('Incompleted info provided. Please check')
        } else {
            axios
            .post("http://localhost:1234/user/register", {
              name,
              email,
              password,
            })
            .then((response) => {
              console.log(response)
              alert("User successfully added")
              history.push("/login");
            })
            .catch((err) => {
            //   console.log("looks like we have an error: ", err);
              alert("Email already registered")
            });
        }
    };

    return (
        <div className="card">
            <div className="cardHeader">Registration</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name"
                        ref={nameRef}
                    />
                </div>
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
            <button onClick={registerUser}>Submit</button>
        </div>
    );
};

export default Register;