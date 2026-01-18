// Game State
let currentGame = null;
let roundTotal = 0;
let dartsThisRound = 0;
let currentMultiplier = 1;
let lastDartMultiplier = 1;
let dartHistory = [];

/* ===================== CHECKOUT TABELLE ===================== */
// Double-Out & Master-Out Checkouts (mit Double-Finish)
const CHECKOUTS_DOUBLE = {
    // 170-100
    170: 'T20 T20 Bull',
    167: 'T20 T19 Bull',
    164: 'T20 T18 Bull',
    161: 'T20 T17 Bull',
    160: 'T20 T20 D20',
    158: 'T20 T20 D19',
    157: 'T20 T19 D20',
    156: 'T20 T20 D18',
    155: 'T20 T19 D19',
    154: 'T20 T18 D20',
    153: 'T20 T19 D18',
    152: 'T20 T20 D16',
    151: 'T20 T17 D20',
    150: 'T20 T18 D18',
    149: 'T20 T19 D16',
    148: 'T20 T20 D14',
    147: 'T20 T17 D18',
    146: 'T20 T18 D16',
    145: 'T20 T19 D14',
    144: 'T20 T20 D12',
    143: 'T20 T17 D16',
    142: 'T20 T18 D14',
    141: 'T20 T19 D12',
    140: 'T20 T20 D10',
    139: 'T20 T19 D11',
    138: 'T20 T18 D12',
    137: 'T20 T19 D10',
    136: 'T20 T20 D8',
    135: 'T20 T17 D12',
    134: 'T20 T18 D10',
    133: 'T20 T19 D8',
    132: 'T20 T20 D6',
    131: 'T20 T17 D10',
    130: 'T20 T18 D8',
    129: 'T19 T20 D6',
    128: 'T18 T20 D7',
    127: 'T20 T17 D8',
    126: 'T19 T19 D6',
    125: 'T18 T19 D7',
    124: 'T20 T16 D8',
    123: 'T19 T16 D9',
    122: 'T18 T18 D7',
    121: 'T20 T11 D14',
    120: 'T20 20 D20',
    119: 'T19 12 D20',
    118: 'T20 18 D20',
    117: 'T20 17 D20',
    116: 'T20 16 D20',
    115: 'T20 15 D20',
    114: 'T20 14 D20',
    113: 'T20 13 D20',
    112: 'T20 12 D20',
    111: 'T20 11 D20',
    110: 'T20 10 D20',
    109: 'T20 9 D20',
    108: 'T20 8 D20',
    107: 'T19 10 D20',
    106: 'T20 6 D20',
    105: 'T20 5 D20',
    104: 'T18 10 D20',
    103: 'T20 3 D20',
    102: 'T20 2 D20',
    101: 'T20 1 D20',
    100: 'T20 D20',
    99: 'T19 10 D16',
    98: 'T20 D19',
    97: 'T19 D20',
    96: 'T20 D18',
    95: 'T19 D19',
    94: 'T18 D20',
    93: 'T19 D18',
    92: 'T20 D16',
    91: 'T17 D20',
    90: 'T18 D18',
    89: 'T19 D16',
    88: 'T16 D20',
    87: 'T17 D18',
    86: 'T18 D16',
    85: 'T15 D20',
    84: 'T20 D12',
    83: 'T17 D16',
    82: 'T14 D20',
    81: 'T19 D12',
    80: 'T20 D10',
    79: 'T19 D11',
    78: 'T18 D12',
    77: 'T19 D10',
    76: 'T20 D8',
    75: 'T17 D12',
    74: 'T14 D16',
    73: 'T19 D8',
    72: 'T16 D12',
    71: 'T13 D16',
    70: 'T18 D8',
    69: 'T19 D6',
    68: 'T20 D4',
    67: 'T17 D8',
    66: 'T10 D18',
    65: 'T11 D16',
    64: 'T16 D8',
    63: 'T13 D12',
    62: 'T10 D16',
    61: 'T15 D8',
    60: 'T10 D15',
    59: 'T9 D16',
    58: 'T18 D2',
    57: 'T15 D6',
    56: 'T16 D4',
    55: 'T15 D5',
    54: 'T14 D6',
    53: 'T13 D7',
    52: 'T12 D8',
    51: 'T11 D9',
    50: 'T10 D10',
    49: 'T9 D11',
    48: 'T8 D12',
    47: 'T7 D13',
    46: 'T6 D14',
    45: 'T5 D15',
    44: 'T4 D16',
    43: 'T3 D17',
    42: 'T2 D18',
    41: 'T1 D19',
    40: 'D20',
    39: '7 D16',
    38: 'D19',
    37: '5 D16',
    36: 'D18',
    35: '3 D16',
    34: 'D17',
    33: '1 D16',
    32: 'D16',
    31: '7 D12',
    30: 'D15',
    29: '5 D12',
    28: 'D14',
    27: '3 D12',
    26: 'D13',
    25: '9 D8',
    24: 'D12',
    23: '7 D8',
    22: 'D11',
    21: '5 D8',
    20: 'D10',
    19: '3 D8',
    18: 'D9',
    17: '1 D8',
    16: 'D8',
    15: '7 D4',
    14: 'D7',
    13: '5 D4',
    12: 'D6',
    11: '3 D4',
    10: 'D5',
    9: '1 D4',
    8: 'D4',
    7: '3 D2',
    6: 'D3',
    5: '1 D2',
    4: 'D2',
    3: '1 D1',
    2: 'D1'
};

