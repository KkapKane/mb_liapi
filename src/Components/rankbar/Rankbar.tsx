import "./rankbar.scss";
import octagon from "../../assets/octagonIcon.png";
import Card from "./Card";

export default function Rankbar() {
  const countries = [
    { name: "Australia", score: 100, trend: "up" },
    { name: "Brazil", score: 97, trend: "down" },
    { name: "USA", score: 95, trend: "up" },
    { name: "Canada", score: 92, trend: "down" },
    { name: "Russia", score: 89, trend: "up" },
    { name: "Spain", score: 85, trend: "down" },
    { name: "Germany", score: 81, trend: "up" },
    { name: "France", score: 78, trend: "down" },
    { name: "India", score: 74, trend: "up" },
    { name: "United Kingdom", score: 71, trend: "down" },
    { name: "Turkey", score: 68, trend: "up" },
    { name: "Japan", score: 65, trend: "down" },
    { name: "Peru", score: 62, trend: "up" },
    { name: "Egypt", score: 59, trend: "down" },
    { name: "Vietnam", score: 56, trend: "up" },
    { name: "Nigeria", score: 53, trend: "down" },
    { name: "Morocco", score: 50, trend: "up" },
    { name: "Oman", score: 47, trend: "down" },
    { name: "Qatar", score: 44, trend: "up" },
    { name: "Kuwait", score: 41, trend: "down" },
    { name: "Denmark", score: 38, trend: "up" },
    { name: "Honduras", score: 35, trend: "down" },
    { name: "Luxembourg", score: 32, trend: "up" },
    { name: "Wales", score: 29, trend: "down" },
    { name: "Yemen", score: 26, trend: "up" },
    { name: "Zimbabwe", score: 23, trend: "down" },
    { name: "Xinjiang", score: 20, trend: "up" },
  ];

  return (
    <div id="rankbar">
      <div id="header">
        <div id="category">
          <img src={octagon} alt="" />
          <div id="category-wrapper">
            <div id="category-title">ECONOMIC CAPABILITY</div>
            <div id="category-description">
              {" "}
              dolor sit amet consectetur adipisicing elit. Est
            </div>
          </div>
        </div>
        <div id="scorebar">
          <ul>
            <li>RANK</li>
            <li>SCORE</li>
            <li>TREND</li>
            <li>TERRITORY</li>
          </ul>
        </div>
      </div>
      <div id="card-container">
        {countries.map((country) => {
          return <Card country={country} />;
        })}
      </div>
    </div>
  );
}
