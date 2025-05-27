import React from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: Array<"customer" | "booster">;
}

const Protected = ({ children, allowedRoles }: ProtectedRouteProps) => {
  return children;
};

export default Protected;
