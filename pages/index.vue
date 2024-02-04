<script setup lang="ts">
import type { WarcraftLogsSession } from '~/composables/useAuth'

const session = useCookie<WarcraftLogsSession | null>('session')
const router = useRouter()
if (!session.value) {
  router.push('/login')
}

const { getReportIdFromUrl, getReport, getDamageFromFights } = useWarcraftlogs()

const interwovenThreads = ref(true)
const warcraftlogsUrl = ref('https://www.warcraftlogs.com/reports/1FGcyYVXaCNvtmwk')
const analyze = () => {
  const reportId = getReportIdFromUrl(warcraftlogsUrl.value)
  if (!reportId) return
  console.log('reportId', reportId)
  const { result: report } = getReport(reportId)
  if (!report.value) return
  console.log(report.value)
  const fightIds = report.value.reportData.report.fights.map((fight) => fight.id)
  console.log(fightIds)
  const { result: damage } = getDamageFromFights(reportId, fightIds)
  console.log(damage.value)
}
</script>

<template>
  <div class="prose prose-invert max-w-screen-md mx-auto bg-slate-600/80 px-4 py-8 my-8 rounded-lg">
    <h1 class="">Augmentation Target Analyzer</h1>
    <p>This is a tool to help you analyze your logs and find the best targets for your abilities.</p>
    <div class="flex items-center gap-2">
      <label for="interwoven" class="font-bold">Use Interwoven Threads:</label>
      <input
        id="interwoven"
        v-model="interwovenThreads"
        type="checkbox"
        name="interwoven"
        class="form-checkbox rounded text-emerald-500"
      />
    </div>
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
  </div>
</template>
