import {useState} from 'react'

const SimpleInput = (props) => {
const [enteredName, setEnteredName] = useState('');
const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
const [enteredEamilIsTouched, setEnteredEmailIsTouched] = useState(false);
const [enteredEmail, setEnteredEmail] = useState('');
const enteredNameIsValid = enteredName.trim()!=='';
const enteredEmailInvalid = !enteredEmail.includes('@') 
const emailInputInvalid = enteredEmailInvalid  && enteredEamilIsTouched;
const nameInputInvalid = !enteredNameIsValid && enteredNameIsTouched;
let formIsValid = false;
if (enteredNameIsValid && !enteredEmailInvalid){
  formIsValid=true;
}
const handleNameInput = event =>{
  setEnteredName(event.target.value);
 
}  
const handleEmailInput =event =>{
  setEnteredEmail(event.target.value);

}
const nameInputBlurHandler = event => {
setEnteredNameIsTouched(true);
    return;
  
}
const emailInputBlurHandler = event => {
setEnteredEmailIsTouched(true);
}
const handleSubmitForm = event => {
  event.preventDefault();
  setEnteredNameIsTouched(true);
  setEnteredEmailIsTouched(true);
  setEnteredName('');
  setEnteredEmail('');
  setEnteredEmailIsTouched(false);
  setEnteredNameIsTouched(false);
  console.log(enteredName);
}
return (
    <form onSubmit={handleSubmitForm}>
      <div className='form-control' >
        <label htmlFor='name'>Your Name</label>
        <input 
        type='text' 
        id='name' 
        onChange ={handleNameInput} 
        value={enteredName}
        onBlur={nameInputBlurHandler}/>
      </div>
      <div className='form-control' >
        <label htmlFor='email'>Your Email</label>
        <input 
        type='email' 
        id='email' 
        onChange ={handleEmailInput} 
        value={enteredEmail}
        onBlur={emailInputBlurHandler}/>
      </div>
       {nameInputInvalid && <p className="error-text"> Name Cannot Be Empty </p>}
       {emailInputInvalid && <p className = "error-text">Email must contain @</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
