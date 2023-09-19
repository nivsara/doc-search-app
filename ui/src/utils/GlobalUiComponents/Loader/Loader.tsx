import { HiOutlineDocumentText } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import './Loader.scss';

export function Loader() {
    return (
        <div className='loader-wrapper'>
            <div className='loader'>
                <div className='magnifying-glass'><HiMagnifyingGlass/></div>
                <div className='path'><HiOutlineDocumentText/></div>
                <div className='path'><HiOutlineDocumentText/></div>
                <div className='path'><HiOutlineDocumentText/></div>
                <div className='path'><HiOutlineDocumentText/></div>
                <div className='path'><HiOutlineDocumentText/></div>
                <div className='path'><HiOutlineDocumentText/></div>
                <div className='path'><HiOutlineDocumentText/></div>
                <div className='path'><HiOutlineDocumentText/></div>
            </div>
            <div className='loader-text'>
                <p className='content'>Please wait while we are searching in research paper corpus...</p>
            </div>
        </div>
    )
}
