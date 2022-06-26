import React from 'react';
import { useQuery } from 'react-query';

const Summary = () => {
    const { isLoading: summeryLoading } = useQuery('summery', async () => await fetch('http://localhost:5000/summery').then(res => res.json()).then(data => console.log(data)));
    return (
        <div>
            This is summary
        </div>
    );
};

export default Summary;