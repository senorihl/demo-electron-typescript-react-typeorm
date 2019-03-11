const path = require('path');
const { app, BrowserWindow } = require('electron');

const environment = process.env.NODE_ENV || 'production';
let win;

function createWindow () {
    // Cree la fenetre du navigateur.
    win = new BrowserWindow({ });

    if (environment === 'development') {
        // Ouvre les DevTools.
        win.webContents.openDevTools();
        // and load the URL served with webpack HMR
        win.loadURL('http://0.0.0.0:9000/');
    } else {
        // and load the index.html of the app.
        win.loadFile(path.resolve(__dirname, 'dist/index.html'));
    }

    // Émit lorsque la fenêtre est fermée.
    win.on('closed', () => {
        // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
        // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
        // où vous devez supprimer l'élément correspondant.
        win = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // Sur macOS, il est commun pour une application et leur barre de menu
    // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
    if (win === null) {
        createWindow();
    }
});
