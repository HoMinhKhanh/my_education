import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Alert, Calendar } from 'antd';

const CalendarComponent = () => {

  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} fullscreen={false}/>
    </>
  );
};

export default CalendarComponent;