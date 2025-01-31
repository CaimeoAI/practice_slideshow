import { useState, useEffect } from "react"



export default function Slideshow({ url, limit = 5, page = 1 }) {

    //? Stores the fetched images
    const [images, setImages] = useState([])
    //? Tacks which slide is currently display
    const [currentSlide, setCurrentSlide] = useState(0)
    //? Stores error messages if the fetch request fails
    const [errorMsg, setErrorMsg] = useState(null)
    //? Tracks whether the fetch request is in progress
    const [loading, setLoading] = useState(false)

    //? This function is asynchronous, meaning it performs network requests without blocking execution
    async function fetchImages(getUrl) {
        try{

            //? Fetching data from the given URL
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`)
            //? Converts the reponse from the API into json format so I can use it properly
            const data = await response.json()

            if(data) {
                setImages(data)
                setLoading(false)
            }

        } catch (e) {
            setErrorMsg(e.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if(url !== '') fetchImages(url)
    },[url])

    if(loading) {
        return <div>Loading data in progress...</div>
    }

    if(errorMsg !== null) {
        return <div>Error occured: {errorMsg}</div>
    }

    return (
        <div className="slideshow-wrapper">

        </div>
    )
}