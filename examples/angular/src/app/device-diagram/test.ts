import { createDiv, Direction, Node, Point, Rect, s8 } from "@topology/core";
import { Idiagram } from "./Idiagram";

export class Test implements Idiagram {
  shape(ctx: CanvasRenderingContext2D, node: Node): void {

    if (!node.elementId) {
      node.elementId = s8();
    }  
    node.elementLoaded = true;
    let div = createDiv(node);
    div.innerHTML = `'<h1 style='background: blue'>asads</h1>
    <img onclick="testfc()" src='/assets/img/bar1.png' ></img>`;
    
    document.body.appendChild(div);
    node.addToDiv();

   // ctx.drawImage(  ,100,100);
  /*  let wr = node.borderRadius;
    let hr = node.borderRadius;
    if (node.borderRadius < 1) {
      wr = node.rect.width * node.borderRadius;
      hr = node.rect.height * node.borderRadius;
    }
    let r = wr < hr ? wr : hr;
    if (node.rect.width < 2 * r) {
      r = node.rect.width / 2;
    }
    if (node.rect.height < 2 * r) {
      r = node.rect.height / 2;
    }
    ctx.beginPath();
    ctx.moveTo(node.rect.x + r, node.rect.y);
    ctx.arcTo(
      node.rect.x + node.rect.width,
      node.rect.y,
      node.rect.x + node.rect.width,
      node.rect.y + node.rect.height,
      r
    );
    ctx.arcTo(
      node.rect.x + node.rect.width,
      node.rect.y + node.rect.height,
      node.rect.x,
      node.rect.y + node.rect.height,
      r
    );
    ctx.arcTo(
      node.rect.x,
      node.rect.y + node.rect.height,
      node.rect.x,
      node.rect.y,
      r
    );
    ctx.arcTo(
      node.rect.x,
      node.rect.y,
      node.rect.x + node.rect.width,
      node.rect.y,
      r
    );
    ctx.closePath();

    ctx.moveTo(node.rect.x, node.rect.y + 40);
    ctx.lineTo(node.rect.ex, node.rect.y + 40);
    (node.fillStyle || node.bkType) && ctx.fill();
    ctx.stroke();  */
  }
  iconRect(node: Node): void {
    node.iconRect = new Rect(node.rect.x, node.rect.y , node.rect.width, node.rect.width/2);
    node.fullIconRect = node.rect;
   // throw new Error("Method not implemented.");
  }
  textRect(node: Node): void {
    node.textRect = new Rect(
      node.rect.x + 10,
      node.rect.y + (node.rect.height * 2) / 3,
      node.rect.width - 20,
      node.rect.height / 3 - 5
    );
    node.fullTextRect = node.rect;
  }
  anchors(node: Node): void {
   /* node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height / 2, Direction.Left));
    node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y, Direction.Up));
    node.anchors.push(new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height / 2, Direction.Right));
    node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y + node.rect.height, Direction.Bottom));
  
    // demo，其他自定义锚点。这里只是示例。
    for (let i = 10; i < 360; i += 10) {
      if (i % 90 === 0) {
        continue;
      }
  
      const direction = Math.floor(i / 90);
      const pt = new Point(
        node.rect.center.x + (Math.sin((i / 180) * Math.PI) * node.rect.width) / 2,
        node.rect.center.y + (Math.cos((i / 180) * Math.PI) * node.rect.height) / 2,
        direction
      );
      pt.hidden = true;
      node.anchors.push(pt);
    }  */
  }
}
