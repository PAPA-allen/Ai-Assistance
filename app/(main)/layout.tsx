import React from 'react'
import Provider from './Provider'

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Provider>
                {children}
            </Provider>

        </div>
    )
}

export default WorkSpaceLayout
