import { memo, useEffect, useRef } from "react";
import { LoadingIcon } from "../../../components/Icons";
import cls from "../style.module.css";


const CLoading = ({ incrementPage }) => {
  const loadingRef = useRef(null);

  // run function if component will be visible on the page
  const observerFunc = () => {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          incrementPage();
        }
      })
    })
  }
  const observer = observerFunc();

  useEffect(() => {
    if (loadingRef.current) observer?.observe(loadingRef.current);

    return () => observer.disconnect();
  }, [])

  return (
    <div ref={loadingRef} className={cls.loadingContainer}>
      <div className={cls.loading}>
        <span className={cls.loadingIcon}>
          <LoadingIcon />
        </span>
        <span>Loading...</span>
      </div>
    </div>
  )
}

export default memo(CLoading);