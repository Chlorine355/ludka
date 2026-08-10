import Matter from 'matter-js'
import { useEffect, useRef, useState } from 'react'
import { getRandomFloat } from '../../../shared/helpers/helpers';
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Composite = Matter.Composite;

const CENTER = 300;
const GAP_H = 75;
const GAP_V = 60;
const STATIC_BALL_R = 8;
const INITIAL_STATIC_BALL_Y = 100;
const BALL_R = 5;
const BALL_DROP_Y = 10;
const BOUNCINESS = 0.25


export const PlinkoArea = () => {
    const areaRef = useRef(null);
    const engine = Engine.create();
    const bets = [5, 10, 20, 50, 100, 500, -1];
    const bet = useState<number>(5);
   
    useEffect(() => {
         const render = Render.create({
        element: areaRef.current,
        engine: engine
    });
        const staticBalls = [];
        for (let row = 0; row < 7; row++) {
            for (let count = 0; count <= row; count++) {
                const rowStart = CENTER - (row * GAP_H) / 2;
                staticBalls.push(Bodies.circle(rowStart + count * GAP_H, INITIAL_STATIC_BALL_Y + row * GAP_V, STATIC_BALL_R, { isStatic: true }))
            }
        }

        const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        // add all of the bodies to the world
        Composite.add(engine.world, [...staticBalls, ground]);

        // run the renderer
        Render.run(render);

        // create runner
        const runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);

        const collisionHandler = (event) => {
            console.log(event.pairs[0])
        }

        Events.on(engine, 'collisionStart', collisionHandler)
    }, [])

    return <div>
        <button onClick={() => {
            const shift = getRandomFloat(-3, 3)
            Composite.add(engine.world, Bodies.circle(CENTER + shift, BALL_DROP_Y, BALL_R, {restitution: BOUNCINESS, label: bet}))
        }}>Drop</button>
        <div id='plinko' ref={areaRef}></div>
    </div>
}