import classNames from "classnames/bind";
import styles from "./Home.module.scss"
import { Link} from 'react-router-dom';
import React from "react";
import PostByDate from "./components/PostByDate/PostByDate";
import PostByView from "./components/PostByView/PostByView";


const cn = classNames.bind(styles);

function Home() {
    return ( 
    <div className={cn('wrapper')}>
        <div className={cn('latest-post')}>
            <div className={cn('heading')}>
                <div className={cn('heading-separater')}>_____</div>
                <div className={cn('heading-title')}>Lastest Post</div>
                <div className={cn('heading-separater')}>_____</div>
            </div>
        <PostByDate/>
        <Link to={'/post'} className={cn("item-link")}>
        <div className={cn('see-more')}>
            <button className={cn('btn-latest')}>See more...</button> 
        </div>    
        </Link>
       </div>  

        <div className={cn('latest-post')}>
            <div className={cn('heading')}>
              <div className={cn('heading-separater')}>_____</div>
              <div className={cn('heading-title')}>Most Viewed</div>
              <div className={cn('heading-separater')}>_____</div>
            </div>
          <PostByView/>
       </div>  
    </div> );
}

export default Home;