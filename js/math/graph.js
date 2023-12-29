class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    static load(info) {
        const points = info.points.map(
            (pointInfo) => new Point(pointInfo.x, pointInfo.y)
        );
        const segments = info.segments.map(
            (segmentInfo) =>
                new Segment(
                    points.find((point) => point.equals(segmentInfo.p1)),
                    points.find((point) => point.equals(segmentInfo.p2))
                )
        );

        return new Graph(points, segments);
    }

    addPoint(point) {
        this.points.push(point);
    }

    containsPoint(point) {
        return this.points.find((p) => p.equals(point));
    }

    tryAddPoint(point) {
        if (!this.containsPoint(point)) {
            this.addPoint(point);
            return true;
        }
        return false;
    }

    removePoint(point) {
        const segments = this.getSegmentsWithPoint(point);
        for (const segment of segments) {
            this.removeSegment(segment);
        }
        this.points.splice(this.points.indexOf(point), 1);
    }

    addSegment(segment) {
        this.segments.push(segment);
    }

    containsSegment(segment) {
        return this.segments.find((seg) => seg.equals(segment));
    }

    tryAddSegment(segment) {
        if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
            this.addSegment(segment);
            return true;
        }
        return false;
    }

    removeSegment(segment) {
        this.segments.splice(this.segments.indexOf(segment), 1);
    }

    getSegmentsWithPoint(point) {
        const segments = [];
        for (const seg of this.segments) {
            if (seg.includes(point)) {
                segments.push(seg);
            }
        }
        return segments;
    }

    dispose() {
        this.points.length = 0;
        this.segments.length = 0;
    }

    draw(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx);
        }
    }
}
