# Event Management Guide

## Overview
This guide covers how to create, read, update, and delete (CRUD) events in the FullCalendar component.

## Creating Events

### Method 1: Using Dialog with Form

Create a dialog component for adding new events:

```tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { TimePicker } from '@/components/ui/time-picker'

function AddEventDialog({ open, onClose, onAdd }) {
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState<Date>()
  const [endTime, setEndTime] = useState<Date>()
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    onAdd({
      title,
      start: startTime,
      end: endTime,
      extendedProps: { description }
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Event Title</Label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </div>
          <div>
            <Label>Start Time</Label>
            <TimePicker date={startTime} setDate={setStartTime} />
          </div>
          <div>
            <Label>End Time</Label>
            <TimePicker date={endTime} setDate={setEndTime} />
          </div>
          <div>
            <Label>Description</Label>
            <Input 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <Button onClick={handleSubmit}>Add Event</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

### Method 2: Click and Select

Allow users to create events by selecting time ranges:

```tsx
const handleDateSelect = (selectInfo: DateSelectArg) => {
  const title = prompt('Enter event title:')
  
  if (title) {
    const newEvent = {
      id: String(Date.now()),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    }
    
    setEvents([...events, newEvent])
  }
}

<Calendar
  events={events}
  selectable
  select={handleDateSelect}
/>
```

## Reading Events

### Display Event Details

Show event information when clicked:

```tsx
function EventDetailsDialog({ event, open, onClose }) {
  if (!event) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <strong>Start:</strong> {event.start?.toLocaleString()}
          </div>
          <div>
            <strong>End:</strong> {event.end?.toLocaleString()}
          </div>
          {event.extendedProps?.description && (
            <div>
              <strong>Description:</strong> 
              <p>{event.extendedProps.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const handleEventClick = (info: EventClickArg) => {
  setSelectedEvent(info.event)
  setShowDetails(true)
}

<Calendar
  events={events}
  eventClick={handleEventClick}
/>
```

### Filter Events

```tsx
const filterEvents = (searchTerm: string) => {
  return events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

const [filteredEvents, setFilteredEvents] = useState(events)
const [searchTerm, setSearchTerm] = useState('')

useEffect(() => {
  setFilteredEvents(filterEvents(searchTerm))
}, [searchTerm, events])
```

## Updating Events

### Drag and Drop

Allow users to move events by dragging:

```tsx
const handleEventDrop = (info: EventDropArg) => {
  const updatedEvents = events.map(event => {
    if (event.id === info.event.id) {
      return {
        ...event,
        start: info.event.start,
        end: info.event.end,
      }
    }
    return event
  })
  
  setEvents(updatedEvents)
}

<Calendar
  events={events}
  editable
  eventDrop={handleEventDrop}
/>
```

### Resize Events

Allow users to change event duration:

```tsx
const handleEventResize = (info: EventResizeDoneArg) => {
  const updatedEvents = events.map(event => {
    if (event.id === info.event.id) {
      return {
        ...event,
        start: info.event.start,
        end: info.event.end,
      }
    }
    return event
  })
  
  setEvents(updatedEvents)
}

<Calendar
  events={events}
  editable
  eventResize={handleEventResize}
/>
```

### Edit Dialog

```tsx
function EditEventDialog({ event, open, onClose, onSave }) {
  const [title, setTitle] = useState(event?.title || '')
  const [startTime, setStartTime] = useState(event?.start)
  const [endTime, setEndTime] = useState(event?.end)

  const handleSave = () => {
    onSave({
      ...event,
      title,
      start: startTime,
      end: endTime,
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Event Title</Label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label>Start Time</Label>
            <TimePicker date={startTime} setDate={setStartTime} />
          </div>
          <div>
            <Label>End Time</Label>
            <TimePicker date={endTime} setDate={setEndTime} />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

## Deleting Events

### Delete Button in Event Details

```tsx
function EventDetailsDialog({ event, open, onClose, onDelete }) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id)
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {/* Event details */}
        </div>
        <Button 
          variant="destructive" 
          onClick={handleDelete}
        >
          Delete Event
        </Button>
      </DialogContent>
    </Dialog>
  )
}

const handleDeleteEvent = (eventId: string) => {
  setEvents(events.filter(e => e.id !== eventId))
}
```

## State Management

### Using React State

```tsx
const [events, setEvents] = useState<EventInput[]>([])

const addEvent = (newEvent: EventInput) => {
  setEvents([...events, { ...newEvent, id: String(Date.now()) }])
}

const updateEvent = (updatedEvent: EventInput) => {
  setEvents(events.map(e => 
    e.id === updatedEvent.id ? updatedEvent : e
  ))
}

const deleteEvent = (eventId: string) => {
  setEvents(events.filter(e => e.id !== eventId))
}
```

### Using Context API

```tsx
interface EventsContextType {
  events: EventInput[]
  addEvent: (event: EventInput) => void
  updateEvent: (event: EventInput) => void
  deleteEvent: (id: string) => void
}

const EventsContext = createContext<EventsContextType>(null!)

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<EventInput[]>([])

  const addEvent = (newEvent: EventInput) => {
    setEvents([...events, { ...newEvent, id: String(Date.now()) }])
  }

  const updateEvent = (updatedEvent: EventInput) => {
    setEvents(events.map(e => 
      e.id === updatedEvent.id ? updatedEvent : e
    ))
  }

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId))
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  )
}

export const useEvents = () => useContext(EventsContext)
```

## Validation

### Basic Validation

```tsx
const validateEvent = (event: EventInput): string[] => {
  const errors: string[] = []

  if (!event.title || event.title.trim() === '') {
    errors.push('Title is required')
  }

  if (!event.start) {
    errors.push('Start time is required')
  }

  if (event.end && event.start && event.end < event.start) {
    errors.push('End time must be after start time')
  }

  return errors
}

const handleAddEvent = (newEvent: EventInput) => {
  const errors = validateEvent(newEvent)
  
  if (errors.length > 0) {
    alert(errors.join('\n'))
    return
  }

  addEvent(newEvent)
}
```

## Persistence

### Save to LocalStorage

```tsx
useEffect(() => {
  localStorage.setItem('calendar-events', JSON.stringify(events))
}, [events])

useEffect(() => {
  const saved = localStorage.getItem('calendar-events')
  if (saved) {
    setEvents(JSON.parse(saved))
  }
}, [])
```

### Save to API

```tsx
const saveEventToAPI = async (event: EventInput) => {
  try {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
    
    if (!response.ok) throw new Error('Failed to save event')
    
    const savedEvent = await response.json()
    return savedEvent
  } catch (error) {
    console.error('Error saving event:', error)
    throw error
  }
}
```

## Best Practices

1. **Always validate input** before creating/updating events
2. **Provide visual feedback** for user actions
3. **Confirm destructive actions** like deletions
4. **Handle errors gracefully** with user-friendly messages
5. **Optimize performance** with proper memoization
6. **Keep event state consistent** across components

## Related Documentation

- [Calendar Component API](./calendar-component-api.md)
- [TimePicker Integration](./time-picker-integration.md)