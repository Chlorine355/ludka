import { createStore } from "effector";
import { addToBalance } from "./actions";

export const $balance = createStore<number>(Number(localStorage.getItem('balance') ?? 0)).on(addToBalance, (state, payload) => state + payload)

$balance.watch((balance) => localStorage.setItem('balance', String(balance)))