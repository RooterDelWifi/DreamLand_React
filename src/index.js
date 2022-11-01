import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

const flowerlist = [
  "flor1",
  "flor2",
  "flor3",
  "flor4",
  "flor5",
  "flor6",
  "flor7",
  "flor8",
  "florA",
  "florB",
];

function Player(props) {
  return (
    <>
      <img
        className={props.playerState.animation}
        style={{
          left: props.playerState.x + "px",
          transform: "scaleX(" + props.playerState.direction + ")",
          zIndex: 3,
          top: props.playerState.y + "px",
        }}></img>
    </>
  );
}

class flor {
  constructor() {
    this.x = Math.random() * 550 + 40;
    this.y = Math.random() * 150 + 410;
    this.z = this.y > 505 ? 4 : 2;
    this.name = flowerlist[Math.floor(Math.random() * flowerlist.length)];
  }
}

function Flowers(props) {
  return (
    <>
      {props.flores.map((flower, index) =>
        flower === null ? null : (
          <img
            className={flower.name}
            style={{
              position: "absolute",
              left: flower.x,
              top: flower.y,
              animationDuration: 20,
              zIndex: flower.z,
            }}
            key={index}></img>
        )
      )}
    </>
  );
}

class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 650,
      y: 400,
      direction: -1,
      animation: "playerIdle",
      standing: true,
      flores: [],
    };
    //-----------------------------------------------//
    this.Main = this.Main.bind(this);

    this.Update = this.Update.bind(this);
    this.Eliminar = this.Eliminar.bind(this);
  }

  Main = (e) => {
    switch (e.key) {
      case "a":
        if(this.state.x > 55){
        this.setState({
          x: this.state.x - 5,
          direction: -1,
          animation: "playerRunning",
          standing: true,
        });
      }
        break;
      case "d":
        if(this.state.x < 824){
        this.setState({
          x: this.state.x + 5,
          direction: 1,
          animation: "playerRunning",
          standing: true,
        });
      }
        break;
      case "s":
        this.setState({ animation: "playerSit", standing: false });
        break;
      case " ":
        this.setState({ animation: "playerRegar" });
        break;
    }
  };

  Update = () => {
    this.setState({ flores: [...this.state.flores, new flor()] });
  };

  Eliminar = () => {
    for (let i = 0; i < this.state.flores.length; i++) {
      if (this.state.flores[i] === null) {
        continue;
      }
      if (
        Math.sqrt(
          Math.pow(this.state.x - this.state.flores[i].x, 2) +
            Math.pow(this.state.y + 100 - this.state.flores[i].y, 2)
        ) <= 60 &&
        this.state.animation === "playerRegar"
      ) {
        this.setState({
          flores: this.state.flores.map((flor) => {
            if (flor === this.state.flores[i]) {
              return null;
            }
            return flor;
          }),
        });
        console.log(i, this.state.flores);
      }
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", (e) => this.Main(e));
    document.addEventListener("keyup", () =>
      this.setState({
        animation: this.state.standing ? "playerIdle" : "playerSit",
      })
    );
    setInterval(this.Update, 5000);
    setInterval(this.Eliminar, 1);
  }

  render() {
    return (
      <>
        <audio autoPlay>
          <source
            src={require("./y2mate.com - lets do some farming  a cottagecore chillhop lofi mix  stardew valley.mp3")}
            type="audio/mp3"
          />
        </audio>
        <img className="scene"></img>
        <Player playerState={this.state} />
        <Flowers flores={this.state.flores} display={this.state.display} />
      </>
    );
  }
}

root.render(
  <>
    <div
      style={{
        alignItems: "center",
      }}>
      <World />
    </div>
  </>
);