import React from 'react';
import {useState} from 'react'
import APIHandler from '../config/api/APIHandler'
import Axios from 'axios';



const UploadBeat = (props) => {


    const [title, setTitle] = useState();
    const [artist, setArtist] = useState();
    const [featureArtist, setFeatureArtist] = useState();
    const [bpm, setBpm] = useState();
    const [type, setType] = useState("trap");
    const [contract, setContract] = useState("lease");
    const [price, setPrice] = useState();

    const [audioFile, setFile] = useState()
    
    const handleOnChange = async e => {
        // e.target.type==="text" ? setDetails( e.target.value  ) :
        // setFile(  e.target.files[0]  )
        // console.log(details)

        if (e.target.type === "text"){
            if (e.target.name === "title"){
                setTitle(e.target.value)
            } else if (e.target.name === "artist"){
                setArtist(e.target.value)
            } else if (e.target.name === "featureArtist"){
                setFeatureArtist(e.target.value)
            } else if (e.target.name === "bpm"){
                setBpm(e.target.value)
            } else {
                setPrice(e.target.value)
            }
        }   else if (e.target.name === "audioFile") {
            setFile(e.target.files[0])
        }
    }

    const typeChange = async e => {
        setType(e.target.value);
    }

    const contractChange = async e => {
        setContract(e.target.value);
    }
    // console.log(contract);
    const handleOnSubmit = async e => {
        
        e.preventDefault()

        const data = new FormData();
        data.append("title", title);
        data.append("artist", artist);
        data.append("featureArtist", featureArtist);
        data.append("bpm", bpm);
        data.append("type", type);
        data.append("contract", contract);
        data.append("price", price);
        data.append("audioFile", audioFile);

        try {
            // console.log(details)
            await APIHandler.post('/beats/upload', data)
                .then(res => console.log(res))
                .catch(err => console.log(err));
            console.log('access granted');
            // props.history.push('/main')
        } catch (err) {
            console.log(err);
        }
        // console.log(data);
        // Axios.post('http://localhost:4001/beats/upload', data).then( res => console.log(res)).catch(err => console.log(err));
    }

    return(
        <div className="inputDiv">
            <h2>Upload beat</h2>
            <form action="/beats/upload" onChange={handleOnChange} onSubmit={handleOnSubmit}>
                <input type="text" name="title" placeholder="Title" required autoComplete="off"/>
                {/* <label htmlFor="title"><span>Title</span></label> */}
                
                <input type="text" name="artist" placeholder="Artist" required autoComplete="off"/>
                {/* <label htmlFor="artist"><span>Artist</span></label> */}
                
                <input type="text" name="featureArtist" placeholder="Feature artist" autoComplete="off"/>
                {/* <label htmlFor="featurArtist"><span>Feature artist</span></label> */}
                
                <input type="text" name="bpm" placeholder="BPM" required autoComplete="off"/>
                {/* <label htmlFor="bpm"><span>BPM</span></label> */}

                <select onChange={typeChange}>
                    <option value="Trap">Trap</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="RnB">RnB</option>
                    <option value="Soul">Soul</option>
                    <option value="Electro">Electro</option>
                    <option value="Jazzy">Jazzy</option>
                </select>
                
                <select onChange={contractChange}>
                    <option name="lease" value="lease">Lease</option>
                    <option name="exclusive" value="exclusive">Exclusive</option>
                </select>
                
                <input type="text" name="price" placeholder="Price 0.00" required autoComplete="off"/>

                <input type="file" name="audioFile" accept=".wav"/>
                
                <button>Upload</button>
            </form>
            
        </div>
    )
}


export default UploadBeat;