import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css";

export default function ImageSlider({ url = "https://picsum.photos/v2/list", limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      setErrorMsg(null);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data) && data.length > 0) {
        setImages(data);
      } else {
        throw new Error("No image data found in API response.");
      }

    } catch (e) {
      console.error("Fetch error:", e);
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handlePrevious() {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleNext() {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  useEffect(() => {
    if (url) {
      fetchImages(url);
    } else {
      setErrorMsg("Invalid URL provided.");
    }
  }, [url, page, limit]);

  if (loading) {
    return <div>Loading data! Please wait...</div>;
  }

  if (errorMsg) {
    return <div>Error occurred! {errorMsg}</div>;
  }

  return (
    <div className="container">
      {images.length > 0 && (
        <>
          <BsArrowLeftCircleFill
            onClick={handlePrevious}
            className="arrow arrow-left"
          />

          {images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              alt={`Slide ${index + 1}`}
              src={imageItem.download_url}
              className={
                currentSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))}

          <BsArrowRightCircleFill
            onClick={handleNext}
            className="arrow arrow-right"
          />

          <span className="circle-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </span>
        </>
      )}

      {images.length === 0 && <div>No images to display.</div>}
    </div>
  );
}
