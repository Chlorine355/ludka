import Matter, { Engine as EngineType, type IEventCollision } from 'matter-js'
import { useEffect, useRef, useState } from 'react'
import { getRandomFloat } from '../../../shared/helpers/helpers';
import styles from './PlinkoArea.module.scss'
import { addToBalance } from '../../../shared/balance/actions';
import { $balance } from '../../../shared/balance/store';
import { useUnit } from 'effector-react';
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Composite = Matter.Composite;

const CENTER = 500;
const GAP_H = 40;
const GAP_V = 30;

const STATIC_BALL_R = 5;
const BALL_R = 3;

const INITIAL_STATIC_BALL_Y = 100;
const BALL_DROP_Y = 10;
const BOUNCINESS = 0.25
const ROW_COUNT = 15;
const MULTIPLIERS =  [10, 3, 2, 1, 0.75, 0.25, 0.1, 0.1, 0.25, 0.75, 1, 2, 3, 10]   // row count - 1
const GAP_TO_BOXES = 20;


export const PlinkoArea = () => {
    const areaRef = useRef(null);
    const balance = useUnit($balance);
    const textCanvasRef = useRef(null);
    const bets = [5, 10, 20, 50, 100, 500, 1000];
    const [bet, setBet] = useState<number>(5);
    const ballsRef = useRef<Record<number, object>>({});
    const [engine] = useState(Engine.create());

    useEffect(() => {
        const staticBalls = [];
        for (let row = 0; row < ROW_COUNT; row++) {
            for (let count = 0; count <= row; count++) {
                const rowStart = CENTER - (row * GAP_H) / 2;
                staticBalls.push(Bodies.circle(rowStart + count * GAP_H, INITIAL_STATIC_BALL_Y + row * GAP_V, STATIC_BALL_R, { isStatic: true }))
            }
        }
        const ctx = textCanvasRef.current.getContext('2d');
        ctx.font = '8pt Arial';
        ctx.fillStyle = 'white'; // Цвет заливки
        ctx.textAlign = 'center';

        let rowStart = CENTER - ((ROW_COUNT - 2) * GAP_H) / 2;
        const boxes = [];
        for (let row = 0; row < ROW_COUNT - 1; row++) {
            const multiplier = MULTIPLIERS[row]
            ctx.fillText(`x${multiplier}`, rowStart + row * GAP_H, INITIAL_STATIC_BALL_Y + ROW_COUNT * GAP_V + GAP_TO_BOXES);
            boxes.push(Bodies.rectangle(rowStart + row * GAP_H, INITIAL_STATIC_BALL_Y + ROW_COUNT * GAP_V + GAP_TO_BOXES, GAP_H, GAP_V, { isSensor: true, isStatic: true, label: 'BOX', value: multiplier /* multiplier */ }))
        }

        const dividerWalls = [];
        rowStart = CENTER - ((ROW_COUNT - 1) * GAP_H) / 2;
        for (let row = 0; row < ROW_COUNT; row++) {
            dividerWalls.push(Bodies.rectangle(rowStart + row * GAP_H, INITIAL_STATIC_BALL_Y + ROW_COUNT * GAP_V + GAP_TO_BOXES - 5, 2, GAP_V + 5, { isStatic: true }))
        }

        // add all of the bodies to the world
        Composite.add(engine.world, [...staticBalls, ...dividerWalls, ...boxes]);
        const render = Render.create({
            canvas: areaRef.current,
            engine: engine,
        });
        render.canvas.width = 1200;
        render.canvas.height = 800;

        // run the renderer
        Render.run(render);

        // create runner
        const runner = Runner.create();
        // run the engine
        Runner.run(runner, engine);

        const collisionHandler = (event: IEventCollision<EngineType>) => {
            const pairs = event.pairs;
            for (const pair of pairs) {
                if (pair.bodyA.label === 'BOX' || pair.bodyB.label === 'BOX') {
                    const [box, ball] = pair.bodyA.label === 'BOX' ? [pair.bodyA, pair.bodyB] : [pair.bodyB, pair.bodyA]
                    addToBalance(ball.value * box.value);
                    Composite.remove(engine.world, ball)
                }
            }
        }
        Events.on(engine, 'collisionStart', collisionHandler)
    }, [])

    return <div>
        <select onChange={(event) => setBet(Number(event.target.value))}>
            {bets.map((bet) => <option value={bet}>{bet}</option>)}
        </select>
        <button disabled={balance < 0.01} onClick={() => {
            const shift = getRandomFloat(-3, 3)
            const availableBet = Math.min(bet, balance)
            addToBalance(-availableBet);
            const body = Bodies.circle(CENTER + shift, BALL_DROP_Y, BALL_R, { restitution: BOUNCINESS, label: 'BALL', value: availableBet })
            ballsRef.current[body.id] = body;
            Composite.add(engine.world, body);
        }}>Деп</button>
        <div id='plinko' className={styles.main}>
            <canvas id='canvas' width={1200} height={800} ref={areaRef} style={{ position: 'absolute', width:'100%' }}></canvas>
            <canvas id='overlay' width={1200} height={800} style={{ background: 'transparent', position: 'absolute', width:'100%' }} ref={textCanvasRef}></canvas>
        </div>
    </div>
}