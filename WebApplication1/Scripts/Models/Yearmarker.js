function Yearmarker(height) {
    this.height = height;

    Yearmarker.prototype.update = function() {
        x = CZ.Mousepointer.point.x;
    }

    Yearmarker.prototype.draw = function (context) {
        drawBox(context);
        drawRectangleArrow(context);
        // Must be the last call to draw ontop of the other items

        // TODO:update dependencie
        //drawYear(context);
    }

    Yearmarker.prototype.ctor = function() {
        fontSize = CZ.Settings.yearmarkerFontSize;
    }();

    // Private fields
    var x;
    var yearmarkerWidth = 80;
    var arrowHeight = 15;
    var fontSize = 0;

    //  -------
    //  | year|
    //    \/         <--
    function drawRectangleArrow(context) {
        context.beginPath();
        context.moveTo(x - 10, height - arrowHeight);
        context.lineTo(x, height);
        context.lineTo(x + 10, height - arrowHeight);
        context.fill();
        context.closePath();
    }

    //  ---------
    //  | year  |
    //  ---------
    function drawBox(context) {
        context.fillStyle = CZ.Settings.yearmarkerColor;
        context.beginPath();
        // divide bt 1/2 to get the half of the width
        context.rect(getBeginPositionOnTimeline(), 0, yearmarkerWidth, height - arrowHeight);
        context.fill();
        context.closePath();
    }

    function drawYear(context) {
        // Draw year in marker
        context.beginPath();

        //Get the time belonging to the mouseposition

        
        var timeText = CZ.Timescale.convertTimeToString(Math.round(Canvas.Timescale.getTimeForXPosition(x)));

        //The length in pixels of the string
        var lengthOfStringInPixels = context.measureText(timeText).width;
        context.font = CZ.Settings.yearmarkerFont;
        context.fillStyle = CZ.Settings.yearmarkerFontColor;

        //Calculate the middle of the box to draw the year
        var begintext = getBeginPositionOnTimeline() + ((yearmarkerWidth - lengthOfStringInPixels) / 2);
        context.fillText(timeText, begintext + 1, calculateYPositionForText());
        context.closePath();
    }

    //Calculate the position where to draw the text in the middle of the yearmarker box
    function calculateYPositionForText() {
        // So only the box is left
        var box = height - arrowHeight;
        var middleBox = box / 2;
        var halfOfTextHeight = (fontSize / 2) / 2;
        var total = middleBox + halfOfTextHeight;
        return total;
    }

    //Determine the left side of the yearmarker box where it starts on the scale in pixels
    function getBeginPositionOnTimeline() {
        return (x) - yearmarkerWidth / 2;
    }
}