import React, { useState, useEffect } from 'react';
// import './Profile.css';

function Profile({ token }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('https://fakestoreapi.com/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error:', error));
  }, [token]);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address && user.address.street}, {user.address && user.address.city}, {user.address && user.address.zipcode}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  );
}

export default Profile;
