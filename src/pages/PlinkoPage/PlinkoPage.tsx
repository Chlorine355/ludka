import { useUnit } from "effector-react";
import { $balance } from "../../shared/balance/store"

export const PlinkoPage = () => {
    const balance = useUnit($balance);
    return <div>{balance}</div>
}