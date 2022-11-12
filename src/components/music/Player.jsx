import React, { useState, useEffect } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import AppleIcon from "@mui/icons-material/Apple";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import "./player.scss";
const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div className="songDemoBox">
      <div className="songImg">
        <img src="./Screenshot (48).png" alt="" />
      </div>
      <div className="songDemo">
        <p className="track dim">Track</p>
        <p className="boldName artist">
          <span>SRIVALLI</span>
          <span className="iconPlayBtn">
            {playing ? (
              <PauseCircleIcon className="iconPlay" onClick={() => toggle()} />
            ) : (
              <PlayCircleFilledIcon
                className="iconPlay"
                onClick={() => toggle()}
              />
            )}
          </span>
        </p>
        <p className="artist">
          <span className="dim artistText"> Artists: </span>
          <span className="boldName">Javed Ali</span>
        </p>
        {/* <div className="btnGroup">
          <button className="getMusicBtn">
            <div>
              <HeadphonesIcon />
            </div>
            <div>
              <p className="dim">Available at</p>
              <p>bandCamp</p>
            </div>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Player;
