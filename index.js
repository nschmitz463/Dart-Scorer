// Service Worker registrieren
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker registriert:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker Registrierung fehlgeschlagen:', error);
            });
    });
}

// PWA Install Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Verhindere automatischen Install-Dialog
    e.preventDefault();
    deferredPrompt = e;
    
    // Zeige eigenen Install-Button
    const installContainer = document.getElementById('installContainer');
    if (installContainer) {
        installContainer.style.display = 'block';
    }
});

// Install-Button Event
const installButton = document.getElementById('installButton');
if (installButton) {
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) {
            return;
        }
        
        // Zeige Install-Prompt
        deferredPrompt.prompt();
        
        // Warte auf Benutzer-Antwort
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Benutzer Antwort: ${outcome}`);
        
        // Reset
        deferredPrompt = null;
        
        // Verstecke Button
        const installContainer = document.getElementById('installContainer');
        if (installContainer) {
            installContainer.style.display = 'none';
        }
    });
}

// App installiert Event
window.addEventListener('appinstalled', () => {
    console.log('PWA wurde installiert');
    deferredPrompt = null;
});

// Lade letztes Spiel
document.addEventListener('DOMContentLoaded', () => {
    try {
        const lastGame = localStorage.getItem('lastGame');
        const lastGameElement = document.getElementById('lastGame');
        
        if (lastGame && lastGameElement) {
            lastGameElement.textContent = lastGame;
        }
    } catch (error) {
        console.error('Fehler beim Laden des letzten Spiels:', error);
    }
});

