import React from "react";
import InnerHeader from "ui-component/InnerHeader";

const Offers = () => {
  const text = [
    {
      value: "Offers",
      url: "/offers",
    },
  ];
  return (
    <>
      <InnerHeader title={"Offers"} text={text} />
    </>
  );
};

export default Offers;
