import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
    name: 'items',
    initialState: [],
    reducers: {
        setItems: (state, action) => {
            return action.payload;
        },
        addItem: (state, action) => {
            state.push(action.payload);
        },
        updateItem: (state, action) => {
            const { id, updatedData } = action.payload;
            const itemIndex = state.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                state[itemIndex] = { ...state[itemIndex], ...updatedData };
            }
        },
        deleteItem: (state, action) => {
            const idToDelete = action.payload;
            return state.filter(item => item.id !== idToDelete);
        },
    },
});

export const { setItems, addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
