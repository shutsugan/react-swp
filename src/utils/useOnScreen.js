import { useState, useEffect } from "react";

const useOnScreen = (ref, rootMargin = "0px") => {
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observerCallback = ([entry]) => setIntersecting(entry.isIntersecting);
    const observer = new IntersectionObserver(observerCallback, { rootMargin });

    const current = ref.current;
    current && observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return intersecting;
};

export default useOnScreen;
