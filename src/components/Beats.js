import React from "react";
import { Link } from "react-router-dom";

import "../css/beats.scss";

import Card from "./CardComponent";

const Beats = () => {
    //! add new genre in upload beat too
    // todo: get data from db

    const hhTitle = "Hip Hop";
    const hhText = "ffefztyr eefaaf fef yeefafff efaefaef";
    const hhImage = "https://images.unsplash.com/photo-1589929168117-cd9ec5f27ab7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"

    const trapTitle = "Trap";
    const trapText = "vjsdhvd sb feafeaff eaffaefe";
    const trapImage = "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"

    const afroTitle = "Afro";
    const afroText = "vjsdhvd sb feafeaff eaffaefe";
    const afroImage = "https://images.unsplash.com/photo-1519635451045-a41d4361d495?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3023&q=80"


    const jazzyTitle = "Jazzy";
    const jazzyText = "fezfzefe gsfgfsg gsgsgsgsgsg";
    const jazzyImage = "https://images.unsplash.com/photo-1552935088-b7474c4af004?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3023&q=80"


    const rnbTitle = "RnB";
    const rnbText = "kpkmhae ihiphaef fef ihiphaef";
    const rnbImage = "https://images.unsplash.com/photo-1452724931113-5ab6340ce080?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"


    const soulTitle = "Soul";
    const soulText = "hf eaifh hh ipahefih hfef";
    const soulImage = "https://images.unsplash.com/photo-1581297848080-c84ac0438210?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
    

    const electroTitle = "Electro";
    const electroText = "ih aeofpo he afohoeafoppo ihaef";
    const electroImage = "https://images.unsplash.com/photo-1562369083-e501b585fd2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2863&q=80"

    const exclusiveTitle = "Exclusive";
    const exclusiveText = "ih aeofpo he afohoeafoppo ihaef";
    const exclusiveImage = "https://images.unsplash.com/photo-1548691905-57c36cc8d935?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80"

    const leaseTitle = "Lease";
    const leaseText = "ih aeofpo he afohoeafoppo ihaef";
    const leaseImage = "https://images.unsplash.com/photo-1596396289005-96863abfebbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"


    return (
        // render a Card component for each type
        // and pass data to it
        <div className="beats-wraper">
            <h2 className="beats-title">Search by type</h2>
            <div className="beats-card-wraper">
                <Link to="/playlist/hip-hop">
                    <Card title={hhTitle} text={hhText} image={hhImage}/>
                </Link>
                <Link to="/playlist/trap">
                    <Card title={trapTitle} text={trapText} image={trapImage}/>
                </Link>
                <Link to="/playlist/jazzy">
                    <Card title={jazzyTitle} text={jazzyText} image={jazzyImage}/>
                </Link>
                <Link to="/playlist/afro">
                    <Card title={afroTitle} text={afroText} image={afroImage}/>
                </Link>
                <Link to="/playlist/rnb">
                    <Card title={rnbTitle} text={rnbText} image={rnbImage}/>
                </Link>
                <Link to="/playlist/soul">
                    <Card title={soulTitle} text={soulText} image={soulImage}/>
                </Link>
                <Link to="/playlist/electro">
                    <Card title={electroTitle} text={electroText} image={electroImage}/>
                </Link>
            </div>

            <h2>Search by contract</h2>
            <div className="beats-card-wraper">
            <Link to="/playlist/exclusive">
                <Card title={exclusiveTitle} text={exclusiveText} image={exclusiveImage}/>
            </Link>
            <Link to="/playlist/lease">
                <Card title={leaseTitle} text={leaseText} image={leaseImage}/>
            </Link>
            </div>
        </div>
    );
};

export default Beats;
