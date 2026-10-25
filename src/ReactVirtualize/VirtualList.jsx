// VirtualList.js
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const VirtualList = ({ data, itemHeight, height, renderItem }) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = data.length * itemHeight;

  const handleScroll = () => {
    setScrollTop(containerRef.current.scrollTop);
  };

  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(height / itemHeight) + 1;
  const visibleItems = data.slice(startIndex, startIndex + visibleCount);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height,
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid #ccc',
      }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, i) => {
          const actualIndex = startIndex + i;
          return (
            <div
              key={actualIndex}
              style={{
                position: 'absolute',
                top: actualIndex * itemHeight,
                height: itemHeight,
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

VirtualList.propTypes = {
  data: PropTypes.array.isRequired,
  itemHeight: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default VirtualList;
