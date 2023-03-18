import React, { useRef, useState } from "react";
import style from "./CourseItem.module.scss";
import { Rate } from "antd";
import ReactHlsPlayer from "react-hls-player";

export default function CourseItem(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { title, meta, description, lessonsCount, rating, tags } = props?.data;
  let previewImageLink;
  let link;

  if (meta?.courseVideoPreview) {
    previewImageLink = meta?.courseVideoPreview.previewImageLink;
    link = meta?.courseVideoPreview.link;
  }

  const imageUrl = previewImageLink ? previewImageLink + "/preview.webp" : "";
  // ${previewImageLink}/lesson-${order}.webp. Наприклад https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-1/lesson-1.webp.
  // https://wisey.app/videos/learn-and-grow-relationships/preview/AppleHLS1/preview.m3u8
  return (
    <div className={style.container} onMouseEnter={() => setIsPlaying(true)} onMouseLeave={() => setIsPlaying(false)}>
      <div className={style.description__container}>
        <h2 className={style.title}>{title}</h2>
        <p className={style.subTitle}>Lessons is course: {lessonsCount}</p>
        {tags.length > 0 && (
          <div className={style.skills__container}>
            <h2 className={style.title}>skills:</h2>
            <ul>
              {tags.map((tag) => (
                <li key={tag} className={style.skills}>
                  {" "}
                  - {tag}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Rate value={rating} className={style.rating} />
      </div>
      <div className={style.image__container}>
        {isPlaying ? (
          <ReactHlsPlayer
            src={link}
            autoPlay={isPlaying}
            controls={false}
            width="100%"
            height="auto"
          />
        ) : (
          <img alt={title} src={imageUrl} className={style.image} />
        )}
      </div>
    </div>
  );
}
