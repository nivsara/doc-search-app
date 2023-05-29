import './Search.scss';
import SearchInput from '../SearchInput/SearchInput';
import SearchResult from '../SearchResult/SearchResult';
import SearchBanner from '../SearchBanner/SearchBanner';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';
import { RetrieveDocService } from '../../services/RetrieveDoc.service';

function Search() {
    const [showSearch, setSearchFlag] = useState(false);
    const [searchParams, setSearchParams] = useState<any>({});
    const [searchResults, setSearchResults] = useState<any>([]);

    const goToGitHub = () => {
        window.open('https://github.com/Vishnu-Naik', '_blank');
    }

    const onSearchTriggered = (data: any) => {
        retrieveDocs(data);
    }

    const retrieveDocs =(searchParams: any) => {
        setSearchParams(searchParams);
        RetrieveDocService.getDocs(searchParams).then((response: any) => {
            response.data.map((item: any) => {
                item['match_score'] = Math.floor(item['match_score'] * 100)
            });
            setSearchResults(response?.data);
            setSearchFlag(true);
        })
    }

    const onSeeMoreClick = (count: any) => {
        let searchQueryParams : any = {
            'query' : searchParams.query,
            'result-size': count
        }
        retrieveDocs(searchQueryParams);
    }

    return (
        <div className='search-app-container'>
            <div className='search-banner-container'>
                <div onClick={goToGitHub} className='github-link'>
                    <span><FaGithub /></span>
                </div>
                <div className='search-image-wrapper'>
                    <SearchBanner />
                </div>
                <div className='search-info-wrapper'>
                    <SearchInput searchEvent={onSearchTriggered}/>
                </div>
            </div>
            {showSearch && <SearchResult searchResultData={searchResults} seeMoreHandler={onSeeMoreClick}/>}
        </div>
    )
}

export default Search;