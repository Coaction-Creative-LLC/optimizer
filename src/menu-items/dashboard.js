// third-party
import { FormattedMessage } from "react-intl";

// assets
import {
  IconDashboard,
  IconDeviceAnalytics,
  IconSquaresFilled,
  IconArticle,
  IconSpeakerphone,
  IconSettings,
  IconArrowsTransferDown,
  IconUser
} from "@tabler/icons";

const icons = {
  IconDashboard,
  IconDeviceAnalytics,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: "dashboard",
  title: <FormattedMessage id="dashboard" />,
  icon: icons.IconDashboard,
  type: "group",
  children: [
    {
      id: "Dashboard",
      title: <FormattedMessage id="dashboard" />,
      type: "item",
      url: "/dashboard",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "Advertiser",
      title: <FormattedMessage id="advertiser" />,
      type: "collapse",
      icon: IconSquaresFilled,
      url: "/advertiser",
      children: [
        {
          id: "Add Advertiser",
          title: <FormattedMessage id="add-advertiser" />,
          type: "item",
          url: "/advertiser/add-advertiser",
        },
      ],
    },
    {
      id: "Audience",
      title: <FormattedMessage id="Audience" />,
      type: "item",
      icon: IconUser,
      url: "/advertiser/audience",
    },
    {
      id: "Offers",
      title: <FormattedMessage id="offers" />,
      type: "collapse",
      icon: IconArticle,
      url: "/offers",
      children: [
        {
          id: "Add Offers",
          title: <FormattedMessage id="add-offers" />,
          type: "item",
          url: "/offers/add-offer",
        },
      ],
    },
    {
      id: "Campaign",
      title: <FormattedMessage id="campaign" />,
      type: "collapse",
      icon: IconSpeakerphone,
      url: "/campaign",
      children: [
        {
          id: "Add Offers",
          title: <FormattedMessage id="add-campaign" />,
          type: "item",
          url: "/campaign/add-campaign",
        },
      ],
    },
    {
      id: "ControlSettings",
      title: <FormattedMessage id="control-settings" />,
      type: "item",
      icon: IconSettings,
      url: "/control-settings",
      breadcrumbs: false,
    },
    {
      id: "Traffic Source",
      title: <FormattedMessage id="traffic-source" />,
      type: "collapse",
      url: "/traffic-source",
      icon: IconArrowsTransferDown,
      children: [
        {
          id: "Add Offers",
          title: <FormattedMessage id="Create Traffic Source" />,
          type: "item",
          url: "/traffic-source/add-source",
        },
      ],
    },
  ],
};

export default dashboard;
