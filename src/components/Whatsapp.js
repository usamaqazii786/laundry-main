import React from 'react'
import './whatsapp.css'
const Whatsapp = () => {
    const phoneNumber = '+971528500040'; // Replace with your phone number
    const message = 'Hello, I would like to know more about your services.';
    return (
        <>
            <a
                href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-icon"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                />
            </a>
        </>
    )
}

export default Whatsapp