import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store';

export const fetchPizzas = createAsyncThunk (
    'pizza/fetchPizzasStatus',
    async (params, thunkAPI) => {
        const {
            order,
            sortBy,
            category,
            search,
            currentPage,
        } = params;
        const { data } = await axios.get(`https://63bfda05e262345656f1a0a8.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
        return data
    }
)

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageURL: string;
    types: number[]; 
    sizes: number[];
    rating: number;
}

interface PizzaSliceState {
    items: Pizza[];
    status: 'loading' | 'succes' | 'error';
}

const initialState:PizzaSliceState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice( {
    name: 'pizza',
    initialState,
    reducers: {
    setItems(state, action) { 
       state.items = action.payload;
    },
},
extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
        state.items = [];
        state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
        state.items = [];
        state.status = 'error';
    },

}

});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;