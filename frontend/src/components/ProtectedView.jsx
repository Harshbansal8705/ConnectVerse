import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedView({ children }) {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <>
            {user ? children : <Navigate to="/signin" />}
        </>
  )
}
