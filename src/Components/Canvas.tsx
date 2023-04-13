import {
  Composite,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  World,
  Body,
} from "matter-js";
import { useEffect, useRef, useState } from "react";

import { Octagon } from "./Octagon";
// import worldMap from "../assets/world.svg"

export default function Canvas(): JSX.Element {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef<Engine>(Engine.create());
  const [scale, setScale] = useState(1);
  const [hoveredBody, setHoveredBody] = useState<Body | null>(null);

  useEffect(() => {
    const render = Render.create({
      element: boxRef.current!,
      engine: engine.current,
      canvas: canvasRef.current!,
      options: {
        width: boxRef.current?.clientWidth,
        height: boxRef.current?.clientHeight,
        wireframes: false,
        background: "transparent",
      },
    });
    Engine.run(engine.current);
    Render.run(render);

    const canvas = canvasRef.current!;
    engine.current.world.gravity.scale = 0;
    Events.on(render, "afterRender", function () {
      var ctx = render.context;
      var bodies = Composite.allBodies(engine.current.world);

      ctx.font = "16px Arial";
      ctx.fillStyle = "#ffffff";

      for (var i = 0; i < bodies.length; i++) {
        let body = bodies[i];
        if (i == 0) {
          ctx.fillText("i", body.position.x, body.position.y);
        }
      }
    });

    let mouse = Mouse.create(render.canvas);
    let mouseOptions = { mouse: mouse };
    let mouseConstraint = MouseConstraint.create(engine.current, mouseOptions);
    Events.on(mouseConstraint, "mousedown", function (e) {
      const { body } = e.source;
      if (!body || !body.label) return;
      if (body.label === "Trapezoid Body") {
        let count = 0;
        setTimeout(() => {
          let lerp = setInterval(() => {
            if (count == 10) {
              clearInterval(lerp);
            }
            setScale((prev) => prev + 0.001);
            count++;
          }, 10);
        }, 200);
      }
    });

    Events.on(mouseConstraint, "mousemove", function (event) {
      const bodiesUnderMouse = Query.point(
        Composite.allBodies(engine.current.world),
        event.source.mouse.position
      );


      if (
        bodiesUnderMouse.length > 0 &&
        bodiesUnderMouse[0].label === "Trapezoid Body"
      ) {
        bodiesUnderMouse[0].render.fillStyle = "red";
        setHoveredBody(bodiesUnderMouse[0] as Body);
      } else {
        setHoveredBody(null);
      }
    });

    Events.on(render, "afterRender", function () {
      var ctx = render.context;
      var bodies = Composite.allBodies(engine.current.world);

      for (var i = 0; i < bodies.length; i++) {
        let body = bodies[i];
        if (body.label === "Trapezoid Body") {
          if (body === hoveredBody) {
            continue;
          } else {
            // body.render.fillStyle = "#ffffff";
          }
        }
      }
    });

    //octagon TEST
    new Octagon(500, 500, 200, engine.current);

    return () => {
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
    };
  }, []);

  // useEffect(() => {
  //   if (country) {
  //     Composite.scale(country.body, scale, scale, {
  //       x: country.x,
  //       y: country.y,
  //     });

  //     // Scale the constraints
  //     for (const constraint of country.constraints) {
  //       if (constraint.length) {
  //         constraint.length *= scale;
  //       }

  //       if (constraint.pointA) {
  //         constraint.pointA.x *= scale;
  //         constraint.pointA.y *= scale;
  //       }
  //       if (constraint.pointB) {
  //         constraint.pointB.x *= scale;
  //         constraint.pointB.y *= scale;
  //       }
  //     }
  //   }
  // }, [scale]);

  const handleScale = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  return (
    <div ref={boxRef} id="canvas">
      <canvas ref={canvasRef} />
    </div>
  );
}
