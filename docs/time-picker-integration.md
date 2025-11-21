# TimePicker Integration Guide

## Overview
This guide explains how to integrate the TimePicker component with FullCalendar in the shadcn/ui ecosystem.

## Component Structure

### TimePicker Component
Location: `components/ui/time-picker.tsx`

The TimePicker component provides an intuitive interface for selecting time with hours, minutes, and seconds.

#### Props
- `date`: Date | undefined - The selected date/time
- `setDate`: (date: Date | undefined) => void - Callback function to update the date

#### Features
- Hour selection (00-23)
- Minute selection (00-59)
- Second selection (00-59)
- Keyboard navigation support
- Accessibility compliant

## Integration with FullCalendar

### Event Dialog Integration

The TimePicker is integrated into the event creation/editing dialog alongside FullCalendar.

#### Implementation Steps

1. **Import the TimePicker**
```tsx
import { TimePicker } from '@/components/ui/time-picker'
```

2. **Add Time State Management**
```tsx
const [startTime, setStartTime] = useState<Date | undefined>()
const [endTime, setEndTime] = useState<Date | undefined>()
```

3. **Render TimePicker in Dialog**
```tsx
<div className="space-y-4">
  <div>
    <Label>Start Time</Label>
    <TimePicker date={startTime} setDate={setStartTime} />
  </div>
  <div>
    <Label>End Time</Label>
    <TimePicker date={endTime} setDate={setEndTime} />
  </div>
</div>
```

4. **Combine Date and Time**
```tsx
const combineDateTime = (date: Date, time: Date | undefined) => {
  if (!time) return date
  const combined = new Date(date)
  combined.setHours(time.getHours())
  combined.setMinutes(time.getMinutes())
  combined.setSeconds(time.getSeconds())
  return combined
}
```

## Usage Example

```tsx
import { Calendar } from '@/components/calendar'
import { TimePicker } from '@/components/ui/time-picker'
import { useState } from 'react'

export default function SchedulePage() {
  const [events, setEvents] = useState([])
  const [startTime, setStartTime] = useState<Date>()
  const [endTime, setEndTime] = useState<Date>()

  const handleEventCreate = () => {
    const newEvent = {
      title: 'New Event',
      start: startTime,
      end: endTime,
    }
    setEvents([...events, newEvent])
  }

  return (
    <div className="container">
      <Calendar events={events} />
      <Dialog>
        <DialogContent>
          <div className="space-y-4">
            <TimePicker 
              date={startTime} 
              setDate={setStartTime} 
            />
            <TimePicker 
              date={endTime} 
              setDate={setEndTime} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

## Best Practices

1. **Time Validation**
   - Ensure end time is after start time
   - Validate time ranges
   - Handle timezone considerations

2. **User Experience**
   - Show clear labels for start/end times
   - Provide visual feedback for invalid selections
   - Allow quick time selection

3. **Accessibility**
   - Use proper ARIA labels
   - Support keyboard navigation
   - Provide screen reader announcements

## Related Components

- `components/ui/time-picker.tsx` - Main TimePicker component
- `components/ui/time-picker-input.tsx` - Individual time input field
- `utils/time-picker-utils.tsx` - Helper functions
- `components/calendar.tsx` - FullCalendar wrapper

## Troubleshooting

### Issue: Time not updating
**Solution**: Ensure you're passing both `date` and `setDate` props correctly

### Issue: Time format inconsistency
**Solution**: Use `format` function from date-fns for consistent formatting

### Issue: Timezone problems
**Solution**: Always work with UTC timestamps and convert to local time for display