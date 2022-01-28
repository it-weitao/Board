import { Point2d } from "../../EventTarget/data";
import Line from "./Line";
import { addArrow } from "./utils";

export default class StraightLine extends Line {
  constructor() {
    super("straight");
  }

  public restore(ctx: CanvasRenderingContext2D): void {
    if (!this.drawData || !this.drawData.path.begin || !this.drawData.path.end)
      return;
    const pointInfo = {
      begin: this.drawData.path.begin,
      end: this.drawData.path.end,
    };
    this.drawStraightLine(ctx, pointInfo);
  }

  private drawStraightLine(
    ctx: CanvasRenderingContext2D,
    pointInfo: {
      begin: Point2d;
      end: Point2d;
    }
  ) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(pointInfo.begin.x, pointInfo.begin.y);
    ctx.lineTo(pointInfo.end.x, pointInfo.end.y);
    ctx.stroke();
    addArrow(ctx, pointInfo.begin, pointInfo.end);
  }

  protected doDrawBegin(ctx: CanvasRenderingContext2D, point: Point2d) {}

  protected doDraw(ctx: CanvasRenderingContext2D, point: Point2d) {
    if (!this.beginPoint) return;
    this.drawStraightLine(ctx, {
      begin: this.beginPoint,
      end: point,
    });
  }

  protected doDrawEnd(ctx: CanvasRenderingContext2D, point: Point2d) {
    if (!this.beginPoint) return;
    this.drawStraightLine(ctx, {
      begin: this.beginPoint,
      end: point,
    });
  }
}
