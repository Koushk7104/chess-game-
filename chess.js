const chessboard = document.getElementById('chessboard');
const pieces = [
  '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
  '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
  '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'
];
let isBlackTurn = false;
let selectedPiece = null; 
let selectedPieceIndex = -1; 
let possibleMoves = []; 
function onCellClick(index) {
  if (isCheckmate) {
    alert('Game Over! Checkmate');
    return;
  }

  const piece = pieces[index];

  if (selectedPiece) {
    if (possibleMoves.includes(index)) {
      pieces[selectedPieceIndex] = '';
      pieces[index] = selectedPiece;
      selectedPiece = null;
      selectedPieceIndex = -1;
      possibleMoves = [];
      isBlackTurn = !isBlackTurn;

      checkCheckmate();

      renderChessboard();
    }
  } else if (piece && isBlackTurn === isBlackPiece(piece)) {
    selectedPiece = piece;
    selectedPieceIndex = index;
    possibleMoves = calculatePossibleMoves(index);

    renderChessboard();
  }
}
function isBlackPiece(piece) {
  return piece.toLowerCase() === piece;
}
function isWhitePiece(piece) {
  return piece.toUpperCase() === piece;
}
function isBlackTurn() {
  return isBlackTurn;
}
function calculatePossibleMoves(index) {
  const piece = pieces[index];
  const isBlack = isBlackPiece(piece);
  const possibleMoves = [];
  switch (piece.toLowerCase()) {
    case '♟': 
      possibleMoves.push(...getPawnMoves(index, isBlack));
      break;
    case '♜': 
      possibleMoves.push(...getRookMoves(index, isBlack));
      break;
    case '♞': 
      possibleMoves.push(...getKnightMoves(index, isBlack));
      break;
    case '♝':
      possibleMoves.push(...getBishopMoves(index, isBlack));
      break;
    case '♛': 
      possibleMoves.push(...getQueenMoves(index, isBlack));
      break;
    case '♚': 
      possibleMoves.push(...getKingMoves(index, isBlack));
      break;
    default:
      break;
  }

  return possibleMoves;
}
function getPawnMoves(index, isBlack) {
  const possibleMoves = [];
  const direction = isBlack ? 1 : -1;
  const startingRow = isBlack ? 1 : 6;
  const row = Math.floor(index / 8);
  const col = index % 8;
  const oneStepForward = index + direction * 8;
  if (pieces[oneStepForward] === '') {
    possibleMoves.push(oneStepForward);
  }
  if (row === startingRow && pieces[oneStepForward] === '') {
    const twoStepsForward = index + direction * 16;
    if (pieces[twoStepsForward] === '') {
      possibleMoves.push(twoStepsForward);
    }
  }
  if (col > 0) {
    const leftCapture = index + direction * 7;
    if (col - 1 >= 0 && pieces[leftCapture] && isBlackPiece(pieces[leftCapture]) !== isBlack) {
      possibleMoves.push(leftCapture);
    }
  }

  if (col < 7) {
    const rightCapture = index + direction * 9;
    if (col + 1 <= 7 && pieces[rightCapture] && isBlackPiece(pieces[rightCapture]) !== isBlack) {
      possibleMoves.push(rightCapture);
    }
  }

  return possibleMoves;
}
function getRookMoves(index, isBlack) {
  const possibleMoves = [];
  const row = Math.floor(index / 8);
  const col = index % 8;

  // Move vertically
  for (let i = row + 1; i < 8; i++) {
    const cellIndex = i * 8 + col;
    if (pieces[cellIndex] === '') {
      possibleMoves.push(cellIndex);
    } else if (isBlackPiece(pieces[cellIndex]) !== isBlack) {
      possibleMoves.push(cellIndex);
      break;
    } else {
      break;
    }
  }

  for (let i = row - 1; i >= 0; i--) {
    const cellIndex = i * 8 + col;
    if (pieces[cellIndex] === '') {
      possibleMoves.push(cellIndex);
    } else if (isBlackPiece(pieces[cellIndex]) !== isBlack) {
      possibleMoves.push(cellIndex);
      break;
    } else {
      break;
    }
  }
  for (let j = col + 1; j < 8; j++) {
    const cellIndex = row * 8 + j;
    if (pieces[cellIndex] === '') {
      possibleMoves.push(cellIndex);
    } else if (isBlackPiece(pieces[cellIndex]) !== isBlack) {
      possibleMoves.push(cellIndex);
      break;
    } else {
      break;
    }
  }

  for (let j = col - 1; j >= 0; j--) {
    const cellIndex = row * 8 + j;
    if (pieces[cellIndex] === '') {
      possibleMoves.push(cellIndex);
    } else if (isBlackPiece(pieces[cellIndex]) !== isBlack) {
      possibleMoves.push(cellIndex);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
}
function getKnightMoves(index, isBlack) {
  const possibleMoves = [];
  const row = Math.floor(index / 8);
  const col = index % 8;
  const offsets = [-17, -15, -10, -6, 6, 10, 15, 17];

  for (const offset of offsets) {
    const targetIndex = index + offset;
    const targetRow = Math.floor(targetIndex / 8);
    const targetCol = targetIndex % 8;

    if (
      targetRow >= 0 &&
      targetRow < 8 &&
      targetCol >= 0 &&
      targetCol < 8 &&
      (pieces[targetIndex] === '' || isBlackPiece(pieces[targetIndex]) !== isBlack)
    ) {
      possibleMoves.push(targetIndex);
    }
  }

  return possibleMoves;
}
function getBishopMoves(index, isBlack) {
  const possibleMoves = [];
  const row = Math.floor(index / 8);
  const col = index % 8;
  for (let i = 1; i < 8; i++) {
    const directions = [
      { row: row + i, col: col + i },
      { row: row + i, col: col - i },
      { row: row - i, col: col + i },
      { row: row - i, col: col - i },
    ];

    for (const direction of directions) {
      if (
        direction.row >= 0 &&
        direction.row < 8 &&
        direction.col >= 0 &&
        direction.col < 8
      ) {
        const targetIndex = direction.row * 8 + direction.col;
        if (pieces[targetIndex] === '') {
          possibleMoves.push(targetIndex);
        } else if (isBlackPiece(pieces[targetIndex]) !== isBlack) {
          possibleMoves.push(targetIndex);
          break;
        } else {
          break;
        }
      }
    }
  }

  return possibleMoves;
}
function getQueenMoves(index, isBlack) {
  const possibleMoves = [
    ...getRookMoves(index, isBlack),
    ...getBishopMoves(index, isBlack),
  ];
  return possibleMoves;
}
function getKingMoves(index, isBlack) {
  const possibleMoves = [];
  const row = Math.floor(index / 8);
  const col = index % 8;
  const offsets = [-9, -8, -7, -1, 1, 7, 8, 9];

  for (const offset of offsets) {
    const targetIndex = index + offset;
    const targetRow = Math.floor(targetIndex / 8);
    const targetCol = targetIndex % 8;

    if (
      targetRow >= 0 &&
      targetRow < 8 &&
      targetCol >= 0 &&
      targetCol < 8 &&
      (pieces[targetIndex] === '' || isBlackPiece(pieces[targetIndex]) !== isBlack)
    ) {
      possibleMoves.push(targetIndex);
    }
  }

  return possibleMoves;
}
function checkCheckmate() {
  const kingIndex = pieces.indexOf(isBlackTurn ? '♚' : '♔');
  const opponentPieces = pieces.filter(piece =>
    (isBlackTurn && isWhitePiece(piece)) || (!isBlackTurn && isBlackPiece(piece))
  );

  for (let i = 0; i < opponentPieces.length; i++) {
    const pieceIndex = pieces.indexOf(opponentPieces[i]);
    const possibleMoves = calculatePossibleMoves(pieceIndex);

    if (possibleMoves.includes(kingIndex)) {
      isCheckmate = true;
      return;
    }
  }
}
function renderChessboard() {
  chessboard.innerHTML = '';

  for (let i = 0; i < 64; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.classList.add((i + Math.floor(i / 8)) % 2 === 0 ? 'white' : 'black');
    cell.textContent = pieces[i];
    cell.addEventListener('click', () => onCellClick(i));
    cell.style.cursor = selectedPiece && possibleMoves.includes(i) ? 'pointer' : 'default';
    chessboard.appendChild(cell);
  }
}
function initializeChessboard() {
  renderChessboard();
}

initializeChessboard();
