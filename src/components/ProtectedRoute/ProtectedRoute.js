import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  console.log(Component);
  console.log(props.loggedIn);
  console.log(props);
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" />;
};

export default ProtectedRouteElement;
