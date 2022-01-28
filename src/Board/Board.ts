import Canvas from "./Canvas/Canvas.js";

class Board {
  public targetDomId: string;

  constructor(domId: string) {
    this.targetDomId = domId;
    const targetDom = document.querySelector(`#${domId}`);
    if (!targetDom) throw new Error("target dom is not exist!");
    this.createBoard(targetDom);
  }

  private createBoard = (targetDom: Element) => {
    const { width, height } = targetDom.getBoundingClientRect();
    const canvas = new Canvas({ width, height });
    targetDom.appendChild(canvas.canvas);
  };
}

export default Board;
