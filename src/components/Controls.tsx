import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectPlaying, play, pause } from "../state/lifeSlice";

import playIcon from "../assets/buttons/play.svg";
import pauseIcon from "../assets/buttons/pause.svg";

const StyledControls = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background: var(--bg);
  border: solid 2px var(--border);
  padding: 2rem;
`;

const Button = styled.button`
  cursor: pointer;
`;

const Icon = styled.img`
  height: 3rem;
`;

const Controls = () => {
  const dispatch = useDispatch();
  const playing = useSelector(selectPlaying);

  return (
    <StyledControls>
      <Button
        onClick={() => {
          if (playing) dispatch(pause());
          else dispatch(play());
        }}
      >
        <Icon
          src={playing ? pauseIcon : playIcon}
          alt={`${playing ? "Pause" : "Play"} icon`}
        />
      </Button>
    </StyledControls>
  );
};

export default Controls;
