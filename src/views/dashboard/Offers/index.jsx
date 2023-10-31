import { OffersFilterOptions, OffersTable } from "components/offers";
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
      <OffersFilterOptions />
      <OffersTable />
    </>
  );
};

export default Offers;
