import BasicForm from './components/BasicForm';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { is } from '@babel/types';
function App() {
  const isAuth = useSelector((state)=>state.isAuthenticated)
  return (
    <div className="app">
      {isAuth &&<Header/>}
      {!isAuth && <BasicForm />}
    </div>
  );
}

export default App;
