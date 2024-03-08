import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteContactAsync, editContactAsync, getinitialContactsasync, contactSelector } from "../../Redux/Reducer/contactReducer";
import './contactlist.css'; // Import CSS file for styling
import ContactForm from '../ContactForm/contactform';
import { toast } from 'react-toastify';

function ContactList() {
    // State to control visibility of the contact form
    const [showForm, setShowForm] = useState(false);
    // State to hold the contact being edited
    const [editedContact, setEditedContact] = useState(null);
    // Get contacts from Redux store
    const contacts = useSelector(contactSelector);
    const dispatch = useDispatch();

    // Fetch initial contacts from Redux store on component mount
    useEffect(() => {
        dispatch(getinitialContactsasync());
    }, [dispatch]);

    // Toggle visibility of contact form
    const handleAdd = () => {
        setShowForm(prevShowForm => !prevShowForm);
        setEditedContact(null); // Reset edited contact state when toggling form visibility
    };

    // Set contact to be edited and show form
    const handleEdit = (contact) => {
        setShowForm(true);
        setEditedContact(contact);
    };

    // Dispatch delete contact action
    const handleDelete = (id) => {
        dispatch(deleteContactAsync(id));
        toast.success("Contact deleted successfully!");
    };

    // Handle submission of edited contact
    const handleEditSubmit = async (updatedContact) => {
        try {
            await dispatch(editContactAsync(updatedContact));
            toast.success("Contact updated successfully!");
            setShowForm(false); // Hide the form after successful edit
        } catch (error) {
            console.error('Error updating contact: ', error);
        }
    };

    // Render the component
    return (
        <div className="container">
            <div onClick={handleAdd}>
                {/* Render contact form if showForm is true */}
                {showForm && <ContactForm contact={editedContact} onSubmit={handleEditSubmit} onCancel={() => setShowForm(false)} />}
    
                {/* Button to toggle form visibility */}
                <button className="addbtn">
                    {showForm ? 'Cancel' : 'Add Contact'}
                </button>
            </div>
            <h2>List of Contacts</h2>
            <table className="contact-table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                    {/* Map through contacts array and render each contact */}
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.address.city}</td>
                            <td>
                                {/* Button to edit contact */}
                                <button className="btn btn-secondary" onClick={() => handleEdit(contact)}>Edit</button>
                                {/* Button to delete contact */}
                                <button className="btn btn-danger" onClick={() => handleDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ContactList;
