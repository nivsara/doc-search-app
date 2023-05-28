import './Search.scss';
import SearchInput from '../SearchInput/SearchInput';
import SearchResult from '../SearchResult/SearchResult';
import SearchBanner from '../SearchBanner/SearchBanner';
import { FaGithub } from 'react-icons/fa';

function Search() {

    const goToGitHub = () => {
        window.open('https://github.com/Vishnu-Naik', '_blank');
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
                    <SearchInput />
                </div>
            </div>
            <SearchResult />
        </div>
    )
}

export default Search;