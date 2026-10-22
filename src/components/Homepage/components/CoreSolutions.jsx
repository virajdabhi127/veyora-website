import React from 'react';

import solutions from 'localData/solutions';

function CoreSolutions() {
    return (
        <div className='solutions' id='solutions'>
            <h1>Core solutions</h1>
            <div className='sol_cont'>
                {solutions.map((solution, index) => (
                    <div className='solutions-card' key={solution.id}>
                        <div className='content' id={solution.id}>
                            <h2>{solution.title}</h2>
                            <p>{solution.description}</p>
                            <ul>
                                {solution.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>  
    );
}

export default CoreSolutions;
