import { Link } from "react-router-dom"
import styles from './MainMenuPage.module.scss'

export const MainMenuPage = () => {
    return <div className={styles.page}>
        <h1 className={styles.title}>Ludka Casino</h1>
        <ul className={styles.menu}>
            <li className={styles.item}>
                <Link to={'/roulette'} className={`${styles.link} ${styles.roulette}`}>Рулетка</Link>
            </li>
            <li className={styles.item}>
                <Link to={'/slots'} className={`${styles.link} ${styles.slots}`}>Слоты</Link>
            </li>
            <li className={styles.item}>
                <Link to={'/plinko'} className={`${styles.link} ${styles.plinko}`}>Plinko</Link>
            </li>
            <li className={styles.item}>
                <Link to={'/dodep'} className={`${styles.link} ${styles.deposit}`}>Депнуть</Link>
            </li>
        </ul>
    </div>
}
