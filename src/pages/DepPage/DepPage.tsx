import { useUnit } from "effector-react";
import { $balance } from "../../shared/balance/store"

export const DepPage = () => {
    const balance = useUnit($balance);
    return <div>{balance}</div>
}