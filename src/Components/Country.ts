import { Composite, World, Bodies, Body, Constraint } from "matter-js"

export class Country {
  x: number;
  y: number;
  world: World;
  body: Composite;

  constructor(x: number, y: number, world: World) {
    this.x = x;
    this.y = y;
    this.world = world;
    this.body = Composite.create();

    let shapes = []
    let prev = null;
    for(let i = 0; i < 8 ; i++){

        let first = Bodies.trapezoid(
            this.x, this.y,
            64, 24 , // narrower width and shorter height
            0.2, // steeper slope
            );
            shapes.push(first)
            if(prev){
            let options = {
                bodyA: first,
                bodyB: prev,
                pointA: {x: 28, y:0},
                pointB: {x: -28, y:0},
                length: 5,
                stiffness: 1,
                render: {
                    visible: false
                }
            }
           let constraint = Constraint.create(options)
            World.add(world, constraint)
        }
             prev = first
        }
        let options = {
            bodyA: shapes[7],
            bodyB: shapes[0],
            pointA: {x: -28, y: 0},
            pointB: {x: 28, y: 0},
            length: 5,
            stiffness: 1,
            render: {
                visible: false
            }
        }
        let constraint2 = Constraint.create(options)
        World.add(world, constraint2)




    Composite.add(this.body, shapes);
    World.add(this.world, this.body);
  }
}