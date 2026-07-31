import { Navigate } from 'react-router-dom';
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
 
  // If the user does not have a saved security pass token, send them back to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
 
  return children;
}
export default ProtectedRoute;