import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom'
import styles from './Header.module.scss'
import { faHouse, faPalette } from "@fortawesome/free-solid-svg-icons";
import Search from "../Search";


const cn = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faHouse}/>,
        title: 'Home',
        to: '/'
    },
    {
        icon: <FontAwesomeIcon icon={faPalette}/>,
        title: 'Artists',
        to: '/artists',
    },
]

function Header() {
    return ( 
        <header className={cn('wrapper')}>
            <div className={cn('inner-wrapper')}>
                <div className={cn('nav')}>
                    <Link to= "/" className={cn('logo-link')}>
                        <div style={{ backgroundImage : 'url()'}} className={cn('logo-img')}></div>
                    </Link>

                    <ul className={cn('nav-list')}>
                    {MENU_ITEMS.map((item,index) =>
                        <li key={index}className={cn('nav-item')} >
                            <Link className={cn('nav-link')}
                                to={item.to} 
                                >
                                    {item.icon}&nbsp;
                                    {item.title}
                            </Link>
                        </li>
                    )}
                    </ul>
                <Search/>
                </div>
            </div>
        </header>
    );
}

export default Header;