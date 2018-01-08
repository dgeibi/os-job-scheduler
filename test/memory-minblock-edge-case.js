import JobScheduler from '../core/FCFSJobScheduler'
import testJobScheduler from '../test-helpers/testJobScheduler'

const scheduler = new JobScheduler({
  jcbs: [
    { arriveTime: 0, memSize: 2, needTime: 2 },
    { arriveTime: 0, memSize: 1, needTime: 1 },
  ],
  degree: Infinity,
  rrSlice: 3,
  maxMemSize: 3,
})

testJobScheduler(scheduler)
