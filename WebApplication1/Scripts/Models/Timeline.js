/**
 * This functionClass creates a timeline
 * @param {} id 
 * @param {} title 
 * @param {} description 
 * @param {} beginDate 
 * @param {} endDate 
 * @param {} timestamp 
 * @param {} isPublic 
 * @param {} rootContentItemId 
 * @param {} rootContentItem 
 * @param {} backgroundUrl 
 * @returns {} 
 */
function Timeline(id,title,description,beginDate,endDate,timestamp,isPublic,rootContentItemId, children, backgroundUrl) {
    this.id                 = id                || 0;
    this.title              = title             || "";
    this.description        = description       || "";
    this.beginDate          = beginDate         || 0;
    this.endDate            = endDate           || 0;
    this.timestamp          = timestamp         || [];
    this.isPublic           = isPublic          || false;
    this.rootContentItemId  = rootContentItemId || undefined;
    this.children           = children;
    this.backgroundUrl = backgroundUrl || undefined;

    Timeline.prototype.update = function () {
        var length = this.children.length;
        for (var i = 0; i < length; i++) {
            var child = this.children[i];
            var begin = CZ.Timescale.getXPositionForTime(child.beginDate);
            var end = CZ.Timescale.getXPositionForTime(child.endDate);
            child.size.width = end - begin;
            child.size.height = 20;
            child.point.x = begin;
            child.point.y = i * 21;
            child.update();
        }
    }

    Timeline.prototype.draw = function (context) {
        var length = this.children.length;
        for (var i = 0; i < length; i++) {
            var child = this.children[i];
            child.draw(context);
        }
    }
}


