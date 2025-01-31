import { useState, useEffect } from "react"
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"
import "../css/slideshow.css"


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
                //? Saves received image data into useState variable
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

    console.log(images)

    return (
        <div className="slideshow-wrapper">

            <BsArrowLeftCircleFill className="arrow arrow-left"/>
            {
                images && images.length > 0 ?
                images.map(imageItem => 
                    <img 
                        className="current-image" 
                        src={imageItem.download_url} 
                        alt={imageItem.download_url}
                        key={imageItem.id}           
                    />
                )

                :

                null
            }
            <BsArrowRightCircleFill className="arrow arrow-right"/>
            <span className="circle-indicator">
                {
                    images && images.length > 0 ?
                    images.map((_, index) =>
                        <button className="current-indicator" key={index}></button>
                    )

                    :

                    null
                }
            </span>
        </div>
    )
}