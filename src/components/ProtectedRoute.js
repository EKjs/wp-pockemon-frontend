import { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <Route {...rest} render={() => <Component />} />
  ) : (
    <Redirect to={{ pathname: '/', state: { next: pathname } }} />
  );
};

export default ProtectedRoute;
