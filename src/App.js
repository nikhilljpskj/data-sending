import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://<app2-vercel-domain>/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert('Data sent to App 2');
    setFormData({ name: '', email: '' });
  };

  return (
    <div style={{padding:'2rem'}}>
      <h2>App 1: Submit Data</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br/>
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br/>
        <button type="submit">Send to App 2</button>
      </form>
    </div>
  );
}

export default App;
