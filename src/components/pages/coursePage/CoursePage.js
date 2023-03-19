import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../../../api/getCourse";
import { getToken } from "../../../api/getToken";
import { Store } from "../../../utils/storage/store";
import ReactPlayer from "react-player";
import styles from "./CoursePage.module.scss";
import classnames from "classnames";
import toaster from "../../utils/toast/Toaster";

export default function CoursePage() {
  const params = useParams();
  const { state, dispatch } = useContext(Store);
  const [courseData, setCourseData] = useState([]);
  const [currentLesson, setCurrentLeson] = useState(0);

  const { title, lessons, description } = courseData;

  const video = lessons?.[currentLesson]?.link || "";

  console.log(courseData);

  useEffect(() => {
    const fetchData = async () => {
      if (!state.token) {
        const tokenData = await getToken();
        await dispatch({
          type: "SET_TOKEN",
          payload: { token: tokenData.token },
        });
      }
      if (state.token) {
        const coursesData = await getCourse(state.token, params.courseId);
        setCourseData(coursesData);
      }
    };
    fetchData();
  }, [state]);

  const chooseLesson = (index) => {
    if (courseData?.lessons?.[index].status === "unlocked") {
      setCurrentLeson(index);
    } else {
      return toaster({type: 'info', text: 'This lesson isn\'t avaliable now'});
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.description__container}>
        <div className={styles.description}>
          <h2 className={styles.subTitle}>{description}</h2>
          {lessons?.length > 0 && (
            <div className={styles.lessons__container}>
              <h2 className={styles.title}>Lessons:</h2>
              <ul>
                {lessons.map((lesson, index) => (
                  <li
                    key={lesson.id}
                    className={classnames(`
                      ${
                        lesson.status === "unlocked"
                          ? styles.lesson
                          : styles.lesson__locked
                      }
                      ${currentLesson === index && styles.active}
                    `)}
                    onClick={() => chooseLesson(index)}
                  >
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <ReactPlayer
          className={styles.player}
          controls={true}
          url={video}
          playing={true}
          width="100%"
          height="auto"
          config={{
            file: {
              forceVideo: true,
            },
          }}
        />
      </div>
    </div>
  );
}
