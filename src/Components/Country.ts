import { Composite, World, Bodies, Body, Constraint, Events, Engine } from "matter-js"

export class Country  {
    
    x: number;
    y: number;
    engine: Engine;
    body: Composite;
    scaler: number;
    constraints: Constraint[];
    
    constructor(x: number, y: number, scaler: number, engine: Engine) {
        
        this.x = x;
        this.y = y;
        this.engine = engine;
        this.body = Composite.create();
        this.scaler = scaler;
        let shapes: any = []
        let prev = null;
        let dx = 1
        this.constraints = []

let w = 64 * scaler;
let h = 24 * scaler;
let slope = 0.2 * scaler;

let first = Bodies.trapezoid(
    this.x , this.y, // Update x-position based on dx
    w, h,
    slope,
    { isStatic: false, friction: 10, frictionAir: 1 }
);

let second = Bodies.trapezoid(
    this.x + 70, this.y , // Update x-position based on dx
    w, h,
    slope,
    { friction: 10, frictionAir: 1 }
);

let third = Bodies.trapezoid(
    this.x + 140, this.y  , // Update x-position based on dx
    w, h,
    slope,
    { friction: 10, frictionAir: 1 }
);

let fourth = Bodies.trapezoid(
    this.x + 210, this.y , // Update x-position based on dx
    w, h,
    slope,
    { friction: 10, frictionAir: 1 }
);

let fifth = Bodies.trapezoid(
    this.x + 280, this.y  , // Update x-position based on dx
    w, h,
    slope,
    { friction: 10, frictionAir: 1 }
);

let sixth = Bodies.trapezoid(
    this.x + 350, this.y  , // Update x-position based on dx
    w, h,
    slope,
    { friction: 10, frictionAir: 1 }
);

let seventh = Bodies.trapezoid(
    this.x + 420, this.y  , // Update x-position based on dx
    w, h,
    slope,
    { friction: 10, frictionAir: 1 }
);

let eighth = Bodies.trapezoid(
    this.x + 490, this.y , // Update x-position based on dx
    w, h,
    slope,
    { friction: 10, frictionAir: 1 }
);

        shapes.push(first)
        shapes.push(second)
        shapes.push(third)
        shapes.push(fourth)
        shapes.push(fifth)
        shapes.push(sixth)
        shapes.push(seventh)
        shapes.push(eighth)


    for(let i = 0 ; i < 8; i++){
        if(prev){
        let options = {
            bodyA: shapes[i],
            bodyB: prev,
            
            pointA: {x: 28 * scaler , y:5 * scaler},
            pointB: {x: -28 * scaler , y:5 * scaler },
            length: 5 * scaler,
            stiffness: .2,

            render: {
                visible: false,
             
            }
            
        }
        let constraint = Constraint.create(options)
       this.constraints.push(constraint)
    }
    prev = shapes[i]
    }
    for(let i = 0 ; i < 8; i++){
        if(prev){
        let options = {
            bodyA: shapes[i],
            bodyB: prev,
            
            pointA: {x: 28 * scaler, y:-20 * scaler},
            pointB: {x: -28 * scaler, y:-20 * scaler},
            length: 5 * scaler,
            stiffness: 1,

            render: {
                visible: false,
             
            }
            
        }
        let constraint = Constraint.create(options)
        this.constraints.push(constraint)
    }
    prev = shapes[i]
    }
let options2 = {
     bodyA: shapes[7],
            bodyB: shapes[0],
            
            pointA: {x: -28 * scaler, y:0},
            pointB: {x: 28 * scaler, y:0},
            length: 5 * scaler,
            stiffness: 1,

            render: {
                visible: false,
             
            }
}
let options3 = {
     bodyA: shapes[7],
            bodyB: shapes[0],
            
            pointA: {x: -28 * scaler, y:-20 * scaler},
            pointB: {x: 28 * scaler, y:-20 * scaler},
            length: 5 * scaler,
            stiffness: 1,

            render: {
                visible: false,
             
            }
}
    let constraint2 = Constraint.create(options2)
    let constraint3 = Constraint.create(options3)
    this.constraints.push(constraint2)
    this.constraints.push(constraint3)
    World.add(engine.world, this.constraints)
      Events.on(engine, "afterUpdate", () =>{
        for(let i = 0; i < shapes.length; i++){
            // @ts-expect-error
            if(Body.getSpeed(shapes[i]) > 10){
            // @ts-expect-error
                Body.setSpeed(shapes[i],  0)
            }
        }
      })
  

    //   setTimeout(() =>{

    //       let mold = Bodies.polygon(this.x + (180 * scaler) , this.y, 8, 74 * scaler)
          
    //       World.add(engine.world, mold)
    //   },1000)
      Composite.add(this.body, shapes);
      World.add(engine.world, this.body);
    }
  }