import { useEffect, useState } from 'react'
import PopCanvas from './PopCanvas'

function Gallery() {
    const [works, setWorks] = useState([])
    

    useEffect(() =>{
        fetch(`http://localhost:9292/works`)
        .then(resp => resp.json())
        .then(setWorks)
    }, [])

    return (
        <>
        <PopCanvas></PopCanvas>
        </>
    )
}


export default Gallery