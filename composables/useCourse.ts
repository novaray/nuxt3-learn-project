import type { CourseReturn } from '@/types/course';

export const useCourse = (courseSlug: string): Promise<CourseReturn> => {
  return useFetchWithCache<CourseReturn>(`/api/courses/${courseSlug}`);
};
