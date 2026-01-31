import React from 'react'
import AuthProvider from '../Context/AuthProvider'

const Providers = ({children}) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}

export default Providers;