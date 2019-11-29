class Game {

  constructor() {
    this.addEvents();
    this.boardSize = { rows: 17, cols: 17 };
    this.speed = 1;
    this.running = false;
    this.start();
  }

  addEvents() {
    $(window).keydown(e => {
      // Read arrow keys...
      if (e.key.includes('Arrow')) {
        e.preventDefault();
        // Directions are Left, Right, Up and Down
        this.snake.direction = e.key.split('Arrow')[1];
        // You can't start a game with Left
        // since the initial direction is Right...
        if (this.snake.direction === 'Left') { return; }
        if (!this.running) { this.gameLoop(); }
      }
    });
    $(window).resize(() => this.sizeMe());
  }

  sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  start() {
    this.render();
    this.speed = 1;
    this.snake = new Snake(this);
    this.cherry = new Cherry(this);
    this.scoreBoard = new ScoreBoard(this);
    this.sizeMe();
  }

  sizeMe() {
    let el = $('.snake-board');
    let elScore = $('.scoreboard');
    // go to no set width or height
    el.width('').height('');
    // read width and height
    let w = el.width(), h = el.height();
    let min = Math.min(w, h, $(window).height() - elScore.height()) - 20;
    // set to mininum
    el.width(min).height(min);
    elScore.width(min);
  }

  async gameLoop() {
    this.running = true;
    while (this.running) {
      await this.sleep(150 / this.speed);
      this.snake.move();
      this.running = !this.snake.dead;
      this.scoreBoard.render();
    }
    await this.sleep(1000);
    this.start();
  }

  snakeAte() {
    this.cherry = new Cherry(this);
    this.scoreBoard.addToScore(10 * this.speed);
    this.speed += 0.01;
  }

  render() {
    // Build a simple board as a html table
    let html = '<table class="snake-board">'
    for (let row = 0; row < this.boardSize.rows; row++) {
      html += '<tr>'
      html += new Array(this.boardSize.cols).fill('<td></td>').join('');
      html += '</tr>';
    }
    $('main').html(html);
  }

}