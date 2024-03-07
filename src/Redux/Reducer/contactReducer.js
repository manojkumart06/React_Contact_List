import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Define the initial state of the contacts slice
const initialState = {
    contacts: []
}

// Async thunk for fetching the initial contacts from an API
export const getinitialContactsasync = createAsyncThunk('contact/getinitialContacts',
    async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        return response.data; // Returns fetched contacts to be handled by the reducer
    }
);

// Async thunk for adding a new contact through a POST request
export const addContactasync = createAsyncThunk('contact/addContactasync',
    async (payload) => {
        const response = await axios.post("https://jsonplaceholder.typicode.com/users", payload);
        return response.data; // Returns the added contact with ID assigned by the backend
    }
);

// Async thunk for editing an existing contact using a PUT request
export const editContactAsync = createAsyncThunk('contact/editContactAsync',
    async (contact) => {
        console.log('Editing contact with ID:', contact.id); // Logging for debug purposes
        const { id, ...contactData } = contact; // Destructure to separate id from the rest of the contact data
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, contactData);
        return response.data; // Returns the updated contact data
    }
);

// Async thunk for deleting a contact using a DELETE request
export const deleteContactAsync = createAsyncThunk('contact/deleteContactAsync',
    async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        return id; // Return the id of the deleted contact to remove it from the state
    }
);

// Slice for contacts with reducers and extraReducers for handling async thunks
const contactSlice = createSlice({
    name: 'contacts',
    initialState: initialState,
    reducers: {
        // Example of a reducer that could be used for actions initiated from the UI
        // delete: (state, action) => {
        //     const indexToDelete = state.contacts.findIndex(contact => contact.id === action.payload);
        //     if (indexToDelete !== -1) {
        //         state.contacts.splice(indexToDelete, 1);
        //     }
        // }
    },
    extraReducers: (builder) => {
        builder
            // Handle state for successfully fetched contacts
            .addCase(getinitialContactsasync.fulfilled, (state, action) => {
                state.contacts = action.payload;
            })
            // Handle state for successfully added contact
            .addCase(addContactasync.fulfilled, (state, action) => {
                state.contacts.unshift(action.payload); // Adds new contact to the beginning of the array
            })
            // Handle state for successfully deleted contact
            .addCase(deleteContactAsync.fulfilled, (state, action) => {
                const indexToDelete = state.contacts.findIndex(contact => contact.id === action.payload);
                if (indexToDelete !== -1) {
                    state.contacts.splice(indexToDelete, 1);
                }
            })
            // Handle state for successfully edited contact
            .addCase(editContactAsync.fulfilled, (state, action) => {
                const editedContact = action.payload;
                const index = state.contacts.findIndex(contact => contact.id === editedContact.id);
                if (index !== -1) {
                    state.contacts[index] = editedContact; // Updates the contact in the state
                }
            });
    }
});

// Exports for the reducer, actions, and selector
export const contactReducer = contactSlice.reducer;
// Export removed for actions as they're not manually defined in this slice
export const contactSelector = (state) => state.contactReducer.contacts; // Selector to access contacts state
