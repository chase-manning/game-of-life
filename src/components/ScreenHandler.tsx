import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeight, setWidth } from "../state/lifeSlice";

const ScreenHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateCellCount = () => {
      const newWindowHeight = (window as any).innerHeight;
      const newWindowWidth = (window as any).innerWidth;
      const newWidth = Math.round((100 / 1792) * newWindowWidth);
      const newHeight = Math.round(
        newWidth * (newWindowHeight / newWindowWidth)
      );

      dispatch(setHeight(newHeight));
      dispatch(setWidth(newWidth));
    };

    updateCellCount();
    window.addEventListener("resize", updateCellCount);
  }, [dispatch]);

  return null;
};

export default ScreenHandler;
