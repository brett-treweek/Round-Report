import React, { useState } from "react";
import Input from "./Input";
import { useMutation } from '@apollo/client';
import { LOGIN, ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup(props) {
  const [formData, setFormData] = useState(initialState);
  const [login, { error }] = useMutation(LOGIN);
  const [addUser] = useMutation(ADD_USER);
  const [visibility, setVisibility] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleVisibility = () =>
    setVisibility((prevVisibility) => !prevVisibility);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignup) {
      const mutationResponse = await addUser(formData);
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } else {
      try {
        const mutationResponse = await login({
          variables: {
            email: formData.email,
            password: formData.password,
          },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              handleChange={handleChange}
              autoFocus
              label="firstName"
              type="firstName"
            />
            <Input
              placeholder="Last Name"
              handleChange={handleChange}
              label="lastName"
              type="lastName"
            />
          </>
        )}

        <Input
          placeholder="Email Address"
          handleChange={handleChange}
          label="email"
          type="email"
        />
        <Input
          placeholder="Password"
          handleChange={handleChange}
          label="password"
          type={visibility ? "text" : "password"}
          handleVisibility={handleVisibility}
          autocomplete="password"
        />
        {isSignup && (
          <Input
            placeholder="Repeat Password"
            handleChange={handleChange}
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
