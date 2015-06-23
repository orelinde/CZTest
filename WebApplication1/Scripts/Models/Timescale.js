CZ.Timescale = (function () {
    var beginDate = 0;
    var endDate = 0;
    var yearmarker;
    var size;
    var update = function () {
        yearmarker.update();
    }

    var draw = function (context) {
        drawBaseLayer(context);
        drawTimescaleLayer(context);
        yearmarker.draw(context);
    }

    var init = function () {
        size = new Size(CZ.Canvas.width, CZ.Settings.timescaleHeight);
        yearmarker = new Yearmarker(size.height);
    };

    // Get year for given x-axis position
    var getTimeForXPosition = function (x) {
        // Get canvas width and time per pixel
        var timePerPixel = (endDate - beginDate) / size.width;

        // Return time
        return Math.floor(beginDate + (timePerPixel * x));
    }
    var getXPositionForTime = function (time) {
        // Get canvas width and time per pixel
        var timePerPixel = size.width / (endDate - beginDate);

        // Return position
        return (time - beginDate) * timePerPixel;
    }
    // Convert given time to date
    var convertTimeToDate = function (time) {
        var year = Math.floor(time);
        var date = new Date(year, 0, 1);
        var daysInYear = isLeapYear(year) ? 365 : 366;
        var days = (time - year) * daysInYear;
        return new Date(date.setDate(date.getDate() + days));
    }

    function isLeapYear(year) {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }

    function drawBaseLayer(context) {
        context.fillStyle = CZ.Settings.timescaleBackgroundColor;
        context.fillRect(0, 0, size.width, size.height);
    }

    // Draw the yearscale layer
    function drawTimescaleLayer(context) {
        // Get ticks and define amount of small ticks per tick
        var ticks = getTicks();
        var amountOfSmallTicksPerTick = 5;

        // Draw ticks, tick labels and bottom line
        var span = endDate - beginDate;
        if (span == 0) {
            drawTicks(context, 2, 1);
            drawTickLabels(context, 2);
        } else {
            drawTicks(context, ticks, amountOfSmallTicksPerTick);
            drawTickLabels(context, ticks);
        }


        drawBottomLine(context);
    }

    // Draw (yearscale) ticks
    function drawTicks(context, ticks, amountOfSmallTicksPerTick) {
        // Set total ticks, define line width and set tick width
        var totalTicks = ticks * amountOfSmallTicksPerTick;
        var lineWidth = 2;
        var tickWidth = size.width / totalTicks;

        // Set style
        context.lineWidth = lineWidth;
        context.strokeStyle = CZ.Settings.timescaleTickColor;

        // Draw all ticks
        context.beginPath();
        for (var i = 0; i <= totalTicks; i++) {
            context.moveTo((i * tickWidth), size.height - ((i % amountOfSmallTicksPerTick === 0) ? 20 : 10));
            context.lineTo((i * tickWidth), size.height);
        }
        context.stroke();
        context.closePath();
    }
    function drawTickLabels(context, ticks) {
        // Set tick width and tick year
        var tickWidth = size.width / ticks;
        var tickTime = (endDate - beginDate) / ticks;

        // Set style
        context.font = CZ.Settings.timescaleTickLabelFont;
        context.fillStyle = CZ.Settings.timescaleTickLabelColor;

        // Draw all ticks
        for (var i = 1; i < ticks; i++) {
            // Set year and convert year to string
            var year = beginDate + (i * tickTime);
            var yearString = convertTimeToString(year);

            // Draw text centered above tick
            context.fillText(yearString, (i * tickWidth) - (yearString.length * 5), size.height - 30);
        }
    }
    function drawBottomLine(context) {
        context.lineWidth = 1.5;
        context.moveTo(0, size.height);
        context.lineTo(size.width, size.height);
        context.stroke();
        context.closePath();
    }
    function convertTimeToString(time) {
        // Check if before christ
        if (time < 0) {
            return String(Math.round(time) * -1) + " BC";
        }

        // Check if not rounded time
        if (time !== Math.round(time) && (endDate - beginDate) < 10) {
            var date = convertTimeToDate(time);

            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            return monthNames[date.getMonth()] + ", " + date.getFullYear();
        }
        return String(Math.round(time));
    }

    function setRange(begin, end) {
        beginDate = begin;
        endDate = end;
    }
    // Calculate ticks for current range and given canvas width
    function getTicks() {
        // Calculate span
        var span = endDate - beginDate;

        // Less ticks for (realy) small screen
        if (size.width < 500) {
            return 4;
        }

        // Less ticks for small year range or smaller screen
        if (span < 10 || size.width < 1000) {
            return 8;
        }

        // Default
        return 10;
    }
    return {
        getXPositionForTime: getXPositionForTime,
        getTimeForXPosition: getTimeForXPosition,
        update: update,
        draw: draw,
        setRange: setRange,
        init : init
    }
})();


