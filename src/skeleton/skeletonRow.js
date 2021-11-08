import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function skeletonRow() {
    return (
        <div>
            <div className="row">
            <div className="row__posters">
                <div className="row__poster" >
                    <Skeleton height={40} width={500} duration={3}/>
                </div>
            </div>
            </div>
        </div>
    )
}
