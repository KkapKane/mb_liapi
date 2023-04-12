import { Composite, World, Bodies, Body, Constraint, Events, Engine } from "matter-js"

export class Country {
    x: number;
    y: number;
    engine: Engine;
    body: Composite;
    
    constructor(x: number, y: number, engine: Engine) {
        this.x = x;
        this.y = y;
        this.engine = engine;
        this.body = Composite.create();
        
        let shapes: any = []
        let prev = null;
        let dx = 1
        let mold =  Bodies.circle(this.x, this.y, 30, {isStatic: true, })
        for(let i = 0; i < 8 ; i++){
          let shape = Bodies.trapezoid(
              this.x + i * dx, this.y, // Update x-position based on dx
              64, 24,
              0.2,
              {friction: 10, frictionAir: 1}
          );
          shapes.push(shape)
          if(prev){
              let options = {
                  bodyA: shape,
                  bodyB: prev,
                  pointA: {x: 28, y:5},
                  pointB: {x: -28, y:0},
                  length: 5,
                  stiffness: 1,
                  render: {
                      visible: true,
                   
                  }
              }
              let constraint = Constraint.create(options)
              World.add(engine.world, constraint)
          }
          prev = shape
      }
  
      // Add constraint between first and last shape
      let options = {
          bodyA: shapes[7],
          bodyB: shapes[0],
          pointA: {x: -28, y: 0},
          pointB: {x: 28, y: 0},
          length: 5,
          stiffness: 1,
          render: {
              visible: true
          }
      }
      let constraint2 = Constraint.create(options)
      World.add(engine.world, constraint2)
      World.add(engine.world, mold )
    //   for(let i = 0; i < 8; i++){
    //     if(i == 0 || i == 4 ){
    //   let options2={
        
    //       bodyA: shapes[i],
    //       bodyB: mold,
         
    //       length: 70,
    //       stiffness: 1,
    //       render: {
    //           visible:true 
    //       }
    //   }
    //   let constraint3 = Constraint.create(options2)
    //   World.add(engine.world, constraint3)
    //   }
    // }

      Events.on(engine, "afterUpdate", () =>{
        for(let i = 0; i < shapes.length; i++){
            // @ts-expect-error
            if(Body.getSpeed(shapes[i]) > 10){
            // @ts-expect-error
                Body.setSpeed(shapes[i], 10)
            }
        }
      })
  
      Composite.add(this.body, shapes);
      World.add(engine.world, this.body);
    }
  }