import {Bodies, Engine, Render, World} from 'matter-js'
import {useEffect, useRef} from 'react'
import { Country } from './Country'
// import worldMap from "../assets/world.svg"

export default function Canvas(): JSX.Element {
const boxRef = useRef<HTMLDivElement>(null)
const canvasRef = useRef<HTMLCanvasElement>(null)
const engine = useRef<Engine>(Engine.create())
    useEffect(() => {


    const render = Render.create({
      element: boxRef.current!,
      engine: engine.current,
      canvas: canvasRef.current!,
      options: {
        width: boxRef.current?.clientWidth,
        height: boxRef.current?.clientHeight,
        wireframes: false,
        background: `grey`,
        
      },
    });
Engine.run(engine.current);
    Render.run(render);

    const canvas = canvasRef.current!;
engine.current.world.gravity.scale = 0

    new Country( 800, 400, engine.current.world)

     return () => {
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);

    };


    }, [])
     return (
        <div ref={boxRef} id='canvas'>
            <canvas ref={canvasRef} />

            
        </div>
     )
}