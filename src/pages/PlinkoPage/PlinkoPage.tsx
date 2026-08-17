import { useUnit } from "effector-react";
import { $balance } from "../../shared/balance/store"
import { PlinkoArea } from "./components/PlinkoArea";
import styles from './PlinkoPage.module.scss'

export const PlinkoPage = () => {
    const balance = useUnit($balance);
    return <div className={styles.page}>
        <h1 className={styles.title}>Plinko</h1>
        <div className={styles.balance}>{balance}</div>
        <PlinkoArea/>
    </div>
}
