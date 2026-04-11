import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../ContextStore/AdminContext";
import { LineChart } from "@mui/x-charts/LineChart";

const RecentOrders = () => {
  let { stats } = useContext(AdminContext);

  let [filteredState, setFilteredState] = useState(null);
  let [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    if (!stats?.recentOrders) return;

    const paidOrders = stats.recentOrders.filter(
      (order) => order.paymentStatus === "paid",
    );

    const amounts = paidOrders.map((order) => order.totalAmount);

    setFilteredState(paidOrders);
    setTotalAmount(amounts);
  }, [stats]);
  console.log(totalAmount);
  return (
    <div>
      <h1 className="text-center font-extralight text-2xl text-blue-400">
        Recent Orders
      </h1>

      <div>
        <LineChart
          xAxis={[
            { data: totalAmount ? totalAmount.map((_, i) => i + 1) : [0] },
          ]}
          series={[
            {
              data: totalAmount || [0],
              area: true,
              color: "#60a5fa",
            },
          ]}
          height={300}
        />
      </div>
    </div>
  );
};

export default RecentOrders;
