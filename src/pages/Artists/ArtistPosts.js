import { useParams } from "react-router-dom";
import { getDoc,doc, getDocs , query, where,} from "@firebase/firestore";
import { postColRef, artColRef} from "../../firebase";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import styles from '../Home/Home.module.scss'
import { Link } from "react-router-dom";
import { useFormatDate } from "../../hooks/useFormatDate";

const cn = classNames.bind(styles)
function ArtistPost() {
    const {artistId} = useParams()
    const [postList, setPostList] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            const artistInfo = doc(artColRef, artistId)
            const artistData = await getDoc(artistInfo)
            const q = query(postColRef, where("artist", "==", artistId));
            const postSnapshot = await getDocs(q)
            const postData = postSnapshot.docs.map((post) =>({
                id: post.id,
                ...post.data(),
                artist : artistData.data().name
            }))
            
            setPostList(postData)
        }
        fetchData()
    },[artistId])
    // console.log(postList[0].title)
    const formatDate = useFormatDate
    return ( 
    <div className={cn('wrapper')}>
        <div className={cn('heading')}>
            <div className={cn('heading-separater')}>_____</div>
            {postList.length >0 &&
                (<h3 className={cn('heading-title')}>Posts of {postList[0].artist}</h3>)
            }
            <div className={cn('heading-separater')}>_____</div>
        </div>
        
        <div className={cn('item-list')}>
        {postList.map((post)=>(
                <Link key={post.id} to={`/post/${post.id}`} className={cn('item-box')}
                      style={{backgroundImage: `url(${post.img})`}}
                      >
                <div  id={`post_${post.id}`}>
                    <div className={cn("item-info")}>
                        <div className={cn("item-title")}>{post.title}</div>
                        <div className={cn("item-artist")}>{`Artist: ${post.artist}`}</div>
                        <div className={cn("item-date")}>{formatDate(post.date_create)}</div>
                    </div>
                </div>   
                </Link>
            ))}
        </div>
    
    </div> );
}

export default ArtistPost;