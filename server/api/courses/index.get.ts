import { getCourses } from '~/server/model/course';

export default defineEventHandler(() => {
  const courses = getCourses();
  return courses;
});
