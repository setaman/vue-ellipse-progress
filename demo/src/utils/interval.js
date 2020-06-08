class Interval {
  constructor() {
    this.tasks = [];
  }
  addTask(task, time = 1000) {
    this.tasks.push({ task, time });
  }
  run() {
    if (this.tasks.length < 1) {
      return;
    }
    for (const task of this.tasks) {
      if (task.interval) {
        clearInterval(task.interval);
      }
      task.task();
      task.interval = setInterval(() => {
        task.task();
      }, task.time);
    }
  }
  stop() {
    for (const task of this.tasks) {
      if (task.interval) {
        clearInterval(task.interval);
      }
    }
  }
}
export default new Interval();
