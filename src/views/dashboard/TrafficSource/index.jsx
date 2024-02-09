import { OffersTrafficSource } from "components/traffic-source";
import TrafficSourceTable from "components/traffic-source/table";
import InnerHeader from "ui-component/InnerHeader";

const TrafficSource = () => {
  const text = [
    {
      value: "Traffic Source",
      url: "/traffic-source",
    },
  ];
  return (
    <>
      <InnerHeader title={"Traffic Source"} text={text} />
      <OffersTrafficSource />
      <TrafficSourceTable />
    </>
  );
};

export default TrafficSource;
