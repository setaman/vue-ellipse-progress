class Interval {
  constructor() {
    this.tasks = [];
    this.interval = "";
  }
  addTask(task) {
    this.tasks.push(task);
  }
  run() {
    if (this.tasks.length < 1) {
      return;
    }
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = "";
    }
    this.interval = setInterval(() => {
      for (const task of this.tasks) {
        task();
      }
    }, 1000);
  }
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = "";
    }
  }
}
export default new Interval();
