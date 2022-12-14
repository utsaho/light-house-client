import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PageTitle from './PageTitle';


const Loading = () => {
    return (
        <div className='absolute inset-2/4 cursor-progress'>
            <PageTitle title='Loading...' />
            <FontAwesomeIcon icon={faSpinner} spin size='3x'></FontAwesomeIcon>
        </div>
    );
};

export default Loading;