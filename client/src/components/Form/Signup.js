import React, { useState } from "react";
import Input from "./Input";
import { useMutation } from '@apollo/client';
import { LOGIN, ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


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

function Signup(props) {
  const [signupData, setSignupData] = useState(initialSignupState);
  const [loginData, setLoginData] = useState(initialLoginState);
  const [login] = useMutation(LOGIN);
  const [addUser] = useMutation(ADD_USER);
  const [visibility, setVisibility] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleVisibility = () =>
    setVisibility((prevVisibility) => !prevVisibility);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupData, loginData);
    if (isSignup) {
      const mutationResponse = await addUser({
        variables: {
          email: signupData.email,
          password: signupData.password,
          firstName: signupData.firstName,
          lastName: signupData.lastName,
        },
      });;
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } else {
      try {
        const mutationResponse = await login({
          variables: {
            email: loginData.email,
            password: loginData.password,
          },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleSignup = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const switchSign = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleVisibility(false);
  };

  return (
    <div className="formContainer">
      <h1>{isSignup ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={handleSubmit}>
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
          type={visibility ? "text" : "password"}
          handleVisibility={handleVisibility}
          autocomplete="password"
        />
        {isSignup && (
          <Input
            placeholder="Repeat Password"
            handleChange={isSignup ? handleSignup : handleLogin}
            label="confirmPassword"
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
