document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settingsForm');
    const playerCount = document.getElementById('playerCount');
    const playerNames = document.getElementById('playerNames');
    const starterMode = document.getElementById('starterMode');
    const manualStarter = document.getElementById('manualStarter');
    const starterSelection = document.getElementById('starterSelection');
    const starterInfo = document.getElementById('starterInfo');

    function updatePlayerInputs() {
        const count = parseInt(playerCount.value, 10);
        playerNames.innerHTML = '';
        
        for (let i = 1; i <= count; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `player${i}`;
            input.value = `Spieler ${i}`;
            input.maxLength = 20;
            input.className = 'player-input-row';
            input.placeholder = `Name Spieler ${i}`;
            playerNames.appendChild(input);
        }
        updateStarterOptions();
        updateStarterInfo();
    }

    function updateStarterOptions() {
        const count = parseInt(playerCount.value, 10);
        const currentSelection = manualStarter.value;
        
        manualStarter.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Spieler ${i + 1}`;
            manualStarter.appendChild(option);
        }
        
        // Vorherige Auswahl beibehalten wenn möglich
        if (parseInt(currentSelection, 10) < count) {
            manualStarter.value = currentSelection;
        } else {
            manualStarter.value = '0';
        }
    }

    function updateStarterInfo() {
        if (starterMode.value === 'random') {
            starterInfo.textContent = 'Zufällig';
            starterSelection.style.display = 'none';
        } else {
            const starterIndex = parseInt(manualStarter.value, 10);
            starterInfo.textContent = `Spieler ${starterIndex + 1}`;
            starterSelection.style.display = 'block';
        }
    }

    // Event Listeners
    playerCount.addEventListener('change', updatePlayerInputs);
    starterMode.addEventListener('change', updateStarterInfo);
    manualStarter.addEventListener('change', updateStarterInfo);

    updatePlayerInputs();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        try {
            const count = parseInt(playerCount.value, 10);
            const players = [];
            
            // Spielernamen sammeln und validieren
            for (let i = 1; i <= count; i++) {
                const playerInput = document.getElementById(`player${i}`);
                const playerName = playerInput.value.trim();
                
                if (!playerName) {
                    alert(`Bitte einen Namen für Spieler ${i} eingeben!`);
                    playerInput.focus();
                    return;
                }
                
                players.push(playerName);
            }

            const startScore = parseInt(document.getElementById('gameMode').value, 10);
            const bestOf = parseInt(document.getElementById('bestOf').value, 10);
            let currentPlayer = 0;

            // Anwerfer bestimmen
            if (starterMode.value === 'random') {
                currentPlayer = Math.floor(Math.random() * count);
            } else {
                currentPlayer = parseInt(manualStarter.value, 10);
            }

            const gameSettings = {
                players,
                startScore,
                checkout: document.getElementById('checkout').value,
                gameMode: document.getElementById('gameMode').value,
                bestOf,
                currentPlayer,
                scores: players.map(() => startScore),
                dartsThrown: players.map(() => 0),
                legsWon: players.map(() => 0),
                starterMode: starterMode.value,
                created: new Date().toISOString()
            };

            // Spiel speichern
            localStorage.setItem('currentGame', JSON.stringify(gameSettings));
            localStorage.setItem('lastGame', `${players.join(' vs ')} - ${startScore}`);
            
            // Weiterleitung zum Scoreboard
            window.location.href = 'scoreboard.html';
        } catch (error) {
            console.error('Fehler beim Erstellen des Spiels:', error);
            alert('Fehler beim Erstellen des Spiels. Bitte erneut versuchen.');
        }
    });
});
