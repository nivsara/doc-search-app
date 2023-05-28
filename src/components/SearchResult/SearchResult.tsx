import './SearchResult.scss';
import { FcReading } from "react-icons/fc";
import { IoCloudDownloadOutline } from "react-icons/io5";
import screenShot from '../../assets/images/doc-ss.png';

function SearchResult() {
    return (
        <div className='search-result-wrapper'>
            <div className='search-result-content'>
                <div className='doc-list-wrapper'>
                    <div className='card'>
                        <div className='doc-image-wrapper'>
                            {/* <img className='doc-image' src={screenShot} alt="" /> */}
                            <div className='doc-icon-group'>
                                <div className='icon-placeholder download-icon'>
                                    <IoCloudDownloadOutline />
                                </div>
                            </div>
                        </div>
                        <div className='keywords-wrapper'>
                                <span className='keyword-pill'>Machine Learning</span>
                                <span className='keyword-pill'>Neural Networks</span>
                                <span className='keyword-pill'>Deep Learning</span>
                                <span className='keyword-pill'>AI</span>
                                <span className='keyword-pill'>APSA</span>
                        </div>
                        <div className='doc-info-wrapper'>
                            <p className='conference-name'><i>IEEE International conference on Computing Methodologies and Communication</i></p>
                            <p className='conference-date'>16-17 June 2017</p>
                            <p className='doc-title'>Wireless Power Transfer for Wireless Sensor Network Using Hybrid algorithm</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='doc-image-wrapper'>
                            {/* <img className='doc-image' src={screenShot} alt="" /> */}
                            <div className='doc-icon-group'>
                                <div className='icon-placeholder download-icon'>
                                    <IoCloudDownloadOutline />
                                </div>
                            </div>
                        </div>
                        <div className='keywords-wrapper'>
                                <span className='keyword-pill'>Machine Learning</span>
                                <span className='keyword-pill'>Neural Networks</span>
                                <span className='keyword-pill'>Deep Learning</span>
                                <span className='keyword-pill'>AI</span>
                                <span className='keyword-pill'>APSA</span>
                        </div>
                        <div className='doc-info-wrapper'>
                            <p className='conference-name'><i>IEEE International conference on Computing Methodologies and Communication</i></p>
                            <p className='conference-date'>16-17 June 2017</p>
                            <p className='doc-title'>Wireless Power Transfer for Wireless Sensor Network Using Hybrid algorithm</p>
                        </div>
                    </div>
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
                            <p className='conference-name'><i>IEEE International conference on Computing Methodologies and Communication</i></p>
                            <p className='conference-date'>16-17 June 2017</p>
                            <p className='doc-title'>Wireless Power Transfer for Wireless Sensor Network Using Hybrid algorithm</p>
                        </div>
                    </div>
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
                            <p className='conference-name'><i>IEEE International conference on Computing Methodologies and Communication</i></p>
                            <p className='conference-date'>16-17 June 2017</p>
                            <p className='doc-title'>Wireless Power Transfer for Wireless Sensor Network Using Hybrid algorithm</p>
                        </div>
                    </div>
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
                            <p className='conference-name'><i>IEEE International conference on Computing Methodologies and Communication</i></p>
                            <p className='conference-date'>16-17 June 2017</p>
                            <p className='doc-title'>Wireless Power Transfer for Wireless Sensor Network Using Hybrid algorithm</p>
                        </div>
                    </div>
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
                            <p className='conference-name'><i>IEEE International conference on Computing Methodologies and Communication</i></p>
                            <p className='conference-date'>16-17 June 2017</p>
                            <p className='doc-title'>Wireless Power Transfer for Wireless Sensor Network Using Hybrid algorithm</p>
                        </div>
                    </div>
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
                            <p className='conference-name'><i>IEEE International conference on Computing Methodologies and Communication</i></p>
                            <p className='conference-date'>16-17 June 2017</p>
                            <p className='doc-title'>Wireless Power Transfer for Wireless Sensor Network Using Hybrid algorithm</p>
                        </div>
                    </div>
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
                            <p className='conference-name'><i>IEEE International conference on Computing Methodologies and Communication</i></p>
                            <p className='conference-date'>16-17 June 2017</p>
                            <p className='doc-title'>Wireless Power Transfer for Wireless Sensor Network Using Hybrid algorithm</p>
                        </div>
                    </div>
                </div>
                <div className='empty-state-content-wrapper'>
                    <div className='empty-state-img'>
                        <FcReading />
                    </div>
                    <div className='empty-state-content'>
                        <p className='empty-state-text'>Uh Oh!</p>
                        <p className='empty-state-text'>We couldn't find that keyword anywhere in your docs!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResult;