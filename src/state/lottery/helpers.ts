import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { LotteryStatus, LotteryTicket } from 'config/constants/types'
import kazamaLotteryAbi from 'config/abi/kazamaLottery.json'
import { getKazamaLotteryAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import { LotteryRound, LotteryRoundUserTickets, LotteryResponse } from 'state/types'
import { getKazamaLotteryContract } from 'utils/contractHelpers'
import { useMemo } from 'react'
import { ethersToSerializedBigNumber } from 'utils/bigNumber'
import { NUM_ROUNDS_TO_FETCH_FROM_NODES } from 'config/constants/lottery'

const lotteryContract = getKazamaLotteryContract()

const processViewLotterySuccessResponse = (response, lotteryId: string): LotteryResponse => {
  const {
    status,
    startTime,
    endTime,
    priceTicketInKazama,
    discountDivisor,
    treasuryFee,
    firstTicketId,
    lastTicketId,
    amountCollectedInKazama,
    finalNumber,
    kazamaPerBracket,
    countWinnersPerBracket,
    rewardsBreakdown,
  } = response

  const statusKey = Object.keys(LotteryStatus)[status]
  const serializedKazamaPerBracket = kazamaPerBracket.map((kazamaInBracket) => ethersToSerializedBigNumber(kazamaInBracket))
  const serializedCountWinnersPerBracket = countWinnersPerBracket.map((winnersInBracket) =>
    ethersToSerializedBigNumber(winnersInBracket),
  )
  const serializedRewardsBreakdown = rewardsBreakdown.map((reward) => ethersToSerializedBigNumber(reward))

  return {
    isLoading: false,
    lotteryId,
    status: LotteryStatus[statusKey],
    startTime: startTime?.toString(),
    endTime: endTime?.toString(),
    priceTicketInKazama: ethersToSerializedBigNumber(priceTicketInKazama),
    discountDivisor: discountDivisor?.toString(),
    treasuryFee: treasuryFee?.toString(),
    firstTicketId: firstTicketId?.toString(),
    lastTicketId: lastTicketId?.toString(),
    amountCollectedInKazama: ethersToSerializedBigNumber(amountCollectedInKazama),
    finalNumber,
    kazamaPerBracket: serializedKazamaPerBracket,
    countWinnersPerBracket: serializedCountWinnersPerBracket,
    rewardsBreakdown: serializedRewardsBreakdown,
  }
}

const processViewLotteryErrorResponse = (lotteryId: string): LotteryResponse => {
  return {
    isLoading: true,
    lotteryId,
    status: LotteryStatus.PENDING,
    startTime: '',
    endTime: '',
    priceTicketInKazama: '',
    discountDivisor: '',
    treasuryFee: '',
    firstTicketId: '',
    lastTicketId: '',
    amountCollectedInKazama: '',
    finalNumber: null,
    kazamaPerBracket: [],
    countWinnersPerBracket: [],
    rewardsBreakdown: [],
  }
}

export const fetchLottery = async (lotteryId: string): Promise<LotteryResponse> => {
  try {
    const lotteryData = await lotteryContract.viewLottery(lotteryId)
    return processViewLotterySuccessResponse(lotteryData, lotteryId)
  } catch (error) {
    return processViewLotteryErrorResponse(lotteryId)
  }
}

export const fetchMultipleLotteries = async (lotteryIds: string[]): Promise<LotteryResponse[]> => {
  const calls = lotteryIds.map((id) => ({
    name: 'viewLottery',
    address: getKazamaLotteryAddress(),
    params: [id],
  }))
  try {
    const multicallRes = await multicallv2(kazamaLotteryAbi, calls, { requireSuccess: false })
    const processedResponses = multicallRes.map((res, index) =>
      processViewLotterySuccessResponse(res[0], lotteryIds[index]),
    )
    return processedResponses
  } catch (error) {
    console.error(error)
    return calls.map((call, index) => processViewLotteryErrorResponse(lotteryIds[index]))
  }
}

export const fetchCurrentLotteryIdAndMaxBuy = async () => {
  try {
    const calls = ['currentLotteryId', 'maxNumberTicketsPerBuyOrClaim'].map((method) => ({
      address: getKazamaLotteryAddress(),
      name: method,
    }))
    const [[currentLotteryId], [maxNumberTicketsPerBuyOrClaim]] = (await multicallv2(
      kazamaLotteryAbi,
      calls,
    )) as ethers.BigNumber[][]

    return {
      currentLotteryId: currentLotteryId ? currentLotteryId.toString() : null,
      maxNumberTicketsPerBuyOrClaim: maxNumberTicketsPerBuyOrClaim ? maxNumberTicketsPerBuyOrClaim.toString() : null,
    }
  } catch (error) {
    return {
      currentLotteryId: null,
      maxNumberTicketsPerBuyOrClaim: null,
    }
  }
}

export const getRoundIdsArray = (currentLotteryId: string): string[] => {
  const currentIdAsInt = parseInt(currentLotteryId, 10)
  const roundIds = []
  for (let i = 0; i < NUM_ROUNDS_TO_FETCH_FROM_NODES; i++) {
    roundIds.push(currentIdAsInt - i)
  }
  return roundIds.map((roundId) => roundId.toString())
}

export const useProcessLotteryResponse = (
  lotteryData: LotteryResponse & { userTickets?: LotteryRoundUserTickets },
): LotteryRound => {
  const {
    priceTicketInKazama: priceTicketInKazamaAsString,
    discountDivisor: discountDivisorAsString,
    amountCollectedInKazama: amountCollectedInKazamaAsString,
  } = lotteryData

  const discountDivisor = useMemo(() => {
    return new BigNumber(discountDivisorAsString)
  }, [discountDivisorAsString])

  const priceTicketInKazama = useMemo(() => {
    return new BigNumber(priceTicketInKazamaAsString)
  }, [priceTicketInKazamaAsString])

  const amountCollectedInKazama = useMemo(() => {
    return new BigNumber(amountCollectedInKazamaAsString)
  }, [amountCollectedInKazamaAsString])

  return {
    isLoading: lotteryData.isLoading,
    lotteryId: lotteryData.lotteryId,
    userTickets: lotteryData.userTickets,
    status: lotteryData.status,
    startTime: lotteryData.startTime,
    endTime: lotteryData.endTime,
    priceTicketInKazama,
    discountDivisor,
    treasuryFee: lotteryData.treasuryFee,
    firstTicketId: lotteryData.firstTicketId,
    lastTicketId: lotteryData.lastTicketId,
    amountCollectedInKazama,
    finalNumber: lotteryData.finalNumber,
    kazamaPerBracket: lotteryData.kazamaPerBracket,
    countWinnersPerBracket: lotteryData.countWinnersPerBracket,
    rewardsBreakdown: lotteryData.rewardsBreakdown,
  }
}

export const hasRoundBeenClaimed = (tickets: LotteryTicket[]): boolean => {
  const claimedTickets = tickets.filter((ticket) => ticket.status)
  return claimedTickets.length > 0
}
