import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://127.0.0.1:8000'
const STATUS_OPTIONS = ['Applied', 'Interviewing', 'Offered', 'Accepted', 'Rejected']

function App() {
  const [applications, setApplications] = useState([])
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [dateApplied, setDateApplied] = useState('')
  const [jobLink, setJobLink] = useState('')

  const fetchApplications = async () => {
    const response = await axios.get(`${API_URL}/applications`)
    setApplications(response.data)
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${API_URL}/applications`, {
      company_name: companyName,
      job_title: jobTitle,
      date_applied: dateApplied,
      job_link: jobLink,
    })
    setCompanyName('')
    setJobTitle('')
    setDateApplied('')
    setJobLink('')
    fetchApplications()
  }

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`${API_URL}/applications/${id}`, { status: newStatus })
    fetchApplications()
  }

  // Build a count of how many applications are in each status
  const statusCounts = STATUS_OPTIONS.reduce((counts, status) => {
    counts[status] = applications.filter((app) => app.status === status).length
    return counts
  }, {})

  return (
    <div>
      <h1>StandOut Job Tracker</h1>

      <div className="dashboard">
        {STATUS_OPTIONS.map((status) => (
          <div key={status} className="stat-box">
            <span className="stat-count">{statusCounts[status]}</span>
            <span className="stat-label">{status}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Job Link"
          value={jobLink}
          onChange={(e) => setJobLink(e.target.value)}
        />
        <button type="submit">Add Application</button>
      </form>

      <h2>Your Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date Applied</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.company_name}</td>
              <td>{app.job_title}</td>
              <td>
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>{app.date_applied}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App