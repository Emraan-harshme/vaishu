let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  moveX = 0;
  moveY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentX = 0;
  currentY = 0;
  rotating = false;

  constructor(paper) {
    this.paper = paper;
    this.init();
  }

  init() {
    // Mouse Events
    this.paper.addEventListener('mousedown', (e) => this.handleStart(e.clientX, e.clientY));
    document.addEventListener('mousemove', (e) => this.handleMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', () => this.handleEnd());

    // Touch Events
    this.paper.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.handleStart(e.touches[0].clientX, e.touches[0].clientY);
    });
    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
    window.addEventListener('touchend', () => this.handleEnd());
  }

  handleStart(x, y) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    this.startX = x;
    this.startY = y;
    this.prevX = x;
    this.prevY = y;
  }

  handleMove(x, y) {
    if (!this.holdingPaper) return;
    
    this.velX = x - this.prevX;
    this.velY = y - this.prevY;
    this.prevX = x;
    this.prevY = y;

    this.currentX += this.velX;
    this.currentY += this.velY;

    // Rotation logic (optional)
    const dx = x - this.startX;
    const dy = y - this.startY;
    this.rotation = Math.atan2(dy, dx) * (180 / Math.PI);

    this.paper.style.transform = `
      translateX(${this.currentX}px)
      translateY(${this.currentY}px)
      rotateZ(${this.rotation}deg)
    `;
  }

  handleEnd() {
    this.holdingPaper = false;
  }
}

// Initialize all papers
document.querySelectorAll('.paper').forEach(paper => {
  new Paper(paper);
}); - script.js
