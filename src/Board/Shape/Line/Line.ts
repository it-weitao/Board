import { Point2d } from "../../EventTarget/data";
import { DrawStatus, LineType, ShapeData } from "../data";

export default abstract class Line {
  protected drawStatus: DrawStatus = "start";
  protected type: LineType = "irregular";
  protected beginPoint?: Point2d;
  protected endPoint?: Point2d;
  protected track?: Point2d[];
  protected drawData?: ShapeData;

  constructor(type: LineType) {
    this.type = type;
  }

  protected abstract doDrawBegin(
    ctx: CanvasRenderingContext2D,
    point: Point2d
  ): void;

  public drawBegin(ctx: CanvasRenderingContext2D, point: Point2d) {
    this.drawStatus = "start";
    this.doDrawBegin(ctx, point);
    this.beginPoint = point;
  }

  protected abstract doDraw(
    ctx: CanvasRenderingContext2D,
    point: Point2d
  ): void;

  public draw(ctx: CanvasRenderingContext2D, point: Point2d) {
    this.drawStatus = "drawing";
    this.doDraw(ctx, point);
    this.track?.push(point);
  }

  protected abstract doDrawEnd(
    ctx: CanvasRenderingContext2D,
    point: Point2d
  ): void;

  public drawEnd(ctx: CanvasRenderingContext2D, point: Point2d) {
    this.drawStatus = "end";
    this.doDrawEnd(ctx, point);
    this.endPoint = point;
    this.drawData = {
      shapeType: this.type,
      path: {
        begin: this.beginPoint,
        end: this.endPoint,
        track: this.track,
      },
    };
  }

  public abstract restore(ctx: CanvasRenderingContext2D): void;
}
