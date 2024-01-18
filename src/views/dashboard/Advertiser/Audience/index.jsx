import { AudienceFilters, AudienceTable } from "components/advertiser";
import { useState } from "react";
import InnerHeader from "ui-component/InnerHeader";

const Audience = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const text = [
    {
      value: "Advertiser",
      url: "/advertiser",
    },
    {
      value: "Audience",
      url: "/audience",
    },
  ];

  return (
    <>
      <InnerHeader title={"Audience"} text={text} />
      <AudienceFilters selectedRows={selectedRows} setSelectedRows={setSelectedRows}  />
      <AudienceTable setSelectedRows={setSelectedRows} selectedRows={selectedRows} />
    </>
  );
};

export default Audience;
