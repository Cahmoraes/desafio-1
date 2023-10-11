export const ParentsRoutes = {
  CREATE: '/parents',
  GET: '/parents/:parentId',
  DELETE: '/parents/:parentId',
} as const

export type ParentsRoute = (typeof ParentsRoutes)[keyof typeof ParentsRoutes]
