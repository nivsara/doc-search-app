import './SearchResult.scss';
import { FcReading } from "react-icons/fc";
import screenShot from '../../assets/images/doc-ss.png';
import { useEffect, useState } from 'react';
import { RetrieveDocService } from '../../services/RetrieveDoc.service';
import { SearchResultCard } from '../SearchResultCard/SearchResultCard';

function SearchResult() {

    const [searchResults, setSearchResults] = useState<any>([]);

    useEffect(() => {
        RetrieveDocService.getDocs().then((response: any) => {
            setSearchResults(response?.data);
            console.log("response", response)
        })
    }, [])

    return (
        <div className='search-result-wrapper'>
            <div className='search-result-content'>
                <div className='doc-list-wrapper'>
                    {searchResults.length > 0 && searchResults?.map((result: any, index: number) => {
                        return (
                            <SearchResultCard key={'result' + index} result={result} />
                        )
                    })
                    }
                </div>
                {searchResults.length === 0 &&
                    <div className='empty-state-content-wrapper'>
                        <div className='empty-state-img'>
                            <FcReading />
                        </div>
                        <div className='empty-state-content'>
                            <p className='empty-state-text'>Uh Oh!</p>
                            <p className='empty-state-text'>We couldn't find that keyword anywhere in your docs!</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchResult;