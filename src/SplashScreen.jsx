import { useEffect, useState } from 'react'

function SplashScreen() {
    const [hidden, setHidden] = useState(
    sessionStorage.getItem('splashShown') === 'true'
    )
    const [progress, setProgress] = useState(0)
    useEffect(() => {
    const splashShown = sessionStorage.getItem('splashShown')
    if (splashShown) {
        setHidden(true)
        return
    }
    let pageLoaded = false
    let progress = 0
    sessionStorage.setItem('splashShown', 'true')
    const updateProgress = () => {
        const resources = performance.getEntriesByType('resource')
        if (resources.length > 0) {
        const loadedResources = resources.filter(resource => {
            return resource.responseEnd > 0
        }).length
        const resourceProgress = (loadedResources / resources.length) * 90
        progress = Math.max(progress, resourceProgress)
        } else {
        progress = Math.min(progress + 1, 90)
        }
        progress = Math.min(progress, 90)
        setProgress(progress)
        if (!pageLoaded) {
        requestAnimationFrame(updateProgress)
        }
    }
    updateProgress()
    const handleLoad = () => {
        pageLoaded = true
        setProgress(100)
        setTimeout(() => {
        setHidden(true)
        }, 250)
    }
    window.addEventListener('load', handleLoad)
    return () => {
        window.removeEventListener('load', handleLoad)
    }
    }, [])
    return (
        <div id="splash-screen" className={hidden ? 'hide' : ''}>
            <div className="splash-content">
                <img src="/images/Veyora.png" alt="Veyora Logo"/>
                <h2>Veyora</h2>
                <p>Engineering Intelligent Automation</p>
                <div className="loader">
                    <div className="loader-bar" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    )
}

export default SplashScreen