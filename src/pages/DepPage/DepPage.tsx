import { useUnit } from "effector-react";
import { $balance } from "../../shared/balance/store"
import {  setBalance } from "../../shared/balance/actions";

export const DepPage = () => {
    const balance = useUnit($balance);
    return <div>{balance}<button onClick={() => setBalance(100)}>Сброс до 100</button></div>
}