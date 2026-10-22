import React from 'react';

import aboutUsExpertise from 'localData/aboutUsExpertise';
import {
    IconLightning,
    IconEarth,
    IconRobot,
    IconDatabase,
    IconCharging,
    IconCloud,
} from 'Icons';

const Icons = {
    IconLightning: <IconLightning />,
    IconEarth: <IconEarth />,
    IconRobot: <IconRobot />,
    IconDatabase: <IconDatabase />,
    IconCharging: <IconCharging />,
    IconCloud: <IconCloud />,
};

function OurExpertise() {
    return (
        <section>
            <div className='our_expertise' id='our_expertise'>
                <h1>Our Expertise</h1>
                <div className='grid'>
                    {aboutUsExpertise.map((expertise) => (
                        <div className='box' key={expertise.title}>
                            <div className='icon'>{Icons[expertise.icon]}</div>
                            <div className='box_content'>
                                <h2>{expertise.title}</h2>
                                <p>{expertise.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurExpertise;
