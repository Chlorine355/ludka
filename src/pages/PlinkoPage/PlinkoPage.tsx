import { useUnit } from "effector-react";
import { $balance } from "../../shared/balance/store"
import { PlinkoArea } from "./components/PlinkoArea";

export const PlinkoPage = () => {
    const balance = useUnit($balance);
    return <div>
        {balance}
        <PlinkoArea/></div>
}