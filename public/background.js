/**
 * background.js
 * Gestisce l'autenticazione OAuth2 con Twitch e crea la finestra del popup.
 */

const CLIENT_ID = "4o4ptfoymh5w6y0tk8hobwbdz3wmq9";

// L'URL a cui Twitch ci reindirizza dopo il login
const REDIRECT_URI = chrome.identity.getRedirectURL();

// I "permessi" che chiediamo a Twitch.
const SCOPES = [
  'user:read:email',              // Per ottenere l'ID del moderatore
  'moderator:manage:banned_users',// Per poter bannare gli utenti
  'clips:edit',                   // Per poter eliminare le clip
  'moderator:read:chatters'       // Per ottenere la lista utenti completa via API
];
const AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=${SCOPES.join('+')}`;

/**
 * Ascolta il click sull'icona dell'estensione nella barra di Chrome.
 */
chrome.action.onClicked.addListener((tab) => {
  let streamerName = '';
  
  // Tenta di estrarre il nome dello streamer dall'URL della scheda attiva
  try {
    const url = new URL(tab.url);
    const hostname = url.hostname;
    const pathParts = url.pathname.split('/'); 

    if (hostname.includes('twitch.tv')) {
      if (pathParts[1] === 'moderator' && pathParts.length > 2) {
        streamerName = pathParts[2]; // Formato: twitch.tv/moderator/STREAMER
      } else {
        streamerName = pathParts[1]; // Formato: twitch.tv/STREAMER
      }
    }
  } catch (e) { /* URL non valido, non fa niente */ }

  // Crea una nuova finestra "popup" e le passa il nome streamer
  // nell'hash (es. popup.html#nome_streamer)
  chrome.windows.create({
    url: `popup.html#${streamerName}`, 
    type: 'popup',     
    width: 800,        
    height: 550        
  });
});

/**
 * Gestore dei messaggi inviati da popup.js
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "login") {
    handleLogin(sendResponse);
    return true; // Mantiene la connessione aperta per la risposta
  }
  
  if (request.action === "logout") {
    handleLogout(sendResponse);
    return true; // Mantiene la connessione aperta per la risposta
  }
});

/**
 * Avvia il flusso di autenticazione OAuth2 di Twitch.
 */
function handleLogin(sendResponse) {
  // Pulisce la cache per forzare un nuovo login
  chrome.storage.local.clear(() => { 
    chrome.identity.launchWebAuthFlow({
      url: AUTH_URL,
      interactive: true
    }, (redirect_url) => {
      if (chrome.runtime.lastError || !redirect_url) {
        sendResponse({ status: 'error', message: 'Autenticazione fallita.' });
        return;
      }
      
      // Estrae il token di accesso dall'URL di risposta
      const url = new URL(redirect_url.replace('#', '?'));
      const token = url.searchParams.get('access_token');
      if (!token) {
        sendResponse({ status: 'error', message: 'Token non trovato.' });
        return;
      }

      // Usa il token per chiedere a Twitch "Chi sono io?"
      fetch('https://api.twitch.tv/helix/users', {
        headers: { 'Client-ID': CLIENT_ID, 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(userData => {
        // Salva il token e l'ID del moderatore nello storage locale
        if (userData.data && userData.data.length > 0) {
          const modId = userData.data[0].id;
          chrome.storage.local.set({ 
            'twitch_token': token,
            'mod_id': modId
          }, () => {
            sendResponse({ status: 'success' });
          });
        } else {
          sendResponse({ status: 'error', message: 'Impossibile ottenere ID utente.' });
        }
      })
      .catch(err => sendResponse({ status: 'error', message: 'Errore API Users.' }));
    });
  });
}

/**
 * Esegue il logout, pulendo lo storage e la cache del token.
 */
function handleLogout(sendResponse) {
    chrome.storage.local.get('twitch_token', (data) => {
        if (data.twitch_token) {
            // Rimuove il token dalla cache di Chrome
            chrome.identity.removeCachedAuthToken({ token: data.twitch_token }, () => {
                // Pulisce lo storage dell'estensione
                chrome.storage.local.clear(() => {
                    console.log("Token rimosso e storage pulito. Logout completato.");
                    sendResponse({ status: "success" });
                });
            });
        } else {
             sendResponse({ status: "error", message: "Nessun token da rimuovere." });
        }
    });
}