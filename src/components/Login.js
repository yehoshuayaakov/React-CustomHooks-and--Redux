import useInput from "../hooks/use-input";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { profilesActions } from '../store/profiles'
const Login = props => {
    console.log(props.profiles);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [verified, setVerified] = useState(true);
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName
  } = useInput(value => value.trim() !== "");
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailName
  } = useInput(value => value.includes("@"));
  let logInInputIsValid = false;
  if (nameIsValid && emailIsValid) {
    logInInputIsValid = true;
  }
  const submitLoginHandler = event => {
    event.preventDefault();
    const index = props.profiles.findIndex(prof => prof.name === enteredName);
    if (index === -1) {
      setErrorMessage("Invalid Name Entry");
      setVerified(false);
      return;
    } else if (props.profiles[index].email !== enteredEmail) {
      setErrorMessage("Invalid Email Entry");
      setVerified(false);
      return;
    }
    setVerified(true);
    dispatch(authActions.validated());
    dispatch(profilesActions.setProfile({name: enteredName, email: enteredEmail}));
  };
  return (
    <div>
      <form onSubmit={submitLoginHandler}>
        <p>
          Don't have an account? click{" "}
          <span onClick={() => props.setHasAccount(false)}>here</span>
        </p>
        <h1>Log In</h1>
        <div className="control-group">
          <div className="form-control">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {nameHasError && (
              <p className="error-text">Name field cannot be empty</p>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <p className="error-text">Please enter vaild email</p>
            )}
          </div>
        </div>
        {!verified && <div><p className='error-text login'>{errorMessage}</p></div>}
        <div className="form-actions">
          <button disabled={logInInputIsValid ? false : true}>Log In</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
