import './SearchBanner.scss';
import { IoSettingsOutline } from "react-icons/io5";
import { BiNetworkChart } from "react-icons/bi";
import { FaBrain } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";

function SearchBanner() {
    return (
        <div className='search-banner-wrapper'>
            <div className='learning-icon'>
                <HiAcademicCap/>
            </div>
            <FaBrain/>
            <div className='ml-icon'>
                <BiNetworkChart/>
                <IoSettingsOutline/>
            </div>
        </div>
    )
}

export default SearchBanner;