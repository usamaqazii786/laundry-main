/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'
import { Modal } from 'react-bootstrap'

const VideoModal = (props) => {

    return (
        <>
            <Modal
                {...props}
                size="lg"
                id="videomodal"
                className=''
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                <iframe width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" src="https://www.youtube.com/embed/ZCYYsPQLirQ?showinfo=0&amp;rel=0&amp;autoplay=1"></iframe>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default VideoModal