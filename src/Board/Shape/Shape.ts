import CustomEventTarget from "../EventTarget/CustomEventTarget";
import { Point2d } from "../EventTarget/data";
import { Line, IrregularLine, StraightLine } from "./Line/index";

export default class Shape extends CustomEventTarget {
  public desc: HTMLCanvasElement;
  private drawingShape: Line;

  constructor(canvas: HTMLCanvasElement, shapeType = "Irregular") {
    super();
    this.desc = canvas;
    switch (shapeType) {
      case "Irregular":
        this.drawingShape = new IrregularLine();
        break;
      case "Straight":
        this.drawingShape = new StraightLine();
        break;
      default:
        this.drawingShape = new IrregularLine();
        break;
    }
    this.handleListener("add");
  }

  get ctx() {
    return this.desc.getContext("2d");
  }

  private handleListener(type: "add" | "remove") {
    const handleListenerMethod = (
      type === "add" ? this.addListener : this.removeListener
    ).bind(this);
    handleListenerMethod<Point2d>("moveBegin", this.handleMoveBegin);
    handleListenerMethod<Point2d>("move", this.handleMove);
    handleListenerMethod<Point2d>("moveEnd", this.handleEnd);
  }

  private handleMoveBegin = ({ detail }: CustomEvent<Point2d>) => {
    if (!this.ctx) return;
    const { x, y } = detail;
    this.drawingShape.drawBegin(this.ctx, { x, y });
  };

  private handleMove = ({ detail }: CustomEvent<Point2d>) => {
    if (!this.ctx) return;
    const { x, y } = detail;
    this.drawingShape.draw(this.ctx, { x, y });
  };

  private handleEnd = ({ detail }: CustomEvent<Point2d>) => {
    this.handleListener("remove");
    if (!this.ctx) return;
    const { x, y } = detail;
    this.drawingShape.drawEnd(this.ctx, { x, y });
  };
}
