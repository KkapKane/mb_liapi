import "./card.scss"
import octagon from "../../assets/octagonIcon.png"
interface Props{
    country: any
}

export default function Card({country} : Props) {
    return (
        <div id="card">
            <img src={octagon} alt=""  style={{height: "80%"}}/>
            <div id="score">{country.score}</div>
            <div id="trend">{country.trend}</div>
            <div id="country">{country.name}</div>
        </div>
    )
}