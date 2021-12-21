import { ChevronDownIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useColorModeValue, Menu, MenuButton, InputGroup, Input, InputRightElement, MenuList, Center, HStack, IconButton, VStack, Button, Heading, Box, Grid, Text } from '@chakra-ui/react';
import React, { useState, createRef } from 'react';
import dayjs from 'dayjs';

const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const getDayDetails = args => {
  const date = args.index - args.firstDay;
  const day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;

  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }

  const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);

  const _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;

  const month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  const timestamp = new Date(args.year, args.month, _date).getTime();
  return {
    date: _date,
    day,
    month,
    timestamp,
    dayString: daysMap[day]
  };
};
const getNumberOfDays = (year, month) => {
  return 40 - new Date(year, month, 40).getDate();
};
const getMonthDetails = (year, month) => {
  const firstDay = new Date(year, month).getDay();
  const numberOfDays = getNumberOfDays(year, month);
  const monthArray = [];
  const rows = 6;
  let currentDay = null;
  let index = 0;
  const cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
        year,
        month
      });
      monthArray.push(currentDay);
      index++;
    }
  }

  return monthArray;
};
const getMonthStr = month => monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

const oneDay = 60 * 60 * 24 * 1000;
const todayTimestamp = Date.now() - Date.now() % oneDay + new Date().getTimezoneOffset() * 1000 * 60;
const DatePicker = props => {
  const {
    onChange,
    dateFormat = 'DD/MM/YYYY',
    ...rest
  } = props;
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [monthDetails, setMonthDetails] = useState(getMonthDetails(year, month));
  const [selectedDay, setSelectedDay] = useState();
  const inputRef = createRef();
  const color = useColorModeValue('gray', 'white');

  const isCurrentDay = day => {
    return day.timestamp === todayTimestamp;
  };

  const isSelectedDay = day => {
    return day.timestamp === selectedDay;
  };

  const getDateStringFromTimestamp = timestamp => {
    const dateObject = new Date(timestamp);
    const month = dateObject.getMonth() + 1;
    const date = dateObject.getDate();
    return dayjs(dateObject.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date)).format(dateFormat);
  };

  const onDateClick = day => {
    setSelectedDay(day.timestamp);

    if (inputRef.current) {
      inputRef.current.value = getDateStringFromTimestamp(day.timestamp);
      onChange(inputRef.current.value);
    }
  };

  const setYearAction = offset => {
    setYear(year + offset);
    setMonthDetails(getMonthDetails(year + offset, month));
  };

  const setMonthAction = offset => {
    let _year = year;

    let _month = month + offset;

    if (_month === -1) {
      _month = 11;
      _year--;
    } else if (_month === 12) {
      _month = 0;
      _year++;
    }

    setYear(_year);
    setMonth(_month);
    setMonthDetails(getMonthDetails(_year, _month));
  };

  return React.createElement(Menu, Object.assign({}, rest), React.createElement(MenuButton, {
    w: '100%',
    type: 'button'
  }, React.createElement(InputGroup, null, React.createElement(Input, Object.assign({
    color: color,
    ref: inputRef
  }, rest)), React.createElement(InputRightElement, {
    children: React.createElement(ChevronDownIcon, {
      w: 5,
      h: 5
    })
  }))), React.createElement(MenuList, null, React.createElement(Center, {
    p: 3
  }, React.createElement(HStack, null, React.createElement(IconButton, {
    variant: 'ghost',
    "aria-label": 'datepicker left button',
    onClick: () => setYearAction(-1),
    icon: React.createElement(ArrowLeftIcon, {
      color: color
    })
  }), React.createElement(IconButton, {
    variant: 'ghost',
    "aria-label": 'datepicker left button',
    onClick: () => setMonthAction(-1),
    icon: React.createElement(ChevronLeftIcon, {
      color: color
    })
  }), React.createElement(VStack, {
    align: 'center'
  }, React.createElement(Button, {
    variant: 'ghost',
    size: 'none'
  }, React.createElement(Heading, {
    color: color,
    m: 0,
    fontWeight: 200,
    as: 'h5'
  }, year)), React.createElement(Button, {
    variant: 'ghost',
    size: 'none',
    py: '0px',
    color: color,
    margin: '0px !important'
  }, getMonthStr(month).toUpperCase())), React.createElement(IconButton, {
    variant: 'ghost',
    "aria-label": 'datepicker right button',
    color: color,
    onClick: () => setMonthAction(1),
    icon: React.createElement(ChevronRightIcon, null)
  }), React.createElement(IconButton, {
    variant: 'ghost',
    "aria-label": 'datepicker right button',
    color: color,
    onClick: () => setYearAction(1),
    icon: React.createElement(ArrowRightIcon, null)
  }))), React.createElement(Box, {
    p: 3
  }, React.createElement(Grid, {
    align: 'center',
    templateColumns: 'repeat(7, 1fr)',
    gap: 3
  }, daysMap.map((d, i) => React.createElement(Text, {
    color: color,
    key: i,
    w: '100%'
  }, d.substring(0, 3).toLocaleUpperCase())))), React.createElement(Box, {
    p: 3
  }, React.createElement(Grid, {
    templateColumns: 'repeat(7, 1fr)',
    gap: 3
  }, monthDetails.map((day, index) => {
    return React.createElement(Button, {
      disabled: day.month !== 0,
      color: color,
      backgroundColor: isCurrentDay(day) ? 'gray.800' : isSelectedDay(day) && day.month === 0 ? 'gray.800' : '',
      variant: 'ghost',
      size: 'sm',
      key: index,
      onClick: () => onDateClick(day)
    }, day.date);
  })))));
};

export { DatePicker };
//# sourceMappingURL=index.modern.js.map
