import React from 'react'
import { Link } from 'react-router-dom'
 
import Card from './CardComponent'

const Beats = () => {
    
    // const HHcover = 
    const hhTitle = "Hip Hop"
    const hhText = "ffefztyr eefaaf fef yeefafff efaefaef"

    const trapTitle = "Trap"
    const trapText = "vjsdhvd sb feafeaff eaffaefe"

    const jazzyTitle = "Jazzy"
    const jazzyText = "fezfzefe gsfgfsg gsgsgsgsgsg"

    const rnbTitle = "RnB"
    const rnbText = "kpkmhae ihiphaef fef ihiphaef"

    const soulTitle = "Soul"
    const soulText = "hf eaifh hh ipahefih hfef"

    const electroTitle = "Electro"
    const electroText = "ih aeofpo he afohoeafoppo ihaef"



    return(
        
        <div className="beatsWraper">
        <h2>Search by type</h2>
            <h3 className="beatsTitle">Beat Type</h3>
            <div className="beatsCardWraper">
                <Link to="/playlist/hiphop">
                    <Card title={hhTitle} text={hhText}/>
                </Link>
                <Link to="/playlist/trap">
                    <Card title={trapTitle} text={trapText}/>
                </Link>
                <Link to="/playlist/jazzy">
                    <Card title={jazzyTitle} text={jazzyText}/>
                </Link>
                <Link to="/playlist/rnb">
                    <Card title={rnbTitle} text={rnbText}/>
                </Link>
                <Link tp="/playlist/soul">
                    <Card title={soulTitle} text={soulText}/>
                </Link>
                <Link to="/playlist/electro">
                    <Card title={electroTitle} text={electroText}/>
                </Link>
            </div>
        </div>
    )
}

export default Beats