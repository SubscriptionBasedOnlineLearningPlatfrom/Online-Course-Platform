import React, { createContext, useState } from 'react'

export const CourseContext = createContext();

export const CourseProvider = ({children}) => {
    const [enrolled, setEnrolled] = useState(false);

    return (
        <CourseContext.Provider value={{ enrolled, setEnrolled }}>
            {children}
        </CourseContext.Provider>
    )

}