// Single-Out Checkouts (direkter Finish möglich)
const CHECKOUTS_SINGLE = {
    // 180-161 (3 Darts maximum)
    180: 'T20 T20 T20',
    177: 'T20 T19 T20',
    176: 'T20 T20 T19',
    175: 'T20 T20 Bull',
    174: 'T20 T19 T19',
    173: 'T20 T20 19',
    172: 'T20 T19 Bull',
    171: 'T20 T20 17',
    170: 'T20 T18 T20',
    169: 'T20 T19 18',
    168: 'T20 T20 16',
    167: 'T20 T19 17',
    166: 'T20 T18 T18',
    165: 'T20 T19 16',
    164: 'T20 T18 17',
    163: 'T20 T19 14',
    162: 'T20 T20 10',
    161: 'T20 T17 16',
    // 160-121 (hohe Scores)
    160: 'T20 T20 20',
    159: 'T20 T19 20',
    158: 'T20 T20 19',
    157: 'T20 T19 19',
    156: 'T20 T20 18',
    155: 'T20 T19 18',
    154: 'T20 T18 20',
    153: 'T20 T19 17',
    152: 'T20 T20 16',
    151: 'T20 T17 20',
    150: 'T20 T18 18',
    149: 'T20 T19 16',
    148: 'T20 T20 14',
    147: 'T20 T17 18',
    146: 'T20 T18 16',
    145: 'T20 T19 14',
    144: 'T20 T20 12',
    143: 'T20 T17 16',
    142: 'T20 T18 14',
    141: 'T20 T19 12',
    140: 'T20 T20 10',
    139: 'T20 T19 11',
    138: 'T20 T18 12',
    137: 'T20 T19 10',
    136: 'T20 T20 8',
    135: 'T20 T17 12',
    134: 'T20 T18 10',
    133: 'T20 T19 8',
    132: 'T20 T20 6',
    131: 'T20 T17 10',
    130: 'T20 T18 8',
    129: 'T19 T20 6',
    128: 'T18 T20 7',
    127: 'T20 T17 8',
    126: 'T19 T19 6',
    125: 'T20 T17 6',
    124: 'T20 T16 8',
    123: 'T19 T16 9',
    122: 'T18 T18 7',
    121: 'T20 T11 14',
    // 120-61
    120: 'T20 T20',
    119: 'T19 T20',
    118: 'T20 T19',
    117: 'T19 T20',
    116: 'T20 T18',
    115: 'T19 T19',
    114: 'T20 T17',
    113: 'T19 T18',
    112: 'T20 T16',
    111: 'T19 T17',
    110: 'T20 T15',
    109: 'T19 T16',
    108: 'T20 T14',
    107: 'T19 T15',
    106: 'T20 T13',
    105: 'T19 T14',
    104: 'T20 T12',
    103: 'T19 T13',
    102: 'T20 T11',
    101: 'T19 T12',
    100: 'T20 20',
    99: 'T19 20',
    98: 'T20 19',
    97: 'T19 20',
    96: 'T20 18',
    95: 'T19 19',
    94: 'T18 20',
    93: 'T19 18',
    92: 'T20 16',
    91: 'T17 20',
    90: 'T18 18',
    89: 'T19 16',
    88: 'T16 20',
    87: 'T17 18',
    86: 'T18 16',
    85: 'T15 20',
    84: 'T20 12',
    83: 'T17 16',
    82: 'T14 20',
    81: 'T19 12',
    80: 'T20 10',
    79: 'T19 11',
    78: 'T18 12',
    77: 'T19 10',
    76: 'T20 8',
    75: 'T15 15',
    74: 'T14 16',
    73: 'T19 8',
    72: 'T16 12',
    71: 'T13 16',
    70: 'T10 20',
    69: 'T19 6',
    68: 'T20 4',
    67: 'T17 8',
    66: 'T10 18',
    65: 'T15 10',
    64: 'T16 8',
    63: 'T13 12',
    62: 'T10 16',
    61: 'T15 8',
    // 60-1 (einfache Finishes)
    60: 'T20',
    59: 'T19',
    58: 'T18',
    57: 'T19',
    56: 'T16',
    55: 'T15',
    54: 'T18',
    53: 'T13',
    52: 'T12',
    51: 'T17',
    50: 'Bull',
    49: 'T9',
    48: 'T16',
    47: 'T15',
    46: 'T10',
    45: 'T15',
    44: 'T12',
    43: 'T13',
    42: 'T10',
    41: 'T9',
    40: 'T8',
    39: 'T13',
    38: 'T6',
    37: 'T5',
    36: 'T12',
    35: 'T5',
    34: 'T2',
    33: 'T11',
    32: 'T8',
    31: 'T7',
    30: 'T10',
    29: 'T9',
    28: 'T8',
    27: 'T9',
    26: 'T6',
    25: '25',
    24: 'T8',
    23: 'T7',
    22: 'T6',
    21: 'T7',
    20: '20',
    19: '19',
    18: '18',
    17: '17',
    16: '16',
    15: '15',
    14: '14',
    13: '13',
    12: '12',
    11: '11',
    10: '10',
    9: '9',
    8: '8',
    7: '7',
    6: '6',
    5: '5',
    4: '4',
    3: '3',
    2: '2',
    1: '1'
};

