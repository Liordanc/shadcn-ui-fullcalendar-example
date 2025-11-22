"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { HexColorPicker } from "react-colorful";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DateTimePicker } from "./date-picker";
import { useEvents } from "@/context/events-context";
import { ToastAction } from "./ui/toast";
import { HOUR_CYCLE } from "@/lib/i18n-config";

const eventAddFormSchema = z.object({
  title: z
    .string({ required_error: "נא להזין כותרת." })
    .min(1, { message: "חובה לספק כותרת לאירוע זה." }),
  description: z
    .string({ required_error: "נא להזין תיאור." })
    .min(1, { message: "חובה לספק תיאור לאירוע זה." }),
  start: z.date({
    required_error: "נא לבחור שעת התחלה",
    invalid_type_error: "זה לא תאריך תקין!",
  }),
  end: z.date({
    required_error: "נא לבחור שעת סיום",
    invalid_type_error: "זה לא תאריך תקין!",
  }),
  color: z
    .string({ required_error: "נא לבחור צבע לאירוע." })
    .min(1, { message: "חובה לבחור צבע לאירוע זה." }),
});

type EventAddFormValues = z.infer<typeof eventAddFormSchema>;

interface AvailabilityCheckerEventAddFormProps {
  start: Date;
  end: Date;
}

export function AvailabilityCheckerEventAddForm({
  start,
  end,
}: AvailabilityCheckerEventAddFormProps) {
  const { events, addEvent } = useEvents();
  const {
    availabilityCheckerEventAddOpen,
    setAvailabilityCheckerEventAddOpen,
  } = useEvents();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof eventAddFormSchema>>({
    resolver: zodResolver(eventAddFormSchema),
  });

  useEffect(() => {
    form.reset({
      title: "",
      description: "",
      start: start,
      end: end,
      color: "#76c7ef",
    });
  }, [form, start, end]);

  async function onSubmit(data: EventAddFormValues) {
    const newEvent = {
      id: String(events.length + 1),
      title: data.title,
      description: data.description,
      start: data.start,
      end: data.end,
      color: data.color,
    };
    addEvent(newEvent);
    setAvailabilityCheckerEventAddOpen(false);
    toast({
      title: "אירוע נוסף!",
      action: (
        <ToastAction altText={"לחץ כאן לסגירת ההתראה"}>
          סגור
        </ToastAction>
      ),
    });
  }

  return (
    <AlertDialog open={availabilityCheckerEventAddOpen}>
      {/* <AlertDialogTrigger className="flex" asChild>
        <Card
          onClick={() => setAvailabilityCheckerEventAddOpen(true)}
          className="flex py-2 px-4 my-2 w-full bg-secondary hover:bg-secondary/80 cursor-pointer"
        >
          {start.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}
        </Card>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader dir="rtl">
          <AlertDialogTitle>הוספת אירוע</AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>כותרת</FormLabel>
                  <FormControl>
                    <Input placeholder="פגישת צוות יומית" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תיאור</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="מפגש יומי של הצוות"
                      className="max-h-36"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel htmlFor="datetime">התחלה</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      hourCycle={HOUR_CYCLE}
                      granularity="minute"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel htmlFor="datetime">סיום</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      hourCycle={HOUR_CYCLE}
                      granularity="minute"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>צבע</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild className="cursor-pointer">
                        <div className="flex flex-row w-full items-center space-x-2 pl-2">
                          <div
                            className={`w-5 h-5 rounded-full cursor-pointer`}
                            style={{ backgroundColor: field.value }}
                          ></div>
                          <Input {...field} />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="flex mx-auto items-center justify-center">
                        <HexColorPicker
                          className="flex"
                          color={field.value}
                          onChange={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className="pt-2">
              <AlertDialogCancel
                onClick={() => setAvailabilityCheckerEventAddOpen(false)}
              >
                ביטול
              </AlertDialogCancel>
              <AlertDialogAction type="submit">הוסף אירוע</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
