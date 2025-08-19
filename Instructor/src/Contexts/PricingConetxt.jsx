import React,{ createContext, useState } from "react";


export const PricingContext = createContext(); 

export const PricingProvider = ({ children }) => {

    const [pricingData, setPricingData] = useState({
        price:0,
        strikeoutPrice:0,
        title:'',
        description:''
    })

    return (
        <PricingContext.Provider value={{ pricingData, setPricingData }}>
            {children}
        </PricingContext.Provider>
    );
}

