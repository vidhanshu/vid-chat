import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex justify-center items-center p-4 sm:p-0">{children}</div>
  );
};

export default AuthLayout;
