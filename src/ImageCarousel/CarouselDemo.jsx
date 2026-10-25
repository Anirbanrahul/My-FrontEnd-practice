import React, { useState, useEffect } from 'react';
import InterviewTips from '../components/InterviewTips';

const SLIDES = [
  { id: 1, title: 'Slide 1: Mountain View', color: '#3b82f6' },
  { id: 2, title: 'Slide 2: Ocean Wave', color: '#f59e0b' },
  { id: 3, title: 'Slide 3: Forest Canopy', color: '#10b981' },
  { id: 4, title: 'Slide 4: Night Aurora', color: '#8b5cf6' },
];

const CarouselDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play timer effect
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, 2500);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">React Image Carousel / Slider</h2>
      <p className="demo-description">Clean, essential circular slider implementation for frontend machine coding interviews.</p>

      {/* Auto-Play Toggle */}
      <div style={{ marginBottom: '1rem' }}>
        <button className="btn btn-secondary" onClick={() => setIsAutoPlay(!isAutoPlay)}>
          {isAutoPlay ? '⏸ Pause Auto-Play' : '▶ Start Auto-Play'}
        </button>
      </div>

      {/* Carousel Slide Box */}
      <div
        style={{
          position: 'relative',
          height: '220px',
          borderRadius: '10px',
          background: SLIDES[currentIndex].color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          transition: 'background-color 0.4s ease'
        }}
      >
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          {SLIDES[currentIndex].title}
        </h3>

        {/* Prev Arrow */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '15px',
            background: 'rgba(0,0,0,0.4)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            cursor: 'pointer'
          }}
        >
          ❮
        </button>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '15px',
            background: 'rgba(0,0,0,0.4)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            cursor: 'pointer'
          }}
        >
          ❯
        </button>

        {/* Dot Indicators */}
        <div style={{ position: 'absolute', bottom: '12px', display: 'flex', gap: '8px' }}>
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? '24px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: idx === currentIndex ? 'white' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>

      <InterviewTips
        concepts={[
          'Modulo arithmetic for circular next/prev index wrap: (index + 1) % len & (index - 1 + len) % len',
          'Auto-play interval with clearInterval cleanup in useEffect',
          'Dot indicators onClick handler setting specific index'
        ]}
      />
    </div>
  );
};

export default CarouselDemo;
