import { AudienceFilters, AudienceTable } from "components/advertiser";
import { useState } from "react";
import InnerHeader from "ui-component/InnerHeader";

const Audience = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [audienceData, setAudienceData] = useState({});
  const [opendialog, setOpenDialog] = useState(false);

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
      <AudienceFilters
        opendialog={opendialog}
        setOpenDialog={setOpenDialog}
        selectedRows={selectedRows}
        audienceData={audienceData}
        setSelectedRows={setSelectedRows}
      />
      <AudienceTable
        opendialog={opendialog}
        setOpenDialog={setOpenDialog}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        setAudienceData={setAudienceData}
      />
    </>
  );
};

export default Audience;
