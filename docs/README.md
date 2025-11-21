# shadcn/ui FullCalendar Integration Documentation

Welcome to the documentation for the shadcn/ui FullCalendar integration with TimePicker component.

## 📚 Table of Contents

1. [TimePicker Integration Guide](./time-picker-integration.md)
2. [Calendar Component API Reference](./calendar-component-api.md)
3. [Event Management Guide](./event-management.md)

## 🚀 Quick Start

This project demonstrates how to integrate FullCalendar with shadcn/ui components, including a custom TimePicker component for selecting event times.

### Installation

```bash
npm install @fullcalendar/core @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
npm install date-fns
```

### Basic Usage

```tsx
import { Calendar } from '@/components/calendar'
import { TimePicker } from '@/components/ui/time-picker'

export default function MyCalendarPage() {
  const [events, setEvents] = useState([])
  const [startTime, setStartTime] = useState<Date>()
  
  return (
    <div>
      <Calendar events={events} />
      <TimePicker date={startTime} setDate={setStartTime} />
    </div>
  )
}
```

## 📖 Documentation Guides

### [TimePicker Integration Guide](./time-picker-integration.md)

Learn how to integrate the TimePicker component with FullCalendar:
- Component structure and props
- Integration with event dialogs
- Combining date and time selection
- Usage examples and best practices
- Accessibility features

### [Calendar Component API Reference](./calendar-component-api.md)

Complete API documentation for the Calendar component:
- Props and configuration options
- Event object structure
- Event callbacks (click, drop, resize)
- Styling and theming
- Performance optimization
- TypeScript types

### [Event Management Guide](./event-management.md)

Comprehensive guide for managing calendar events:
- Creating events (dialog forms, click-to-create)
- Reading and displaying event details
- Updating events (drag-and-drop, resize, edit dialog)
- Deleting events with confirmation
- State management patterns
- Validation and persistence

## 🎨 Component Overview

### Calendar Component
**Location:** `components/calendar.tsx`

A wrapper around FullCalendar that provides:
- shadcn/ui theming integration
- TypeScript support
- Responsive design
- Customizable views (month, week, day)
- Event CRUD operations

### TimePicker Component
**Location:** `components/ui/time-picker.tsx`

A time selection component that provides:
- Hour, minute, second selection
- 24-hour format
- Keyboard navigation
- Accessibility support
- Integration with date pickers

## 🗂️ Project Structure

```
shadcn-ui-fullcalendar-example/
├── app/
│   └── page.tsx                  # Main calendar page
├── components/
│   ├── calendar.tsx              # FullCalendar wrapper
│   └── ui/
│       ├── time-picker.tsx       # TimePicker component
│       ├── time-picker-input.tsx # Time input field
│       └── ...                   # Other shadcn/ui components
├── utils/
│   ├── calendar-utils.tsx        # Calendar helper functions
│   ├── time-picker-utils.tsx     # Time picker utilities
│   └── data.ts                   # Sample event data
├── styles/
│   └── ...                       # Global styles
└── docs/
    ├── README.md                  # This file
    ├── time-picker-integration.md
    ├── calendar-component-api.md
    └── event-management.md
```

## 🎯 Key Features

- ✅ **FullCalendar Integration** - Complete integration with FullCalendar library
- ✅ **TimePicker Component** - Custom time picker with hours, minutes, seconds
- ✅ **shadcn/ui Theming** - Consistent styling with shadcn/ui design system
- ✅ **TypeScript Support** - Full TypeScript type definitions
- ✅ **Event Management** - Create, read, update, delete events
- ✅ **Drag and Drop** - Move and resize events intuitively
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Accessibility** - ARIA labels and keyboard navigation

## 🔧 Configuration

The calendar can be configured with various options:

```tsx
<Calendar
  events={events}
  initialView="timeGridWeek"
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  }}
  editable={true}
  selectable={true}
  eventClick={handleEventClick}
  select={handleDateSelect}
/>
```

See the [Calendar Component API Reference](./calendar-component-api.md) for all available options.

## 🎓 Examples

### Creating an Event

```tsx
const handleAddEvent = (newEvent) => {
  setEvents([...events, {
    id: String(Date.now()),
    ...newEvent
  }])
}
```

### Editing an Event

```tsx
const handleEventDrop = (info) => {
  setEvents(events.map(event => 
    event.id === info.event.id
      ? { ...event, start: info.event.start, end: info.event.end }
      : event
  ))
}
```

### Deleting an Event

```tsx
const handleDeleteEvent = (eventId) => {
  setEvents(events.filter(e => e.id !== eventId))
}
```

## 🤝 Contributing

Contributions are welcome! Please read the documentation and follow the existing code style.

## 📝 License

This project is part of the shadcn/ui ecosystem.

## 🔗 Related Links

- [FullCalendar Documentation](https://fullcalendar.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [date-fns Documentation](https://date-fns.org/docs)

## 💡 Tips and Best Practices

1. **State Management**: Use React Context or state management libraries for complex applications
2. **Performance**: Memoize event arrays and callbacks to prevent unnecessary re-renders
3. **Validation**: Always validate event data before creating or updating
4. **Error Handling**: Provide user-friendly error messages
5. **Accessibility**: Ensure keyboard navigation and screen reader support
6. **Persistence**: Save events to localStorage or a backend API

## 🐛 Troubleshooting

Common issues and solutions:

- **Events not displaying**: Check that event dates are in the correct format
- **TimePicker not updating**: Ensure both `date` and `setDate` props are provided
- **Styling issues**: Verify that CSS variables are properly defined
- **TypeScript errors**: Import types from `@fullcalendar/core`

For more detailed troubleshooting, see the individual guide pages.

---

**Last Updated**: November 2025
**Version**: 1.0.0