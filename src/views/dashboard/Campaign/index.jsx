import { CampaignFilterOptions, CampaignTable } from "components/campaign";
import InnerHeader from "ui-component/InnerHeader";

const text = [
  {
    value: "Campaign",
    url: "/campaign",
  },
];
const Campaign = () => {
  return (
    <>
      <InnerHeader title={"Campaign"} text={text} />
      <CampaignFilterOptions />
      <CampaignTable />
    </>
  );
};

export default Campaign;
