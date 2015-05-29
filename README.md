calendarCalendar
================

A date range picker. In Development. Dual calendars that let you select a start and end date.

In memory of Brian Beadie - The corporate world is too much for some.


Example Usage
================


You will need to define a callback to get the dates out:

```
$('#trigger').calendarCalendar({
	onDateChange: function(startDate, endDate,  lexicon){
		$('#dualStartDate').val(lexicon.longDays[startDate.getDay()] +" "+ startDate.getDate() +" "+lexicon.longMonths[startDate.getMonth()]+" "+startDate.getFullYear());
					$('#dualEndDate').val(lexicon.longDays[endDate.getDay()] +" "+ endDate.getDate() +" "+lexicon.longMonths[endDate.getMonth()]+" "+endDate.getFullYear());
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
| containerName      | Name of the div which raps the calendars.                                                | 'calendarCalendar'                                                                                                |
| lexicon          | Days headings for the top of the calendar. Accepts an array.                               | lexicon JSON Object. See below                                                                                                             |
| startDateId        | ID if the first calendar element                                                         | 'calendar-start-date'                                                                                             |
| endDateId          | ID if the second calendar element                                                        | 'calendar-end-date'                                                                                               |
| startDate          | date of the first calendar. Accepts Date Object.                                         | today's date as a Date Object (the date the calendar is initiated)                                                               |
| endDate            | date of the second calendar. Accepts Date Object.                                        | tomorrow's date as a Date Object (one day after the calendar is initiated)                                                       |
| minDate            | Minimum possible date for the startDate. endDate can be +1 to this. Accepts Date Object. | ```null```                                                                                                            |
| maxDate            | Maximum possible date for endDate. startDate can be -1 to this. Accepts Date Object.     | ```null```                                                                                                            |
| onDateChange       | triggers when a date is changed. Accepts a function.                                     | ```function(startDate, endDate, lexicon){ } ```                                  |
| calculatePosition  | triggers when showing the calendar. Accepts Function.                                    | ```function(element) { }``` default positioning is the the top left of the triggering element               |
| showPaddingDates   | show the preceding and trailing days from the surrounding months. Accepts boolean.       | ```false```                                                                                                           |
| calendarMode       | accepts "single" or "range". Single is a single calendar. Range is two.                  |     'range'                                                                                                       |
| showBackground | Whether to show the masking background which you can click to exit | ```true``` |
| showCloseButton | Whether to show a close button | ```false``` |
| closeButtonContent | The content of the close button | 'x' |
| closeOnDateSelect | If this is selected the calendar will close once the dates are selected. The 'range' mode closes when the second date is selected, never on the first | ```false``` |
| initializeDateChange | If true, runs the onDateChange callback on initilize. | ```true``` |

Overwriting Options
===================

If you need to overwrite an option after the plugin has been initialised simply recall the calendarCalendar and it will update only the options you pass in.


Lexicon
========


For translations use the lexicon use the ```lexicon``` option and pass in a lexicon JSON object. This is an example of the default lexicon:

```

var lexicon = {
                titleDays: ['Su','Mo','Tu','We','Th','Fr','Sa'],
                shortDays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
                longDays: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                shortMonths: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                longMonths: ['January','February','March','April','May','June','July','August','September','October','November','December'],
                startCalendarTitle: 'Arrive On',
                endCalendarTitle: 'Depart On'
            }

$('#myCalendar').calendarCalendar({'lexicon': lexicon});

````

If you only need to change one part you only need to define that part:

```

var lexicon = {
                startCalendarTitle: 'Beginning',
                endCalendarTitle: 'End'
            }

$('#myCalendar').calendarCalendar({'lexicon': lexicon});

````