import { postColRef,artColRef } from "../../../firebase";
import classNames from "classnames/bind";
import { useState,useEffect,useRef } from "react";
import {getDocs, where,query, and} from '@firebase/firestore'
import styles from './Search.module.scss'
import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleXmark , faSearch} from '@fortawesome/free-solid-svg-icons';
import useDebounce from "../../../hooks/useDebounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostItem from "../../../components/PostItem";
import ArtistItem from "../../../components/ArtistItem";

const cn = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [postResult, setPostResult] = useState([]);
    const [artistResult, setArtistResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(()=>{
        if (!debouncedValue.trim()) {
            setPostResult([]);
            setArtistResult([]);
            return;
        }
        const fetchData = async () => {
            setLoading(true);
        
            const titleQuery = query(
                postColRef,
                and(
                    where('title', '>=', debouncedValue),
                    where('title', '<', debouncedValue + '\uf8ff')
                )
            );
        
            const altTitleQuery = query(
                postColRef,
                and(
                    where('alt_title', '>=', debouncedValue),
                    where('alt_title', '<', debouncedValue + '\uf8ff')
                )
            );
        
            const [titleSnapshot, altTitleSnapshot] = await Promise.all([
                getDocs(titleQuery),
                getDocs(altTitleQuery)
            ]);
        
            const titleList = titleSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        
            const altTitleList = altTitleSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        
            const postList = [...titleList, ...altTitleList];
            
            const artistQuery = query(artColRef,and(
                where('name', '>=', debouncedValue),
                where('name', '<', debouncedValue + '\uf8ff')
            ))

            const altArtistQuery = query(artColRef,and(
                where('alt_name', '>=', debouncedValue),
                where('alt_name', '<', debouncedValue + '\uf8ff')
            ))

            const [artistSnapshot, altArtistSnapshot] = await Promise.all([
                getDocs(artistQuery),
                getDocs(altArtistQuery)
            ]);
            
            const artistList = artistSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            const altArtistList = altArtistSnapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data()
            }))

            const allArtistList = [...artistList, ...altArtistList]
        
            const searchResults = {
                postList,
                allArtistList
            };
        
            setPostResult(searchResults.postList);
            setArtistResult(searchResults.allArtistList);
            setLoading(false);
        };
        
        fetchData();
    },[debouncedValue])

    const handleClear = () => {
        setSearchValue('');
        setPostResult([]);
        setArtistResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return ( 
    <div>
        <HeadlessTippy
            interactive
            visible={showResult&& (postResult.length>0 || artistResult.length>0)}
            onClickOutside={handleHideResult}
            render={() => (
            <div className={cn('search-result')}>
                {artistResult.length > 0 ? (
                    <div className={cn('wrapper')}>
                        <h5 className={cn('search-title')}>Artists:</h5>
                        {artistResult.map((data) => (
                            <ArtistItem key={data.id} data={data} onClick={handleClear}/>
                        ))}
                    </div>
                ) : null}
                {postResult.length > 0 ? (
                    <div className={cn('wrapper')}>
                        <h5 className={cn('search-title')}>Posts:</h5>
                        {postResult.map((data) => (
                            <PostItem key={data.id} data={data} onClick={handleClear}/>
                        ))}
                    </div>
                ) : null}
            </div>
        )}>
            <div className={cn('search')}>
                <input  ref={inputRef}
                        value={searchValue}
                        placeholder="Search"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                        className={cn('search-input')}
                />
                {!!searchValue && !loading && (
                    <button className={cn('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                <button className={cn('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
            </div>
        </HeadlessTippy>
    </div> 
    );
}

export default Search;