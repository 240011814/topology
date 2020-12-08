import { Node } from '@topology/core';
export interface Idiagram {
    shape(ctx: CanvasRenderingContext2D, node: Node):void
    iconRect(node: Node) :void
    textRect(node: Node) :void
    anchors(node: Node): void
}
