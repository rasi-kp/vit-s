import React from 'react';

const VideoComponent = () => {
  return (
    <div>
      <video autoPlay loop muted playsInline className='back-video'>
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoComponent;