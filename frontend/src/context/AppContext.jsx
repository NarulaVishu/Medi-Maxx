import { createContext } from "react";
// import { toast } from "react-toastify";
// import axios from 'axios'
import { doctors } from "../assets/assets";

export const AppContext = createContext()

const AppContextProvider = (props) => {

   
    const value = {
        doctors
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider