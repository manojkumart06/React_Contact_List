import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addContactasync } from "../../Redux/Reducer/contactReducer";
import './contactform.css'; // Import CSS for styling the form
import { toast } from "react-toastify"; // Import toast for showing notifications

// Component receives a contact object, onSubmit function, and onCancel function as props
function ContactForm({ contact, onSubmit, onCancel }) {
    // State hooks for form fields
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const dispatch = useDispatch();

    // Effect hook to populate form when editing an existing contact
    useEffect(() => {
        // If there is a contact to edit, populate the form fields with its current data
        if (contact) {
            setName(contact.name);
            setPhone(contact.phone);
            setCity(contact.address.city);
        }
    }, [contact]); // Dependency array includes contact to re-run effect when the contact changes

    function handleSubmit(e) {
        e.preventDefault(); // Prevent default form submission behaviour
        if (contact) {
            // If editing, call onSubmit with the updated contact information
            onSubmit({ ...contact, name, phone, address: { city } });
        } else {
            // If adding a new contact, dispatch addContactasync action with new contact data
            dispatch(addContactasync({ name, phone, address: { city } }));
            toast.success("Contact added successfully!"); // Show success notification
        }
        // Clear the form fields after submission
        setName("");
        setPhone("");
        setCity("");
    }

    // Function to clear the form fields
    const handleClear = (e) => {
        e.preventDefault(); // Prevent form submission on clear
        setName("");
        setPhone("");
        setCity("");
    };

    // Prevent event propagation to avoid unwanted form closing on input click
    const handleInputClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="form" onClick={(e) => e.stopPropagation()}>
            {/* Dynamically set the form title based on add or edit action */}
            <h1>{contact ? 'Edit Contact' : 'Create a Contact'}</h1>
            <form className="input" onSubmit={handleSubmit}>
                {/* Input fields for name, phone, and city */}
                <input autoFocus required type="text" className="form-control mb-3" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" onClick={handleInputClick} />
                <input required type="text" className="form-control mb-3" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" onClick={handleInputClick} />
                <input required type="text" className="form-control mb-3" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" onClick={handleInputClick} />
                {/* Buttons for clearing the form and submitting the form */}
                <button className="btn clear" onClick={handleClear}>Clear</button>
                <button className="btn create" type="submit">{contact ? 'Update Contact' : 'Add'}</button>
            </form>
        </div>
    );
}

export default ContactForm;
