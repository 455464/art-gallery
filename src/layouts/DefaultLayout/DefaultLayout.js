import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import styles from './DefaultLayout.module.scss';

const cn = classNames.bind(styles);

function DefaultLayout({children}) {
    return ( 
        <div className={cn('wrapper')}>
            <Header/>
            <div className={cn('container')}>
                <div className={cn('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;