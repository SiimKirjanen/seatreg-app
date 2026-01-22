import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Button, Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { translate } from '../../service/translation';

interface Props {
  calendarDate: Date;
  setCalendarDate: Function;
}

export function DateTimePicker({ calendarDate, setCalendarDate }: Props) {
  const [open, setOpen] = useState(false);

  const datePickerChange = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
    setOpen(false);
    setCalendarDate(date);
  };
  const selectedDate = () => {
    return calendarDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <View style={{ marginVertical: 12, flexDirection: 'row', alignItems: 'center', columnGap: 6 }}>
      <Text style={{ fontSize: 24, marginBottom: 6 }}>{selectedDate()}</Text>
      <Button onPress={() => setOpen(true)}>
        {translate('Change date', 'changeDateButton')} <Icon type="font-awesome" name="calendar" color="white" />
      </Button>
      {open && <DatePicker value={calendarDate} onChange={datePickerChange} />}
    </View>
  );
}
