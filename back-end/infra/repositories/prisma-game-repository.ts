import { WinnerSide } from '@prisma/client'
import { Game } from '../../domain/entities/game'
import {
  FetchGamesResponse,
  GameRepository,
} from '../../domain/repositories/game-repository'
import { GameMapper } from './mappers/game-mapper'
import { prisma } from './prisma'

export class PrismaGameRepository implements GameRepository {
  async selectAWinner(id: string, winner: WinnerSide): Promise<Game> {
    const game = await prisma.game.update({
      where: {
        id,
      },
      data: {
        winner,
      },
    })

    return GameMapper.toDomain(game)
  }

  async fetchGameById(id: string): Promise<Game> {
    const game = await prisma.game.findUnique({
      where: {
        id,
      },
      include: {
        rounds: {
          select: {
            id: true,
          },
        },
      },
    })

    return GameMapper.toDomain(game)
  }

  async createGame(game: Game): Promise<Game> {
    const createdGame = await prisma.game.create({
      data: GameMapper.toPersistence(game),
    })

    return GameMapper.toDomain(createdGame)
  }

  async fetchGames(page: number, limit: number): Promise<FetchGamesResponse> {
    const games = await prisma.$transaction([
      prisma.game.findMany({
        take: limit * 1,
        skip: (page - 1) * limit,
        include: {
          rounds: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.game.count(),
    ])

    return {
      games: games[0].map(GameMapper.toDomain),
      totalGamesCount: games[1],
    }
  }
}
