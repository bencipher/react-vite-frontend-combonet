import React from "react";
interface MyProps {
  extraStyle?: string;
  children: React.ReactNode;
}

const Card = ({ children, extraStyle = "bg-gray-100" }: MyProps) => {
  return (
    <div className={`${extraStyle} p-6 rounded-lg shadow-md`}>{children}</div>
  );
};

export default Card;
