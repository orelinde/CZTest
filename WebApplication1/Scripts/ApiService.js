CZ.ApiService = (function () {
    var baseUrl = "http://www.kompili.nl/chronozoomapi/api/";

    /**
     * Request the server for a timeline with id
     * @param {the id of the timeline} timelineId 
     * @param {the method to invoke after a succesfull request with the data} asyncCallback 
     * @returns {Timeline} 
     */
    var getTimelineByIdAsync = function (timelineId, asyncCallback) {
        $.get(baseUrl.concat("timeline/").concat(timelineId), function (data) {
            console.log(data);
            var timeline = CZ.Mapper.toTimeline(data);
            asyncCallback(timeline);
        });
    }

    return {
        getTimelineByIdAsync : getTimelineByIdAsync
    }
})();