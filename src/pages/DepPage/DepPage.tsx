import { useUnit } from "effector-react";
import { $balance } from "../../shared/balance/store"
import { setBalance } from "../../shared/balance/actions";
import styles from './DepPage.module.scss'

export const DepPage = () => {
    const balance = useUnit($balance);
    return <div className={styles.page}>
        <h1 className={styles.title}>Текущий баланс</h1>
        <div className={styles.balance}>{balance}</div>
        <button className={styles.reset} onClick={() => setBalance(100)}>Сброс до 100</button>
    </div>
}
