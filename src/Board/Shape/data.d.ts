import { Point2d } from "../EventTarget/data";

export type DrawStatus = "start" | "drawing" | "end";
export type LineType = "straight" | "irregular";
export interface ShapeData {
  shapeType: LineType;
  path: {
    begin?: Point2d;
    end?: Point2d;
    track?: Point2d[];
  };
}
