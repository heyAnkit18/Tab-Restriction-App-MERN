import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomeScreen() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/applications')
      .then((response) => setApplications(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredApps = applications.filter((app) =>
    app.app_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Applications</h1>
      <input
        type="text"
        placeholder="Search applications"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredApps.map((app) => (
          <li key={app.id} onClick={() => navigate(`/app/${app.id}`)}>
            {app.app_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeScreen;
