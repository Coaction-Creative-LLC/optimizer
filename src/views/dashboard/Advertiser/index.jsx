import InnerHeader from "ui-component/InnerHeader";
import { AdvertiserTable, FilterOptions } from "components/advertiser";

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
      <AdvertiserTable />
    </div>
  );
};

export default MainAdvertiser;
