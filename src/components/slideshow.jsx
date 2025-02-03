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

    //? Moves to the previous slide, looping back to the last slide if at the first slide
    function handleLeft() {
        setCurrentSlide(currentSlide === 0 ? images.length -1 : currentSlide -1)
    }

    //? Moves to the next slide, looping back to the first slide if at the last slide
    function handleRight() {
        setCurrentSlide(currentSlide === images.length -1 ? 0 : currentSlide +1)
    }

    console.log(currentSlide)

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

            <BsArrowLeftCircleFill onClick={() => handleLeft()} className="arrow arrow-left"/>
            {
                images && images.length > 0 ?
                images.map(( imageItem, index ) => 
                    <img 
                        className={currentSlide === index ? "current-image" : "current-image current-image-inactive"} 
                        src={imageItem.download_url} 
                        alt={imageItem.download_url}
                        key={imageItem.id}           
                    />
                )

                :

                null
            }
            <BsArrowRightCircleFill onClick={() => handleRight()}className="arrow arrow-right"/>
            <span className="circle-indicator">
                {
                    images && images.length > 0 ?
                    images.map((_, index) =>
                        <button 
                            onClick={() => setCurrentSlide(index)}
                            className={currentSlide === index ? "current-indicator" : "current-indicator current-indicator-inactive"} 
                            key={index}
                        ></button>
                    )

                    :

                    null
                }
            </span>
        </div>
    )
}