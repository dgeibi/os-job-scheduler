FCFSJobScheduler.run(time) {
  RRProcessScheduler.run(time) {
    PCB.tick()
    PCB.stop()
    PCB.isFinished()
    RRProcessScheduler.removePS(PCB)
    PCB.recordTime(newTime)
    FCFSJobScheduler.callback(newTime) {
      FCFSJobScheduler.loadJob(newTime) {
        FCFSJobScheduler.takeJob(newTime)
        JCB.request(MemPartition) {
          JCB.alloc(MemPartition, size) {
            MemPartition.remove(JCB) {
              unlink()
            }
            MemPartition.slice(size, JCB)
          }
        }
        RRProcessScheduler.loadPS(PCB)
      }
      JCB.isFinished() {
        PCB.isFinished()
      }
      JCB.kill(newTime) {
        JCB.release(memSize) {
          MemPartition.mergeInsert()
        }
        JCB.unlinkPCBs() {
          PCB.unlinkJCB()
        }
        JCB.recordTime(newTime)
      }
      FCFSJobScheduler.remove(JCB)
    }
    RRProcessScheduler.roundRobin()
  }
}
