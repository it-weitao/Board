import { Point2d } from "../../EventTarget/data";

const arrowLength = 15;
const arrowTheta = 30;

export function addArrow(
  ctx: CanvasRenderingContext2D | null,
  beginPoint: Point2d,
  endPoint: Point2d
) {
  const lineAngle =
    (Math.atan2(beginPoint.y - endPoint.y, beginPoint.x - endPoint.x) * 180) /
    Math.PI;
  const topArrowAngle = ((lineAngle + arrowTheta) * Math.PI) / 180;
  const bottomArrowAngle = ((lineAngle - arrowTheta) * Math.PI) / 180;
  const topArrowX = arrowLength * Math.cos(topArrowAngle);
  const topArrowY = arrowLength * Math.sin(topArrowAngle);
  const bottomArrowX = arrowLength * Math.cos(bottomArrowAngle);
  const bottomArrowY = arrowLength * Math.sin(bottomArrowAngle);

  ctx?.beginPath();
  ctx?.moveTo(endPoint.x, endPoint.y);
  ctx?.lineTo(endPoint.x + topArrowX, endPoint.y + topArrowY);
  ctx?.moveTo(endPoint.x, endPoint.y);
  ctx?.lineTo(endPoint.x + bottomArrowX, endPoint.y + bottomArrowY);
  ctx?.stroke();
}
