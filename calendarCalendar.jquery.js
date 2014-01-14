
;(function ( $, window, document, undefined ) {

    var d1 = new Date(), d2 = new Date(), pluginName = "calendarCalendar",
        defaults = {
            containerName: "calendarCalendar",
            days: ['Su','Mo','Tu','We','Th','Fr','Sa'],
            months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            startCalendarTitle: 'Arrive On',
            endCalendarTitle: 'Depart On',
            startDate: d1,
            endDate: new Date(d2.setDate(d1.getDate()+1)),
            onDateChange: function(startDate, endDate){ }
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

            _self.container = $('#'+_self.options.containerName);

            if(_self.container.length == 0){
                _self.container = $('<div>', { id: _self.options.containerName });
                $('body').append(_self.container);
                _self.container = $('#'+_self.options.containerName);
            }
            console.log(_self.options.startDate);
            console.log(_self.options.endDate);
            _self.container.hide();
            $(_self.element).click( function(){ _self.drawCalendars(_self); } );

        },

        drawCalendars: function(_self) {
            _self.container.show();
            var firstCal = _self.generateCalendar(_self, _self.options.startDate, "calendar-start-date", _self.options.startCalendarTitle);
            var secondCal = _self.generateCalendar(_self, _self.options.endDate, "calendar-end-date", _self.options.endCalendarTitle);
            _self.container.html(firstCal).append(secondCal);
        },

        generateCalendar: function(_self, date, id, title) {

            var calendarMarkup = $('<div>', { id:id, class: "calendar"});
                var calendarHeader = $('<div>', { class: "calendar-header" });
                    var calendarHeaderLeftArrow = $('<div>', { class: "calendar-arrow left" });
                    var calendarHeaderTitle = $('<div>', { class: "calendar-title" });
                        var calendarHeaderTitleCaption = $('<div>', { class: "calendar-caption" }).html(title);
                        var calendarHeaderTitleDate = $('<div>', { class: "calendar-date" }).html(_self.options.months[date.getMonth()] + " " + date.getFullYear());
                    var calendarHeaderRightArrow = $('<div>', { class: "calendar-arrow right" });
            	var calendarMain = $('<div>', { class: "caldendar-main" });
            		var calendarDays = $('<div>', { class: "calendar-days calendar-table"});
            		var calendarDates = $('<div>', { class: "calendar-dates calendar-table"});
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
            	calendarDays.append($('<div>', { class: "calendar-cell" }).html(_self.options.days[i]));
            }

            var daysInMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
            var dayOffset = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

            //generate padding days
            for(var i = 0; i<dayOffset; i++){
            	calendarDates.append($('<div>', { class: "calendar-cell disabled" }).html("&nbsp;"));	
            }

            //generate days
            for(var i = 1; i<=daysInMonth; i++){
            	var classes = "calendar-cell active";
            	if( i == date.getDate())
            		classes += " today";
            	var day = $('<div>', { class: classes }).html(i);
            	day.bind( "click", { _self: _self, date: date, day: i  }, _self.dayClickEvent );
            	calendarDates.append(day);
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
        },

        monthClickEvent: function(event){
        	var _self = event.data._self;
        	event.data.date.setMonth(event.data.month);
        	_self.dateUpdate(_self);
        },

        dateUpdate: function(_self){
        	//we should validate here...
        	if(+_self.options.endDate <= +_self.options.startDate){
        		_self.options.endDate = new Date(_self.options.startDate.valueOf());
        		_self.options.endDate.setDate(_self.options.endDate.getDate()+1);
        	}
        	_self.options.onDateChange(_self.options.startDate, _self.options.endDate, _self.options.months);
        	_self.drawCalendars(_self);
        },

        clearCalendar: function(_self){
            _self.container.html("");
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