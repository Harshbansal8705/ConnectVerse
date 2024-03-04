import React from 'react'

export default function Signup() {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [errors, setErrors] = React.useState({})
    const [errorMessage, setErrorMessage] = React.useState('')
    const [message, setMessage] = React.useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, country, password})
        })
        if (response.ok) {
            setMessage("User created successfully! Kindly check your mail to verify your account.");
            setErrors({});
            setErrorMessage('');
        } else {
            const res = await response.json();
            if (res.code === -1) {
                setErrors(res.errors);
                setErrorMessage('');
                setMessage('');
            } else if (res.code === -3) {
                console.log(res)
                setErrorMessage(res.errors.message);
                setErrors({});
                setMessage('');
            }
            else {
                setErrorMessage("Some Error Occurred");
                setErrors({});
                setMessage('');
            }
        }
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" className="fadeIn first" placeholder="Name" name='name' id='name' value={name} onChange={e => setName(e.target.value)} />
                {errors.name && <p className='error message'>{errors.name.message}</p>}
                <input type="email" className="fadeIn first" placeholder="Email" name='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <p className='error message'>{errors.email.message}</p>}
                <input type="text" className="fadeIn second" placeholder="Country" name='country' id='country' value={country} onChange={e => setCountry(e.target.value)} />
                {errors.country && <p className='error message'>{errors.country.message}</p>}
                <input type="password" className="fadeIn third" placeholder="Password" name='password' id='password' value={password} onChange={e => setPassword(e.target.value)} />
                {errors.password && <p className='error message'>{errors.password.message}</p>}
                <input type="submit" className="fadeIn fourth" value="Log In" />
                {message && <p className='success'>{message}</p>}
                {errorMessage && <p className='error'>{errorMessage}</p>}
            </form>
        </>
    )
}
