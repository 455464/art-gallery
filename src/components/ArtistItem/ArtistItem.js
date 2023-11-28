import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ArtistItem.module.scss';

const cx = classNames.bind(styles);

function ArtistItem({ data, onClick }) {
    const handleClick = () => {
        onClick()
    }
    return (
        <Link to={`/artist/${data.id}`} className={cx('wrapper')} onClick={handleClick} >
            <img className={cx('avatar')} src={data.avatar} alt={data.name}  />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.name}</span>
                </h4>
            </div>
        </Link>
    );
}

export default ArtistItem;
