import React from 'react';
import { TbThumbUp } from 'react-icons/tb';
import { FaRegCircleQuestion } from 'react-icons/fa6';

export function LikeItem({style, icon, value}) {
    return (
        <button type='button' 
                className={style}>
                <span>
                    {icon === "tb" ? <TbThumbUp /> : 
                     icon === "fa" ? <FaRegCircleQuestion /> : ""}
                    </span><span>{value}</span>
        </button>
    );
}

