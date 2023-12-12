import { Navigate , Outlet, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ROUTES } from '../../../config/routes';


const ProtectedRoute = (Props) => {
  const auth =  Cookies.get('TravelAccount');


  if(auth){
    return <Outlet/>
  }
  return <Navigate to={ROUTES.signin}/>  
};

export default ProtectedRoute;
