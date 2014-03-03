calendarCalendar
================

A date range picker. In Development. Dual calendars that let you select a start and end date.

In memory of Brian Beadie - The corporate world is too much for some.


Example Usage
================


You will need to define a callback to get the dates out:

```
$('#trigger').calendarCalendar({
	onDateChange: function(startDate, endDate,  shortDays, longDays, shortMonths, longMonths){
		$('#startDate').val(longDays[startDate.getDay()] +" "+ startDate.getDate() +" "+longMonths[startDate.getMonth()]+" "+startDate.getFullYear());
		$('#endDate').val(longDays[endDate.getDay()] +" "+ endDate.getDate() +" "+longMonths[endDate.getMonth()]+" "+endDate.getFullYear());
	}
});

```

custom offset:

```
$('#trigger').calendarCalendar({
				calculatePosition: function(element) {
					var offset = element.offset();
					return {top: offset.top, left: offset.left + element.outerWidth()};
				}
});
```

min and max dates:

```
$('#trigger').calendarCalendar({
				minDate: new Date();
				maxDate: new Date(2029,10,12);
});
```

options
==========

| Option             | Description                                                                              | Default                                                                                                         |
|--------------------|------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| ContainerName      | Name of the div which raps the calendars.                                                | calendarCalendar                                                                                                |
| titleDays          | Days headings for the top of the calendar. Accepts an array.                             | ['Su','Mo','Tu','We','Th','Fr','Sa']                                                                            |
| shortDays          | Short Day headings - for output. Accepts an Array.                                       | ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']                                                                     |
| longDays           | Long Day headings - for output. Accepts an Array.                                        | ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']                                        |
| shortMonths        | Short Month headings - for output. Accepts an Array.                                     | ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']                                       |
| longMonths         | Long Month headings - for output. Accepts an Array.                                      | ['January','February','March','April','May','June','July','August','September','October','November','December'] |
| startCalendarTitle | The Title of the first calendar.                                                         | Arrive On                                                                                                       |
| endCalendarTitle   | The Title of the first calendar.                                                         | Depart On                                                                                                       |
| startDateId        | ID if the first calendar element                                                         | calendar-start-date                                                                                             |
| endDateId          | ID if the second calendar element                                                        | calendar-end-date                                                                                               |
| startDate          | date of the first calendar. Accepts Date Object.                                         | today's date (the date the calendar is initiated)                                                               |
| endDate            | date of the second calendar. Accepts Date Object.                                        | tomorrow's date (one day after the calendar is initiated)                                                       |
| minDate            | Minimum possible date for the startDate. endDate can be +1 to this. Accepts Date Object. | null                                                                                                            |
| maxDate            | Maximum possible date for endDate. startDate can be -1 to this. Accepts Date Object.     | null                                                                                                            |
| onDateChange       | triggers when a date is changed. Accepts a function.                                     | function(startDate, endDate, shortDays, longDays, shortMonths, longMonths){ }                                   |
| calculatePosition  | triggers when showing the calendar. Accepts Function.                                    | function(element) { } /* default positioning is the the top left of the triggering element */                   |
| showPaddingDates   | show the preceding and trailing days from the surrounding months. Accepts boolean.       | false                                                                                                           |
| calendarMode       | accepts "single" or "range". Single is a single calendar. Range is two.                  |                                                                                                                 |