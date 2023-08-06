
// Data
import React, { useState } from "react";
import mockData from "../assets/data.json";
import timeData from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({

  });
   const totalorders = mockData.results.length;
   
   const filteredOrders = mockData.results.filter((order) =>
    order["&id"].toLowerCase().includes(searchText.toLowerCase())
  );

  // Function to handle the search bar change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleOrderSelect = (orderId) => {
    // Find the selected order data based on the orderId from the filteredOrders
    const selectedOrderDetailsData = filteredOrders.find((order) => order["&id"] === orderId);
    setSelectedOrderDetails(selectedOrderDetailsData);

    // Find the selected order timestamps based on the orderId from the timeData.results
    const selectedOrderTimeStampsData = timeData.results.find((timeStamp) => timeStamp["&id"] === orderId);
    setSelectedOrderTimeStamps(selectedOrderTimeStampsData);
  };

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${totalorders} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={handleSearchChange}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
              cardData={selectedOrderDetails} title="Selected Order Details" 
            />
          <Card
             cardData={selectedOrderTimeStamps} title="Selected Order Timestamps" 
          />
        </div>
        <List rows={filteredOrders} timestamps={timeData.results} currency={currency} onOrderSelect={handleOrderSelect} />
        
      </div>
    </div>
  );
};

export default Dashboard;
