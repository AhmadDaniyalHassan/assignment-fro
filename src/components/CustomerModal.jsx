// CustomerModal.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from '../hooks/itemsSlice';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const CustomerModal = ({ isOpen, closeModal, selectedItem }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ id: '', first_name: '', last_name: '', email: '' });

    useEffect(() => {
        // Update formData when selectedItem changes
        setFormData(selectedItem || { id: '', first_name: '', last_name: '', email: '' });
    }, [selectedItem]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (selectedItem) {
            // If updating an existing customer
            dispatch(updateItem({ id: selectedItem.id, updatedData: formData }));
        } else {
            // If adding a new customer
            dispatch(addItem(formData));

            // Update local storage for new customer data
            const existingData = JSON.parse(localStorage.getItem('customerData')) || [];
            const newData = [...existingData, formData];
            localStorage.setItem('customerData', JSON.stringify(newData));
        }

        closeModal();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Customer Modal">
            <div>
                <label>Customer ID:</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} disabled={!!selectedItem} />
            </div>
            <div>
                <label>First Name:</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <button
                className='p-1 rounded'
                onClick={handleSubmit}
                style={{ backgroundColor: selectedItem ? '#4CAF50' : '#008CBA', color: 'white', marginRight: '10px' }}
            >
                {selectedItem ? 'Update' : 'Add'} Customer
            </button>
            <button className='p-1 rounded'
                onClick={closeModal}
                style={{ backgroundColor: '#d9534f', color: 'white' }}
            >
                Cancel
            </button>
        </Modal>
    );
};

export default CustomerModal;
