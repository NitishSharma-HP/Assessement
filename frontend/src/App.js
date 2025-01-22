import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Favorites from '../src/favorites/Favorites';

function App() {
  const [type, setSearchType] = useState('pin');
  const [query, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const baseUrl = 'http://localhost:4000/api';

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${baseUrl}/search`, {
        type,
        query,
      });
      setResults(response.data[0]?.PostOffice);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleFavorite = async (result) => {
    try {
      const response = await axios.post(`${baseUrl}/favorite`,{
        pincode: result.Pincode,
        name: result.Name,
        branchType: result.BranchType,
        deliveryStatus: result.DeliveryStatus,
        district: result.District,
        region: result.Region,
        state: result.State,
      });
      setFavorites((prev) => [...prev, response.data]);
      alert('Added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleViewFavorites = () => {
    setShowFavorites(true);
  };

  const handleBackToSearch = () => {
    setShowFavorites(false);
  };

  return (
    <div className="container mt-5">
      {showFavorites ? (
        <div>
          <button className="btn btn-info mb-3" onClick={handleBackToSearch}>
            Back to Search
          </button>
          <Favorites />
        </div>
      ) : (
        <div>
          <h1>Pincode Search</h1>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="searchType"
                id="pin"
                value="pin"
                checked={type === 'pin'}
                onChange={() => setSearchType('pin')}
              />
              <label className="form-check-label" htmlFor="pin">
                Search by PinCode
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="searchType"
                id="branch"
                value="branch"
                checked={type === 'branch'}
                onChange={() => setSearchType('branch')}
              />
              <label className="form-check-label" htmlFor="branch">
                Search by BranchName
              </label>
            </div>
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter code or name"
              value={query}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleSearch}>
            Search
          </button>

          <button
            className="btn btn-info position-absolute"
            style={{ top: '10px', right: '10px' }}
            onClick={handleViewFavorites}
          >
            View Favourites
          </button>

          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>BranchType</th>
                <th>DeliveryStatus</th>
                <th>District</th>
                <th>Region</th>
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results &&
                results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.Name}</td>
                    <td>{result.BranchType}</td>
                    <td>{result.DeliveryStatus}</td>
                    <td>{result.District}</td>
                    <td>{result.Region}</td>
                    <td>{result.State}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleFavorite(result)}
                      >
                        Make Favorite
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
