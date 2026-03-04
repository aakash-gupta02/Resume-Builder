import BackgroundComponent from '@/components/LandingPage/BackgroundComponent'
import React from 'react'

const layout = ({ children }) => {
    return (
        <BackgroundComponent>
            {children}
        </BackgroundComponent>
    )
}

export default layout