import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginRedirectHandled, loginRequested } from '../store'
import '../css/Login.css'

function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, redirectTo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (redirectTo) {
            dispatch(loginRedirectHandled())
            navigate(redirectTo, { replace: true })
        }
    }, [dispatch, navigate, redirectTo])

    const handleLogin = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        dispatch(loginRequested({
            userid: String(formData.get('userid') || ''),
            password: String(formData.get('password') || ''),
        }))
    }
    return (
        <div className='login'>
            <form id="loginForm" onSubmit={handleLogin} aria-busy={loading}>
                <div className="main">
                    <div className="head">
                        <h1 className="title">WELCOME</h1>
                    </div>
                    <div className="credits">
                        <div className="id">
                            <label htmlFor="userid" id="labelid">Enter User ID :</label>
                            <input className="userId" type="text" id="userid" name="userid" autoComplete="username"/>
                        </div>
                        <div className="pass">
                            <label htmlFor="password" id="labelpass">Enter Password :</label>
                            <input className="ps" type={showPassword ? 'text' : 'password'} id="password" name="password" autoComplete="current-password"/>
                            <button type="button" id="togglePassword" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.747 10.747 0 0 1 4.446-5.143" />
                                    <path d="m2 2 20 20" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg"  width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                        </div>
                    </div>
                    {error && <p className="login-error" role="alert">{error}</p>}
                    <button type="submit" className="btn" id="loginBtn" disabled={loading}>
                        {loading && <span className="spinner" aria-hidden="true" />}
                        {loading ? 'Signing in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login