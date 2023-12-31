import classNames from "classnames/bind";
import styles from "../../pages/Home/Home.module.scss"
import { Link} from 'react-router-dom';
import React from "react";
import { getDocs,updateDoc,orderBy,doc,increment,query } from "@firebase/firestore";
import { artColRef,postColRef } from "../../firebase";
import { useEffect,useState } from "react";
import { useFormatDate } from "../../hooks/useFormatDate";


const cn = classNames.bind(styles);

function Post() {
  const [postList, setPostList] = useState([]);
    useEffect(() =>{
        const fetchData = async() => {
            const postQuery = query(postColRef,orderBy('date_create','desc'))
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
    <div className={cn('wrapper')}>
        <div className={cn('latest-post')}>
            <div className={cn('heading')}>
                <div className={cn('heading-separater')}>_____</div>
                <div className={cn('heading-title')}>All Post</div>
                <div className={cn('heading-separater')}>_____</div>
            </div>
        <div className={cn('item-list')}>
        {postList.map((post)=>(
            <Link key={post.id} to={`/post/${post.id}`} className={cn('item-box')} onClick={() => increaseView(post.id)}
                  style={{backgroundImage: `url(https://drive.google.com/uc?export=view&id=${post.img})`}}
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
       </div>  
    </div> );
}

export default Post;