import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return props.loggedIn || props.isLoading ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedRouteElement;
