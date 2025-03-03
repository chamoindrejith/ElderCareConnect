import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Phone } from "lucide-react";

const contacts = [
  {
    contactName: "Caregiver 1",
    contactNumber: "1234567890",
  },
  {
    contactName: "Caregiver 2",
    contactNumber: "1234567890",
  },
  {
    contactName: "Caregiver 3",
    contactNumber: "1234567890",
  },
];

export default function Call() {
  return (
    <>
    <PageTitle title="Emergency? Call now!" />
    <Table className="mt-8">
      <TableHeader>
        <TableRow>
          <TableHead className="w-15">Contact Name</TableHead>
          <TableHead>Contact Number</TableHead>
          <TableHead >Call</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.contactName}>
            <TableCell className="font-medium">{contact.contactName}</TableCell>
            <TableCell>{contact.contactNumber}</TableCell>
            <TableCell >
                <Button variant="destructive" size="sm">
                <Phone size={35} color="#ffffff" strokeWidth={1.75} />
                </Button>
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
