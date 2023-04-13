import "./sidebar.scss"
import octagon from "../../assets/octagonIcon.png"
export default function Sidebar() {
    return (
        <div id="sidebar">
            <div id="title">
                <img src={octagon} alt=""  style={{height: "30%"}}/>
           Lorem ipsum dolor sit amet <br></br>2023 EDITION
            </div>
            <div id="explore">
                Explore
                <ul>
                    <li>MAP</li>
                    <li>MAP</li>
                    <li>MAP</li>
                    <li>MAP</li>
                    <li>MAP</li>
                    <li>MAP</li>
                    <li>MAP</li>
                    <li>MAP</li>
                    <li>MAP</li>
                    <li>MAP</li>
                </ul>
            </div>
            <div id="more">
                <ul>
               <li>About</li> 
               <li>Methodology</li> 
               <li>Media</li> 
                </ul>
            </div>

        </div>
    )
}