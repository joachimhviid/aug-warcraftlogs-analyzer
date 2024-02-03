<script setup lang="ts">
import type { WarcraftLogsSession } from '~/composables/useAuth'

const session = useCookie<WarcraftLogsSession | null>('session')
const router = useRouter()
if (!session.value) {
  router.push('/login')
}

const { getReportIdFromUrl, getReport } = useWarcraftlogs()
const test = async () => {
  console.log('test')
  // console.log(await getReport('1FGcyYVXaCNvtmwk'))
  // const abilityFilter =
  //   'ability.id NOT IN (409632, 402583, 408682, 408694, 401324, 401306, 401422, 401428, 418774, 418588, 419591, 418607, 406251, 406889, 379403, 408791, 378426, 381006, 381700, 406764, 394453, 370794, 408836, 408815, 381475, 281721, 214397, 408469, 374087, 370817, 426564, 417458, 424965, 425181, 419737, 265953, 425154, 425156, 422146, 426341, 426431, 426486, 426339, 426527, 426535, 426306, 259756, 426288, 427209, 422956, 427161, 424324, 419279, 215444, 214168, 214169, 228784, 214350, 422750, 425701, 422750, 425461, 417458, 215407, 270827, 213785, 425509, 414532, 417134, 413584, 424094, 386301, 243991, 426297)'
  // const query = gql`
  //   query {
  //     reportData {
  //       report(code: "1FGcyYVXaCNvtmwk") {
  //         table(filterExpression: "${abilityFilter}", fightIDs: [1], dataType: DamageDone, targetClass: "Boss")
  //       }
  //     }
  //   }
  // `
  // const { data } = await useAsyncQuery(query)
  // console.log(data.value)
}
const warcraftlogsUrl = ref('https://www.warcraftlogs.com/reports/1FGcyYVXaCNvtmwk')
const analyze = async () => {
  const reportId = getReportIdFromUrl(warcraftlogsUrl.value)
  if (reportId) {
    console.log('reportId', reportId)
    const report = await getReport(reportId)
    console.log(report.value)
  }
}
</script>

<template>
  <div class="prose prose-invert max-w-screen-md mx-auto bg-slate-600/80 px-4 py-8 my-8 rounded-lg">
    <h1 class="">Augmentation Target Analyzer</h1>
    <p>This is a tool to help you analyze your logs and find the best targets for your abilities.</p>
    <div class="flex flex-col">
      <label for="link" class="font-bold">Link to your logs:</label>
      <input
        v-model="warcraftlogsUrl"
        type="text"
        name="link"
        class="rounded px-2 py-1 text-black"
        placeholder="Insert warcraftlogs link here..."
      />
      <button
        :disabled="warcraftlogsUrl === ''"
        class="p-3 bg-emerald-600 rounded mt-3 text-white font-bold hover:bg-emerald-700 transition-colors duration-300 ease-in-out disabled:opacity-50"
        @click="analyze"
      >
        Analyze
      </button>
    </div>
    <button @click="test">Test connection</button>
  </div>
</template>
