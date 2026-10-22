import React from 'react';

import { IconBulb, IconShield, IconMonitor, IconStack } from 'Icons';
import whyChooseData from 'localData/whyChooseData';

const Icons = {
    IconBulb: <IconBulb />,
    IconShield: <IconShield />,
    IconMonitor: <IconMonitor />,
    IconStack: <IconStack />,
};

function WhyChoose() {
    return (
        <div className='why_choose'>
            <h1>Why choose Veyora ?</h1>
            <p>
                Delivering intelligent automation solutions through innovation,
                reliability and engineering excellence.
            </p>
            <div className='grid'>
                {whyChooseData.map((item, index) => (
                    <div className='box'>
                        <div className='icon'>{Icons[item.icon]}</div>
                        <div className='box_content'>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WhyChoose;
