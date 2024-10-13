import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper functions to interact with localStorage
const saveToLocalStorage = (emailList) => {
    localStorage.setItem("emailList", JSON.stringify(emailList));
};

const loadFromLocalStorage = () => {
    const savedEmails = localStorage.getItem("emailList");
    return savedEmails ? JSON.parse(savedEmails) : null;
};

export const fetchEmails = createAsyncThunk("emails/fetchEmails", async (page) => {
    const response = await axios.get(`https://flipkart-email-mock.now.sh/?page=${page}`);
    return response.data.list;
});

const emailSlice = createSlice({
    name: "emails",
    initialState: {
        emailList: loadFromLocalStorage() || [],  // Load emails from localStorage initially
        loading: false,
        error: null,
        filter: 'all',
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const emailId = action.payload;
            const email = state.emailList.find((email) => email.id == emailId);

            if (email) {
                email.isFavorite = !email.isFavorite;
                saveToLocalStorage(state.emailList); // Persist the updated list
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        markAsRead: (state, action) => {
            const emailId = action.payload;
            const email = state.emailList.find((email) => email.id === emailId);

            if (email) {
                email.isRead = true;
                saveToLocalStorage(state.emailList);  // Persist the updated list
            }
        },
        markAsUnread: (state, action) => {
            const emailId = action.payload;
            const email = state.emailList.find((email) => email.id === emailId);

            if (email) {
                email.isRead = false;
                saveToLocalStorage(state.emailList);  // Persist the updated list
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmails.fulfilled, (state, action) => {
                // Check if we have saved data in localStorage before replacing the list
                const savedEmails = loadFromLocalStorage();
                if (savedEmails) {
                    state.emailList = savedEmails;  // Load saved emails from localStorage if present
                } else {
                    state.emailList = action.payload.map((email) => ({
                        ...email,
                        isFavorite: false,
                        isRead: false,
                    }));
                    saveToLocalStorage(state.emailList);  // Save initial fetched list to localStorage
                }
                state.loading = false;
            })
            .addCase(fetchEmails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { toggleFavorite, setFilter, markAsRead, markAsUnread } = emailSlice.actions;

export default emailSlice.reducer;
