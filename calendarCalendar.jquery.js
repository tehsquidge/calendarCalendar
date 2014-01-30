
;(function ( $, window, document, undefined ) {

    var d1 = new Date(), d2 = new Date(), pluginName = "calendarCalendar",
        defaults = {
            containerName: "calendarCalendar",
            titleDays: ['Su','Mo','Tu','We','Th','Fr','Sa'],
            shortDays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            longDays: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            shortMonths: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            longMonths: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            startCalendarTitle: 'Arrive On',
            endCalendarTitle: 'Depart On',
			startDateId: "calendar-start-date",
			endDateId: "calendar-end-date",
            startDate: d1,
            endDate: new Date(d2.setDate(d1.getDate()+1)),
            minDate: null,
            maxDate: null,
            onDateChange: function(startDate, endDate, shortDays, longDays, shortMonths, longMonths){ },
            calculatePosition: function(element, _self){ return _self.calculatePosition(element); },
            showPaddingDates: false
        };

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {

            var _self = this;

            _self.open = false;
            
            _self.container = $('#'+_self.options.containerName);

            if(_self.container.length == 0){
                _self.container = $('<div>', { id: _self.options.containerName });
                $('body').append(_self.container);
                _self.container = $('#'+_self.options.containerName);
            }
            _self.container.hide();
            $(_self.element).click( function(){ _self.drawCalendars(_self); } );

            if(_self.options.startDateId == _self.options.endDateId)
            	_self.options.endDateId += "2";
            if(_self.options.maxDate < _self.options.minDate ){
            	_self.options.maxDate = null;
            	_self.options.maxDate = null;
            }
            _self.dateUpdate(_self);

            $(window).bind("resize", { "_self": _self }, _self.resize);

        },

        closeCalendar: function(event){
        	var _self = event.data._self;
            _self.open = false;
        	_self.container.hide();
            _self.container.html("");
        },


        resize: function(event){
            var _self = event.data._self;
            if(_self.open){
                _self.drawCalendars(_self);
            }
        },

        drawCalendars: function(_self) {
        	//this may not be overly efficient but it seems to be a negligable performance hit
            _self.open = true;
            _self.container.show();
            var exitDiv = $('<div>', { "class": "background" });
            exitDiv.bind("click",{ _self: _self }, _self.closeCalendar);
            var firstCal = _self.generateCalendar(_self, _self.options.startDate, _self.options.startDateId, _self.options.startCalendarTitle);
            var secondCal = _self.generateCalendar(_self, _self.options.endDate, _self.options.endDateId, _self.options.endCalendarTitle);
            var calendars = $('<div>', { "class": "calendars" } ).html(firstCal).append(secondCal);
            calendars.offset(_self.options.calculatePosition($(_self.element),_self));
            _self.container.html(exitDiv).append(calendars);
        },  

        calculatePosition: function(element) {
            var offset = element.offset();
            return {top: offset.top + element.outerHeight(), left: offset.left + element.outerWidth()};
        },

        generateCalendar: function(_self, date, id, title) {

            var calendarMarkup = $('<div>', { id:id, "class": "calendar"});
                var calendarHeader = $('<div>', { "class": "calendar-header" });
                    var calendarHeaderLeftArrow = $('<div>', { "class": "calendar-arrow left" });
                    var calendarHeaderTitle = $('<div>', { "class": "calendar-title" });
                        var calendarHeaderTitleCaption = $('<div>', { "class": "calendar-caption" }).html(title);
                        var calendarHeaderTitleDate = $('<div>', { "class": "calendar-date" }).html(_self.options.longMonths[date.getMonth()] + " " + date.getFullYear());
                    var calendarHeaderRightArrow = $('<div>', { "class": "calendar-arrow right" });
            	var calendarMain = $('<div>', { "class": "caldendar-main" });
            		var calendarDays = $('<div>', { "class": "calendar-days calendar-table"});
            		var calendarDates = $('<div>', { "class": "calendar-dates calendar-table"});
            //create header
            calendarHeaderLeftArrow.bind( "click", { _self: _self, date: date, month: date.getMonth() - 1  }, _self.monthClickEvent );
            calendarHeaderRightArrow.bind( "click", { _self: _self, date: date, month: date.getMonth() + 1  }, _self.monthClickEvent );

            calendarHeader.append(calendarHeaderLeftArrow);
            	calendarHeaderTitle.append(calendarHeaderTitleCaption);
            	calendarHeaderTitle.append(calendarHeaderTitleDate);
            calendarHeader.append(calendarHeaderTitle);
            calendarHeader.append(calendarHeaderRightArrow);

            calendarMarkup.append(calendarHeader);

            //generate day headings
            for(var i = 0; i<7; i++){
            	calendarDays.append($('<div>', { "class": "calendar-cell" }).html(_self.options.titleDays[i]));
            }

            var daysInMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
            var dayOffset = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

            //generate padding days
            for(var i = dayOffset; i>0; i--){
            	var content;
            	if(_self.options.showPaddingDates){
            		var paddingDate = new Date(date.getFullYear(), date.getMonth(),1);
            		paddingDate.setDate(paddingDate.getDate()-i);
            		content = paddingDate.getDate();
            	}else{
            		content = "&nbsp;"
            	}
            	calendarDates.append($('<div>', { "class": "calendar-cell disabled padding" }).html(content));
            }

            //generate days
            for(var i = 1; i<=daysInMonth; i++){
            	var thisDate = new Date(date.valueOf());
            	thisDate.setDate(i);
            	
            	var classes = "calendar-cell";
            	if( (id == _self.options.endDateId && thisDate <= _self.options.startDate) ||
                    (thisDate < _self.options.minDate && _self.options.minDate instanceof Date  ) ||
                    thisDate > _self.options.maxDate && _self.options.maxDate instanceof Date  )
            		classes += " disabled";
            	else
            		classes += " active";
            	if( i == date.getDate())
            		classes += " selected";
            	var day = $('<div>', { "class": classes }).html(i);
            	if( (classes.indexOf('disabled') == -1) )
	            	day.bind( "click", { _self: _self, date: date, day: i  }, _self.dayClickEvent );
            	calendarDates.append(day);
            }
            //arse end paddings
            for(var i = 1; i <= 42 - (dayOffset+daysInMonth); i++){
            	var content;
            	if(_self.options.showPaddingDates){
            		var paddingDate = new Date(date.getFullYear(), date.getMonth(),daysInMonth);
            		paddingDate.setDate(paddingDate.getDate()+i);
            		content = paddingDate.getDate();
            	}else{
            		content = "&nbsp;"
            	}
            	calendarDates.append($('<div>', { "class": "calendar-cell disabled padding" }).html(content));
            }

            calendarMain.append(calendarDays);
            calendarMain.append(calendarDates);

            calendarMarkup.append(calendarMain);

            return calendarMarkup;
        },

        dayClickEvent: function(event){
        	var _self = event.data._self;
        	event.data.date.setDate(event.data.day);
        	_self.dateUpdate(_self);
        	_self.drawCalendars(_self);
        },

        monthClickEvent: function(event){
        	var _self = event.data._self;
        	event.data.date.setMonth(event.data.month);
        	_self.dateUpdate(_self);
        	_self.drawCalendars(_self);
        },

        dateUpdate: function(_self){
        	if(_self.options.minDate instanceof Date && +_self.options.minDate > +_self.options.startDate){
        		_self.options.startDate = new Date(_self.options.minDate.valueOf());
        	}
        	if(_self.options.maxDate instanceof Date && +_self.options.maxDate < +_self.options.endDate){
        		_self.options.endDate = new Date(_self.options.maxDate.valueOf());
        	}
        	if(+_self.options.endDate <= +_self.options.startDate){
        		_self.options.endDate = new Date(_self.options.startDate.valueOf());
        		_self.options.endDate.setDate(_self.options.endDate.getDate()+1);
        	}

        	_self.options.onDateChange(_self.options.startDate, _self.options.endDate, _self.options.shortDays, _self.options.longDays, _self.options.shortMonths, _self.options.longMonths );
        }      
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                var plugin = new Plugin( this, options );
                $.data(this, "plugin_" + pluginName,
                plugin);
            }
        });
    };

})( jQuery, window, document );