export const useWarcraftlogs = () => {
  const abilityFilter =
    'ability.id NOT IN (409632, 402583, 408682, 408694, 401324, 401306, 401422, 401428, 418774, 418588, 419591, 418607, 406251, 406889, 379403, 408791, 378426, 381006, 381700, 406764, 394453, 370794, 408836, 408815, 381475, 281721, 214397, 408469, 374087, 370817, 426564, 417458, 424965, 425181, 419737, 265953, 425154, 425156, 422146, 426341, 426431, 426486, 426339, 426527, 426535, 426306, 259756, 426288, 427209, 422956, 427161, 424324, 419279, 215444, 214168, 214169, 228784, 214350, 422750, 425701, 422750, 425461, 417458, 215407, 270827, 213785, 425509, 414532, 417134, 413584, 424094, 386301, 243991, 426297)'

  const getReportIdFromUrl = (url: string) => {
    // if (!url.includes('warcraftlogs.com/reports')) throw new Error('Invalid Warcraftlogs URL')
    const regex = /\/reports\/([^#]+)/
    const matches = url.match(regex)
    if (!matches) throw new Error('Invalid Warcraftlogs URL')
    return matches[1]
  }

  // Get report from id
  const getReport = async (reportId: string) => {
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
    const { data } = await useAsyncQuery(query)
    return data
  }
  // Get fights from report
  // Get timestamps from fights
  // Get intervals from timestamps
  // Get events from intervals
  // Get top 4 damage dealers from events (by player) from intervals
  // Tally up damage from top 4 damage dealers across all fights for each interval
  // Present top 4 damage dealers by interval

  return {
    getReportIdFromUrl,
    getReport,
  }
}