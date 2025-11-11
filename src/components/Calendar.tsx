import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { TrainingWithCustomer, CalendarEvent } from "../types";
import { fetchTrainingsWithCustomer } from "../trainingapi";
import dayjs from "dayjs";

function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchTrainingsWithCustomer()
      .then((data) => {
       
        const calendarEvents: CalendarEvent[] = data.map((training: TrainingWithCustomer) => {
          
            const startDate = dayjs(training.date);
            
            const endDate = startDate.add(training.duration, "minute");

            return {
                id: training.id.toString(),
                title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
                start: startDate.toISOString(),
                end: endDate.toISOString(),
            };
        });

        setEvents(calendarEvents);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Training Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        height="auto"
        eventColor="#19d2adff"
      
      />
    </div>
  );
}

export default Calendar;