import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const EditProfile = ({ Email, Socket }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const Navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = () => {
    if (!name || !username) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("Email", Email);
    formData.append("Name", name);
    formData.append("UserName", username);
    if (profilePhoto) {
      formData.append("ProfilePhoto", profilePhoto);
    }

    fetch("http://localhost:8000/api/update-profile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Profile updated successfully!");
          Navigate("/User"); 
        } else {
          alert("Failed to update profile.");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("An error occurred while updating your profile.");
      });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center  text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Your Profile</h2>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2 w-full text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="border rounded p-2 w-full text-black"
        />
        {previewPhoto && (
          <img
            src={previewPhoto}
            alt="Preview"
            className="mt-4 w-24 h-24 rounded-full object-cover"
          />
        )}
      </div>
      <button
        onClick={handleSaveProfile}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Profile
      </button>
    </div>
  );
};

export default EditProfile;