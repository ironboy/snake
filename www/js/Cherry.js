class Cherry {

  constructor(game) {
    while (!this.position || game.snake.bodyAsStrings
      .includes(this.position.join('*'))) {
      this.position = [
        Math.floor(Math.random() * game.boardSize.rows),
        Math.floor(Math.random() * game.boardSize.cols)
      ];
    }
    this.render();
  }

  render() {
    let [row, col] = this.position;
    $('.snake-board td').removeClass('cherry');
    $('.snake-board tr').eq(row)
      .find('td').eq(col).addClass('cherry');
  }

}