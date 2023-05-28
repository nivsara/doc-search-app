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

    return (
        <>
            <div className='card'>
                <div className='doc-image-wrapper'>
                    {/* <img className='doc-image' src={screenShot} alt="" /> */}
                    <div className='doc-icon-group'>
                        <div className='icon-placeholder download-icon'>
                            <IoCloudDownloadOutline />
                        </div>
                    </div>
                </div>
                <div className='doc-info-wrapper'>
                    <p className='doc-title'>{props.result.title}</p>
                    <p className='doc-author'>{props.result.authors}</p>
                    <p className='conference-name'><i>{props.result.conference_name}</i></p>
                    <p className='conference-date'>{props.result.year}</p>
                </div>
                <div className='doc-abstract-wrapper'>
                    <TruncateText content={props.result.abstract_text} />
                    <p className='see-more-info' onClick={showPopup}>Click to see full abstract</p>
                </div>
                <div className='keywords-wrapper'>
                    <span className='keyword-pill'>Machine Learning</span>
                    <span className='keyword-pill'>Neural Networks</span>
                    <span className='keyword-pill'>Deep Learning</span>
                    <span className='keyword-pill'>AI</span>
                    <span className='keyword-pill'>APSA</span>
                </div>
                {showPopupFlag && <ModalPopup content={props.result.abstract_text} closeModalPopup={closePopup}/>}
            </div>
        </>
    )
}