import { useRef, useState, useEffect } from "react";

type Position = {
  top: number;
  bottom: number;
};

const useElementPosition = <T extends HTMLElement>(): [
  React.RefObject<T>,
  Position
] => {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState<Position>({ top: 0, bottom: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;
        const top = rect.top + scrollTop;
        const bottom = rect.bottom + scrollTop;

        setPosition({ top, bottom });
      }
    };

    updatePosition();

    const observer = new ResizeObserver(updatePosition);
    if (ref.current) observer.observe(ref.current);

    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  // @ts-ignore
  return [ref, position];
};

export default useElementPosition;
