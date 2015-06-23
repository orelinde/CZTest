CZ.Canvas = (function () {
    var timeline;
    var context;
    var canvas;

    var setTimelineAsync = function (timelineId) {
        var setTimelineAsyncCallback = function (timelineFromDb) {
            timeline = timelineFromDb;
            CZ.WindowManager.showLoading(false);
            drawTimeline();
        }
        CZ.WindowManager.showLoading(true, CZ.Settings.defaultLoadingTextTimeline);
        CZ.ApiService.getTimelineByIdAsync(timelineId, setTimelineAsyncCallback);
    }

    // Update the canvas
    function update() {
        timeline.update();
        CZ.Timescale.update();
    }

    // Draw the canvas
    function draw() {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        timeline.draw(context);
        CZ.Timescale.draw(context);
    }

    var lastTime = Date.now();
    function canvasDrawProcessLoop() {
        var elapsed = Date.now() - lastTime;
        if (elapsed > CZ.Settings.FPS) {
            update();
            draw();
            lastTime = Date.now();
        }
        requestAnimationFrame(canvasDrawProcessLoop);
    }

    function drawTimeline() {
        CZ.Mousepointer.addEventListenersOn(canvas);
        CZ.Timescale.init();
        CZ.Timescale.setRange(timeline.beginDate, timeline.endDate);
        canvasDrawProcessLoop();
    }

    (function init() {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }());

    return {
        setTimeline: setTimelineAsync,
        width: canvas.width,
}
})();