import { Side } from '../../domain/entities/game'
import { Round } from '../../domain/entities/round'
import {
  FetchRoundsResponse,
  RoundRepository,
} from '../../domain/repositories/round-repository'
import { RoundMapper } from './mappers/round-mapper'
import { prisma } from './prisma'

export class PrismaRoundRepository implements RoundRepository {
  async createRound(round: Round): Promise<Round> {
    const createdRound = await prisma.round.create({
      data: RoundMapper.toPersistence(round),
      include: {
        game: {
          select: {
            id: true,
          },
        },
      },
    })

    return RoundMapper.toDomain(createdRound)
  }

  async selectCard(card: string, id: string, side: Side): Promise<Round> {
    let data

    if (side === Side.BLUE) {
      data = {
        blueCardPlayed: card,
      }
    } else {
      data = {
        redCardPlayed: card,
      }
    }

    const updatedRound = await prisma.round.update({
      where: {
        id,
      },
      data,
      include: {
        game: {
          select: {
            id: true,
          },
        },
      },
    })

    return RoundMapper.toDomain(updatedRound)
  }

  async fetchRoundById(id: string): Promise<Round | undefined> {
    const round = await prisma.round.findUnique({
      where: { id },
      include: {
        game: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!round) {
      return undefined
    }

    return RoundMapper.toDomain(round)
  }

  async fetchRoundsByGame(
    gameId: string,
    page: number,
    limit: number,
  ): Promise<FetchRoundsResponse> {
    const rounds = await prisma.$transaction([
      prisma.round.findMany({
        take: limit * 1,
        skip: (page - 1) * limit,
        where: {
          gameId,
        },
        include: {
          game: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.round.count({ where: { gameId } }),
    ])

    return {
      rounds: rounds[0].map(RoundMapper.toDomain),
      totalRoundsCount: rounds[1],
    }
  }
}
