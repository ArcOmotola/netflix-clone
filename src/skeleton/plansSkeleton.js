import React from 'react';
import Skeleton from 'react-loading-skeleton';




export default function plansSkeleton() {
    return (
        <>
        <h1><Skeleton height={20} width={120} /></h1>
        {Array(3).fill().map((item, index) => (
        <li key={index} style={{listStyle: 'none'}}>
            <div>
                <div className="plansScreen__plan">
            <div className="plansScreen__info">
                <h5><Skeleton height={20} width={80} /></h5>
                <h6><Skeleton height={20} width={80} /></h6>
            </div>
            <div>
                <Skeleton height={35} width={100} />
            </div>
            </div>
            </div>
        </li>
        ))}


    </>)
}

