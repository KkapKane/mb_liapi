import {
  Bodies,
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
import { Country } from "./Country";
import { Octagon } from "./Octagon";
// import worldMap from "../assets/world.svg"

export default function Canvas(): JSX.Element {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef<Engine>(Engine.create());
  const [scale, setScale] = useState(1);
  const [hoveredBody, setHoveredBody] = useState<Body | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  useEffect(() => {
    const render = Render.create({
      element: boxRef.current!,
      engine: engine.current,
      canvas: canvasRef.current!,
      options: {
        width: boxRef.current?.clientWidth,
        height: boxRef.current?.clientHeight,
        wireframes: false,
        background: "transparent"
        
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
        if(i == 0){

          ctx.fillText("i", body.position.x, body.position.y);
        }
        
      }
    });
    // const newCountry = new Country(-100, 280, 1, engine.current);
    // new Country(900, 360, .3, engine.current);
    // new Country(500, 260, .7, engine.current);
    // new Country(500, 460, .8, engine.current);
    // new Country(1000, 660, .8, engine.current);
    // new Country(700, 160, 1.8, engine.current);
    // setCountry(newCountry);
    // function handleAddShape(event: MouseEvent) {
    //   const canvasRect = canvas.getBoundingClientRect();
    //   const mouseX = event.clientX - canvasRect.left
    //   const mouseY = event.clientY - canvasRect.top
    //   console.log("ya")
    //     new Country(mouseX, mouseY, 2.1, engine.current)
    // }

    // canvas.addEventListener("click", handleAddShape)
    let mouse = Mouse.create(render.canvas);
    let mouseOptions = { mouse: mouse };
    let mouseConstraint = MouseConstraint.create(engine.current, mouseOptions);
    Events.on(mouseConstraint, "mousedown", function (e) {
      const { body } = e.source;
      if(!body || !body.label) return;
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

      // Check if bodiesUnderMouse is not empty before accessing its first element
      if (
        bodiesUnderMouse.length > 0 &&
        bodiesUnderMouse[0].label === "Trapezoid Body"
      ) {
        bodiesUnderMouse[0].render.fillStyle = "red";
        setHoveredBody(bodiesUnderMouse[0] as Body);

      } else {
        setHoveredBody(null)
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
            body.render.fillStyle = "#ffffff"; 
          }
        }
      }
    });

    //octagon TEST
    new Octagon(500,500, 200, engine.current)

    return () => {
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
    };
  }, []);

  useEffect(() => {
    if (country) {
      Composite.scale(country.body, scale, scale, {
        x: country.x,
        y: country.y,
      });

      // Scale the constraints
      for (const constraint of country.constraints) {

        if (constraint.length) {
          constraint.length *= scale;
        }

     
        if (constraint.pointA) {
          constraint.pointA.x *= scale;
          constraint.pointA.y *= scale;
        }
        if (constraint.pointB) {
          constraint.pointB.x *= scale;
          constraint.pointB.y *= scale;
        }
      }
    }
  }, [scale]);

  const handleScale = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  return (
    <div ref={boxRef} id="canvas">
      <canvas ref={canvasRef} />
    </div>
  );
}
