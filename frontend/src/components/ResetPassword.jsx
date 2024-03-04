import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import "../Signin.css";

export default function ResetPassword() {
    const [password, setPassword] = React.useState('')
    const [errors, setErrors] = React.useState({})
    const [errorMessage, setErrorMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const token = searchParams.get("token")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!password) {
                setErrors({ password: { message: 'Password is required' } });
                setErrorMessage('');
                setMessage('');
                return;
            }
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reset/password?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            })
            if (response.ok) {
                setMessage("Password reset successfully!");
                setErrors({});
                setErrorMessage('');
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
        } catch (e) {
            console.error(e);
            setErrorMessage('An error occurred');
            setErrors({});
            setMessage('');
        }
    }
    return (
        <div className="container fadeInDown">
            <div id="formContent">
                {/* <!-- Tabs Titles --> */}
                <form onSubmit={handleSubmit}>
                    <input type="password" className="fadeIn first" placeholder="New Password" name='password' onChange={e => setPassword(e.target.value)} />
                    {errors.password && <p className='error message'>{errors.password.message}</p>}
                    <input type="submit" className="fadeIn third" value="Reset Password" />
                    {message && <p className='success'>{message}</p>}
                    {errorMessage && <p className='error'>{errorMessage}</p>}
                </form>
            </div>
        </div>
    )
}
