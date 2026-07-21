import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setFormData(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.response?.data?.error || 'Failed to load profile. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
      setError('');
      fetchProfile();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.error || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6 max-w-2xl">{error}</div>
      )}
      {profile && (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
          {!isEditing ? (
            <div>
              <div className="mb-4">
                <p className="text-gray-600">Email</p>
                <p className="text-lg font-semibold">{profile.email}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Name</p>
                <p className="text-lg font-semibold">{profile.firstName} {profile.lastName}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Phone</p>
                <p className="text-lg font-semibold">{profile.phone}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Address</p>
                <p className="text-lg font-semibold">{profile.address}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="block w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="First Name"
                className="block w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Last Name"
                className="block w-full mb-4 p-2 border rounded"
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone"
                className="block w-full mb-4 p-2 border rounded"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;