import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isLoading : false,
    bannerImageList : []
}

export const getBannerImages = createAsyncThunk("/order/getBannerImages", async()=>{

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/common/banner/get`
     );
    return response.data;
});

export const addBannerImages = createAsyncThunk("/order/addBannerImages", async(image)=>{

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/common/banner/add`,
        {image}
     );
    return response.data;
});

const commonSlice = createSlice({
    name : "commonSlice",
    initialState,
    reducers : {
        
    },
    extraReducers : (builder)=>{
        builder.addCase(getBannerImages.pending, (state)=>{
            state.isLoading = true;
        }).addCase(getBannerImages.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.bannerImageList = action.payload.data
        }).addCase(getBannerImages.rejected, (state)=>{
            state.isLoading = false;
            state.bannerImageList = [];
        });
    }
});




export default commonSlice.reducer;