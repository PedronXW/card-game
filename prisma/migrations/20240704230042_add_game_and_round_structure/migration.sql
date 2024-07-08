-- CreateEnum
CREATE TYPE "WinnerSide" AS ENUM ('BLUE', 'RED');

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "winner" "WinnerSide",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "redCardsBeforeRound" TEXT[],
    "blueCardsBeforeRound" TEXT[],
    "redCardPlayed" TEXT,
    "blueCardPlayed" TEXT,
    "selectedAttribute" TEXT NOT NULL,
    "previousWinner" "WinnerSide" NOT NULL,
    "gameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
