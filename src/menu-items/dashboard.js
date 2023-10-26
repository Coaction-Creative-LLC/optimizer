// third-party
import { FormattedMessage } from "react-intl";

// assets
import { IconDashboard, IconDeviceAnalytics } from "@tabler/icons";

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
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false,
    },
    {
      id: "Advertiser",
      title: <FormattedMessage id="advertiser" />,
      type: "collapse",
      icon: icons.IconDeviceAnalytics,
      url: "/advertiser",
      children: [
        {
          id: "Add Advertiser",
          title: <FormattedMessage id="add-advertiser" />,
          type: "item",
          url: "/advertiser/add-advertiser",
        },
        {
          id: "Audiences",
          title: <FormattedMessage id="audiences" />,
          type: "item",
          url: "/advertiser/audience",
        },
      ],
    },
    {
      id: "Offers",
      title: <FormattedMessage id="offers" />,
      type: "item",
      url: "/offers",
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false,
    },
    {
      id: "Campaign",
      title: <FormattedMessage id="campaign" />,
      type: "item",
      url: "/campaign",
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false,
    },
    {
      id: "Optimizer",
      title: <FormattedMessage id="optimizer" />,
      type: "item",
      url: "/optimizer",
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false,
    },
    {
      id: "Default",
      title: <FormattedMessage id="default" />,
      type: "item",
      url: "/dashboard/default",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "analytics",
      title: <FormattedMessage id="analytics" />,
      type: "item",
      url: "/dashboard/analytics",
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
