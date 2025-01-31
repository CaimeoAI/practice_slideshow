import './App.css'
import Slideshow from './components/slideshow'

function App() {


  return (
    <Slideshow url={"https://picsum.photos/v2/list"} limit={"8"} page={"2"}/>
  )
}

export default App
