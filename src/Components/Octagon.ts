import { Bodies, Engine, Body, World, Composite } from "matter-js";

export class Octagon {
  x: number;
  y: number;
  engine: Engine;
  bodies: Body[];
  composite: Composite;
  r: number;
  constructor(x: number, y: number, r: number, engine: Engine) {
    this.x = x;
    this.y = y;
    this.engine = engine;
    this.composite = Composite.create();
    this.bodies = []
    this.r = r;
    let w = 64;
    let h = 24;
    let slope = 0.2;

    let mainBody = Bodies.polygon(this.x, this.y, 8, r)
    this.bodies.push(mainBody)
    let first = Bodies.trapezoid(
      this.x,
      this.y, // Update x-position based on dx
      w,
      h,
      slope,
      { isSensor: true }
    );
    this.bodies.push(first)
    Composite.add(this.composite, this.bodies)
    World.add(engine.world, this.composite)
  }
}
