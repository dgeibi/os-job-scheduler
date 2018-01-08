import tap from 'tap'
import JobScheduler from '../core/FCFSJobScheduler'

tap.throws(() => {
  // eslint-disable-next-line
  new JobScheduler({
    jcbs: [{ arriveTime: 0, memSize: 1, needTime: 2 }],
    degree: Infinity,
    rrSlice: 3,
    maxMemSize: 1,
  })
})
