import Card, { CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import {
  MessageCircleHeart,
  Siren,
  SquareActivity,
  BellRing,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full gap-5">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
      
        <div className="bg-blue-100 rounded-xl shadow">
          <Card
            key={1}
            icon={MessageCircleHeart}
            title={"Chat"}
            discription={"Connect with your caregivers"}
          />
        </div>
        <div className="bg-red-300 rounded-xl shadow">
          <Card
            key={2}
            icon={Siren}
            title={"Emergency Call"}
            discription={"Need any help?"}
          />
        </div>
        <div className="bg-orange-300 rounded-xl shadow">
          <Card
            key={3}
            icon={BellRing}
            title={"Reminders"}
            discription={"Manage your remineders"}
          />
        </div>
        <div className="bg-green-300 rounded-xl shadow">
          <Card
            key={3}
            icon={SquareActivity}
            title={"Health Monitoring"}
            discription={"Here's your health status"}
          />
        </div> 
      </section>
    </div>
  );
}
