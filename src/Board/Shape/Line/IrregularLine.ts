import { Point2d } from "../../EventTarget/data";
import Line from "./Line";

export default class IrregularLine extends Line {
  constructor() {
    super("irregular");
  }

  public restore(ctx: CanvasRenderingContext2D): void {
    if (!this.drawData || !this.drawData.path.track) return;
    ctx.beginPath();
    for (let i = 0; i < this.drawData.path.track.length - 1; i++) {
      const { x, y } = this.drawData.path.track[i];
      const { x: nextX, y: nextY } = this.drawData.path.track[i + 1];
      ctx.moveTo(x, y);
      ctx.lineTo(nextX, nextY);
    }
    ctx.stroke();
  }

  protected doDrawBegin(ctx: CanvasRenderingContext2D, point: Point2d) {
    this.drawStatus = "start";
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    this.beginPoint = point;
  }

  protected doDraw(ctx: CanvasRenderingContext2D, point: Point2d) {
    this.drawStatus = "drawing";
    const { x, y } = point;
    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
    ctx.stroke();
    this.track?.push(point);
  }

  protected doDrawEnd(ctx: CanvasRenderingContext2D, point: Point2d) {
    this.drawStatus = "end";
    const { x, y } = point;
    ctx.lineTo(x, y);
    ctx.stroke();
    this.endPoint = point;
    this.drawData = {
      shapeType: "straight",
      path: {
        begin: this.beginPoint,
        end: this.endPoint,
        track: this.track,
      },
    };
  }
}
