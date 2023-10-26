export const StudentsRoutes = {
  CREATE: '/students',
  GET: '/students/:parentId',
  DELETE: '/students/:parentId',
  PUT: '/students/:parentId',
  FETCH: '/students',
} as const

export type StudentsRoute = (typeof StudentsRoutes)[keyof typeof StudentsRoutes]
