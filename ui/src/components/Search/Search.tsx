import './Search.scss';
import SearchInput from '../SearchInput/SearchInput';
import SearchResult from '../SearchResult/SearchResult';
import SearchBanner from '../SearchBanner/SearchBanner';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';
import { RetrieveDocService } from '../../services/RetrieveDoc.service';
import { Loader } from '../../utils/GlobalUiComponents/Loader/Loader';

function Search() {
    const [showSearch, setSearchFlag] = useState(false);
    const [showLoader, setLoaderFlag] = useState(false);
    const [showSeeMoreLoader, setSeeMoreLoaderFlag] = useState(false);
    const [searchParams, setSearchParams] = useState<any>({});
    const [searchResults, setSearchResults] = useState<any>([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const goToGitHub = () => {
        window.open('https://github.com/nivsara/doc-search-app', '_blank');
    }

    const onSearchTriggered = async (data: any) => {
        setLoaderFlag(true);
        setSearchFlag(false);
        await retrieveDocs(data);
        setSearchFlag(true);
    }

    const retrieveDocs = async (searchParams: any, isSeeMore? : boolean) => {
        setSearchParams(searchParams);
        await RetrieveDocService.getDocs(searchParams).then((response: any) => {
            response.data.map((item: any) => {
                item['match_score'] = Math.floor(item['match_score'] * 100)
            }); 
            setLoaderFlag(false);
            setSeeMoreLoaderFlag(false);
            setSearchResults(response.data);
        });
    }

    const searchDocs = async (keyword: any) => {
        let param = {
            'query' : keyword,
            'result-size': 5
        }
        setLoaderFlag(true);
        setSearchFlag(false);
        setSearchKeyword(keyword);
        await retrieveDocs(param);
        setSearchFlag(true);
    }

    const onSeeMoreClick = async (count: any) => {
        let searchQueryParams: any = {
            'query': searchParams.query,
            'result-size': count
        }
        setSeeMoreLoaderFlag(true);
        await retrieveDocs(searchQueryParams, true);
    }

    return (
        <>
            <div className='search-app-container'>
                <div className='search-banner-container'>
                    <div onClick={goToGitHub} className='github-link'>
                        <span><FaGithub /></span>
                    </div>
                    <div className='search-image-wrapper'>
                        <SearchBanner />
                    </div>
                    <div className='search-info-wrapper'>
                        <SearchInput searchEvent={onSearchTriggered} searchQuery={searchKeyword} isLoading={showLoader}/>
                    </div>
                </div>
                {showSearch && <SearchResult isLoading={showSeeMoreLoader} searchResultData={searchResults} seeMoreHandler={onSeeMoreClick} searchConferencePaperHandler={searchDocs}/>}
            </div>
        </>
    )
}

export default Search;