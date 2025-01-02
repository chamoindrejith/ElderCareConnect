import Card, { CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import {
  MessageCircleHeart,
  Siren,
  SquareActivity,
  BellRing,
} from "lucide-react";

const cardData: CardProps[] = [
  {
    icon: MessageCircleHeart,
    title: "Chat",
    discription: "Connect with your caregivers",
  },
  {
    icon: Siren,
    title: "Emergency Call",
    discription: "Need any help?",
  },
  {
    icon: BellRing,
    title: "Reminders",
    discription: "Manage your remineders",
  },
  {
    icon: SquareActivity,
    title: "Health Monitoring",
    discription: "Manage your remineders",
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full gap-5">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            icon={d.icon}
            title={d.title}
            discription={d.discription}
          />
        ))}
      </section>
    </div>
  );
}
