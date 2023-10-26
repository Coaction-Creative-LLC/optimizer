import { AudienceFilters, AudienceTable } from "components/advertiser";
import InnerHeader from "ui-component/InnerHeader";

const Audience = () => {
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
      <AudienceFilters />
      <AudienceTable />
    </>
  );
};

export default Audience;
