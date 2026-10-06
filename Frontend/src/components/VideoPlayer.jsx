import React, { useState, useEffect } from 'react';

export default function VideoPlayer({ src, poster, startTime = 0, endTime = 0, onComplete }) {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (!src) return;

    // Construct YouTube URL with start/end parameters
    let url = src;
    const params = [];

    if (startTime > 0) params.push(`start=${startTime}`);
    if (endTime > 0) params.push(`end=${endTime}`);

    // Add other parameters
    params.push('autoplay=0');
    params.push('rel=0'); // Don't show related videos
    params.push('modestbranding=1');

    if (params.length > 0) {
      url += (url.includes('?') ? '&' : '?') + params.join('&');
    }

    setVideoUrl(url);
  }, [src, startTime, endTime]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
      <iframe
        src={videoUrl}
        className="w-full h-full"
        title="Course Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}