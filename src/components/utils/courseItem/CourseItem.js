import React, { useState } from "react";
import style from "./CourseItem.module.scss";
import { Rate } from "antd";
import ReactPlayer from "react-player";
import classnmes from 'classnames';

export default function CourseItem(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { title, meta, lessonsCount, rating, tags } = props?.data;
  let previewImageLink;
  let link;

  if (meta?.courseVideoPreview) {
    previewImageLink = meta?.courseVideoPreview.previewImageLink;
    link = meta?.courseVideoPreview.link;
  }

  const imageUrl = previewImageLink ? previewImageLink + "/preview.webp" : "";

  return (
    <div
      className={style.container}
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
    >
      <div className={style.description__container}>
        <h1 className={classnmes(`${style.title} ${style.mainTitle}`)}>{title}</h1>
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
          <ReactPlayer
            url={link}
            playing={isPlaying}
            muted={true}
            width="100%"
            height="auto"
            config={{
              file: {
                forceVideo: true,
              },
            }}
          />
          <img alt={title} src={imageUrl} className={style.image} style={{display: `${isPlaying ? 'none' : 'block'}`}}/>
      </div>
    </div>
  );
}