/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const storedGame = localStorage.getItem('currentGame');
        if (!storedGame) {
            alert('Bitte erst ein Spiel erstellen!');
            window.location.href = 'settings.html';
            return;
        }
        currentGame = JSON.parse(storedGame);
        
        if (!currentGame.players || !currentGame.scores) {
            throw new Error('Ungültiger Spielstatus');
        }
        
        initScoreboard();
    } catch (error) {
        console.error('Fehler beim Laden des Spiels:', error);
        alert('Fehler beim Laden des Spiels. Bitte ein neues Spiel starten.');
        window.location.href = 'settings.html';
    }
});

function initScoreboard() {
    setupEventListeners();
    updateDisplay();
}

/* ===================== EVENT LISTENER ===================== */
function setupEventListeners() {
    document.querySelectorAll('.dart-btn.single').forEach(btn => {
        btn.addEventListener('click', () => {
            const score = parseInt(btn.dataset.score, 10);
            if (!isNaN(score)) {
                addDartScore(score);
                setMultiplier(1);
            }
        });
    });

    const doubleBtn = document.getElementById('doubleBtn');
    const tripleBtn = document.getElementById('tripleBtn');
    
    if (doubleBtn) doubleBtn.addEventListener('click', () => setMultiplier(2));
    if (tripleBtn) tripleBtn.addEventListener('click', () => setMultiplier(3));

    const saveBtn = document.getElementById('saveGame');
    const undoBtn = document.getElementById('undoBtn');
    const newGameBtn = document.getElementById('newGame');
    
    if (saveBtn) saveBtn.addEventListener('click', saveGame);
    if (undoBtn) undoBtn.addEventListener('click', undoLastDart);
    if (newGameBtn) {
        newGameBtn.addEventListener('click', () => {
            if (confirm('Aktuelles Spiel beenden und neues Spiel starten?')) {
                localStorage.removeItem('currentGame');
                window.location.href = 'settings.html';
            }
        });
    }
}

/* ===================== MULTIPLIKATOR ===================== */
function setMultiplier(multi) {
    currentMultiplier = multi;

    const multiplierStatus = document.getElementById('multiplierStatus');
    if (multiplierStatus) {
        multiplierStatus.textContent = multi === 1 ? 'Single' : multi === 2 ? 'Doppel' : 'Triple';
    }

    const doubleBtn = document.getElementById('doubleBtn');
    const tripleBtn = document.getElementById('tripleBtn');
    
    if (doubleBtn) doubleBtn.classList.toggle('active', multi === 2);
    if (tripleBtn) tripleBtn.classList.toggle('active', multi === 3);
    
    update25ButtonStatus();
}

