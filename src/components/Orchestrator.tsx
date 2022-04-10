import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlaying, step } from "../state/lifeSlice";

let interval: ReturnType<typeof setTimeout> | null = null;

const Orchestrator = () => {
  const dispatch = useDispatch();
  const playing = useSelector(selectPlaying);

  useEffect(() => {
    if (playing && !interval) {
      interval = setInterval(() => {
        dispatch(step());
      }, 500);
    }
    if (!playing && interval) {
      clearInterval(interval);
      interval = null;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing, dispatch]);

  return null;
};

export default Orchestrator;
