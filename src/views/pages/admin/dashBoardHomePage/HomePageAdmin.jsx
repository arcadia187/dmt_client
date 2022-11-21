// import FeaturedInfo from "../../../components/dashboard/featuredInfo/FeaturedInfo";
// import Chart from "../../../components/dashboard/chart/Chart";
import "./InnerHomePage.scss";
// import WidgetLg from "../../../components/dashboard/widgetLg/WidgetLg";
// import WidgetSm from "../../../components/dashboard/widgetSm/WidgetSm";
import { useEffect, useMemo, useState } from "react";
export default function HomePageAdmin() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  // useEffect(() => {
  //   const getStats = async () => {
  //     try {
  //       const res = await axiosInstance.get("/users/stats", {
  //         headers: {
  //           token: "Bearer " + user.accessToken,
  //         },
  //       });
  //       const statsList = res.data.sort(function (a, b) {
  //         return a._id - b._id;
  //       });
  //       statsList.map((item) =>
  //         setUserStats((prev) => [
  //           ...prev,
  //           { name: MONTHS[item._id - 1], "New User": item.total },
  //         ])
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getStats();
  // }, [MONTHS, user.accessToken]);
  return (
    <div className="dashBoardHomePage">
      <h1>Admin homepage</h1>
    </div>
  );
}
