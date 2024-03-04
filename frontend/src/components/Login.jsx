import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errors, setErrors] = React.useState({})
    const [errorMessage, setErrorMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
        if (response.ok) {
            setMessage("Logged in successfully!");
            setErrors({});
            setErrorMessage('');
            const res = await response.json();
            localStorage.setItem('user', JSON.stringify(res.user));
            navigate("/")
        } else {
            const res = await response.json();
            if (res.code === -1) {
                setErrors(res.errors);
                setErrorMessage('');
                setMessage('');
            } else {
                console.log(res)
                setErrorMessage(res.errors.message);
                setErrors({});
                setMessage('');
            }
        }
    }

    const forgotPassword = async () => {
        if (!email) {
            setErrors({ email: { message: 'Email is required' } });
            setErrorMessage('');
            setMessage('');
            return;
        }
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/reset/mail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        if (response.ok) {
            setMessage("Check your email for a reset link");
            setErrors({});
            setErrorMessage('');
        } else {
            const res = await response.json();
            setErrorMessage(res.errors.message);
            setErrors({});
            setMessage('');
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="email" className="fadeIn first" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <p className='error message'>{errors.email.message}</p>}
                <input type="password" className="fadeIn second" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                {errors.password && <p className='error message'>{errors.password.message}</p>}
                <input type="submit" className="fadeIn third" value="Log In" />
                {message && <p className='success'>{message}</p>}
                {errorMessage && <p className='error'>{errorMessage}</p>}
            </form>
            {/* <!-- Forgot Password --> */}
            <div id="formFooter">
                <button className="underlineHover" onClick={forgotPassword}>Forgot Password?</button>
            </div>
        </>
    )
}
