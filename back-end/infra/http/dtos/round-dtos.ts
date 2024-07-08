import { z } from 'zod'

export const fetchRoundsByGameZodQuerySchema = z.object({
  page: z.string().transform(Number),
  limit: z.string().transform(Number),
})

export const idZodParamSchema = z.object({
  id: z.string().uuid(),
})

export const createRoundZodBodySchema = z.object({
  selectedAttribute: z.enum(['max_speed', 'power', 'torque']),
})

export const selectACardZodBodySchema = z.object({
  side: z.enum(['RED', 'BLUE']),
  card: z.number().min(0).max(9),
})
