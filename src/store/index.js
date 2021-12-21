import { configureStore } from '@reduxjs/toolkit';
import { createSlice} from '@reduxjs/toolkit';
import { getSystemErrorName } from 'util';



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
        }
    }
})
const store = configureStore({
 reducer: authentificationSlice.reducer
});
export const authActions = authentificationSlice.actions;
export default store;