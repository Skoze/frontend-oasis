import './loading.css';
class Loading {
  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'oasis-overlay';
    this.overlay.innerHTML = `
    <div class="loading-layout">
      <div class="shape"></div>
      <div class="shape"></div>
      <div class="shape"></div>
    </div>`;
    this.running = 0;
    this.loading = Promise.resolve();
  }
  show() {
    if (!this.running) {
      document.body.appendChild(this.overlay);
      this.loading = new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
    }
    this.running++;
  }
  hide() {
    this.loading.then(() => {
      if (this.running > 0) {
        this.running--;
        if (!this.running) {
          document.body.removeChild(this.overlay);
        }
      }
    });
  }
}

export default new Loading();
