import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BellPlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useId, useState } from "react";
import { ClockIcon } from "lucide-react";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
type Props = {
  data: {
    id: string;
    type: string;
    reminderName: string;
    reminderDescription: string;
    reminderDateTime: Date;
  };
};
const formSchema = z.object({
  type: z.string().min(2, {
    message: "Select the type of your reminder.",
  }),
  reminderName: z.string().min(2, {
    message: "Please enter a name for your reminder.",
  }),
  reminderDescription: z.string().min(2, {
    message: "Please enter a description for your reminder.",
  }),
  reminderDateTime: z.date(),
});

export function AddReminder({ data }: Props) {
  const id = useId();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [initialData, setInitialData] = React.useState(data);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      reminderName: "",
      reminderDescription: "",
      type: "",
      reminderDateTime: new Date(),
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(date);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <BellPlus />
          {data?.id ? "Edit" : "Add"} Reminder
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl h-[80svh]">
        <DialogHeader>
          <DialogTitle>{data?.id ? "Edit" : "Add"} Reminder</DialogTitle>
          <DialogDescription>
            {data?.id ? "Edit" : "Add"} your medication, appointment, or any
            other reminder.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-8">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reminder Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Reminder" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="medication">
                              Medication
                            </SelectItem>
                            <SelectItem value="hydration">Hydration</SelectItem>
                            <SelectItem value="appoinment">
                              Appoinment
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reminderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reminder Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea id="description" className="col-span-3" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="reminderDateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          setDate={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
