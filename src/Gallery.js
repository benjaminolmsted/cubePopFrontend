import { useEffect, useState } from 'react'
import PopCanvas from './PopCanvas'
import Slider from '@material-ui/core/Slider';
import { PopoverPicker } from './PopoverPicker';

function Gallery({user, works, setWorks}) {
    const [currentWork, setCurrentWork ]= useState(0)
    const [formValue, setFormValue] = useState({});
    const [xValue, setXValue] = useState(5)
    const [builderWork, setBuilderWork] = useState({})
    const [showBuilder, setShowBuilder] = useState(false)
    const [light_1, setLight_1] = useState("#000000")
    const [light_2, setLight_2] = useState("#000000")
    const [light_3, setLight_3] = useState("#000000")
    const [light_4, setLight_4] = useState("#000000")
    const [light_5, setLight_5] = useState("#000000")
    const [light_6, setLight_6] = useState("#000000")

    useEffect (()=>{
        setFormValue({...builderWork})
        if(builderWork.light_1){
            setLight_1(hexToHash(builderWork.light_1))
            setLight_2(hexToHash(builderWork.light_2))
            setLight_3(hexToHash(builderWork.light_3))
            setLight_4(hexToHash(builderWork.light_4))
            setLight_5(hexToHash(builderWork.light_5))
            setLight_6(hexToHash(builderWork.light_6))
        }
    }, [builderWork])

    // useEffect(()=>{
    //     setBuilderWork({ ...builderWork,
    //         light_1: light_1
    //     })
    // }, [light_1])
    function hashToHex(hash) {
        return hash.replace("#", "0x")
    }

    function hexToHash(hex) {
       return hex.replace("0x", "#")
    }

    function onColorChange(color){
        const s = color
        setLight_1(color)
        setBuilderWork({ ...builderWork,
                   light_1: hashToHex(s)
               })
    }
    function onColorChange2(color){
        setLight_2(color)
        setBuilderWork({ ...builderWork,
                   light_2: hashToHex(color)
               })
    }
    function onColorChange3(color){
        setLight_3(color)
        setBuilderWork({ ...builderWork,
                   light_3: hashToHex(color)
               })
    }
    function onColorChange4(color){
        setLight_4(color)
        setBuilderWork({ ...builderWork,
                   light_4: hashToHex(color)
               })
    }
    function onColorChange5(color){
        setLight_5(color)
        setBuilderWork({ ...builderWork,
                   light_5: hashToHex(color)
               })
    }
    function onColorChange6(color){
        setLight_6(color)
        setBuilderWork({ ...builderWork,
                   light_6: hashToHex(color)
               })
    }


    function nextWork() {
        setCurrentWork((currentWork + 1) % works.length) 
    }

    function previousWork() {
        currentWork > 0 ? setCurrentWork((currentWork - 1) % works.length) : setCurrentWork(works.length - 1)
    }

    function deleteWork() {
        console.log(`deleting work_id: ${works[currentWork].id}`)
        fetch(`http://localhost:9292/works/${works[currentWork].id}`, { 
            method: 'DELETE'
        }).then(resp=>resp.json())
        .then(work => {
            if(currentWork === works.length - 1){
                setCurrentWork(0)
            }
            setWorks(works.filter(w => work.id !== w.id ))
        })
    }

    function onSave(){
        console.log("saving work...")
        delete builderWork.id
        fetch(`http://localhost:9292/works`, {
            method: `POST`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(builderWork)
        })

    }


    function handleChange(e){
        console.log(e.target.value)
        setFormValue({ ...formValue,
            [e.target.name]: e.target.value})
        setBuilderWork({ ...builderWork,
                            [e.target.name]: parseInt(e.target.value)
                        } )  
    }


    function builder() {
        setShowBuilder(true)
        setBuilderWork({...works[currentWork]})
    }

    return (
        <>
        <div className="canvasContainer">
            <button className="previous-button" onClick={previousWork}>❮</button>
            <button className="next-button" onClick={nextWork}>❯</button>
            {(user && works[currentWork] && user.userId === works[currentWork].user_id) ? <button onClick={deleteWork}>delete</button> : null}
            <button onClick={builder}>builder</button>
            <PopCanvas work={showBuilder? builderWork : works[currentWork]}></PopCanvas>
            
                
                {showBuilder? (
                    <><div className="cube-builder">
                        <label htmlFor="x_start">x_start: {formValue.x_start}</label>
                        <input onChange={handleChange } type="range" min="-5" max="0" value={formValue.x_start} className="slider" name="x_start" ></input> 
                        <label htmlFor="x_end">x_end: {formValue.x_end} </label>
                        <input onChange={handleChange } type="range" min="1" max="5" value={formValue.x_end} className="slider" name="x_end" ></input> 
                        <label htmlFor="y_start">y_start: {formValue.y_start} </label>
                        <input onChange={handleChange } type="range" min="-5" max="0" value={formValue.y_start} className="slider" name="y_start" ></input> 
                        <label htmlFor="y_end">y_end: {formValue.y_end}</label>
                        <input onChange={handleChange } type="range" min="1" max="5" value={formValue.y_end} className="slider" name="y_end" ></input>
                        <label htmlFor="z_start">z_start: {formValue.z_start}</label>
                        <input onChange={handleChange } type="range" min="-5" max="0" value={formValue.z_start} className="slider" name="z_start" ></input> 
                        <label htmlFor="z_end">z_end: {formValue.z_end}</label>
                        <input onChange={handleChange } type="range" min="1" max="5" value={formValue.z_end} className="slider" name="z_end" ></input>
                        <label>X Size</label>
                        <input onChange={handleChange } type="number" min="0" max="125" value={formValue.x_cube} className="slider" name="x_cube" ></input>
                        <label>Y Size</label>
                        <input onChange={handleChange } type="number" min="0" max="125" value={formValue.y_cube} className="slider" name="y_cube" ></input>
                        <label>Z Size</label>
                        <input onChange={handleChange } type="number" min="0" max="125" value={formValue.z_cube} className="slider" name="z_cube" ></input>
                        <label>Rotation</label>
                        <input onChange={handleChange } type="number" min="0" max="25" step="any" value={formValue.r_amount} className="slider" name="r_amount" ></input>
                        <label>Rotation Time</label>
                        <input onChange={handleChange } type="number" min="0" max="50" step="any" value={formValue.r_time} className="slider" name="r_time" ></input>
                        <label>Rotation Delay</label>
                        <input onChange={handleChange } type="number" min="0" max="10" step="any" value={formValue.r_delay} className="slider" name="r_delay" ></input>
                        <label>Position</label>
                        <input onChange={handleChange } type="number" min="0" max="400" step="any" value={formValue.xyz_position} className="slider" name="xyz_position" ></input>
                        <label>Position Time</label>
                        <input onChange={handleChange } type="number" min="0" max="50" step="any" value={formValue.xyz_position_time} className="slider" name="xyz_position_time" ></input>
                        <label>Position Delay</label>
                        <input onChange={handleChange } type="number" min="0" max="10" step="any" value={formValue.xyz_position_delay} className="slider" name="xyz_position_delay" ></input>
                        <label>Scale</label>
                        <input onChange={handleChange } type="number" min="0" max="400" step="any" value={formValue.xyz_scale} className="slider" name="xyz_scale" ></input>
                        <label>Scale Time</label>
                        <input onChange={handleChange } type="number" min="0" max="50" step="any" value={formValue.xyz_scale_time} className="slider" name="xyz_scale_time" ></input>
                        <label>Scale Delay</label>
                        <input onChange={handleChange } type="number" min="0" max="10" step="0.01" value={formValue.xyz_scale_delay} className="slider" name="xyz_scale_delay" ></input>
                    </div>
                    <div className="color-builder">
                        <label> Light 1 </label>
                        <PopoverPicker onChange={onColorChange} color={light_1}></PopoverPicker>
                        <label> Light 2 </label>
                        <PopoverPicker onChange={onColorChange2} color={light_2}></PopoverPicker>
                        <label> Light 3 </label>
                        <PopoverPicker onChange={onColorChange3} color={light_3}></PopoverPicker>
                        <label> Light 4 </label>
                        <PopoverPicker onChange={onColorChange4} color={light_4}></PopoverPicker>
                        <label> Light 5 </label>
                        <PopoverPicker onChange={onColorChange5} color={light_5}></PopoverPicker>
                        <label> Light 6 </label>
                        <PopoverPicker onChange={onColorChange6} color={light_6}></PopoverPicker>
                    </div>
                    <div className="builder-interface">
                        <button onClick={onSave}>save</button>

                    </div>
                    </>
                ) : null }
            
        </div>
        </>
    )
}


export default Gallery