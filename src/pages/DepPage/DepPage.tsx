import { useUnit } from "effector-react";
import { $balance } from "../../shared/balance/store"
import { addToBalance } from "../../shared/balance/actions";
import { BackToMenu } from "../../shared/components/BackToMenu/BackToMenu";
import styles from './DepPage.module.scss'
import { useState } from "react";

export const DepPage = () => {
    const balance = useUnit($balance);
    const [dep, setDep] = useState(100);
    return <div className={styles.page}>
        <BackToMenu/>
        <h1 className={styles.title}>Текущий баланс</h1>
        <div className={styles.balance}>{balance}</div>
        <h1 className={styles.title}>Додеп</h1>
        <div className={styles.balance}>{dep}</div>
        <input type='range' value={dep} onChange={(event) => setDep(Number(event.target.value) || 0)} min={10} max={10000} step={5}/>
        <button className={styles.reset} onClick={() => addToBalance(dep)}>Депнуть</button>
    </div>
}
