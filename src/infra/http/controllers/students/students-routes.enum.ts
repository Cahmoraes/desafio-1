export const StudentsRoutes = {
  CREATE: '/students',
  GET: '/students/:studentId',
  DELETE: '/students/:studentId',
  PUT: '/students/:studentId',
  FETCH: '/students',
} as const

export type StudentsRoute = (typeof StudentsRoutes)[keyof typeof StudentsRoutes]
