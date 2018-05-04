// jsx test
import React, {Component} from 'react';
import './home-page.scss';
import bgImage from './bg.jpeg'
import wifiSvg from './wifi.svg';
import worldSvg from './world_map.svg'; // large svg

export default class extends Component {
    
    
    render() {
        console.log("worldSvg = ", worldSvg);
        return (
        <section className="home-page">
            React Home Page
            <img src={bgImage} alt="Background" height="200" width="400" />
            <img src={wifiSvg} alt="Background" height="100" width="100" />
            <img src={worldSvg} alt="Background" height="200" width="200" />
        </section>
        );
    }
}