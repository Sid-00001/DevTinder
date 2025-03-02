import React, { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { BASE_BACKEND_URL } from "../utils/constants";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        BASE_BACKEND_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          about,
          gender,
          skills,
        },
        { withCredentials: true }
      );

      dispatch({ type: "UPDATE_USER", payload: res.data });
      console.log("Profile updated successfully:", res.data);
      
      // Show toast notification
      setShowToast(true);
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      
    } catch (error) {
      // More detailed error logging
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.error(
          "Server error:",
          error.response.status,
          error.response.data
        );
        setError(
          `Server error: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Network error - no response:", error.request);
        setError("Network error: Unable to reach the server");
      } else {
        // Something else happened while setting up the request
        console.error("Request error:", error.message);
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-start space-x-10 my-10">
      {/* Toast notification */}
      {showToast && (
        <div className="absolute top-4 w-full flex justify-center z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}

      {/* Edit Profile Form */}
      <div className="card bg-base-300 text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title text-center w-full text-lg font-bold">
            Edit Profile
          </h2>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={saveProfile}>
            <div className="form-control w-full max-w-xs space-y-4">
              {/* First Name */}
              <label className="label">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input w-full p-2"
                required
              />

              {/* Last Name */}
              <label className="label mt-2">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input w-full p-2"
                required
              />

              {/* Photo URL */}
              <label className="label mt-2">Profile Photo URL</label>
              <input
                type="url"
                placeholder="Profile Picture URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input w-full p-2"
              />

              {/* Age */}
              <label className="label mt-2">Age</label>
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input w-full p-2"
              />

              {/* About */}
              <label className="label mt-2">About</label>
              <textarea
                placeholder="Tell us about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input w-full p-2"
              />

              {/* Gender */}
              <label className="label mt-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input w-full p-2"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {/* Skills */}
              <label className="label mt-2">Skills</label>
              <input
                type="text"
                placeholder="Skills (comma-separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="input w-full p-2"
              />
            </div>

            {/* Submit Button */}
            <div className="card-actions justify-end mt-4">
              <button type="submit" className="btn btn-primary w-full">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* UserCard */}
      <UserCard
        user={{ firstName, lastName, photoUrl, age, about, gender, skills }}
      />
    </div>
  );
};

export default EditProfile;