import { RoleLevel } from '../constants/RoleLevel'

export function getRoleLevelArrowDownCount(level: RoleLevel): number {
  switch (level) {
    case RoleLevel.ASSOCIATE:
      return 0
    case RoleLevel.C_LEVEL:
      return 1
    case RoleLevel.DIRECTOR:
      return 2
    case RoleLevel.INTERN:
      return 3
    case RoleLevel.LEAD:
      return 4
    case RoleLevel.LEAD_SENIOR:
      return 5
    case RoleLevel.MANAGER:
      return 6
    case RoleLevel.OFFICER:
      return 7
    case RoleLevel.SENIOR_LEAD:
      return 8
    case RoleLevel.STAFF:
      return 9
    default:
      throw new Error(`Unsupported RoleLevel: ${level}`)
  }
}
