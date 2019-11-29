class ScoreBoard {

  constructor(game) {
    this.game = game;
    this.score = 0;
    this.render();
  }

  addToScore(points) {
    this.score += points;
    this.render();
  }

  render() {
    this.el = $('main').find('.scoreboard');
    if (this.el.length === 0) {
      this.el = $('<div class="scoreboard"/>').prependTo('main');
    }
    this.el.html(/*html*/`
      <div>
        <span>SCORE:</span>
        <span>${Math.round(this.score)}</span>
      </div>
      <div>
        <span>SNAKE LENGTH:</span>
        <span>${this.game.snake.body.length}</span>
        </div>
      <div>
        <span>SPEED:</span>
        ${!this.game.running ? `
          <span class="start-explain">
            Press an arrow key to start...
          </span>
        `: `
          <span>${Math.round(this.game.speed * 10) / 10}</span>
        `}
      </div>
    `);
  }

}