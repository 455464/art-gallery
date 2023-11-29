import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDoc ,doc} from 'firebase/firestore';
import { artColRef, postColRef } from '../../firebase';
import { Link } from 'react-router-dom';
import { useFormatDate } from '../../hooks/useFormatDate';

const cn = classNames.bind(styles)
function PostDetail() {
    const { postId } = useParams();
    const [postInfo, setPostInfo] = useState([]);
    const [artistId, setArtistId] = useState([]);
    useEffect(() =>{
        const fetchData = async () => {

                const currentPost = doc(postColRef,postId);
                const post = await getDoc(currentPost)
                if(post.exists()){
                  const postData = {
                    id: post.id,
                    ...post.data(),
                  }
                  const artist = postData.artist;
                  const artistDoc = doc(artColRef, artist);
                  const artistSnapshot = await getDoc(artistDoc);
        
                  if (artistSnapshot.exists()) {
                    postData.artist = artistSnapshot.data().name;
                  } 

                  const imageList = postData.list;

                  const imageArray = Object.keys(imageList).map((key) => ({
                    key,
                    ...imageList[key],
                  }));
                  
                  imageArray.sort((a, b) => parseInt(a.key.replace("pic_", "")) - parseInt(b.key.replace("pic_", "")));

                  const imgElements = imageArray.map((imageObj) => {
                    const index = parseInt(imageObj.key.replace("pic_", ""));
                    return (
                      <img
                        key={`${index}`}
                        src={`${imageObj.src}`}
                        placeholder={imageObj.place_holder}
                        alt={`${index}`}
                        className={cn('img-item')}
                      />
                    );
                   
                    });
                  postData.imgElements = imgElements;
                  setPostInfo(postData)
                  setArtistId(artist)
                }
              }
        fetchData()
    },[postId])
    const formatDate = useFormatDate

  return (
    <div className={cn('wrapper')}>
      <div className={cn('box-info')}>
        <h1 className={cn('post-title')}>{postInfo.title}</h1>
        <div className={cn('post-artist')}>Artist:&nbsp;
          <Link to={`/artist/${artistId}`} className={cn('artist-link')}>
            {postInfo.artist}
          </Link>
        </div>
        <div className={cn('post-date')}>Posted:&nbsp;{postInfo.length>0 ? '':formatDate(postInfo.date_create)}</div>
        <div className={cn('post-download')}>Download full:
          <a href={postInfo.download_link} className={cn('post-link')}>
            &nbsp; 
            {postInfo.download_link}
          </a>
        </div>
      </div>
        <div className={cn('img-container')}>
          {postInfo.imgElements}
        </div>
    </div>
  );
}

export default PostDetail;
