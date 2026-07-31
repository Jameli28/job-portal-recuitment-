import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const DashboardPage = () => {
    const { logout, token } = useAuth();
    const navigate = useNavigate();
    // Form inputs state
    const [title, setTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
   
    // Data list state
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // Fetch jobs from backend on page load
    const fetchJobs = async () => {
        try {
            const res = await axios.get('/api/jobs');
            if (res.data.success) {
                setJobs(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch jobs:', err);
        }
    };
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchJobs();
    }, [token, navigate]);
    // Handle posting a new job listing
    const handleCreateJob = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!title || !companyName || !location) {
            return setError('Please fill out all required fields');
        }
        try {
            const res = await axios.post('/api/jobs', {
                title,
                companyName,
                location
            });
            if (res.data.success) {
                setSuccess('Job posted successfully!');
                setTitle('');
                setCompanyName('');
                setLocation('');
                fetchJobs();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job listing');
        }
    };
    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '2rem' }}>
                <h2>💼 Job Portal Dashboard</h2>
                <button
                    onClick={() => { logout(); navigate('/login'); }}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Logout
                </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: 'fit-content', border: '1px solid #e5e7eb' }}>
                    <h3>Post a New Job</h3>
                   
                    {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
                    {success && <div style={{ color: 'green', marginBottom: '1rem', fontSize: '0.9rem' }}>{success}</div>}
                    <form onSubmit={handleCreateJob}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Job Title *</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Company Name *</label>
                            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Location *</label>
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Post Job</button>
                    </form>
                </div>
                <div>
                    <h3>Active Job Postings ({jobs.length})</h3>
                    {jobs.length === 0 ? (
                        <p style={{ color: '#6b7280' }}>No jobs available. Post one using the form on the left!</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {jobs.map((job) => (
                                <div key={job._id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', fontSize: '1.2rem' }}>{job.title}</h4>
                                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', color: '#374151' }}>🏢 {job.companyName}</p>
                                    <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem' }}>📍 {job.location}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DashboardPage;