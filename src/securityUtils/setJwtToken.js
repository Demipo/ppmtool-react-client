import axios from "axios";  

const setJwtToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    }else{
        delete axios.defaults.headers.common["Authourization"]
    }
}

export default setJwtToken 