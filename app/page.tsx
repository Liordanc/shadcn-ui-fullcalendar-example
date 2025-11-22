import AvailabilityChecker from "@/components/availability-checker";
import Calendar from "@/components/calendar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventsProvider } from "@/context/events-context";

export default function Home() {
  return (
    <EventsProvider>
      <div className="py-4">
        <Tabs
          defaultValue="calendar"
          className="flex flex-col w-full items-center"
        >
          <TabsList className="flex justify-center mb-2">
            <TabsTrigger value="calendar">יומן</TabsTrigger>
            <TabsTrigger value="schedulingAssistant">
              עוזר תזמון
            </TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="w-full px-5 space-y-5">
            <div className="space-y-0">
              <h2 className="flex items-center text-2xl font-semibold tracking-tight md:text-3xl">
                יומן
              </h2>
              <p className="text-xs md:text-sm font-medium">
                רכיב יומן גמיש עם יכולת גרירה ושחרור, נבנה באמצעות FullCalendar ו-shadcn/ui.
              </p>
            </div>

            <Separator />
            <Calendar />
          </TabsContent>
          <TabsContent
            value="schedulingAssistant"
            className="w-full px-5 space-y-5"
          >
            <div className="space-y-0">
              <h2 className="flex items-center text-2xl font-semibold tracking-tight md:text-3xl">
                עוזר תזמון
              </h2>
              <p className="text-xs md:text-sm font-medium">
                עוזר תזמון שנבנה לניתוח לוח הזמנים של המשתמש ולהצגה אוטומטית של זמנים פנויים.
              </p>
            </div>
            <Separator />
            <AvailabilityChecker />
          </TabsContent>
        </Tabs>
      </div>
    </EventsProvider>
  );
}
