import React from "react";
import InnerHeader from "ui-component/InnerHeader";

const Dashboard = () => {
  const text = [
    {
      value: "Dashboard",
      url: "/dashboard",
    },
  ];
  return (
    <>
      <InnerHeader title={"Dashboard"} text={text} />
    </>
  );
};

export default Dashboard;
