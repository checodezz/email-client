import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmails = createAsyncThunk("emails/fetchEmails", async (page) => {
    const response = await axios.get(`https://flipkart-email-mock.now.sh/?page=${page}`);
    return response.data.list;
});

const emailSlice = createSlice({
    name: "emails",
    initialState: {
        emailList: [],
        loading: false,
        error: null,
        filter: 'all',  // Filtering criteria
    },
    reducers: {
        // Action to toggle favorite status for an email
        toggleFavorite: (state, action) => {
            const emailId = action.payload  // Get the email ID from the action
            const email = state.emailList.find((email) => email.id == emailId);


            if (email) {
                email.isFavorite = !email.isFavorite;
                console.log(JSON.stringify(email, null, 2));
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;  // Update filter based on user's selection
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmails.fulfilled, (state, action) => {
                state.loading = false;
                // Map through the emails and ensure each has the isFavorite flag
                state.emailList = action.payload.map((email) => ({
                    ...email,
                    isFavorite: false,  // Initialize with isFavorite false if not present
                }));
            })
            .addCase(fetchEmails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { toggleFavorite, setFilter } = emailSlice.actions;

export default emailSlice.reducer;