/* ===================== DART LOGIK ===================== */
function addDartScore(baseScore) {
    if (dartsThisRound >= 3) return;

    // Triple 25 ist nicht erlaubt!
    if (baseScore === 25 && currentMultiplier === 3) {
        alert('Triple 25 (75 Punkte) ist nicht erlaubt!\nBitte Single 25 oder Double 25 (Bull) verwenden.');
        return;
    }

    dartHistory.push({ score: baseScore, multiplier: currentMultiplier });
    lastDartMultiplier = currentMultiplier;
    roundTotal += baseScore * currentMultiplier;
    dartsThisRound++;

    // Prüfe ob Checkout erreicht wurde (Score = 0)
    const p = currentGame.currentPlayer;
    const newScore = currentGame.scores[p] - roundTotal;
    
    if (newScore === 0) {
        // Checkout erreicht! Prüfe Validität
        if (!isBust(newScore)) {
            // Gültiger Checkout - aktualisiere Statistiken
            currentGame.scores[p] = newScore;
            currentGame.dartsThrown[p] += dartsThisRound;
            
            // Zeige kurze Erfolgsmeldung
            updateRoundDisplay();
            updateLiveCheckout();
            
            // Verzögere Leg-Gewinn um Erfolg anzuzeigen
            setTimeout(() => {
                winLeg();
            }, 1000);
            return;
        } else {
            // Ungültiger Checkout (falscher Finish-Modus)
            alert('Ungültiger Checkout! Falscher Finish-Modus.');
            submitRound(); // Behandle als Bust
            return;
        }
    }
    
    // Prüfe Bust - bei Single-Out ist 1 erlaubt!
    const isBustScore = (currentGame.checkout === 'single') 
        ? (newScore < 0)
        : (newScore < 0 || newScore === 1);
    
    if (isBustScore) {
        // Bust! Score zu niedrig
        alert('Bust! Runde ungültig.');
        submitRound();
        return;
    }

    updateRoundDisplay();
    updateLiveCheckout();

    // Automatischer Submit nach 3 Darts
    if (dartsThisRound === 3) {
        setTimeout(submitRound, 500);
    }
}

function undoLastDart() {
    if (dartHistory.length === 0) return;

    const last = dartHistory.pop();
    roundTotal -= last.score * last.multiplier;
    dartsThisRound--;
    lastDartMultiplier = dartHistory.length > 0 ? dartHistory[dartHistory.length - 1].multiplier : 1;

    // Setze Multiplikator zurück wenn letzter Dart rückgängig gemacht wurde
    if (dartsThisRound === 0) {
        setMultiplier(1);
    }

    updateRoundDisplay();
    updateLiveCheckout();
}

/* ===================== ROUND ===================== */
function submitRound() {
    if (dartsThisRound === 0) return;

    const p = currentGame.currentPlayer;
    const newScore = currentGame.scores[p] - roundTotal;

    // Prüfe auf Bust
    if (isBust(newScore)) {
        // Nur Alert wenn nicht bereits in addDartScore gezeigt
        // (newScore === 0 wird in addDartScore behandelt)
        if (newScore !== 0) {
            // Kein Alert mehr - wurde schon in addDartScore gezeigt
        }
        resetRound();
        nextPlayer();
        saveToStorage();
        updateDisplay();
    } else {
        currentGame.scores[p] = newScore;
        currentGame.dartsThrown[p] += dartsThisRound;

        // Checkout wird bereits in addDartScore behandelt
        // Hier nur normale Runden-Progression
        if (newScore > 0) {
            nextPlayer();
            resetRound();
            saveToStorage();
            updateDisplay();
        }
    }
}

function isBust(score) {
    // Bei Single-Out ist 1 erlaubt (kann mit Single-1 ausgecheckt werden)
    if (currentGame.checkout === 'single') {
        if (score < 0) return true;
        if (score === 0) return false; // Jeder Finish erlaubt
        return false; // 1 ist erlaubt!
    }
    
    // Bei Double-Out und Master-Out ist 1 ein Bust (kann nicht mit Double beendet werden)
    if (score < 0 || score === 1) return true;
    
    if (score === 0) {
        // Double-Out: Muss mit Double enden
        if (currentGame.checkout === 'double' && lastDartMultiplier !== 2) {
            return true;
        }
        
        // Master-Out: Darf nicht mit Single enden
        if (currentGame.checkout === 'master' && lastDartMultiplier === 1) {
            return true;
        }
    }
    return false;
}

