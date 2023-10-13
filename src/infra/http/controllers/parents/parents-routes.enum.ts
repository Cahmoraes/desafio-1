export const ParentsRoutes = {
  CREATE: '/parents',
  GET: '/parents/:parentId',
  DELETE: '/parents/:parentId',
  PUT: '/parents/:parentId',
  FETCH: '/parents',
} as const

export type ParentsRoute = (typeof ParentsRoutes)[keyof typeof ParentsRoutes]
