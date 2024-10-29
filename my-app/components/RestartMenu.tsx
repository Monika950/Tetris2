import  React, { FC } from "react";
import "./RestartMenu.css";

interface PopupProps {
  score: number;
  isOpen: boolean;
  onClose: () => void;
}

const RestartMenu: FC<PopupProps> = ({ score, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2 className="heading">Game Over</h2>
        <h3 className="subheading">Your score: {score}</h3>

        <div className="button-group">
          <button className="button button-new-game">
            Start New Game
          </button>
          <button className="button button-watch-replay">
            Watch Replay
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestartMenu;
