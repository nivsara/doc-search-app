import { useState } from 'react';
import './SearchInput.scss';
import { BiSearchAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

function SearchInput(props: any) {

    const [toggleSearchIcon, setSearchIcon] = useState(false);
    const [searchText, setSearchText] = useState('');

    const onSearchFocus = () => {
        setSearchIcon(true);
    }

    const onSearchBlur = () => {
        setSearchIcon(false);
    }

    const onInputChange = (event: any) => {
        setSearchText(event?.target?.value);
    }

    const searchConferencePapers = () => {
        props.searchEvent({
            'query' : searchText,
            'result-size': 5
        });
    }

    const onInputEnter = (event: any) => {
        if (event.keyCode === 13) {
            searchConferencePapers();
        }
    }

    return (
        <div className='search-banner-content'>
            <div className='search-intro-text'>
                <p className='intro-text'>Type in your keyword. </p>
                <p className='intro-text'>Let us get the documents for you!</p>
            </div>
            <div className='search-input-container'>
                <input type="text" className={'search-input ' + (toggleSearchIcon ? 'input-focus' : '')} placeholder='Enter your keyword' onChange={onInputChange} onKeyDown={onInputEnter} onFocus={onSearchFocus} onBlur={onSearchBlur}></input>
                <div className='search-icon-wrapper ' onClick={searchConferencePapers}>
                    <div className={'search-icon animate__animated ' + (toggleSearchIcon ? 'animate__fadeOut hide-icon' : 'animate__fadeIn show-icon')}>
                        <BiSearchAlt />
                    </div>
                    <div className={'search-arrow-icon animate__animated ' + (toggleSearchIcon ? 'animate__fadeIn show-icon' : 'animate__fadeOut hide-icon')}>
                        <BsArrowRight />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchInput;