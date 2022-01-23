import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';

const Header = (props)=>{
const dispatch = useDispatch();
    const name = useSelector((state)=> state.profiles.currentUser.name)
    const handleLogOutClick = ()=>{
    dispatch(authActions.logOut());
    props.setHasAccount(true);
    }
return (
<header className = 'header'>
    <nav> 
        <ul>
            <h1>{name}</h1>
               
            
            <li>
                <a href='/'>My Classes</a>
            </li>
            <li>
                <a href='/'>My Grades</a>
            </li>
            <li>
                <button onClick={handleLogOutClick}>Logout</button>
            </li>
        </ul>
    </nav>
</header>
)}
export default Header;