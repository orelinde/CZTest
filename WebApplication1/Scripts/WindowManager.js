/**
 * This object is responsible for the GUI window
 */
CZ.WindowManager = (function () {

    /**
     * Show or hide the loading indicator on the main screen
     * @param {true or false} showLoader  
     * @param {the message to show under the indicator, defaults to CZ.Settings} loadingText 
     * @returns {} 
     */
    var showLoading = function (showLoader, loadingText) {
        var loadinElement = $("#loader");
        var loadingTextElement = $("#loaderText");

        if (showLoader) {
            var text = loadingText !== undefined ? loadingText : CZ.Settings.defaultLoadingText;
            loadingTextElement.html(text);
            loadinElement.addClass("active");
        } else {
            loadinElement.removeClass("active");
        }   
    }

    return {
        showLoading: showLoading
    }
})();