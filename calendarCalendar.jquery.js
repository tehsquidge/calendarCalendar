
;(function ( $, window, document, undefined ) {

    var d = new Date(), pluginName = "calendarCalendar",
        defaults = {
            containerName: "calendarCalendar",
            container: null,
            day: d.getDate(),
            month: d.getMonth() +1,
            year: d.getFullYear(),
            type: "default", //also accept month
            minYear: null,
            minMonth: null,
            minDay: 1, //null makes it roll back
            maxYear: null,
            maxMonth: null,
            maxDay: 1 //null makes it roll back
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
            
            _self.container.hide();
            $(_self.element).click( function(){ _self.showCalendar(_self); } );

        },

        showCalendar: function(_self) {
            _self.container.show();
            _self.generateCalendar(_self);
        },

        generateCalendar: function(_self) {
            var startCalendarMarkup = $('<div>', { id:"calendar-start-date", class: "calendar"});
                var startCalendarHeader = $('<div>', { class: "calendar-header" });
                    var startCalendarHeaderLeftArrow = $('<div>', { class: "calendar-arrow left" });
                    var startCalendarHeaderTitle = $('<div>', { class: "calendar-title" });
                        var startCalendarHeaderTitleCaption = $('<div>', { class: "calendar-caption" }).html('Arrive On');
                        var startCalendarHeaderTitleDate = $('<div>', { class: "calendar-date" }).html('December 2013');
                    var startCalendarHeaderRightArrow = $('<div>', { class: "calendar-arrow right" });
            
            startCalendarHeader.append(startCalendarHeaderLeftArrow);
            startCalendarHeaderTitle.append(startCalendarHeaderTitleCaption);
            startCalendarHeaderTitle.append(startCalendarHeaderTitleDate);

            startCalendarHeader.append(startCalendarHeaderTitle);
            startCalendarHeader.append(startCalendarHeaderLeftArrow);

            startCalendarMarkup.append(startCalendarHeader);

            _self.container.html(startCalendarMarkup);
        },

        clearCalendar: function(_self){
            _self.container.html("");
        },

        storeDate: function(_self){
            _self.options.year = 0;
            _self.options.month = 0;
            _self.options.day = 0;
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