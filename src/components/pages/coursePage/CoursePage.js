import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../api/getCourse';
import { getToken } from '../../../api/getToken';
import { Store } from '../../../utils/storage/store';

export default function CoursePage() {
  const params = useParams();
  const { state, dispatch } = useContext(Store);
  const [courseData, setCourseData] = useState([]);
  console.log(`${courseData?.lessons?.[0].link}/1/.webp`);

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

  return (
    <>
    <picture>
      <source srcset={`${courseData?.lessons?.[0].link}/1/.webp`} type="image/webp"/>
    </picture>
    </>
  )
}
