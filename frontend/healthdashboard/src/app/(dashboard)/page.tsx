'use client'
import Card from "@/components/Card";
import {CardContent, Card as CardFeeling, CardHeader} from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";
import {
  MessageCircleHeart,
  Siren,
  SquareActivity,
  BellRing,
  Laugh,
  Smile,
  Frown,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full gap-5">
      <PageTitle title="Home" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
      
        <div className="bg-blue-100 rounded-xl shadow">
        <Link href="/chat">
          <Card
            key={1}
            icon={MessageCircleHeart}
            title={"Chat"}
            discription={"Connect with your caregivers"}
          />
        </Link>
        </div>
        <div className="bg-red-300 rounded-xl shadow">
          <Link href="/call">
          <Card
            key={2}
            icon={Siren}
            title={"Emergency Call"}
            discription={"Need any help?"}
          />
          </Link>
        </div>
        <div className="bg-orange-300 rounded-xl shadow">
          <Link href="/reminders">
          <Card
            key={3}
            icon={BellRing}
            title={"Reminders"}
            discription={"Manage your remineders"}
          />
          </Link>
        </div>
        <div className="bg-green-300 rounded-xl shadow">
          <Link href="/status">
          <Card
            key={3}
            icon={SquareActivity}
            title={"Health Monitoring"}
            discription={"Here's your health status"}
          />
          </Link>
        </div> 
      </section>
      <section>
        <CardFeeling>
          <CardHeader className="text-xl font-semibold">
             How are you feeling today?  
          </CardHeader>
          <CardContent className="flex gap-4">
          <Laugh size={50} className="cursor-pointer" onClick={()=>{}}/>
          <Smile size={50} className="cursor-pointer" onClick={()=>{}}/>
          <Frown size={50} className="cursor-pointer" onClick={()=>{}}/>
          </CardContent>
        </CardFeeling>
      </section>
    </div>
  );
}
