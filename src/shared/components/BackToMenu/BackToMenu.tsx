import { Link } from 'react-router-dom'
import styles from './BackToMenu.module.scss'

// Кнопка возврата в главное меню, закреплённая сверху слева.
// Переиспользуется на всех игровых экранах.
export const BackToMenu = () => {
    return <Link to={'/'} className={styles.back}>
        В Меню
    </Link>
}
