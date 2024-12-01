import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config/config";
import axios from "axios";

export function useContent () {
    const [contents,setContents] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers:{
                "authorization": localStorage.getItem("authorization")
            }
        })
        .then((response) => {
            // @ts-ignore
            setContents(response.data?.content)
        })
    }, [])

    return contents;
    
}