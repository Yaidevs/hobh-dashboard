import React from "react";
import CardDataStats from "../../components/CardDataStats";
import ChartOne from "../../components/Charts/ChartOne";
import ChartThree from "../../components/Charts/ChartThree";
import ChartTwo from "../../components/Charts/ChartTwo";
import ChatCard from "../../components/Chat/ChatCard";
import MapOne from "../../components/Maps/MapOne";
import TableOne from "../../components/Tables/TableOne";
import { Fence, Podcast, User, UserPen } from "lucide-react";
import { useGetAllDataQuery } from "../../features/dashboard-summary/api/summaryApi";

const Home = () => {
  const { data: datas, isSuccess } = useGetAllDataQuery();
  console.log(datas?.data?.activeUSers);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Users"
          total={datas?.data?.activeUSers}
          rate="0.43%"
          levelUp
        >
          <User />
        </CardDataStats>
        <CardDataStats
          title="Resources"
          total={datas?.data?.resources}
          rate="4.35%"
          levelUp
        >
          <Fence />
        </CardDataStats>
        <CardDataStats
          title="Instructors"
          total={datas?.data?.activeInstructors}
          rate="2.59%"
          levelUp
        >
          <UserPen />
        </CardDataStats>
        <CardDataStats
          title="Subscription"
          total={datas?.data?.subscriptions}
          rate="0.95%"
          levelUp
        >
          <Podcast />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default Home;
