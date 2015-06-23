CZ.Mousepointer = (function () {
    var point = new Point(100, 100);

    var bindListeners = function(container) {
        container.addEventListener("mousemove", updateMousePosition, false);
    };

    function updateMousePosition(e) {
        // Opera, ie
        if ("offsetX" in e) {
            point.x = e.offsetX;
            point.y = e.offsetY;
            // Firefox
        } else if ("pageX" in e) {
            point.x = e.pageX;
            point.y = e.pageY;
        } else {
            point.x = 0;
            point.y = 0;
        }
    }

    return {
        point: point,
        addEventListenersOn : bindListeners
    }
})();