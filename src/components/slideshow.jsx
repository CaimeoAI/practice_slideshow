import { useState } from "react"



export default function Slideshow() {

    const [images, setImages] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [errorMsg, setErrorMsg] = useState(null)
    const [loading, setLoading] = useState(false)

    async function fetchImages(getUrl) {
        try{

            const response = await fetch(getUrl)
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
        if(url !== '') fetchImages()
    },[url])

    return (
        <div className="slideshow-wrapper">

        </div>
    )
}