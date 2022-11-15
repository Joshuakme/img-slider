// Import React
import { useEffect, useState, useRef } from "react";
// Import Own Components

// Import Styles
import classes from "./imageSlider.module.css";

// Assets
const imgArr = ["1.jpg", "2.jpg", "3.jpg"];
const maxImgIndex = imgArr.length - 1;

function ImageSlider() {
  // States
  const [counter, setCounter] = useState(1);
  const [prevImg, setPrevImg] = useState(counter - 1);
  const [nextImg, setNextImg] = useState(counter + 1);
  // Ref
  const imgContainerRef = useRef();
  const imgRef = useRef();

  // Functions
  useEffect(() => {
    if (counter > 0 && counter < cloneImgArr().length) {
      slideImage();
    } else {
      setImage();
    }

    if (imgContainerRef.current.children[counter]) {
      if (imgContainerRef.current.children[counter].id === "lastClone") {
        setCounter(cloneImgArr().length - 2);
      } else if (
        imgContainerRef.current.children[counter].id === "firstClone"
      ) {
        setCounter((currentIndex) => cloneImgArr().length - currentIndex);
      }
    }

    console.log("Active Img Index: " + counter);
  }, [counter]);

  function handlePrev(e) {
    e.preventDefault(); // prevent browser from refreshing

    setCounter((currentImg) => currentImg - 1);
  }

  function handleNext(e) {
    e.preventDefault(); // prevent browser from refreshing

    setCounter((currentImg) => currentImg + 1);
  }

  function setImage() {
    const imgHeight = imgRef.current.clientHeight;
    const translateDistance = counter * imgHeight;

    imgContainerRef.current.style.transition = "transform 1ms";
    imgContainerRef.current.style.transform = `translateY(-${translateDistance}px)`;
  }

  function slideImage() {
    const imgHeight = imgRef.current.clientHeight;
    const translateDistance = counter * imgHeight;

    imgContainerRef.current.style.transition = "transform 400ms ease-in-out";
    imgContainerRef.current.style.transform = `translateY(-${translateDistance}px)`;
  }

  function resetPosition() {
    if (counter <= 0) {
      // Last Clone
      setCounter(cloneImgArr().length - 2);
      // setImage();
    } else if (counter >= cloneImgArr().length - 1) {
      // FirstClone
      setCounter((currentIndex) => cloneImgArr().length - currentIndex);
    }
  }

  function handleSelectImage(e) {
    setCounter(e.target.id.split("-")[1]);
  }

  function handleHoldBtn(e) {
    e.target.classList.add("scaleDown");
  }

  function handleReleaseBtn(e) {
    e.target.classList.remove("scaleDown");
  }

  function cloneImgArr() {
    const newArr = [imgArr[maxImgIndex], ...imgArr, imgArr[0]];

    return newArr;
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
        <div
          className={classes.imgContainer}
          ref={imgContainerRef}
          onTransitionEnd={resetPosition}
        >
          {cloneImgArr().map((img, index) => {
            if (index === 0) {
              return (
                <img
                  src={`./image/${img}`}
                  alt={`image-${index}`}
                  id="lastClone"
                  ref={imgRef}
                  className={classes.sliderImg}
                  key={index}
                />
              );
            } else if (index === cloneImgArr().length - 1) {
              return (
                <img
                  src={`./image/${img}`}
                  alt={`image-${index}`}
                  id="firstClone"
                  className={classes.sliderImg}
                  key={index}
                />
              );
            } else {
              return (
                <img
                  src={`./image/${img}`}
                  alt={`image-${index}`}
                  className={classes.sliderImg}
                  key={index}
                />
              );
            }
          })}
        </div>

        <div className={classes.sliderBtn}>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>

        <div className={classes.sliderRadioContainer}>
          {imgArr.map((img, index) =>
            index === 0 ? (
              <input
                type="radio"
                name="slider-nav"
                id={`radio-${index + 1}`}
                defaultChecked
                onClick={handleSelectImage}
                onMouseDown={handleHoldBtn}
                key={index}
              />
            ) : (
              <input
                type="radio"
                name="slider-nav"
                id={`radio-${index + 1}`}
                onClick={handleSelectImage}
                onMouseDown={handleHoldBtn}
                onMouseUp={handleReleaseBtn}
                key={index}
              />
            )
          )}
        </div>
      </section>
      {counter}
      <div style={{ color: "white" }}>
        {counter * imgRef?.current?.clientHeight}
      </div>
    </div>
  );
}

export default ImageSlider;
