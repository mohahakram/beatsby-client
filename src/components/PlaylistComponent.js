import React from "react";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

const PlaylistComponent = (props) => {
    let { pathname } = useLocation();
    const { artist, type } = props.passedData[0];
    const Artist = <Link to={`/playlist/${props.passedData.artist}`}/>
    const FeaturArtiste = <Link to={`/artist/${props.passedData.featureArtist}`} />

    console.log(useLocation());

    return (
        <div>
            <div className="mainContainerPlaylist">
                <div>
                    <div>
                        <img src="" alt="" />
                    </div>
                    {pathname.includes('/playlist') ? (
                        <div>
                            <p>Playlist</p>
                            <h2>{type}</h2>
                        </div>
                    ) : (
                        <div>
                            <h2>{artist}</h2>
                        </div>
                    )}
                </div>

                <div>
                    <div className="playlistContainer">
                        <div className="playlistHead">
                            <span><FontAwesomeIcon
                                                    icon={faPlay}
                                                    fixedWidth
                                /></span>
                            <span><FontAwesomeIcon
                                                    icon={faPlus}
                                                    fixedWidth
                                /></span>
                            <p>TITLE</p>
                            <p>ARTIST</p>
                            <p>BPM</p>
                            <p>CONTRACT</p>
                            <p>PRICE</p>
                        </div>
                        <div>
                            
                            { props.passedData.map( (data) => (
                                
                                <div className="playlistList">
                                <span> <FontAwesomeIcon
                                                    icon={faPlay}
                                                    fixedWidth
                                /></span>
                                <span><FontAwesomeIcon
                                                    icon={faPlus}
                                                    fixedWidth
                                /></span>
                                <p>{data.title}</p>
                                { data.featureArtist ? <p>
                                <Link to={`/artist/${data.artist}`}> {data.artist} </Link>, <Link to={`/playlist/${data.featureArtist}`}> {data.featureArtist} </Link>  </p> : <p><Link to={`/playlist/${data.artist}`}> {data.artist} </Link> </p> }
                                {/* <p> {data.featureArtist ? 
                                  <Artist/> + ", " + <FeaturArtiste/> : <Artist/>}</p> */}
                                 <p>{data.bpm}</p>
                                 <p>{data.contract}</p>
                                <p>{data.price}</p>
                                 <span><FontAwesomeIcon
                                                    icon={faCartArrowDown}
                                                    fixedWidth
                                                /></span>
                                </div>
                            ))}
                            
                        </div>











                        {/* <table className="playlistTable">
                            <thead>
                                <tr className="trHead">
                                    <td></td>
                                    <td></td>
                                    <td>TITLE</td>
                                    <td>ARTIST</td>
                                    <td>BPM</td>
                                    <td>CONTRACT</td>
                                    <td>PRICE</td>
                                </tr>
                            </thead>
                            <tbody>
                                {props.passedData.map((data) => (
                                    <tr className="trBody" key={data._id}>
                                        <td>
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faPlay}
                                                    fixedWidth
                                                />
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                onClick={() =>
                                                    console.log(data._id)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    fixedWidth
                                                />
                                            </span>
                                        </td>
                                        <td>{data.title}</td>
                                        <Link to={`/artist/${data.artist}`}>
                                            <td>{data.artist}</td>
                                        </Link>

                                        <td>{data.bpm}</td>
                                        <td>{data.contract}</td>
                                        <td>{data.price}</td>
                                        <td>
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faCartArrowDown}
                                                    fixedWidth
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistComponent;
