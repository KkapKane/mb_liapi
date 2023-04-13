import { Bodies, Engine, Body, World, Composite } from "matter-js";

export class Octagon {
  x: number;
  y: number;
  engine: Engine;
  composite: Composite;
  r: number;
  constructor(x: number, y: number, r: number, engine: Engine) {
    this.x = x;
    this.y = y;
    this.engine = engine;
    this.composite = Composite.create();
    this.r = r;

    let octagon = Bodies.polygon(this.x, this.y, 8, r, {render: {fillStyle: "transparent"}});
    let trapezoids = [];

    let sideLength = 2 * Math.sqrt(2) * r / 8;
    let width = sideLength * 2;
    let slope = 0.3;
    let height = width * slope;

    for (let i = 0; i < 8; i++) {
      let angle = i * Math.PI / 4 ;
      let dx = sideLength  - width / 2;
      let dy = -r + height / 1 ;
      let x = octagon.position.x + dx * Math.cos(angle) - dy * Math.sin(angle);
      let y = octagon.position.y + dx * Math.sin(angle) + dy * Math.cos(angle);
      let trapezoid = Bodies.trapezoid(x, y, width, height, slope, { isSensor: true, render: { fillStyle: "black" } });
      Body.rotate(trapezoid, angle);
      Body.rotate(trapezoid, Math.PI);
      trapezoids.push(trapezoid);
      console.log(`Trapezoid ${i}: (${x.toFixed(2)}, ${y.toFixed(2)})`);
    }

    Composite.add(this.composite, [octagon, ...trapezoids]);
    World.add(engine.world, this.composite);
  }
}
