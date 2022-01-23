import { configureStore } from '@reduxjs/toolkit';
import authentificationSlice from './auth';
import profilesReducer from './profiles';
import counterReducer from './counter'



const store = configureStore({
 reducer: {  auth: authentificationSlice, counter: counterReducer, profiles: profilesReducer },
});

export default store;