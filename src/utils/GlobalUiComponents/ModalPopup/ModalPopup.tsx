import './ModalPopup.scss';
import { RiCloseCircleFill } from "react-icons/ri";

export function ModalPopup(props: any) {

    const closeModal = () => {
        props.closeModalPopup();
    }

    return (
        <>
            <div className='modal-popup'>
                <div className='popup-wrapper'>
                    <div className='popup-content'>
                        <div className='close-icon' onClick={closeModal}><RiCloseCircleFill /></div>
                        <div className='popup-content-text'>{props.content}</div>
                    </div>
                </div>
            </div>
            <div className='overlay'></div>
        </>
    )
}