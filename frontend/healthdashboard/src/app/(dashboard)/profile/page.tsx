import PageTitle from "@/components/PageTitle";
import Image from "next/image";

export default function Profile() {
  const name = "John Doe"; // Dummy data
  const photo = "/placeholder.jpg"; // Dummy image path
  const age = 65; // Dummy age
  const location = "New York, USA"; // Dummy location

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
