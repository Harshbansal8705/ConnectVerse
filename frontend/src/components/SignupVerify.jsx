import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function SignupVerify() {
    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get("token")
    const navigate = useNavigate()

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/signup/verify?token=${token}`)
            .then(async res => {
                if (res.ok) {
                    const { user } = await res.json()
                    localStorage.setItem("user", JSON.stringify(user))
                    alert("Account verified")
                    navigate("/")
                } else {
                    res = await res.json()
                    alert(res.errors.message)
                    navigate("/")
                }
            }).catch(err => {
                console.error(err)
                alert("An error occurred")
                navigate("/")
            })
    }, [])
    return (
        <div>Loading...</div>
    )
}
