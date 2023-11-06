import { OffersControlSettings } from "components/control-settings";
import InnerHeader from "ui-component/InnerHeader";

const ControlSettings = () => {
  const text = [
    {
      value: "Control Settings",
      url: "/control-settings",
    },
  ];
  return (
    <>
      <InnerHeader title={"Control Settings"} text={text} />
      <OffersControlSettings />
    </>
  );
};

export default ControlSettings;
