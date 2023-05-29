import './SearchResult.scss';
import { FcReading } from "react-icons/fc";
import { SearchResultCard } from '../SearchResultCard/SearchResultCard';

function SearchResult(props: any) {

    const onSeeMoreAction = () => {
        props.seeMoreHandler(props?.searchResultData?.length + 5);
    }

    return (
        <div className='search-result-wrapper'>
            <div className='search-result-content'>
                <div className='doc-list-wrapper'>
                    {props?.searchResultData?.length > 0 && props?.searchResultData?.map((result: any, index: number) => {
                        return (
                            <SearchResultCard key={'result' + index} result={result} />
                        )
                    })
                    }
                </div>
                {props?.searchResultData?.length > 0 && <div className='see-more-section'>
                    <button onClick={onSeeMoreAction} className='see-more-button'>See More</button>
                </div>}
                {props.searchResultData.length === 0 &&
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