import { useState } from 'react'
import { apiFetch } from '../api'
import '../css/Login.css'

function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault()
        const userid = e.target.userid.value.trim()
        const password = e.target.password.value.trim()
        if (!userid || !password) {
            alert('Invalid credentials')
            return
        }
        try {
            const response = await apiFetch('/auth/login', {
                method: 'POST',
                skipAuthRedirect: true,
                body: JSON.stringify({
                    userid,
                    password
                })
            })
            const data = await response.json()
            if (response.ok) {
            if (data.user.role === 'admin') {
                window.location.replace('/admin')
                return
            }
            const deviceResponse = await apiFetch('/devices')
            if (!deviceResponse) {
                return
            }
            const deviceData = await deviceResponse.json()
            if (!deviceData.devices || deviceData.devices.length === 0) {
                alert('No device assigned.')
                return
            }
            const productCode = deviceData.devices[0].productCode
            switch (productCode) {
                case 'EM':
                    window.location.replace('/dashboard')
                    break
                // case 'HA':
                //     window.location.replace('/home-automation/dashboard')
                //     break
                // case 'EM_HA':
                //     window.location.replace('/combined/dashboard')
                //     break
                default: alert('No valid product assigned.')
            }
        } else {
            alert(data.message)
        }
        } catch (error) {
            console.error(error)
            alert('Server error')
        }
    }
    return (
        <div className='login'>
            <form id="loginForm" onSubmit={handleLogin}>
                <div className="main">
                    <div className="head">
                        <h1 className="title">WELCOME</h1>
                    </div>
                    <div className="credits">
                        <div className="id">
                            <label htmlFor="userid" id="labelid">Enter User ID :</label>
                            <input className="userId" type="text" id="userid" name="user"/>
                        </div>
                        <div className="pass">
                            <label htmlFor="password" id="labelpass">Enter Password :</label>
                            <input className="ps" type={showPassword ? 'text' : 'password'} id="password" name="password"/>
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
                    <button type="submit" className="btn" id="loginBtn">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login