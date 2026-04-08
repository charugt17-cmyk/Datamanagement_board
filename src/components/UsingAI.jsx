import React, { useEffect, useState } from 'react';
import './UsingAI.css';

function UsingAI() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ company: '', phone: '' });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message || 'Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditData({ company: user.company?.name || '', phone: user.phone || '' });
  };

  const handleSave = async (userId) => {
    try {
      const updatedUser = { ...users.find(u => u.id === userId), company: { ...users.find(u => u.id === userId).company, name: editData.company }, phone: editData.phone };
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const data = await response.json();
      setUsers(users.map(u => u.id === userId ? data : u));
      setEditingId(null);
    } catch (err) {
      alert('Error updating user: ' + err.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  if (loading) {
    return <div className="usingai-page">Loading users...</div>;
  }

  if (error) {
    return <div className="usingai-page usingai-error">{error}</div>;
  }

  return (
    <div className="usingai-page">
      <h1>UsingAI</h1>
      <div className="usingai-grid">
        {users.map((user) => (
          <div key={user.id} className="usingai-card">
            <div className="usingai-title">{user.name}</div>
            <div className="usingai-field">
              <strong>Username:</strong> {user.username}
            </div>
            <div className="usingai-field">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="usingai-meta">
              <strong>Company:</strong> {editingId === user.id ? (
                <input
                  type="text"
                  value={editData.company}
                  onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                  className="usingai-input"
                />
              ) : (
                user.company?.name
              )}
            </div>
            <div className="usingai-meta">
              <strong>Phone:</strong> {editingId === user.id ? (
                <input
                  type="text"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="usingai-input"
                />
              ) : (
                user.phone
              )}
            </div>
            <div className="usingai-meta">
              <strong>City:</strong> {user.address?.city}
            </div>
            {editingId === user.id ? (
              <div className="usingai-actions">
                <button onClick={() => handleSave(user.id)} className="usingai-save">Save</button>
                <button onClick={handleCancel} className="usingai-cancel">Cancel</button>
              </div>
            ) : (
              <button onClick={() => handleEdit(user)} className="usingai-edit">Edit</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsingAI;