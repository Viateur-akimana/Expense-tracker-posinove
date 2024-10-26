// import React from 'react';
// import { Navigate } from 'react-router-dom';

// type Props = {
//     isAuthenticated: boolean;
//     children: React.ReactNode;
// };

// const ProtectedRoute: React.FC<Props> = ({ isAuthenticated, children }) => {
//     return isAuthenticated ? (
//         <>{children}</>
//     ) : (
//         <Navigate to="/login" />
//     );
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  element
}) => {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;