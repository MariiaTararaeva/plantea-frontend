import { useState } from "react";
/* eslint-disable react/prop-types */
const AuthForm = ({ submitCallback, isSignup = false }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    ...(isSignup && { email: "" }),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCallback(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </label>
      {isSignup && (
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
      )}
      <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
    </form>
  );
};

export default AuthForm;
