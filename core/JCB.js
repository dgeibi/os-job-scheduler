const MemPartition = require('./MemPartition')
const { maybeUndefined } = require('./util')

let uuJID = 0
function getJID() {
  uuJID += 1
  return `job${uuJID}`
}

class JCB {
  constructor({ arriveTime, jid, memSize, needTime }) {
    this.jid = maybeUndefined(jid, getJID)
    this.memSize = memSize
    /** 需要时间 */
    this.needTime = needTime
    /** 到达时间 */
    this.arriveTime = arriveTime
    /** 装入时间 */
    this.loadedTime = NaN
    /** 完成时间 */
    this.finishedTime = NaN
    /** 周转时间 */
    this.cyclingTime = NaN
    /** 实际运行时间 */
    this.time = 0
    this.state = JCB.stateType.STANDBY
    this.partitions = []
    this.pcbs = []
  }

  alloc(part, size) {
    if (part.size - size <= MemPartition.minsize) {
      // 差小于最小块时
      this.partitions.push(part.remove(this))
      this.memSize = part.size
    } else {
      this.partitions.push(part.slice(size, this))
    }
  }

  request(part, size = this.memSize) {
    let ret = false
    let cur = part
    while (cur !== null && ret === false) {
      if (cur.size > size) {
        // 找到第一个适应的分区并分配
        this.alloc(cur, size)
        ret = true
      } else {
        cur = cur.next
      }
    }
    return ret
  }

  release(size = this.memSize) {
    let ret = false
    for (let i = 0; i < this.partitions.length; i += 1) {
      const part = this.partitions[i]
      if (part.size === size) {
        this.partitions.splice(this.partitions.indexOf(part), 1)
        part.mergeInsert()
        ret = true
        break
      }
    }
    return ret
  }

  isFinished() {
    let finished = this.state === JCB.stateType.FINISHED
    if (finished) return finished
    finished = this.pcbs.every(x => x.isFinished())
    if (finished) {
      this.state = JCB.stateType.FINISHED
    }
    return finished
  }

  isRunning() {
    return this.state === JCB.stateType.RUNNING
  }

  kill() {
    this.release()
    this.pcbs.forEach(x => x.kill())
    this.pcbs = null
  }
}

JCB.stateType = {
  STANDBY: 'STANDBY',
  RUNNING: 'RUNNING',
  FINISHED: 'FINISHED',
}

module.exports = JCB
