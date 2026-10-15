import { useState } from 'react';
import Icon from './Icon';

// Click-to-play YouTube. Nothing loads from YouTube until the visitor presses play (privacy and speed).
export default function Video({ id, title, credit }) {
  const [on, setOn] = useState(false);
  return (
    <figure className="vid">
      <div className="vid__f">
        {on ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : (
          <button type="button" onClick={() => setOn(true)} aria-label={`Play video: ${title}`}>
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="vid__p"><Icon name="play" size={26} /></span>
          </button>
        )}
      </div>
      <figcaption><b>{title}</b><span>{credit} · <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></span></figcaption>
    </figure>
  );
}
