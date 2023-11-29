import classNames from "classnames/bind";
import styles from './PostByView.module.scss'
import {useState, useEffect} from 'react'
import { postColRef,artColRef } from "../../../../firebase";
import {getDocs,query,orderBy,limit, increment, updateDoc,doc} from "@firebase/firestore"
import { useFormatDate } from "../../../../hooks/useFormatDate";
import { Link } from "react-router-dom";

const cn = classNames.bind(styles)
function PostByView() {
    const [postList, setPostList] = useState([]);
    useEffect(() =>{
        const fetchData = async() => {
            const postQuery = query(postColRef, 
                orderBy('view','desc'),
                limit(8)
            )
            const postSnapshot = await getDocs(postQuery)
            
            const postData = postSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))

            const artistSnapshot = await getDocs(artColRef)
            const artistData = artistSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))

            const postJoin = postData.map((postAttr) => ({
                ...postAttr,
                artist: artistData.find((artistAttr) => artistAttr.id === postAttr.artist),
              
              }));
            
            setPostList(postJoin)
        }
        fetchData()
    },[])
    const formatDate = useFormatDate

    const increaseView = async (postId) =>{
        const updatePostView = postList.map((post) =>{
          if (post.id === postId){
            const updateView = post.view + 1
            return {
              ...post,
              view: updateView
            }
          }
          return post
        })
        const postRef = doc(postColRef,postId)
        await updateDoc(postRef, {
          view: increment(1),
      });
  
        setPostList(updatePostView)
      }

    return ( 
    <div className={cn('item-list')}>
        {postList.map((post)=>(
            <Link key={post.id} to={`/post/${post.id}`} className={cn('item-box')} onClick={() => increaseView(post.id)}
                  style={{backgroundImage: `url(${post.img})`}}
                  >
            <div  id={`post_${post.id}`}>
                <div className={cn("item-info")}>
                    <div className={cn("item-title")}>{post.title}</div>
                    <div className={cn("item-artist")}>{`Artist: ${post.artist.name}`}</div>
                    <div className={cn("item-date")}>{formatDate(post.date_create)}</div>
                </div>
            </div>   
            </Link>
        ))}
    </div>
    
    );
}

export default PostByView;