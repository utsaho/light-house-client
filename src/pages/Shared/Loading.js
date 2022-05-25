import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-transparent'>
            <FontAwesomeIcon icon={faSpinner} spin size='3x'></FontAwesomeIcon>
        </div>
    );
};

export default Loading;