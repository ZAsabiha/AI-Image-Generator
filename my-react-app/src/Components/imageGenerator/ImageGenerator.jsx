import React, { useRef, useState } from 'react';
import default_image from '../Assets/default_image.svg';
import './ImageGenerator.css';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState(default_image);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return;
    }
    setLoading(true);
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_SECRET_API_KEY",
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: inputRef.current.value,
        n: 1,
        size: "512x512",
      }),
    });
    const data = await response.json();
    const data_array = data.data;
    setImage_url(data_array[0].url);
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">Ai image<span> Generator</span></div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url} alt="Generated" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>Loading....</div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className="search-input" placeholder="Describe what you want" />
        <div className="generate-btn" onClick={imageGenerator}>Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;

