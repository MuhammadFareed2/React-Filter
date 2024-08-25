import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [price, filterPrice] = useState('')
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        let res = await fetch('https://api.escuelajs.co/api/v1/products');
        let resData = await res.json();
        setData(resData);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchAPI();
  }, []);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card-container">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.images[0]} alt={item.title} className="card-image" />
              <div className="card-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
}

export default App;
