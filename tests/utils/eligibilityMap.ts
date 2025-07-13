import { Eligibility } from '../constants/Eligibility'

export const eligibilityArrowDownMap: Record<Eligibility, number> = {
  [Eligibility.FIRST_YEAR]: 0,
  [Eligibility.SECOND_YEAR]: 1,
  [Eligibility.THIRD_YEAR]: 2,
  [Eligibility.FOURTH_YEAR]: 3,
  [Eligibility.FRESHGRAD]: 4,
  [Eligibility.ONE_TO_THREE_YOE]: 5,
  [Eligibility.FOUR_TO_FIVE_YOE]: 6,
  [Eligibility.MORE_THAN_FIVE_YOE]: 7,
  [Eligibility.OTHERS]: 8,
}

export function getEligibilityArrowDownCount(level: Eligibility): number {
  if (level in eligibilityArrowDownMap) {
    return eligibilityArrowDownMap[level]
  }
  throw new Error(`Unsupported Eligibility: ${level}`)
}
