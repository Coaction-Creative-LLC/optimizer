import { OffersFilterOptions, OffersTable } from "components/offers";
import InnerHeader from "ui-component/InnerHeader";

const text = [
  {
    value: "Offers",
    url: "/offers",
  },
];
const Offers = () => {
  return (
    <>
      <InnerHeader title={"Offers"} text={text} />
      <OffersFilterOptions />
      <OffersTable />
    </>
  );
};

export default Offers;