function resetRound() {
    roundTotal = 0;
    dartsThisRound = 0;
    currentMultiplier = 1;
    lastDartMultiplier = 1;
    dartHistory = [];
    
    // Update UI
    updateRoundDisplay();
    updateLiveCheckout();
    
    // Reaktiviere 25-Button (falls deaktiviert)
    document.querySelectorAll('.dart-btn[data-score="25"]').forEach(btn => {
        btn.classList.remove('disabled');
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    });
    
    // Setze Multiplikator-Buttons zurück
    const doubleBtn = document.getElementById('doubleBtn');
    const tripleBtn = document.getElementById('tripleBtn');
    if (doubleBtn) doubleBtn.classList.remove('active');
    if (tripleBtn) tripleBtn.classList.remove('active');
}

/* ===================== SPIELER ===================== */
function nextPlayer() {
    currentGame.currentPlayer = (currentGame.currentPlayer + 1) % currentGame.players.length;
}

function winLeg() {
    const p = currentGame.currentPlayer;
    currentGame.legsWon[p]++;
    const legsToWin = currentGame.bestOf || 1;

    if (currentGame.legsWon[p] >= legsToWin) {
        alert(`🎉 ${currentGame.players[p]} gewinnt das Match!`);
        currentGame.finished = new Date().toISOString();
        saveGame();
        window.location.href = 'storage.html';
    } else {
        alert(`${currentGame.players[p]} gewinnt das Leg!`);
        resetLeg();
        resetRound(); // WICHTIG: Setze aktuelle Runde zurück
        nextPlayer();
        saveToStorage();
        updateDisplay();
    }
}

function resetLeg() {
    // Setze nur Scores zurück für neues Leg
    // Dart-Zähler bleiben erhalten für Gesamtstatistik über alle Legs
    currentGame.scores = currentGame.players.map(() => currentGame.startScore);
    // dartsThrown wird NICHT zurückgesetzt - akkumuliert über alle Legs
}

/* ===================== UI ===================== */
function updateDisplay() {
    const area = document.getElementById('playerScores');
    if (!area) return;
    
    area.innerHTML = '';

    currentGame.players.forEach((pl, i) => {
        const darts = currentGame.dartsThrown[i];
        const pointsScored = currentGame.startScore - currentGame.scores[i];
        const avg = darts ? (pointsScored / (darts / 3)) : 0;
        
        const div = document.createElement('div');
        div.className = `player-score ${i === currentGame.currentPlayer ? 'current' : ''}`;
        div.innerHTML = `
            <div class="player-info">
                <strong>${pl}</strong>
                <div class="player-stats-inline">Ø ${avg.toFixed(1)} | ${darts} Darts</div>
            </div>
            <div class="score">${currentGame.scores[i]}</div>
            <div class="legs-won">Legs: ${currentGame.legsWon[i]}</div>
        `;
        area.appendChild(div);
    });

    const currentPlayerName = document.getElementById('currentPlayerName');
    if (currentPlayerName) {
        currentPlayerName.textContent = `${currentGame.players[currentGame.currentPlayer]} ist dran`;
    }

    updateLiveCheckout();
}

