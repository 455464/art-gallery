import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

function PostItem({ data, onClick }) {
    const handleClick = () => {
        onClick()
    }
    return (
        <Link to={`/post/${data.id}`} className={cx('wrapper')} onClick={handleClick}>
            <img className={cx('avatar')} 
                 src={`https://drive.google.com/uc?export=view&id=${data.img}&s=800x600`}
                 alt={data.name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.title}</span>
                </h4>
                <h5 className={cx('artist')}>
                    <span><i>{data.artist}</i></span>
                </h5>
            </div>
        </Link>
    );
}

export default PostItem
