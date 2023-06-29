import { IoCloudDownloadOutline } from 'react-icons/io5';
import './SearchResultCard.scss';
import { TruncateText } from '../../utils/GlobalUiComponents/TruncateText/TruncateText';
import { ModalPopup } from '../../utils/GlobalUiComponents/ModalPopup/ModalPopup';
import { useState } from 'react';

export function SearchResultCard(props: any) {

    const [showPopupFlag, setShowPopup] = useState(false);

    const showPopup = () => {
        setShowPopup(true);
        document.body.classList.add('modal-open');
    }

    const closePopup = () => {
        setShowPopup(false);
        document.body.classList.remove('modal-open');
    }

    const searchKeyword = (keyword: any) => {
        props.searchKeywordHandler(keyword);
    }

    return (
        <>
            <div className='card'>
                <div className='doc-image-wrapper'>
                    <div className='doc-icon-group'>
                        <div className="ribbon ribbon-top-left">
                            <span className='match-score-value'>
                                <span className='match-score'>{props.result.match_score}% Match</span>
                            </span>
                        </div>
                        <div className='icon-placeholder download-icon'>
                            <a href={props.result.paper_link} target='blank'><IoCloudDownloadOutline /></a>
                        </div>
                    </div>
                </div>
                <div className='doc-info-wrapper'>
                    <div className='icon-placeholder download-icon'>
                        <a href={props.result.paper_link} target='blank'><IoCloudDownloadOutline /></a>
                    </div>
                    <p className='doc-title'>{props.result.title}</p>
                    <p className='doc-author'>{props.result.authors.join(', ')}</p>
                    <p className='conference-name'><i>{props.result.conference_name}</i></p>
                    <p className='conference-date'>{props.result.year}</p>
                </div>
                <div className='doc-abstract-wrapper'>
                    <span className='abstract-text'>Abstract : </span><TruncateText content={props.result.abstract_text} />
                    {props.result.abstract_text !== 'Abstract Unavailable' && <p className='see-more-info' onClick={showPopup}>Click to see full abstract</p>}
                </div>
                {props.result.abstract_text !== 'Abstract Unavailable' && <div className='keywords-wrapper'>
                    {props?.result?.keywords?.length > 0 && props?.result?.keywords?.map((keyword: any, index: number) => {
                        return (
                            <span key={'keyword' + index} className='keyword-pill' onClick={() => searchKeyword(keyword)}>{keyword}</span>
                        )
                    })}
                </div>}
                {showPopupFlag && <ModalPopup content={props.result.abstract_text} closeModalPopup={closePopup} />}
            </div>
        </>
    )
}