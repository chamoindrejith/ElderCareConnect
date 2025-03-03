import PageTitle from "@/components/PageTitle";
import React from "react";

type Props = {
  id: string;
  name: string;
  age: number;
  location: string;
  photo: string;
};

export default function Profile(props: Props) {
  return (
    <div className="flex flex-col items-center p-3 rounded-md">
      <PageTitle title="{props.name}" />
      <div className="user-profile">
        <div className="rounded-full w-28 h-28 overflow-hidden bg-slate-400 m-5">
          <img src={props.photo} alt="User Photo" />
        </div>
        <div className="text-xl">{props.name}</div>
        <div className="user-details">
          <p>Age: {props.age}</p>
          <p>Location: {props.location}</p>
        </div>
      </div>
    </div>
  );
}
