import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    fetch(url)
    .then(res => {
        //If the response is not ok, an error is thrown.
        if(!res.ok){
        throw Error('could not fetch the date from server');
        }
        //If the response is ok, the data is parsed as JSON and passed to the setData function to update the state of data.
        return res.json();
    })
    .then(data => {
        console.log(data);
        setData(data.results);
        //isPending is set to false, indicating that the data has been fetched successfully.
        setIsPending(false);
        setError(null);
    }).catch(err => {
        setIsPending(false);
        setError(err.message);
    })
    }, [url])

    return {data, isPending, error}
}

export default useFetch;