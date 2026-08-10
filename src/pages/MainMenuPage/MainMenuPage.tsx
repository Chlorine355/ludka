import { Link } from "react-router-dom"
import styles from './MainMenuPage.module.scss'

export const MainMenuPage = () => {
    return <div className={styles.page}>
        Меню
        <li className={styles.menu}>
        <Link to={'/roulette'}>Рулетка</Link>
        <Link to={'/slots'}>Слоты</Link>
        <Link to={'/plinko'}>Plinko</Link>
        <Link to={'/dodep'}>Депнуть</Link>
        </li>
    </div>
}