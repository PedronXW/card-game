import { z } from 'zod'

export const fetchGamesZodQuerySchema = z.object({
  page: z.string().transform(Number),
  limit: z.string().transform(Number),
})

export const selectAWinnerZodQuerySchema = z.object({
  winner: z.enum(['BLUE', 'RED']),
})