function updateLiveCheckout() {
    const currentScore = currentGame.scores[currentGame.currentPlayer];
    const remainingAfterThisRound = currentScore - roundTotal;
    const checkoutHelp = document.getElementById('checkoutHelp');
    if (!checkoutHelp) return;

    // Wähle richtige Checkout-Tabelle basierend auf Modus
    const CHECKOUTS = currentGame.checkout === 'single' ? CHECKOUTS_SINGLE : CHECKOUTS_DOUBLE;

    if (dartsThisRound > 0 && dartsThisRound < 3) {
        const dartsLeft = 3 - dartsThisRound;
        
        // Prüfe ob Bust
        // Bei Single-Out ist 1 erlaubt, bei anderen Modi nicht
        const isBustScore = (currentGame.checkout === 'single') 
            ? (remainingAfterThisRound < 0)
            : (remainingAfterThisRound < 0 || remainingAfterThisRound === 1);
        
        if (isBustScore) {
            checkoutHelp.innerHTML = `
                <div class="checkout-current" style="color: #f44336;">⚠️ Bust! (${currentScore} → ${remainingAfterThisRound})</div>
                <div class="checkout-suggestion">Runde wird ungültig</div>
            `;
            return;
        }

        if (remainingAfterThisRound === 0) {
            const isValidCheckout = checkValidCheckout();
            checkoutHelp.innerHTML = isValidCheckout ? `
                <div class="checkout-current" style="color: #4CAF50;">✓ Checkout erfolgreich!</div>
                <div class="checkout-suggestion">Gewonnen! 🎯</div>
            ` : `
                <div class="checkout-current" style="color: #f44336;">⚠️ Ungültiger Checkout!</div>
                <div class="checkout-suggestion">Falscher Finish-Modus</div>
            `;
            return;
        }
        
        if (CHECKOUTS[remainingAfterThisRound]) {
            checkoutHelp.innerHTML = `
                <div class="checkout-current">Aktuell: ${currentScore} → ${remainingAfterThisRound}</div>
                <div class="checkout-suggestion">Nach Runde: ${CHECKOUTS[remainingAfterThisRound]}</div>
            `;
        } else if (remainingAfterThisRound > 0 && remainingAfterThisRound <= 180) {
            const possibleCheckout = findPossibleCheckout(remainingAfterThisRound, dartsLeft);
            checkoutHelp.innerHTML = possibleCheckout ? `
                <div class="checkout-current">Aktuell: ${currentScore} → ${remainingAfterThisRound}</div>
                <div class="checkout-suggestion">✓ Möglich: ${possibleCheckout}</div>
            ` : `
                <div class="checkout-current">Aktuell: ${currentScore} → ${remainingAfterThisRound}</div>
                <div class="checkout-suggestion">Kein direkter Checkout möglich</div>
            `;
        } else {
            checkoutHelp.innerHTML = `<div class="checkout-current">Aktuell: ${currentScore} → ${remainingAfterThisRound}</div>`;
        }
    } else {
        const checkout = CHECKOUTS[currentScore];
        checkoutHelp.innerHTML = checkout ? `<div class="checkout-suggestion">Checkout: ${checkout}</div>` :
            currentScore > 180 ? `<div class="checkout-suggestion">Score: ${currentScore}</div>` :
            `<div class="checkout-suggestion">Checkout: —</div>`;
    }
}

function checkValidCheckout() {
    const checkoutMode = currentGame.checkout;
    
    // Single-Out: Jeder Finish ist erlaubt
    if (checkoutMode === 'single') return true;
    
    // Double-Out: Muss mit Double enden
    if (checkoutMode === 'double') {
        return lastDartMultiplier === 2;
    }
    
    // Master-Out: Darf nicht mit Single enden (Double oder Triple)
    if (checkoutMode === 'master') {
        return lastDartMultiplier !== 1;
    }
    
    return true;
}

