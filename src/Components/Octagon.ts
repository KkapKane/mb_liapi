import {
  Bodies,
  Engine,
  Body,
  World,
  Composite,
  Constraint,
  Events,
} from "matter-js";

export class Octagon {
  x: number;
  y: number;
  engine: Engine;
  composite: Composite;
  r: number;
  bodies: Body[];
  constructor(x: number, y: number, r: number, engine: Engine) {
    this.x = x;
    this.y = y;
    this.engine = engine;
    this.composite = Composite.create();
    this.r = r;
    this.bodies = [];
    let octagon = Bodies.polygon(this.x, this.y, 8, r, {
      angularVelocity: 0,
      render: { fillStyle: "transparent" },
    });
    let trapezoids = [];

    let sideLength = (2 * Math.sqrt(2) * r) / 8;
    let width = sideLength * 2.5;
    let slope = 0.25;
    let height = width * slope;

    for (let i = 0; i < 8; i++) {
      let angle = (i * Math.PI) / 4;
      let dx = sideLength - width / 2.5;
      let dy = -r + height / 5;
      let x = octagon.position.x + dx * Math.cos(angle) - dy * Math.sin(angle);
      let y = octagon.position.y + dx * Math.sin(angle) + dy * Math.cos(angle);
      let trapezoid = Bodies.trapezoid(x, y, width, height, slope, {
        friction: Infinity,
        isSensor: true,
        inertia: Infinity,
        render: { fillStyle: "red" },
      });
      Body.rotate(trapezoid, angle);
      Body.rotate(trapezoid, Math.PI);
      trapezoids.push(trapezoid);
      this.bodies.push(trapezoid);

      // Add a constraint between the trapezoid and the octagon to prevent it from moving
      let constraint = Constraint.create({
        bodyA: octagon,
        bodyB: trapezoid,
        pointA: {
          x: dx * Math.cos(angle) - dy * Math.sin(angle),
          y: dx * Math.sin(angle) + dy * Math.cos(angle),
        },
        length: 0,
        stiffness: 1,
        render: {
          visible: true,
        },
      });

      Composite.add(this.composite, constraint);
    }

    Events.on(engine, "afterUpdate", () => {
      // Limit maximum speed of water.
      for (let i = 0; i < this.bodies.length; i++) {
        // @ts-expect-error
        if (Body.getSpeed(this.bodies[i]) > 0) {
          // @ts-expect-error
          Body.setSpeed(this.bodies[i], 0);
        }
      }
    });

    Composite.add(this.composite, [octagon, ...trapezoids]);
    World.add(engine.world, this.composite);
  }
}
