import JCB from './JCB'
import PCB from './PCB'
import RRProcessScheduler from './RRProcessScheduler'
import MemPartition from './MemPartition'
import { maybeUndefined } from './util'

class FCFSJobScheduler {
  constructor({ jcbs, degree, rrSlice, maxMemSize } = {}) {
    /** @type {Array<JCB>} */
    this.pending =
      (jcbs &&
        jcbs.map((x, i) => {
          if (x.jid === undefined) return new JCB(Object.assign({ jid: i + 1 }, x))
          return new JCB(x)
        })) ||
      []

    /** @type {Array<JCB>} */
    this.arrived = []

    /** @type {Array<JCB>} */
    this.dead = []

    /** @type {number} 度 */
    this.degree = maybeUndefined(degree, Infinity)

    /** @type {number} 运行中的作业数 */
    this.runningCnt = 0

    /** @type {RRProcessScheduler} 进程调度器 */
    this.psScheduler = new RRProcessScheduler(rrSlice)

    /** @type {number} 内存大小 */
    this.maxMemSize = maybeUndefined(maxMemSize, 640)
    this.checkJobsMemory()
    this.memoryHolder = {}
    this.memoryHolder.memory = new MemPartition({
      size: this.maxMemSize,
      holder: this.memoryHolder,
    })
  }

  checkJobsMemory() {
    this.pending.forEach(job => {
      if (job.memSize >= this.maxMemSize) {
        throw Error(`job ${job.jid} memSize too large`)
      }
    })
  }

  /**
   * @param {number} time
   * @returns {number} newTime
   */
  run(time) {
    return this.psScheduler.run(time, (newTime, pcb) => {
      if (pcb) {
        pcb.job.time += newTime - time
        if (pcb.job.isFinished()) {
          const { job } = pcb
          job.kill(newTime)
          this.removeJob(job)
        }
      }
      for (let t = time + 1; t <= newTime; t++) {
        this.loadJob(t)
      }
      return newTime
    })
  }

  removeJob(job) {
    const index = this.arrived.indexOf(job)
    if (index > -1) {
      this.arrived.splice(index, 1)
      this.runningCnt -= 1
      this.dead.push(job)
    }
    return job
  }

  isQueueEmpty() {
    return this.pending.length + this.arrived.length <= 0
  }

  takeJob(time) {
    const arrived = []
    for (let i = this.pending.length - 1; i >= 0; i -= 1) {
      const job = this.pending[i]
      if (job.arriveTime <= time) {
        arrived.push(this.pending.splice(i, 1)[0])
      }
    }
    for (let i = arrived.length - 1; i >= 0; i -= 1) {
      this.arrived.push(arrived[i])
    }
  }

  loadJob(time) {
    this.takeJob(time)
    // 装入作业
    for (let i = 0; i < this.arrived.length && this.runningCnt < this.degree; i++) {
      const job = this.arrived[i]
      if (job.state === JCB.stateType.STANDBY && job.request(this.memoryHolder.memory)) {
        job.state = JCB.stateType.RUNNING
        if (Number.isNaN(job.loadedTime)) {
          job.loadedTime = time
        }
        this.runningCnt += 1
        const ps = new PCB({
          arriveTime: time,
          needTime: job.needTime,
          job,
        })
        this.psScheduler.loadPS(ps)
        job.pcbs.push(ps)
      }
    }
  }
}

export default FCFSJobScheduler
