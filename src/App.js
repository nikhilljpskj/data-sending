import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('https://data-integration-three.vercel.app/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setStatus(data.status === 'forwarded' ? '✅ Sent successfully!' : '❌ Failed');
    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>App 1: Send Data</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required /><br /><br />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /><br /><br />
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default App;
