class Snake {

  constructor(game) {
    this.game = game;
    // this.body = my head and the rest of me
    this.body = [[2, 4], [2, 3], [2, 2]];
    this.directions = ['Right', 'Right', 'Right'];
    this.render();
  }

  get bodyAsStrings() {
    return this.body.map((pos) => pos.join('*'));
  }

  render() {
    let dirs = [...this.directions.slice(0, -1)];
    dirs.push(dirs.slice(-1));
    $('.snake-board td').removeClass('snake snake-head Up Down Left Right');
    this.body.forEach(([row, col], i) =>
      $('.snake-board tr').eq(row).find('td').eq(col)
        .addClass('snake ' + (i === 0 ? 'snake-head ' : '') + dirs[i])
    );
  }

  move() {
    let [row, col] = this.body[0];
    // this.direction is set by the game (but I can't
    // switch directly from Up to Down or Left to Right)
    let forbidden = [
      'UpDown', 'DownUp', 'RightLeft', 'LeftRight'
    ];
    let dir = this.direction;
    let lastDir = this.lastDirection;
    if (forbidden.includes(dir + lastDir)) {
      this.direction = dir = lastDir;
    }
    this.lastDirection = this.direction;
    // change the position of my head
    row += (dir === 'Down') - (dir === 'Up');
    col += (dir === 'Right') - (dir === 'Left');
    // my head moves and my tail follows
    this.body.unshift([row, col]);
    this.body.pop();
    this.directions.unshift(dir);
    this.directions.pop();
    // am i dead?
    if (this.died()) { this.dead = true; }
    else { this.render(); }
    // did i eat?
    this.eat();
  }

  died() {
    let [row, col] = this.body[0];
    // I die if my head goes off the board
    if (
      row < 0 || col < 0 ||
      row >= this.game.boardSize.rows ||
      col >= this.game.boardSize.cols
    ) {
      return true;
    }
    // I die if I collide with myself
    // (that means if I have duplicate positions in my body)
    let withoutDuplicates = [...new Set(this.bodyAsStrings)];
    return this.bodyAsStrings.length !== withoutDuplicates.length;
  }

  eat() {
    let applePosAsString = this.game.apple.position.join('*');
    if (this.bodyAsStrings.includes(applePosAsString)) {
      this.grow();
      this.game.snakeAte();
    }
  }

  grow() {
    // grow in the opposite direction of my tails direction ;) 
    let newTail;
    let [tailRow, tailCol] = [...this.body].pop();
    let tailDirection = [...this.directions].pop();
    if (tailDirection === 'Up') { newTail = [tailRow + 1, tailCol]; }
    if (tailDirection === 'Down') { newTail = [tailRow - 1, tailCol]; }
    if (tailDirection === 'Left') { newTail = [tailRow, tailCol - 1]; }
    if (tailDirection === 'Right') { newTail = [tailRow, tailCol + 1]; }
    this.body.push(newTail);
    this.directions.push(tailDirection);
  }

}