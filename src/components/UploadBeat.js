import React, { useState, useContext } from "react";
import APIHandler from "../config/api/APIHandler";

import UserContext from "../config/auth/UserContext";

const UploadBeat = (props) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();


    const [title, setTitle] = useState();
    const [artist, setArtist] = useState();
    const [featureArtist, setFeatureArtist] = useState();
    const [bpm, setBpm] = useState();
    const [type, setType] = useState("trap");
    const [contract, setContract] = useState("lease");
    const [price, setPrice] = useState();

    const [audioFile, setAudioFile] = useState();
    //TODO add cover image
    const [coverImage, setCoverImage] = useState();

    const handleOnChange = async (e) => {
        // check type and name and set value to right variable
        if (e.target.type === "text") {
            if (e.target.name === "title") {
                setTitle(e.target.value);
            } else if (e.target.name === "artist") {
                setArtist(e.target.value);
            } else if (e.target.name === "featureArtist") {
                setFeatureArtist(e.target.value);
            } else if (e.target.name === "bpm") {
                setBpm(e.target.value);
            } else {
                setPrice(e.target.value);
            }
        } else if (e.target.type === "file") {
            if (e.target.name === "audioFile") {
                setAudioFile(e.target.files[0]);
            } //else {
            //     setCoverImage(e.target.files[0])
            // }
        }
        // pass chosen cover image to preview function
        previewFile(coverImage);
    };

    const [previewSource, setPreviewSource] = useState();
    // set cover image as readable image to preview it
    const previewFile = (file) => {
        if (file) {
            console.log(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPreviewSource(reader.result);
            };
        }
    };

    const typeChange = async (e) => {
        setType(e.target.value);
    };

    const contractChange = async (e) => {
        setContract(e.target.value);
    };

    // on submit append property and its value to the form object
    const handleOnSubmit = async (e) => {
        // prevent refreshing the page on submit
        e.preventDefault();

        const data = new FormData();
        data.append("userId", currentUser.id);
        data.append("title", title);
        data.append("artist", artist);
        data.append("featureArtist", featureArtist);
        data.append("bpm", bpm);
        data.append("type", type);
        data.append("contract", contract);
        data.append("price", price);
        data.append("audioFile", audioFile);
        //TODO add cover image input
        // data.append("coverImage", coverImage);

        try {
            await APIHandler.post("/beat/upload", data)
                .then( res => { return res.status === 200 && setSuccess(res.data.msg), console.log(res)})
                .then( () => {
                    setTimeout(() => {
                        props.history.push('/main')
                    }, 5000);
                })
        }catch (err) {
            setError(err.response.data.msg);
        }
    };

    return (
        <div className="input-main-content">
            <div className="input-div">
                <h2>Ready to share your work?</h2>
                <form
                    action="/beats/upload"
                    onChange={handleOnChange}
                    onSubmit={handleOnSubmit}
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        required
                        autoComplete="off"
                    />

                    <input
                        type="text"
                        name="artist"
                        placeholder="Artist"
                        required
                        autoComplete="off"
                    />

                    <input
                        type="text"
                        name="featureArtist"
                        placeholder="Feature artist"
                        autoComplete="off"
                    />

                    <input
                        type="text"
                        name="bpm"
                        placeholder="BPM"
                        required
                        autoComplete="off"
                    />

                    <select onChange={typeChange}>
                        <option value="trap">Trap</option>
                        <option value="hip hop">Hip Hop</option>
                        <option value="rnb">RnB</option>
                        <option value="afro">Afro</option>
                        <option value="soul">Soul</option>
                        <option value="Electro">Electro</option>
                        <option value="jazzy">Jazzy</option>
                    </select>

                    <select onChange={contractChange}>
                        <option name="lease" value="lease">
                            Lease
                        </option>
                        <option name="exclusive" value="exclusive">
                            Exclusive
                        </option>
                    </select>

                    <input
                        type="text"
                        name="price"
                        placeholder="Price 0.00"
                        required
                        autoComplete="off"
                    />

                    <input type="file" name="audioFile" accept=".wav, .mp3" />
                    {/* //TODO add cover image */}
                    {/* <input type="file" name="coverImg" accept=".jpg, .jpeg"/> */}

                    {/* {previewSource && (
                        <img src={previewSource} style={{height: '300px'}} /> 
                    )} */}
                    <button>Upload</button>
                </form>
                {/* show error or success message */}
                {error && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}
                {success && (
                    <div className="success">
                        <p>{success}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadBeat;
