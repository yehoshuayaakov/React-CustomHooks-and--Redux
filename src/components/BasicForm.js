import { useState, useEffect } from 'react'; 
import useInput from '../hooks/use-input'
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { profilesActions } from '../store/profiles'

const BasicForm = (props) => {
 const [newUser, setNewUser] =  useState({});

  const creaeteUserInDB = async(user) => {
    console.log("sent")
      const response = await fetch('https://react-login-project-47b74-default-rtdb.firebaseio.com/users.json',{
        method: 'Post',
        body: JSON.stringify(user),
    
    
      });
      if (!response.ok){
        console.log("error")
      }
  }
  const dispatch = useDispatch();
  const { value: enteredFirstName, 
          isValid: firstNameIsValid,
          hasError: firstNameHasError,
          valueChangeHandler: firstNameChangeHandler,
          inputBlurHandler: firstNameBlurHandler,
          reset: resetFirstName,
          } = useInput(value=>value.trim() !== '');
  const { value: enteredLastName, 
          isValid: lastNameIsValid,
          hasError: lastNameHasError,
          valueChangeHandler: lastNameChangeHandler,
          inputBlurHandler: lastNameBlurHandler,
          reset: resetLastName,
            } = useInput(value=>value.trim()!==''); 
  const { value: enteredEmail, 
              isValid: emailIsValid,
              hasError: emailHasError,
              valueChangeHandler: emailChangeHandler,
              inputBlurHandler: emailBlurHandler,
              reset: resetEmail,
              } = useInput(value=>value.includes('@'));    
let formIsValid = false;
const fullName = `${enteredFirstName} ${enteredLastName}`

if (firstNameIsValid && lastNameIsValid && emailIsValid){
  formIsValid=true; 
}  
const submitFormHandler = (event)=>{
  event.preventDefault();
  creaeteUserInDB(newUser);
  if (formIsValid){
    dispatch(authActions.logIn());
    dispatch(authActions.getName(fullName));
    dispatch(profilesActions.addProfile({name: fullName, email: enteredEmail}));
   
  }
  resetEmail();
  resetFirstName();
  resetLastName();
}
useEffect(()=>{
  if (formIsValid){
      setNewUser({name: `${enteredFirstName} ${enteredLastName}`, email: enteredEmail})   
  }
console.log('useEffect')
},[ formIsValid])
  return (
    <form onSubmit = {submitFormHandler}>
      <h1>Please Fill in the Following Fields</h1>
      <div className='control-group'>
        <div className='form-control'>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' 
          value={enteredFirstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}/>
        {firstNameHasError && <p className="error-text">First Name Cannot Be Empty</p>}
        </div>
        <div className='form-control'>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' 
           value={enteredLastName}
           onChange={lastNameChangeHandler}
           onBlur={lastNameBlurHandler}/>
        {lastNameHasError && <p className="error-text">Last Name Cannot Be Empty</p>}
        </div>
      </div>
      <div className='form-control'>
        <label htmlFor='email'>E-Mail Address</label>
        <input type='email' id='email' 
         value={enteredEmail}
         onChange={emailChangeHandler}
         onBlur={emailBlurHandler}/>
      {emailHasError && <p className="error-text">Email Must Contain '@'</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
