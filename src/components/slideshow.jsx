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
            //? Converts the response from the API into JSON format for easier processing
            const data = await response.json()

            if(data) {
                setImages(data)
                //? Indicates that loading is complete
                setLoading(false)
            }

        } catch (e) {
            //? Stores any errors that occur during the fetch process
            setErrorMsg(e.message)
            //? Ensures loading state is set to false even if an error occurs
            setLoading(false)
        }
    }

    //? useEffect triggers the fetchImages function when the `url` prop changes
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