function findPossibleCheckout(score, dartsLeft) {
    if (dartsLeft === 0) return null;
    const checkoutMode = currentGame.checkout;
    
    if (dartsLeft === 3) {
        // Drei Darts verfügbar - prüfe bekannte 3-Dart Checkouts
        if (CHECKOUTS[score]) return CHECKOUTS[score];
        
        // Suche nach möglichen 3-Dart Kombinationen
        for (let i = 1; i <= 20; i++) {
            for (let j = 1; j <= 20; j++) {
                // T T D Kombination
                const remaining = score - (i * 3) - (j * 3);
                if (remaining > 0 && remaining <= 40 && remaining % 2 === 0) {
                    const doubleOut = remaining / 2;
                    if (doubleOut <= 20 || doubleOut === 25) {
                        if (checkoutMode === 'double' || checkoutMode === 'master') {
                            return `T${i} T${j} D${doubleOut}`;
                        }
                    }
                }
                // T D D Kombination
                const remaining2 = score - (i * 3) - (j * 2);
                if (remaining2 > 0 && remaining2 <= 40 && remaining2 % 2 === 0) {
                    const doubleOut = remaining2 / 2;
                    if (doubleOut <= 20 || doubleOut === 25) {
                        if (checkoutMode === 'double' || checkoutMode === 'master') {
                            return `T${i} D${j} D${doubleOut}`;
                        }
                    }
                }
            }
        }
    }
    
    if (dartsLeft === 2) {
        // Zwei Darts verfügbar
        for (let i = 1; i <= 20; i++) {
            // Triple + Double
            if (score - (i * 3) >= 2 && score - (i * 3) <= 40 && (score - (i * 3)) % 2 === 0) {
                const doubleOut = (score - (i * 3)) / 2;
                if (doubleOut <= 20 || doubleOut === 25) {
                    if (checkoutMode === 'double' || checkoutMode === 'master') {
                        return `T${i} D${doubleOut}`;
                    }
                }
            }
            // Double + Double
            if (score - (i * 2) >= 2 && score - (i * 2) <= 40 && (score - (i * 2)) % 2 === 0) {
                const doubleOut = (score - (i * 2)) / 2;
                if (doubleOut <= 20 || doubleOut === 25) {
                    if (checkoutMode === 'double' || checkoutMode === 'master') {
                        return `D${i} D${doubleOut}`;
                    }
                }
            }
            // Single + Double (für Single-Out mit Double als letzten Wurf)
            if (score - i >= 2 && score - i <= 40 && (score - i) % 2 === 0) {
                const doubleOut = (score - i) / 2;
                if (doubleOut <= 20 || doubleOut === 25) {
                    if (checkoutMode === 'double' || checkoutMode === 'master') {
                        return `${i} D${doubleOut}`;
                    }
                }
            }
            // Triple + Single (für Single-Out oder Master-Out)
            if (score - (i * 3) >= 1 && score - (i * 3) <= 20) {
                const singleOut = score - (i * 3);
                if (checkoutMode === 'single') {
                    return `T${i} ${singleOut}`;
                }
            }
            // Single + Single (nur für Single-Out)
            if (score - i >= 1 && score - i <= 20) {
                const singleOut = score - i;
                if (checkoutMode === 'single') {
                    return `${i} ${singleOut}`;
                }
            }
        }
        // Bull + Double/Single
        if (score === 75) return 'Bull 25';
        if (score === 50) return 'Bull Bull';
    }
    
    if (dartsLeft === 1) {
        // Ein Dart verfügbar
        // Double Finish
        if (score <= 40 && score % 2 === 0) {
            if (checkoutMode === 'double' || checkoutMode === 'master') {
                return `D${score / 2}`;
            }
        }
        // Triple Finish (nur Master-Out)
        if (score <= 60 && score % 3 === 0) {
            const tripleValue = score / 3;
            if (tripleValue <= 20 && checkoutMode === 'master') {
                return `T${tripleValue}`;
            }
        }
        // Bull
        if (score === 50) {
            if (checkoutMode === 'double' || checkoutMode === 'master') {
                return 'Bull';
            }
        }
        // Single Finish (nur Single-Out) - inkl. 1!
        if (score <= 20 && checkoutMode === 'single') {
            return `${score}`;
        }
        // Single 25 (nur Single-Out)
        if (score === 25 && checkoutMode === 'single') {
            return '25';
        }
    }
    
    return null;
}

function updateRoundDisplay() {
    const roundTotalElement = document.getElementById('roundTotal');
    if (roundTotalElement) {
        roundTotalElement.textContent = `${roundTotal} Punkte (${dartsThisRound}/3)`;
    }
    update25ButtonStatus();
}

function update25ButtonStatus() {
    document.querySelectorAll('.dart-btn[data-score="25"]').forEach(btn => {
        // Deaktiviere nur wenn Triple aktiv (Triple 25 nicht erlaubt)
        if (currentMultiplier === 3) {
            btn.classList.add('disabled');
            btn.style.opacity = '0.3';
            btn.style.cursor = 'not-allowed';
        } else {
            btn.classList.remove('disabled');
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }
    });
}

/* ===================== STORAGE ===================== */
function saveToStorage() {
    try {
        localStorage.setItem('currentGame', JSON.stringify(currentGame));
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
        alert('Fehler beim Speichern des Spielstands');
    }
}

function saveGame() {
    try {
        const saved = JSON.parse(localStorage.getItem('savedGames')) || [];
        const gameToSave = { 
            ...currentGame, 
            id: Date.now(),
            finished: currentGame.finished || new Date().toISOString()
        };
        saved.push(gameToSave);
        localStorage.setItem('savedGames', JSON.stringify(saved));
        alert('Spiel gespeichert!');
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
        alert('Fehler beim Speichern des Spiels');
    }
}
