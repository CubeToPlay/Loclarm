import { useThemeColor } from '@/hooks/useThemeColor';
import { Calendar, CalendarProps } from 'react-native-calendars';
import { ContextProp } from 'react-native-calendars/src/types';

export type ThemedCalendarProps = CalendarProps & ContextProp & {
    displayName?: string;
    propTypes?: any;
};

export function ThemedCalendar({ ...otherProps }: ThemedCalendarProps) {
  const monthTextColor = useThemeColor({}, 'monthTextColor');
  const calendarBackground = useThemeColor({}, 'calendarBackground');
  const textSectionTitleColor = useThemeColor({}, 'textSectionTitleColor');
  const selectedDayBackgroundColor = useThemeColor({}, 'selectedDayBackgroundColor');
  const selectedDayTextColor = useThemeColor({}, 'selectedDayTextColor');
  const todayTextColor = useThemeColor({}, 'todayTextColor');
  const dayTextColor = useThemeColor({}, 'dayTextColor');
  const textDisabledColor = useThemeColor({}, 'textDisabledColor');

  return <Calendar
            theme={{
                textDayHeaderFontWeight: "700",
                textDayFontWeight: "700",
                textMonthFontWeight: "800",
                monthTextColor: monthTextColor,
                calendarBackground: calendarBackground,
                textSectionTitleColor: textSectionTitleColor,
                selectedDayBackgroundColor: selectedDayBackgroundColor,
                selectedDayTextColor: selectedDayTextColor,
                todayTextColor: todayTextColor,
                dayTextColor: dayTextColor,
                textDisabledColor: textDisabledColor
            }}
            {...otherProps}
        />;
}
