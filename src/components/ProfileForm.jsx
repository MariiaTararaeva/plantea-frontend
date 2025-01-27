import { useState } from "react";

const ProfileForm = ({ data = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    username: data.username || "",
    firstName: data.firstName || "",
    surname: data.surname || "",
    email: data.email || "",
    bioDescription: data.bioDescription || "",
    greenhouse: data.greenhouse ? data.greenhouse.join(", ") : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      greenhouse: formData.greenhouse.split(",").map((item) => item.trim()),
    };
    onSave(updatedData);
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
        First Name:
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Surname:
        <input
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          required
        />
      </label>
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
        Bio Description:
        <textarea
          name="bioDescription"
          value={formData.bioDescription}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Greenhouse (comma-separated):
        <input
          name="greenhouse"
          value={formData.greenhouse}
          onChange={handleInputChange}
        />
      </label>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
