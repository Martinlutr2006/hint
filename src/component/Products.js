import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productname: '',
    productdescription: '',
    productprice: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:4000/api/products');
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    const token = localStorage.getItem('token')

    if (!token) {
      alert('Unauthorized. Please log in.');
      return;
    }
  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`http://localhost:4000/api/products/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:4000/api/products', form);
    }
    setForm({ productname: '', productdescription: '', productprice: '' });
    fetchProducts();
  };

  const editProduct = (p) => {
    setForm(p);
    setEditingId(p.productid);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h2>Products</h2>
      <input name="productname" placeholder="Name" value={form.productname} onChange={handleChange} />
      <input name="productdescription" placeholder="Description" value={form.productdescription} onChange={handleChange} />
      <input name="productprice" placeholder="Price" value={form.productprice} onChange={handleChange} />
      <button onClick={handleSubmit}>{editingId ? 'Update' : 'Add'}</button>

      <ul>
        {products.map((p) => (
          <li key={p.productid}>
            {p.productname} - {p.productdescription} - ${p.productprice} 
            <button onClick={() => editProduct(p)}>Edit</button>
            <button onClick={() => deleteProduct(p.productid)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
