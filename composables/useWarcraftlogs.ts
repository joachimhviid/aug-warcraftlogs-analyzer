export type Fight = {
  id: number
  startTime: number
  endTime: number
}

export type ReportResult = {
  reportData: {
    report: {
      fights: Fight[]
    }
  }
}

export type Interval = {
  start: number
  end: number
}

export const useWarcraftlogs = () => {
  const abilityFilter =
    'ability.id NOT IN (409632, 402583, 408682, 408694, 401324, 401306, 401422, 401428, 418774, 418588, 419591, 418607, 406251, 406889, 379403, 408791, 378426, 381006, 381700, 406764, 394453, 370794, 408836, 408815, 381475, 281721, 214397, 408469, 374087, 370817, 426564, 417458, 424965, 425181, 419737, 265953, 425154, 425156, 422146, 426341, 426431, 426486, 426339, 426527, 426535, 426306, 259756, 426288, 427209, 422956, 427161, 424324, 419279, 215444, 214168, 214169, 228784, 214350, 422750, 425701, 422750, 425461, 417458, 215407, 270827, 213785, 425509, 414532, 417134, 413584, 424094, 386301, 243991, 426297)'

  const getReportIdFromUrl = (url: string) => {
    const regex = /\/reports\/([^#]+)/
    const matches = url.match(regex)
    if (!matches) throw new Error('Invalid Warcraftlogs URL')
    return matches[1]
  }

  // Get report from id
  // Get fights from report
  // Get timestamps from fights
  const getReport = (reportId: string) => {
    const query = gql`
      query {
        reportData {
          report(code: "${reportId}") {
            fights {
              id
              startTime
              endTime
            }
          }
        }
      }`
    return useAsyncQuery<ReportResult>(query)
  }

  // Get intervals from timestamps
  const getIntervalsFromFight = (fight: Fight, interwoven: boolean): { id: number; intervals: Interval[] } => {
    const intervalDuration = interwoven ? 27000 : 30000
    const intervals = [] as Interval[]
    for (let i = fight.startTime; i < fight.endTime; i += intervalDuration) {
      intervals.push({
        start: i,
        end: i + intervalDuration,
      })
    }
    return { id: fight.id, intervals }
  }

  const getDamageFromFights = (reportId: string, fightIds: number[]) => {
    const query = gql`
      query {
        reportData {
          report(code: "${reportId}") {
            table(filterExpression: "${abilityFilter}", fightIDs: [${fightIds}], dataType: DamageDone, targetClass: "Boss")
          }
        }
      }
    `
    return useAsyncQuery(query)
  }
  // Get events from intervals
  // Get top 4 damage dealers from events (by player) from intervals
  // Tally up damage from top 4 damage dealers across all fights for each interval
  // Present top 4 damage dealers by interval

  return {
    getReportIdFromUrl,
    getIntervalsFromFight,
    getDamageFromFights,
    getReport,
  }
}
