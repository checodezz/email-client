import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmailDetails = createAsyncThunk("emails/fetchEmailDetails", async (id) => {
    const response = await axios.get(`https://flipkart-email-mock.now.sh/?id=${id}`);
    return response.data.body;
});

const emailDetailSlice = createSlice({
    name: "emailDetails",
    initialState: {
        emailDetail: null,
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmailDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmailDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.emailDetail = action.payload;
            })
            .addCase(fetchEmailDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default emailDetailSlice.reducer;
