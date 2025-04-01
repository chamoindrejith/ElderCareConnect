import PageTitle from "@/components/PageTitle";
import Image from "next/image";

type Props = {
  name: string;
  age: number;
  location: string;
  photo: string;
};

export default function Profile({ name, age, location, photo }: Props) {
  return (
    <div className="flex flex-col items-center p-3 rounded-md">
      <PageTitle title={name} />
      <div className="user-profile">
        <div className="rounded-full w-28 h-28 overflow-hidden bg-slate-400 m-5">
          <Image src={photo} alt="User Photo" width={112} height={112} />
        </div>
        <div className="text-xl">{name}</div>
        <div className="user-details">
          <p>Age: {age}</p>
          <p>Location: {location}</p>
        </div>
      </div>
    </div>
  );
}
