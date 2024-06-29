import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import './Item.css';
import Global from '../../utils/Global';
import { useParams } from 'react-router-dom';

export default function AddItem() {
  const [formData, setFormData] = useState({
    search: '',
    wasteName: '',
    quantity: '',
    collectionDate: '',
    timeSlot: '',
  });
  const { id } = useParams();
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = () => {
    console.log(formData.wasteName, formData.quantity)
    setItems([...items, { wasteName: formData.wasteName, quantity: formData.quantity }]);
    setFormData({ ...formData, wasteName: '', quantity: '' });
  };

  const handleDeleteItem = (indexToDelete) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    items.map(i => i.name = i.wasteName)
    // items.map(i => delete i.wasteName)
    items.map(i => i.quantity = parseInt(i.quantity))
    console.log(items)
    Global.httpPost('/user/schedule-pickup', {
      recyclerId: id,
      date: new Date(formData.collectionDate),
      items: items,
    }, true)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <>
      <section className="user-page">
        <h2>Manage Your E-Waste</h2>
        <form onSubmit={handleSubmit}>
          {/* <div className="form-group">
            <label htmlFor="search">Search Type of E-Waste:</label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Enter type of e-waste"
              value={formData.search}
              onChange={handleInputChange}
              required
            />
          </div> */}
          <div className="form-inline-group">
            <label htmlFor="wasteName">Enter Waste Item:</label>
            <input
              type="text"
              id="wasteName"
              name="wasteName"
              placeholder="Enter name of waste item"
              value={formData.wasteName}
              onChange={handleInputChange}
              // required
            />
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              // required
            />
            <button type="button" onClick={handleAddItem}>
              Add
            </button>
          </div>
          {items.length > 0 && (
            <div className="items-list">
              <h3>Added Items:</h3>
              <Paper
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  listStyle: 'none',
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {items.map((item, index) => (
                  <li key={index}>
                    <Chip
                      label={`${item.wasteName} - ${item.quantity}`}
                      onDelete={() => handleDeleteItem(index)}
                    />
                  </li>
                ))}
              </Paper>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="collectionDate">Choose Collection Date:</label>
            <input
              type="date"
              id="collectionDate"
              name="collectionDate"
              value={formData.collectionDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeSlot">Choose Collection Time Slot:</label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a time slot</option>
              <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
              <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
              <option value="12:00-13:00">12:00 PM - 1:00 PM</option>
              <option value="13:00-14:00">1:00 PM - 2:00 PM</option>
              <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
              <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
              <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
              <option value="17:00-18:00">5:00 PM - 6:00 PM</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}
