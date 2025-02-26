import { useEffect } from "react";

function useScrollDelay(onScrollStart: () => void, onScrollEnd: () => void, delay: number = 300) {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      onScrollStart();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        onScrollEnd();
      }, delay);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [onScrollStart, onScrollEnd, delay]);
}

export default useScrollDelay;
