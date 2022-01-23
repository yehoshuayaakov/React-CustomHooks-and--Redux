import BasicForm from "./components/BasicForm";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { profilesActions } from "./store/profiles";

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const counter = useSelector(state => state.counter.counter);
  const profiles = useSelector(state => state.profiles.profiles);
  const currentUser = useSelector(
    state => state.profiles.currentUser
  );
  const [hasAccount, setHasAccount] = useState(true);
  // const number = useSelector((state)=>state.profile.isTrue);
  // console.log(profile)
  const dispatch = useDispatch();
  const getProfilesFromFB = async () => {
    const response = await fetch(
      "https://react-login-project-47b74-default-rtdb.firebaseio.com/users.json",
      {}
    );
    if (!response.ok) {
      console.log("error");
    }
    const uploadedProfiles = await response.json();
    console.log(uploadedProfiles);
    let users = [];
    for (let key in uploadedProfiles){
      users.push(uploadedProfiles[key])
     
    } console.log(users);
      dispatch(profilesActions.getProfiles(users));
  };
  useEffect(()=>{
    getProfilesFromFB();
  },[])
  return (
    <div className="app">
      {isAuth && (
        <>
          <Header 
          setHasAccount={setHasAccount}/>
          <Profile
            profiles={profiles}
            counter={counter}
            user={currentUser}
            
          />
        </>
      )}
      {!isAuth && (
        <>
          {!hasAccount && <BasicForm />}
          {hasAccount && (
            <Login setHasAccount={setHasAccount} profiles={profiles} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
