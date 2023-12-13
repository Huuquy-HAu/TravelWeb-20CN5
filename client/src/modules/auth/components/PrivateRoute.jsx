import { Navigate , Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ROUTES } from '../../../config/routes';


const PrivateRoute = (Props) => {
  const auth =  Cookies.get('TravelAccount');

  if(!auth){
    return <Outlet/>
  }
  return <Navigate to={ROUTES.home}/>  
};

export default PrivateRoute;
