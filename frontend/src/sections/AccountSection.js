import React, { useState, useEffect } from 'react';
import "./AccountSection.css";

function AccountPage() {
  // Retrieve data from session storage, or use default values if none exist
  const storedUser = JSON.parse(sessionStorage.getItem('user')) || {
    username: 'John Doe',
    phoneNumber: '123-456-7890',
    rating: 4.5,
    email: 'john.doe@example.com',
  };

  // State to manage the editable values
  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);

  // Save updated user data to session storage
  const saveUserData = () => {
    sessionStorage.setItem('user', JSON.stringify(user));
  };

  // Handle input change in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Toggle between view and edit mode
  const toggleEdit = () => {
    if (isEditing) saveUserData(); // Save data when editing is finished
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    // Automatically save user data on page load
    saveUserData();
  }, []);

  return (
    <div className="account-page">
      {/* <h2>My Profile</h2> */}
      <div className="profile-card">
        <h3>Profile Information</h3>
        <div className="profile-detail">
          <label>Username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          ) : (
            <p>{user.username}</p>
          )}
        </div>
        <div className="profile-detail">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        <div className="profile-detail">
          <label>Phone Number:</label>
          {isEditing ? (
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
            />
          ) : (
            <p>{user.phoneNumber}</p>
          )}
        </div>
        <div className="profile-detail">
          <label>Rating:</label>
          <p>{user.rating} ⭐</p>
        </div>

        <div className="button-container">
          <button className="edit-button" onClick={toggleEdit}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
