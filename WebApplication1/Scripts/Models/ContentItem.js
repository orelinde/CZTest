/**
 * This FunctionClass creates an ContentItem object
 * @param {} id 
 * @param {} title 
 * @param {} description 
 * @param {} beginDate 
 * @param {} endDate 
 * @param {} children 
 * @param {} hasChildren 
 * @param {} pictureUrLs 
 * @param {} parentId 
 * @param {} sourceUrl 
 * @param {} soureceRef 
 * @param {} timestamp 
 * @returns {} 
 */
function ContentItem(id, title, description, beginDate, endDate, children, hasChildren, pictureUrLs, parentId, sourceUrl, soureceRef, timestamp) {
    this.id = id                    || "";
    this.title = title              || "";
    this.description = description  || "";
    this.beginDate = beginDate      || 0;
    this.endDate    = endDate       || 0;
    this.children   = children      || [];
    this.hasChildren = hasChildren  || false;
    this.pictureUrls = pictureUrLs  || [];
    this.parentId   = parentId      || 0;
    this.sourceUrl  = sourceUrl     || "";
    this.sourceRef  = soureceRef    || "";
    this.timestamp = timestamp      || "";

    this.point = new Point(0, 0);
    this.size = new Size(0, 0);

    ContentItem.prototype.update = function () {

    }

    ContentItem.prototype.draw = function (context) {
        // haschildren = Rectangle
        if (this.hasChildren) {
            context.beginPath();
            var point = this.point;
            var size = this.size;
            context.rect(point.x, point.y, size.width, size.height);
            context.fillStyle = 'rgba(0,0,0,0.6)';
            context.fill();
            context.closePath();
        }
    }
}

