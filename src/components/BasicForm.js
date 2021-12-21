import useInput from '../hooks/use-input'
import { useDispatch } from 'react-redux';
import { authActions } from '../store/index'
const BasicForm = (props) => {
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
if (firstNameIsValid && lastNameIsValid && emailIsValid){
  formIsValid=true;
}  
const submitFormHandler = (event)=>{
  event.preventDefault();
  if (formIsValid){
    dispatch(authActions.logIn());
    dispatch(authActions.getName(`${enteredFirstName} ${enteredLastName}`))
  }
  resetEmail();
  resetFirstName();
  resetLastName();
}
  return (
    <form onSubmit = {submitFormHandler}>
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
