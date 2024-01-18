import InnerHeader from "ui-component/InnerHeader";
import { GroupsFilter, GroupsTable } from "components/advertiser";

const text = [
    {
      value: "Advertiser",
      url: "/advertiser",
    },
    {
      value: "Groups",
      url: "/advertiser/groups",
    },
  ];

const MainAdvertiser = () => {
  return (
    <div>
      <InnerHeader title={"Advertiser"} text={text} />
      <GroupsFilter />
      <GroupsTable />
    </div>
  );
};

export default MainAdvertiser;
