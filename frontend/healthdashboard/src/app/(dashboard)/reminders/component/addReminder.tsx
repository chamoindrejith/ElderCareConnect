import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BellPlus, Calendar as CalendarIcon } from "lucide-react";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import { Textarea } from "@/components/ui/textarea"

type Props = {
    data: {
      id: string;
      type: string;
      reminderName: string;
      reminderDescription: string;
      reminderTime: string;
      reminderDate: string;
    };
  };

export function AddReminder( {data}: Props) {
  const [date, setDate] = React.useState<Date>();
  const [initialData, setInitialData] = React.useState(data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <BellPlus />
          {data?.id ? "Edit" : "Add"} Reminder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Reminder</DialogTitle>
          <DialogDescription>
            Add your medication, appointment, or any other reminder.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Reminder Type
            </Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Reminder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Medication</SelectItem>
                <SelectItem value="dark">Hydration</SelectItem>
                <SelectItem value="system">Appoinment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Reminder Name
            </Label>
            <Input id="name" className="col-span-3" value={data?.reminderName}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Textarea id="description" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Date
            </Label>
            <DatetimePicker
              format={[
                ["months", "days", "years"],
                ["hours", "minutes", "am/pm"],
              ]}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
