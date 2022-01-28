import { Point2d } from "../EventTarget/data";
import Shape from "../Shape/Shape";

const createCanvas = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  return {
    canvas,
    context,
  };
};

const emitCustomEvent = <T = any>(
  target: EventTarget,
  type: string,
  detail: T
) => {
  target.dispatchEvent(
    new CustomEvent<T>(type, {
      detail,
    })
  );
};

export default class Canvas {
  private size: Canvas.CanvasSize;
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D | null;
  private pendingShape?: Shape;

  constructor(size: Canvas.CanvasSize) {
    this.size = size;
    const { canvas, context } = createCanvas();
    if (!context) throw new Error("getContext error!");
    this.canvas = canvas;
    this.context = context;
    this.initCanvasSizeAndScale();
    this.handleMove();
  }

  private initCanvasSizeAndScale = () => {
    const dpr = window.devicePixelRatio;
    this.canvas.style.width = `${this.size.width}px`;
    this.canvas.style.height = `${this.size.height}px`;
    this.canvas.width = this.size.width * dpr;
    this.canvas.height = this.size.height * dpr;
    this.context?.scale(dpr, dpr);
  };

  private handleMove = () => {
    this.canvas.addEventListener("pointerdown", this.handlePointerDown);
  };

  private handlePointerDown = (event: PointerEvent) => {
    if (!this.context) return;
    const { x, y } = event;
    document.addEventListener("pointermove", this.handlePointerMove);
    document.addEventListener("pointerup", this.handlePointerUp);
    const shape = new Shape(this.canvas);
    this.pendingShape = shape;
    emitCustomEvent<Point2d>(this.pendingShape, "moveBegin", { x, y });
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (!this.pendingShape) return;
    const { x, y } = event;
    emitCustomEvent<Point2d>(this.pendingShape, "move", { x, y });
  };

  private handlePointerUp = (event: PointerEvent) => {
    document.removeEventListener("pointermove", this.handlePointerMove);
    document.removeEventListener("pointerup", this.handlePointerUp);
    if (!this.pendingShape) return;
    const { x, y } = event;
    emitCustomEvent<Point2d>(this.pendingShape, "moveEnd", { x, y });
    this.pendingShape = undefined;
  };
}
