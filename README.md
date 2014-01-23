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
