import { createEvent } from "effector";

export const addToBalance = createEvent<number>()
export const setBalance = createEvent<number>()