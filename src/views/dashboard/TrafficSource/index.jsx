import { OffersTrafficSource } from "components/traffic-source";
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
    </>
  );
};

export default TrafficSource;
