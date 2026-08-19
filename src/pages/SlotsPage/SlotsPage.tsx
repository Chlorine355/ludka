import { useUnit } from "effector-react";
import { $balance } from "../../shared/balance/store"
import { BackToMenu } from "../../shared/components/BackToMenu/BackToMenu";

export const SlotsPage = () => {
    const balance = useUnit($balance);
    return <div>
        <BackToMenu/>
        {balance}
    </div>
}