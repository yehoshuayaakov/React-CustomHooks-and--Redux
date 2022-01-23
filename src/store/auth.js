import { createSlice } from '@reduxjs/toolkit';

const initialAuthentificationState = {isAuthenticated: false, name: ''};
const authentificationSlice = createSlice({
    name: 'authentification',
    initialState: initialAuthentificationState,
    reducers: {
        logIn(state){
            state.isAuthenticated = true;
        },
        logOut(state){
            state.isAuthenticated = false;
        },
        getName(state, action){
            state.name = action.payload
        },
        validated(state){
            state.isAuthenticated = true;
        }
    }
})
export const authActions = authentificationSlice.actions;
export default authentificationSlice.reducer;