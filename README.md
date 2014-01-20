calendarCalendar
================

A date range picker. In Development. Dual calendars that let you select a start and end date.


Usage
================

```
$('#trigger').calendarCalendar();
```

using the dates:

```
$('#trigger').calendarCalendar({
  onDateChange: function(startDate, endDate, months){
    $('#startDate').val(startDate.getDate() +" "+months[startDate.getMonth()]+" "+startDate.getFullYear());
    $('#endDate').val(endDate.getDate() +" "+months[endDate.getMonth()]+" "+endDate.getFullYear());
  }
});
```

custom offset:

```
$('#trigger').calendarCalendar({
				calculateOffset: function(element) {
					var offset = element.offset();
					return {top: offset.top, left: offset.left + element.outerWidth()};
				}
});
```
