import React from "react";
import GoogleSheetsTest from "../GoogleSheetsTest";
import GoogleDriveTest from "../GoogleDriveTest";
import AlertTest from "../AlertTest";
import ReportDashboard from "../ReportDashboard";
import { navigationData } from "../../data/navigationData";

const TabContent = ({ activeTab }) => {
  const getComponent = (tabId) => {
    const tab = navigationData.tabs.find((tab) => tab.id === tabId);
    if (!tab) return <GoogleSheetsTest />;

    switch (tab.component) {
      case "GoogleSheetsTest":
        return <GoogleSheetsTest />;
      case "GoogleDriveTest":
        return <GoogleDriveTest />;
      case "AlertTest":
        return <AlertTest />;
      case "ReportDashboard":
        return <ReportDashboard />;
      default:
        return <GoogleSheetsTest />;
    }
  };

  return <main className="app-main">{getComponent(activeTab)}</main>;
};

export default TabContent;
