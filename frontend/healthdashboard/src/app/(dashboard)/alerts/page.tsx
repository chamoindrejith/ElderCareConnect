import { Card, CardHeader } from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";
import { TriangleAlert } from "lucide-react";
import React from "react";

type Props = {};

export default function Alerts({}: Props) {
  return (
    <div>
      <PageTitle title="Emergency Alerts" />
      <Card className="mt-8 bg-red-100 ">
        <CardHeader >
          <div className="flex w-full gap-2 items-center" >
          <TriangleAlert className="w-5 h-5 text-red-700 " />
          <h2 className="text-lg font-semibold">Emergency Alert</h2>
          </div>
          <p className="text-sm text-gray-600">Your adult's heart rate is too high. Please consult his doctor.</p>
        </CardHeader>
      </Card>
    </div>
  );
}
