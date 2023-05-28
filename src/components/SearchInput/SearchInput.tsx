import { useState } from 'react';
import './SearchInput.scss';
import { BiSearchAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

function SearchInput() {

    const [toggleSearchIcon, setSearchIcon] = useState(false)

    const onSearchFocus = () => {
        setSearchIcon(true);
    }

    const onSearchBlur = () => {
        setSearchIcon(false);
    }

    return (
        <div className='search-banner-content'>
            <div className='search-intro-text'>
                <p className='intro-text'>Type in your keyword. </p>
                <p className='intro-text'>Let us get the documents for you!</p>
            </div>
            <div className='search-input-container'>
                <input type="text" className={'search-input ' + (toggleSearchIcon ? 'input-focus' : '')} placeholder='Enter your keyword' onFocus={onSearchFocus} onBlur={onSearchBlur}></input>
                <div className='search-icon-wrapper '>
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