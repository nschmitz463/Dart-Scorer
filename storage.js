document.addEventListener('DOMContentLoaded', () => {
    loadSavedGames();
    setupEventListeners();
});

function setupEventListeners() {
    const clearAllBtn = document.getElementById('clearAll');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            if (confirm('Alle gespeicherten Spiele wirklich löschen?')) {
                try {
                    localStorage.removeItem('savedGames');
                    loadSavedGames();
                } catch (error) {
                    console.error('Fehler beim Löschen:', error);
                    alert('Fehler beim Löschen der Spiele');
                }
            }
        });
    }
}

function loadSavedGames() {
    try {
        const saved = JSON.parse(localStorage.getItem('savedGames')) || [];
        const container = document.getElementById('savedGames');
        
        if (!container) return;
        
        if (saved.length === 0) {
            container.innerHTML = '<div class="saved-game"><p>Keine gespeicherten Spiele gefunden.</p></div>';
            document.getElementById('playerStats').innerHTML = '';
            return;
        }

        // Spiele in umgekehrter Reihenfolge anzeigen (neueste zuerst)
        const gamesHtml = saved
            .map(game => createGameCard(game))
            .reverse()
            .join('');
        
        container.innerHTML = gamesHtml;
        updatePlayerStats(saved);
    } catch (error) {
        console.error('Fehler beim Laden der Spiele:', error);
        const container = document.getElementById('savedGames');
        if (container) {
            container.innerHTML = '<div class="saved-game"><p>Fehler beim Laden der Spiele.</p></div>';
        }
    }
}

function createGameCard(game) {
    const dateStr = game.finished ? new Date(game.finished).toLocaleDateString('de-DE') : 
                    game.created ? new Date(game.created).toLocaleDateString('de-DE') : 'Unbekannt';
    
    const winnerIndex = game.legsWon.indexOf(Math.max(...game.legsWon));
    const winner = game.players[winnerIndex];
    
    const legsInfo = game.legsWon
        .map((legs, i) => {
            const isWinner = i === winnerIndex;
            return `<span class="${isWinner ? 'winner-text' : ''}">${game.players[i]}: ${legs}</span>`;
        })
        .join(' | ');

    return `
        <div class="saved-game">
            <div class="game-header">
                <strong>${game.players.join(' vs ')}</strong>
                <div>
                    <span class="game-info">${game.gameMode || game.startScore}</span>
                    <button onclick="loadGame(${game.id})" class="btn small">Laden</button>
                    <button onclick="deleteGame(${game.id})" class="btn danger small">Löschen</button>
                </div>
            </div>
            <div class="game-result">
                ${legsInfo}
            </div>
            <div class="game-winner">
                🏆 Gewinner: ${winner}
            </div>
            <small>Datum: ${dateStr}</small>
        </div>
    `;
}

function loadGame(id) {
    try {
        const saved = JSON.parse(localStorage.getItem('savedGames')) || [];
        const game = saved.find(g => g.id === id);
        
        if (game) {
            localStorage.setItem('currentGame', JSON.stringify(game));
            window.location.href = 'scoreboard.html';
        } else {
            alert('Spiel nicht gefunden');
        }
    } catch (error) {
        console.error('Fehler beim Laden des Spiels:', error);
        alert('Fehler beim Laden des Spiels');
    }
}

function deleteGame(id) {
    if (confirm('Spiel wirklich löschen?')) {
        try {
            let saved = JSON.parse(localStorage.getItem('savedGames')) || [];
            saved = saved.filter(g => g.id !== id);
            localStorage.setItem('savedGames', JSON.stringify(saved));
            loadSavedGames();
        } catch (error) {
            console.error('Fehler beim Löschen:', error);
            alert('Fehler beim Löschen des Spiels');
        }
    }
}

function updatePlayerStats(games) {
    try {
        const stats = {};
        
        games.forEach(game => {
            if (!game.players || !game.legsWon) return;
            
            game.players.forEach((player, index) => {
                if (!stats[player]) {
                    stats[player] = { 
                        wins: 0, 
                        totalLegs: 0,
                        matchesPlayed: 0 
                    };
                }
                
                stats[player].matchesPlayed++;
                stats[player].totalLegs += game.legsWon[index] || 0;
                
                // Match-Gewinner ermitteln
                const maxLegs = Math.max(...game.legsWon);
                if (game.legsWon[index] === maxLegs) {
                    stats[player].wins++;
                }
            });
        });

        const statsHtml = Object.entries(stats)
            .sort((a, b) => b[1].wins - a[1].wins) // Sortieren nach Anzahl Siege
            .map(([player, data]) => {
                const winRate = data.matchesPlayed > 0 
                    ? Math.round((data.wins / data.matchesPlayed) * 100) 
                    : 0;
                
                return `
                    <div class="player-stat">
                        <strong>${player}</strong>: 
                        ${data.wins} Matches gewonnen von ${data.matchesPlayed} 
                        (${winRate}% Siegrate, ${data.totalLegs} Legs gesamt)
                    </div>
                `;
            })
            .join('');
        
        const statsContainer = document.getElementById('playerStats');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <h3>📊 Spielerstatistik</h3>
                ${statsHtml || '<p>Keine Statistiken verfügbar</p>'}
            `;
        }
    } catch (error) {
        console.error('Fehler bei der Statistik-Berechnung:', error);
    }
}
