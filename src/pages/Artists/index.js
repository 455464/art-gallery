import classNames from "classnames/bind";
import styles from './Artist.module.scss';
import { artColRef } from "../../firebase";
import { getDocs} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cn = classNames.bind(styles)
function Artists() {
    const [artistList, setArtistList] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          const artistSnapshot = await getDocs(artColRef)
    
          const artistData = artistSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
    
          setArtistList(artistData);
        };
    
        fetchData();
      }, []);
    return ( 
    <div className={cn('wrapper')}>
        {artistList.map((artist)=>(
          <Link key={artist.id} className={cn('artist-box')} to={`/artist/${artist.id}`}>
            <div 
                 style={{ backgroundImage: `url(${artist.background})` }}
                 id={`artist_${artist.id}`}
                 className={cn('artist-bg')}>
                <div className={cn('artist-info')}>
                  <img alt={`${artist.id}_avatar`} src={artist.avatar} className={cn('artist-avatar')}/>
                  <h2 className={cn('artist-name')}>{artist.name}</h2>
                </div>
            </div>
          </Link>
        ))}
    </div> );
}

export default Artists;