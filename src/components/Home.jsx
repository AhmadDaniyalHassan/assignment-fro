import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setItems, deleteItem, addItem } from '../hooks/itemsSlice';
import CustomerModal from './CustomerModal';

const Home = () => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.items);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');

    // Function to get data from local storage
    const getLocalData = () => {
        const localData = JSON.parse(localStorage.getItem('customerData')) || [];
        dispatch(setItems(localData));
    };

    const getData = () => {
        axios.get('https://reqres.in/api/users?page=1')
            .then(res => {
                dispatch(setItems(res.data.data));
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    };

    useEffect(() => {
        // Check local storage for data during component initialization
        getLocalData();
    }, []); // The empty dependency array ensures that this effect runs only once

    useEffect(() => {
        getData();
    }, [sortField, sortOrder]); // Fetch data when sorting configuration changes

    // Sort the customer data based on the selected field and order
    const sortedCustomers = customers.slice().sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];

        if (sortOrder === 'asc') {
            return fieldA < fieldB ? -1 : 1;
        } else {
            return fieldA > fieldB ? -1 : 1;
        }
    });

    const handleAddItem = () => {
        setIsModalOpen(true);
        setSelectedItem(null);
    };

    const handleUpdateItem = (id, updatedData) => {
        setIsModalOpen(true);
        setSelectedItem({ id, ...updatedData });
    };

    const handleDeleteItem = id => {
        dispatch(deleteItem(id));

        // Update local storage to remove the deleted customer data
        const existingData = JSON.parse(localStorage.getItem('customerData')) || [];
        const newData = existingData.filter(item => item.id !== id);
        localStorage.setItem('customerData', JSON.stringify(newData));
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    // Function to add item to local storage
    const handleAddItemToLocalStorage = newItem => {
        const existingData = JSON.parse(localStorage.getItem('customerData')) || [];
        const newData = [...existingData, newItem];
        localStorage.setItem('customerData', JSON.stringify(newData));
    };

    const handleSubmit = formData => {
        if (selectedItem) {
            dispatch(updateItem({ id: selectedItem.id, updatedData: formData }));
        } else {
            // If adding a new item, also add it to local storage
            dispatch(addItem(formData));
            handleAddItemToLocalStorage(formData);
        }
        closeModal();
    };

    const handleSortChange = (field, order) => {
        setSortField(field);
        setSortOrder(order);
    };

    return (
        <div>
            <div className='btn-style w-52 rounded-lg text-white p-2 mt-8 ml-4 mb-10'>
                <button onClick={handleAddItem}>
                    <span className='text-2xl'>+ </span>
                    Add New Customers
                </button>
            </div>
            <div className="sorting-options">
                <label>Sort By:</label>
                <select value={sortField} onChange={(e) => handleSortChange(e.target.value, sortOrder)}>
                    <option value="id">Customer ID</option>
                    <option value="first_name">Customer Name</option>
                    <option value="email">Email</option>
                </select>
                <label>Order:</label>
                <select value={sortOrder} onChange={(e) => handleSortChange(sortField, e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th onClick={() => handleSortChange('id', sortOrder)}>Customer ID {sortField === 'id' && <span className={`arrow ${sortOrder}`}></span>}</th>
                            <th onClick={() => handleSortChange('first_name', sortOrder)}>Customer Name {sortField === 'first_name' && <span className={`arrow ${sortOrder}`}></span>}</th>
                            <th onClick={() => handleSortChange('email', sortOrder)}>Email {sortField === 'email' && <span className={`arrow ${sortOrder}`}></span>}</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCustomers.map(customer => (
                            <tr key={customer.id}>
                                <td>
                                    <img src={customer.avatar} alt="Avatar" />
                                </td>
                                <td>{customer.id}</td>
                                <td>{`${customer.first_name} ${customer.last_name}`}</td>
                                <td>{customer.email}</td>
                                <td>
                                    <button className='p-2 rounded-lg' style={{ backgroundColor: '#39B54A', color: 'white' }} onClick={() => handleUpdateItem(customer.id, customer)}>Edit</button>&nbsp;
                                    <button className='p-2 rounded-lg' style={{ backgroundColor: '#D80000', color: 'white' }} onClick={() => handleDeleteItem(customer.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CustomerModal isOpen={isModalOpen} closeModal={closeModal} selectedItem={selectedItem} handleSubmit={handleSubmit} />
        </div>
    );
};

export default Home;
