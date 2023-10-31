import InnerHeader from "ui-component/InnerHeader";

const Campaign = () => {
  const text = [
    {
      value: "Campaign",
      url: "/campaign",
    },
  ];
  return (
    <>
      <InnerHeader title={"Campaign"} text={text} />
    </>
  );
};

export default Campaign;
