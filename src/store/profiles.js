import { createSlice } from '@reduxjs/toolkit';

const intitialProfileState = { profiles: [], currentUser: {name: '', email: ''}, isTrue: true}
const profilesSlice = createSlice({ 
      name: 'profiles',
      initialState: intitialProfileState,
      reducers: {
          removeProfile(state, action){
              state = state.profiles.filter(profile=> profile.email !== action.payload.email);
          },
          increase(state){
              state.number++;
          },
          addProfile(state, action){
              
              const newProfile = action.payload;
              state.currentUser = newProfile;
              console.log(newProfile)
           state.profiles.push({
               name: newProfile.name,
               email: newProfile.email
           })
          },
          setProfile(state, action) {
            const newProfile = action.payload;
            state.currentUser = newProfile;
          },
          getProfiles(state, action){
              const profileList = action.payload;
              state.profiles = profileList;
              console.log("uploaded", profileList);
          }
      },
    });
export const profilesActions = profilesSlice.actions;

export default profilesSlice.reducer;