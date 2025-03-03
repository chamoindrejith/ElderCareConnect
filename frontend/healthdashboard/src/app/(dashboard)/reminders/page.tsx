"use client";
import { Card } from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";
import { BellPlus, BellRing } from "lucide-react";
import React from "react";
import { AddReminder } from "./component/addReminder";
import { CardContent, CardHeader } from "@/components/ui/card";

type Props = {};

export default function Reminders({}: Props) {
  const data = [
    {
      id: "1",
      type: "Medication",
      reminderName: "Take your medication",
      reminderDescription: "Take your medication",
      reminderTime: "5.00 PM",
      reminderDate: "2025 - 03 - 05",
    },
    {
      id: "2",
      type: "Appointment",
      reminderName: "Doctor's Appointment",
      reminderDescription: "Doctor's Appointment",
      reminderTime: "5.00 PM",
      reminderDate: "2025 - 03 - 05",
    },
  ];
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Reminders" />
        <AddReminder data={{
          id: "",
          type: "",
          reminderName: "",
          reminderDescription: "",
          reminderTime: "",
          reminderDate: ""
        }} />
      </div>

      <div className="mt-8">
        {data.map((item) => {
          return (
            <Card key={item.id} className="mt-8 bg-orange-100 ">
              <CardHeader>
                <div className="flex justify-between">
                  <div className="flex w-full gap-2 items-center">
                    <BellRing className="w-5 h-5 text-orange-700 " />
                    <h2 className="text-lg font-semibold">{item.type} | {item.reminderName}</h2>
                  </div>
                  <AddReminder data={item} />
                </div>

                <h2 className="text-sm font-semibold">
                  {item.reminderDate} | {item.reminderTime}
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {item.reminderDescription}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
