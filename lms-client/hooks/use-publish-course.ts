import { useState } from 'react';
import axios from 'axios';
import useCourseStore, { Course } from './course-store';
import { server } from '@/server';

const usePublishCourse = () => {
  const [publishing, setPublishing] = useState(false);
  const {course}=useCourseStore()

  const publish = async () => {
    setPublishing(true);
    try {
      const response = await axios.patch(`/api/course/${course._id}`, course);
      setTimeout(() => {
        setPublishing(false);
      }, 800);
    } catch (error) {
      console.error(error);
      setPublishing(false);
    }
  };

  return { publish, publishing };
};

export default usePublishCourse;
