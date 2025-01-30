import { useState } from "react";
import "../assets/Forms.css";
/* eslint-disable react/prop-types */
const AuthForm = ({ submitCallback, isSignup }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    ...(isSignup && { email: "", firstName: "", surname: "" }),
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
        <div>
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
          <label>
            First Name:
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
      )}
      <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
    </form>
  );
};

export default AuthForm;
