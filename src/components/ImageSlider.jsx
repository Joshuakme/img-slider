// Import React
import { useEffect, useState, useRef } from "react";
// Import Own Components

// Import Styles
import classes from "./imageSlider.module.css";

// Assets
const imgList = ["3.jpg", "1.jpg", "2.jpg", "3.jpg", "1.jpg"];
const maxImgIndex = imgList.length;

function ImageSlider() {
  // States
  const [activeImg, setActiveImg] = useState(1);
  // Ref
  const imgContainerRef = useRef();
  const imgRef = useRef();

  // Functions
  useEffect(() => {
    setActiveImg(1);
  }, []);

  function handlePrev(e) {
    e.preventDefault(); // prevent browser from refreshing

    if (activeImg >= 0 && activeImg < maxImgIndex) {
      setActiveImg((currentImg) => currentImg - 1);
    } else {
      setActiveImg(maxImgIndex);
    }
  }

  function handleNext(e) {
    e.preventDefault(); // prevent browser from refreshing

    if (activeImg >= 0 && activeImg < maxImgIndex) {
      setActiveImg((currentImg) => currentImg + 1);

      // Get percentage of one image
      const imgPercent = 100 / maxImgIndex;
      const translateDistance = activeImg * imgPercent;

      imgContainerRef.current.style.setProperty(
        "--img-translate-height",
        `-${translateDistance}%`
      );
    } else if (activeImg === maxImgIndex) {
      imgContainerRef.current.addEventListener("transitionend", () => {
        console.log("End");

        imgContainerRef.current.classList.add("notransition");
        imgContainerRef.current.style.setProperty(
          "--img-translate-height",
          `0%`
        );
        console.log(imgContainerRef.current.offsetHeight);
        imgContainerRef.current.classList.remove("notransition");
        setActiveImg(0);
      });
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        // overflow: "hidden",
        maxWidth: "720px",
        aspectRatio: 3 / 2,
      }}
    >
      <section className={classes.imgSliderContainer}>
        <div className={classes.imgContainer} ref={imgContainerRef}>
          {imgList.map((img, index) => (
            <img
              src={`./image/${img}`}
              alt={`image-${index}`}
              ref={imgRef}
              className={classes.sliderImg}
              key={index}
            />
          ))}
        </div>

        <div className={classes.sliderBtn}>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </section>
      {activeImg}
    </div>
  );
}

export default ImageSlider;
