import logo from './logo.svg';
import './App.css';

// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:9080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post('http://localhost:9080/api/products', { name, price });
      fetchProducts();
      setName('');
      setPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const editProduct = async (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setName(productToEdit.name);
    setPrice(productToEdit.price);
    setEditingId(id);
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:8080/products/${editingId}`, {
        name,
        price,
      });
      fetchProducts();
      setName('');
      setPrice('');
      setEditingId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h1>Product CRUD</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {editingId ? (
          <button onClick={updateProduct}>Update Product</button>
        ) : (
          <button onClick={addProduct}>Add Product</button>
        )}
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            <button onClick={() => editProduct(product.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

