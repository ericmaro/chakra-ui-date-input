import { ChevronDownIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useColorModeValue, Menu, MenuButton, InputGroup, Input, InputRightElement, MenuList, Center, HStack, IconButton, VStack, Button, Heading, Box, Grid, Text } from '@chakra-ui/react';
import React, { useState, createRef } from 'react';
import dayjs from 'dayjs';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var getDayDetails = function getDayDetails(args) {
  var date = args.index - args.firstDay;
  var day = args.index % 7;
  var prevMonth = args.month - 1;
  var prevYear = args.year;

  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }

  var prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);

  var _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;

  var month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  var timestamp = new Date(args.year, args.month, _date).getTime();
  return {
    date: _date,
    day: day,
    month: month,
    timestamp: timestamp,
    dayString: daysMap[day]
  };
};
var getNumberOfDays = function getNumberOfDays(year, month) {
  return 40 - new Date(year, month, 40).getDate();
};
var getMonthDetails = function getMonthDetails(year, month) {
  var firstDay = new Date(year, month).getDay();
  var numberOfDays = getNumberOfDays(year, month);
  var monthArray = [];
  var rows = 6;
  var currentDay = null;
  var index = 0;
  var cols = 7;

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index: index,
        numberOfDays: numberOfDays,
        firstDay: firstDay,
        year: year,
        month: month
      });
      monthArray.push(currentDay);
      index++;
    }
  }

  return monthArray;
};
var getMonthStr = function getMonthStr(month) {
  return monthMap[Math.max(Math.min(11, month), 0)] || 'Month';
};

var _excluded = ["onChange", "dateFormat"];
var oneDay = 60 * 60 * 24 * 1000;
var todayTimestamp = Date.now() - Date.now() % oneDay + new Date().getTimezoneOffset() * 1000 * 60;
var DatePicker = function DatePicker(props) {
  var onChange = props.onChange,
      _props$dateFormat = props.dateFormat,
      dateFormat = _props$dateFormat === void 0 ? 'DD/MM/YYYY' : _props$dateFormat,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  var date = new Date();

  var _useState = useState(date.getFullYear()),
      year = _useState[0],
      setYear = _useState[1];

  var _useState2 = useState(date.getMonth()),
      month = _useState2[0],
      setMonth = _useState2[1];

  var _useState3 = useState(getMonthDetails(year, month)),
      monthDetails = _useState3[0],
      setMonthDetails = _useState3[1];

  var _useState4 = useState(),
      selectedDay = _useState4[0],
      setSelectedDay = _useState4[1];

  var inputRef = createRef();
  var color = useColorModeValue('gray', 'white');

  var isCurrentDay = function isCurrentDay(day) {
    return day.timestamp === todayTimestamp;
  };

  var isSelectedDay = function isSelectedDay(day) {
    return day.timestamp === selectedDay;
  };

  var getDateStringFromTimestamp = function getDateStringFromTimestamp(timestamp) {
    var dateObject = new Date(timestamp);
    var month = dateObject.getMonth() + 1;
    var date = dateObject.getDate();
    return dayjs(dateObject.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date)).format(dateFormat);
  };

  var onDateClick = function onDateClick(day) {
    setSelectedDay(day.timestamp);

    if (inputRef.current) {
      inputRef.current.value = getDateStringFromTimestamp(day.timestamp);
      onChange(inputRef.current.value);
    }
  };

  var setYearAction = function setYearAction(offset) {
    setYear(year + offset);
    setMonthDetails(getMonthDetails(year + offset, month));
  };

  var setMonthAction = function setMonthAction(offset) {
    var _year = year;

    var _month = month + offset;

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
    onClick: function onClick() {
      return setYearAction(-1);
    },
    icon: React.createElement(ArrowLeftIcon, {
      color: color
    })
  }), React.createElement(IconButton, {
    variant: 'ghost',
    "aria-label": 'datepicker left button',
    onClick: function onClick() {
      return setMonthAction(-1);
    },
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
    onClick: function onClick() {
      return setMonthAction(1);
    },
    icon: React.createElement(ChevronRightIcon, null)
  }), React.createElement(IconButton, {
    variant: 'ghost',
    "aria-label": 'datepicker right button',
    color: color,
    onClick: function onClick() {
      return setYearAction(1);
    },
    icon: React.createElement(ArrowRightIcon, null)
  }))), React.createElement(Box, {
    p: 3
  }, React.createElement(Grid, {
    align: 'center',
    templateColumns: 'repeat(7, 1fr)',
    gap: 3
  }, daysMap.map(function (d, i) {
    return React.createElement(Text, {
      color: color,
      key: i,
      w: '100%'
    }, d.substring(0, 3).toLocaleUpperCase());
  }))), React.createElement(Box, {
    p: 3
  }, React.createElement(Grid, {
    templateColumns: 'repeat(7, 1fr)',
    gap: 3
  }, monthDetails.map(function (day, index) {
    return React.createElement(Button, {
      disabled: day.month !== 0,
      color: color,
      backgroundColor: isCurrentDay(day) ? 'gray.800' : isSelectedDay(day) && day.month === 0 ? 'gray.800' : '',
      variant: 'ghost',
      size: 'sm',
      key: index,
      onClick: function onClick() {
        return onDateClick(day);
      }
    }, day.date);
  })))));
};

export { DatePicker };
//# sourceMappingURL=index.modern.js.map
