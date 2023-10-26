import InnerHeader from "ui-component/InnerHeader";
import { FilterOptions } from "components/advertiser";

const text = [
  {
    value: "Advertiser",
    url: "/advertiser",
  },
];

const MainAdvertiser = () => {
  return (
    <div>
      <InnerHeader title={"Advertiser"} text={text} />
      <FilterOptions />
    </div>
  );
};

export default MainAdvertiser;
