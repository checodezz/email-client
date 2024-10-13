import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const saveToLocalStorage = (emailList) => {
    localStorage.setItem("emailList", JSON.stringify(emailList));
};

export const loadFromLocalStorage = () => {
    const savedEmails = localStorage.getItem("emailList");
    console.log(savedEmails)
    return savedEmails ? JSON.parse(savedEmails) : null;
};

export const fetchEmails = createAsyncThunk("emails/fetchEmails", async (page) => {
    const response = await axios.get(`https://flipkart-email-mock.now.sh/?page=${page}`);
    return { emails: response.data.list, page };
});

const emailSlice = createSlice({
    name: "emails",
    initialState: {
        emailList: loadFromLocalStorage() || [],
        loading: false,
        error: null,
        filter: 'all',
        currentPage: 1,
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const emailId = action.payload;
            const email = state.emailList.find((email) => email.id == emailId);
            if (email) {
                email.isFavorite = !email.isFavorite;
                saveToLocalStorage(state.emailList);
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
                saveToLocalStorage(state.emailList);
            }
        },
        markAsUnread: (state, action) => {
            const emailId = action.payload;
            const email = state.emailList.find((email) => email.id === emailId);
            if (email) {
                email.isRead = false;
                saveToLocalStorage(state.emailList);
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
                const { emails, page } = action.payload;
                if (page === 1) {
                    state.emailList = emails.map((email) => ({
                        ...email,
                        isFavorite: false,
                        isRead: false,
                    }));
                } else {
                    state.emailList = [...state.emailList, ...emails.map((email) => ({
                        ...email,
                        isFavorite: false,
                        isRead: false,
                    }))];
                }

                state.currentPage = page;
                state.loading = false;

                saveToLocalStorage(state.emailList);
            })
            .addCase(fetchEmails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { toggleFavorite, setFilter, markAsRead, markAsUnread } = emailSlice.actions;

export default emailSlice.reducer;
