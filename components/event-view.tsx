import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CalendarEvent } from "@/utils/data";
import { EventDeleteForm } from "./event-delete-form";
import { EventEditForm } from "./event-edit-form";
import { useEvents } from "@/context/events-context";
import { X } from "lucide-react";
import { formatTime } from "@/lib/i18n-config";

interface EventViewProps {
  event?: CalendarEvent;
}

export function EventView({ event }: EventViewProps) {
  const { eventViewOpen, setEventViewOpen } = useEvents();

  return (
    <>
      <AlertDialog open={eventViewOpen}>
        <AlertDialogContent>
          <AlertDialogHeader dir="rtl">
            <AlertDialogTitle className="flex flex-row-reverse justify-between items-center">
              <h1>{event?.title}</h1>
              <AlertDialogCancel onClick={() => setEventViewOpen(false)}>
                <X className="h-5 w-5" />
              </AlertDialogCancel>
            </AlertDialogTitle>
            <table>
              <tr>
                <th>שעה:</th>
                <td>{event?.start && event?.end ? `${formatTime(event.start)} - ${formatTime(event.end)}` : "-"}</td>
              </tr>
              <tr>
                <th>תיאור:</th>
                <td>{event?.description}</td>
              </tr>
              <tr>
                <th>צבע:</th>
                <td>
                  <div
                    className="rounded-full w-5 h-5"
                    style={{ backgroundColor: event?.backgroundColor }}
                  ></div>
                </td>
              </tr>
            </table>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <EventDeleteForm id={event?.id} title={event?.title} />
            <EventEditForm
              oldEvent={event}
              event={event}
              isDrag={false}
              displayButton={true}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
