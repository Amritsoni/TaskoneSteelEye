import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";
import React from "react";

const List = ({ rows , timestamps , currency , onOrderSelect}) => {
  const handleOrderClick = (orderId) => {
    onOrderSelect(orderId);
  };
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / USD</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row ,index ) => (
          <ListRow  key={index} onClick={() => handleOrderClick(row["&id"])}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell key = {index}>{timestamps[index].timeStamps.orderSubmitted}</ListRowCell>
            {/* to display the data from the TimeStamps data file first in dashboard file we have to pass the timestamp in list component 
            then we simply do it with the using that var name in here list.jsx file  */}
            <ListRowCell>{row.bestExecutionData.orderVolume[currency]}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
