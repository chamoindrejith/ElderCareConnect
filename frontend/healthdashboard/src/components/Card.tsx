import { cn } from "@/lib/utils";
import { LucideIcon, Section } from "lucide-react";
import React from "react";


type Props = {};

export type CardProps = {
  icon: LucideIcon;
  title: string;
  discription: string;
};

export default function Card(props: CardProps) {
  return (
    <CardContent>
      <section className="flex gap-2 items-center">
        <props.icon className="h-6 w-6 text-slate-700"/>
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-slate-900">{props.title}</h2>
        <p className="text-xs text-orange-950">{props.discription}</p>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}
