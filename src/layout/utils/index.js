import React, {useState, useEffect} from 'react';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

function Utils() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions())
  }

  useEffect(() => {
    const element = document.getElementById('application')
    if (windowDimensions.width >= 1024) {
      element.classList.add('open')
    } else {
      element.classList.remove('open')
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowDimensions])

  return (
    <></>
  );
}

export default Utils;
