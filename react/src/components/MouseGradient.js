import React, { useState, useEffect } from 'react';

const MouseGradientBackground = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('rgb(255, 255, 255)');

  useEffect(() => {
    const handleMouseMove = (event) => {
      const mouseX = Math.round((event.clientX / window.innerWidth) * 255);
      const mouseY = Math.round((event.clientY / window.innerHeight) * 255);
      const color = `rgb(${mouseX}, ${mouseY}, 100)`;
      setBackgroundColor(color);
    };

    document.body.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ height: '100vh', background: backgroundColor }}>
      {children}
    </div>
  );
};

export default MouseGradientBackground;
