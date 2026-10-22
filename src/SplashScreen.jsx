import { useEffect, useState } from 'react';

function SplashScreen({ hidden, setHidden }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (hidden) {
            return undefined;
        }

        let animationFrameId = null;
        let currentProgress = 0;

        const completeSplash = () => {
            sessionStorage.setItem('splashShown', 'true');
            setProgress(100);
            window.setTimeout(() => setHidden(true), 400);
        };

        const updateProgress = () => {
            const resources = performance.getEntriesByType('resource');

            if (resources.length > 0) {
                const loadedResources = resources.filter(
                    (resource) => resource.responseEnd > 0,
                ).length;
                const resourceProgress =
                    (loadedResources / resources.length) * 90;
                currentProgress = Math.max(currentProgress, resourceProgress);
            } else {
                currentProgress = Math.min(currentProgress + 2, 90);
            }

            setProgress(Math.min(currentProgress, 90));

            if (document.readyState === 'complete') {
                completeSplash();
                return;
            }

            animationFrameId = window.requestAnimationFrame(updateProgress);
        };

        const handleLoad = () => {
            completeSplash();
        };

        window.addEventListener('load', handleLoad);
        animationFrameId = window.requestAnimationFrame(updateProgress);

        return () => {
            window.removeEventListener('load', handleLoad);
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [hidden]);

    return (
        <div id='splash-screen' className={hidden ? 'hide' : ''}>
            <div className='splash-content'>
                <img src='/images/Veyora.png' alt='Veyora Logo' />
                <h2>Veyora</h2>
                <p>Engineering Intelligent Automation</p>
                <div className='loader'>
                    <div
                        className='loader-bar'
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;
