import React, { ReactNode } from "react";
import Header from "./Header";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <main
      className="h-screen overflow-hidden bg-gradient-to-br from-black to-gray-800 bg-clip-padding p-5"
      style={{
        backdropFilter: "blur(40px)",
      }}
    >
      <Header />
      {children}
    </main>
  );
};

export default Container;
