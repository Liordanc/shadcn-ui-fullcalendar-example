# Calendar Component API Reference

## Overview
The Calendar component is a wrapper around FullCalendar that provides a shadcn/ui-styled interface for displaying and managing events.

## Component Location
`components/calendar.tsx`

## Props

### CalendarProps

```typescript
interface CalendarProps {
  events?: EventInput[]
  initialView?: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek'
  headerToolbar?: ToolbarInput
  editable?: boolean
  selectable?: boolean
  selectMirror?: boolean
  dayMaxEvents?: boolean | number
  weekends?: boolean
  initialDate?: DateInput
  height?: string | number
  contentHeight?: string | number
  aspectRatio?: number
  nowIndicator?: boolean
  businessHours?: BusinessHoursInput
  eventClick?: (info: EventClickArg) => void
  eventDrop?: (info: EventDropArg) => void
  eventResize?: (info: EventResizeDoneArg) => void
  select?: (info: DateSelectArg) => void
  dateClick?: (info: DateClickArg) => void
  eventsSet?: (events: EventApi[]) => void
  datesSet?: (dateInfo: DatesSetArg) => void
  loading?: (isLoading: boolean) => void
}
```

### Event Object Structure

```typescript
interface EventInput {
  id?: string | number
  title: string
  start: DateInput
  end?: DateInput
  allDay?: boolean
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  classNames?: string[]
  editable?: boolean
  startEditable?: boolean
  durationEditable?: boolean
  extendedProps?: Record<string, any>
}
```

## Usage

### Basic Usage

```tsx
import { Calendar } from '@/components/calendar'

export default function MyCalendar() {
  const events = [
    {
      id: '1',
      title: 'Meeting',
      start: '2025-11-21T10:00:00',
      end: '2025-11-21T11:00:00',
    },
  ]

  return <Calendar events={events} />
}
```

### With Event Handlers

```tsx
import { Calendar } from '@/components/calendar'
import { useState } from 'react'

export default function MyCalendar() {
  const [events, setEvents] = useState([])

  const handleEventClick = (info) => {
    console.log('Event clicked:', info.event.title)
  }

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Enter event title:')
    if (title) {
      setEvents([...events, {
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      }])
    }
  }

  return (
    <Calendar
      events={events}
      selectable
      select={handleDateSelect}
      eventClick={handleEventClick}
    />
  )
}
```

### Custom View Configuration

```tsx
<Calendar
  events={events}
  initialView="timeGridWeek"
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  }}
  slotMinTime="08:00:00"
  slotMaxTime="20:00:00"
  nowIndicator
  weekends={false}
/>
```

## Event Callbacks

### eventClick
Fired when an event is clicked.

```typescript
eventClick?: (info: EventClickArg) => void

interface EventClickArg {
  event: EventApi
  el: HTMLElement
  jsEvent: MouseEvent
  view: ViewApi
}
```

### select
Fired when a date/time range is selected.

```typescript
select?: (info: DateSelectArg) => void

interface DateSelectArg {
  start: Date
  end: Date
  startStr: string
  endStr: string
  allDay: boolean
  view: ViewApi
}
```

### eventDrop
Fired when an event is dragged to a new time.

```typescript
eventDrop?: (info: EventDropArg) => void

interface EventDropArg {
  event: EventApi
  oldEvent: EventApi
  delta: Duration
  revert: () => void
}
```

### eventResize
Fired when an event is resized.

```typescript
eventResize?: (info: EventResizeDoneArg) => void

interface EventResizeDoneArg {
  event: EventApi
  prevEvent: EventApi
  startDelta: Duration
  endDelta: Duration
  revert: () => void
}
```

## Styling

The Calendar component uses CSS variables for theming:

```css
:root {
  --fc-border-color: hsl(var(--border))
  --fc-button-bg-color: hsl(var(--primary))
  --fc-button-border-color: hsl(var(--primary))
  --fc-button-hover-bg-color: hsl(var(--primary) / 0.9)
  --fc-button-active-bg-color: hsl(var(--primary) / 0.8)
  --fc-event-bg-color: hsl(var(--primary))
  --fc-event-border-color: hsl(var(--primary))
  --fc-today-bg-color: hsl(var(--accent))
}
```

## Event Methods

The EventApi object provides methods to manipulate events:

```typescript
// Get event properties
event.id
event.title
event.start
event.end
event.allDay

// Update event
event.setProp('title', 'New Title')
event.setStart(new Date())
event.setEnd(new Date())
event.setAllDay(true)

// Remove event
event.remove()
```

## Advanced Features

### Business Hours

```tsx
<Calendar
  events={events}
  businessHours={{
    daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
    startTime: '09:00',
    endTime: '17:00',
  }}
/>
```

### Recurring Events

```tsx
const events = [
  {
    title: 'Weekly Meeting',
    daysOfWeek: [1, 3], // Monday and Wednesday
    startTime: '10:00',
    endTime: '11:00',
  },
]
```

### Custom Event Content

```tsx
<Calendar
  events={events}
  eventContent={(eventInfo) => (
    <div className="custom-event">
      <strong>{eventInfo.timeText}</strong>
      <div>{eventInfo.event.title}</div>
    </div>
  )}
/>
```

## Performance Optimization

1. **Memoize event arrays**: Use `useMemo` for event arrays
2. **Debounce updates**: Use debouncing for frequent updates
3. **Lazy load events**: Load events on demand using `datesSet` callback

```tsx
const memoizedEvents = useMemo(() => events, [events])

const handleDatesSet = async (dateInfo) => {
  const newEvents = await fetchEvents(dateInfo.start, dateInfo.end)
  setEvents(newEvents)
}

<Calendar events={memoizedEvents} datesSet={handleDatesSet} />
```

## TypeScript Types

Import types from FullCalendar:

```typescript
import type {
  EventInput,
  EventApi,
  EventClickArg,
  DateSelectArg,
  EventDropArg,
  EventResizeDoneArg,
} from '@fullcalendar/core'
```

## Related Documentation

- [FullCalendar Official Docs](https://fullcalendar.io/docs)
- [TimePicker Integration](./time-picker-integration.md)
- [Event Management Guide](./event-management.md)