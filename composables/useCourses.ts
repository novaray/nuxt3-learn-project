import coursesData from '~/composables/coursesData';
import type { CourseWithPath } from '~/types/course';

interface CoursesReturn {
  courses: CourseWithPath[];
}

export const useCourses = (): CoursesReturn => {
  const courses = coursesData.map((course) => ({
    ...course,
    rating: course.rating.toFixed(1),
    reviewsCount: course.reviewsCount.toLocaleString(),
    studentCount: course.studentCount.toLocaleString(),
    path: `/course/${course.courseSlug}`
  }));

  return {
    courses
  };
};
