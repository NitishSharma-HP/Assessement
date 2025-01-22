import React, { useState, useEffect } from 'react';
import './Favorites.css'
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/favorites');
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        const data = await response.json();
        setFavorites(data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Pincode</th>
              <th>Name</th>
              <th>BranchType</th>
              <th>DeliveryStatus</th>
              <th>District</th>
              <th>Region</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favorite, index) => (
              <tr key={index}>
                <td>{favorite.pincode}</td>
                <td>{favorite.name}</td>
                <td>{favorite.branchType}</td>
                <td>{favorite.deliveryStatus}</td>
                <td>{favorite.district}</td>
                <td>{favorite.region}</td>
                <td>{favorite.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default Favorites;
