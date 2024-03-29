import React, { useState } from "react";
import Input from "./Input";
import { useMutation } from "@apollo/client";
import { LOGIN, ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./Form.css";

// setting initial state for component
let initialSignupState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
let initialLoginState = {
  email: "",
  password: "",
};

function Signup() {
  const [signupData, setSignupData] = useState(initialSignupState);
  const [loginData, setLoginData] = useState(initialLoginState);
  const [login, { error }] = useMutation(LOGIN);
  const [addUser] = useMutation(ADD_USER);
  const [isSignup, setIsSignup] = useState(false);

  // function to handle submit of login or signup.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // signup mutation.
    if (isSignup) {
      try {
        const mutationResponse = await addUser({
          variables: {
            email: signupData.email,
            password: signupData.password,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
          },
        });
        const userDeets = mutationResponse.data.addUser.user;
        // set user details in local storage
        localStorage.setItem("deets", JSON.stringify(userDeets));
        const token = mutationResponse.data.addUser.token;
        // using jwt
        Auth.login(token);
      } catch (error) {
        console.log("error signing up:", error);
      }
    } else {
      // login mutation.
      try {
        const mutationResponse = await login({
          variables: {
            email: loginData.email,
            password: loginData.password,
          },
        });
        const token = mutationResponse.data.login.token;
        // using jwt
        Auth.login(token);
        // set user details in local storage
        const userDeets = mutationResponse.data.login.user;
        localStorage.setItem("deets", JSON.stringify(userDeets));
      } catch (error) {
        console.log("Login Failed:", error);
      }
    }
  };
// function to handle signup input value change
  const handleSignup = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  // function to handle login input value change
  const handleLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
// function to switch between login and signup
  const switchSign = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div
      className="loginContainer"
      style={{
        backgroundImage: "url(./icons/purpleCity.PNG)",
        backgroundPosition: "right center",
        backgroundSize: "cover",
      }}
    >
      <h1 className="loginTitle">{isSignup ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={handleSubmit} className="loginForm">
        {isSignup && (
          <>
            <Input
              placeholder="First Name"
              handleChange={isSignup ? handleSignup : handleLogin}
              autoFocus
              label="firstName"
              type="firstName"
            />
            <Input
              placeholder="Last Name"
              handleChange={isSignup ? handleSignup : handleLogin}
              label="lastName"
              type="lastName"
            />
          </>
        )}

        <Input
          placeholder="Email Address"
          handleChange={isSignup ? handleSignup : handleLogin}
          label="email"
          type="email"
        />
        <Input
          placeholder="Password"
          handleChange={isSignup ? handleSignup : handleLogin}
          label="password"
          type="password"
          autocomplete="password"
        />
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        {isSignup && (
          <Input
            placeholder="Repeat Password"
            handleChange={isSignup ? handleSignup : handleLogin}
            label="password"
            type="password"
            autocomplete="new-password"
          />
        )}
        <button type="submit" className="button">
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
        <button onClick={switchSign} type="button" className="button">
          {isSignup ? "Already have an account? Sign In" : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
