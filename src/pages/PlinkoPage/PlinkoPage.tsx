import { useUnit } from "effector-react";
import { $balance } from "../../shared/balance/store"
import { PlinkoArea } from "./components/PlinkoArea";
import { BackToMenu } from "../../shared/components/BackToMenu/BackToMenu";
import styles from './PlinkoPage.module.scss'

export const PlinkoPage = () => {
    const balance = useUnit($balance);
    return <div className={styles.page}>
        <BackToMenu/>
        <h1 className={styles.title}>Plinko</h1>
        <div className={styles.balance}>{balance}</div>
        <PlinkoArea/>
    </div>
}
