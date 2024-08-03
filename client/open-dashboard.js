const { exec } = require('child_process');
const { error } = require('console');
const { stdout, stderr } = require('process');

exec('vite', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error starting Vite : ${error}`);
        return;
    }
    console.log(stdout);
    exec('start https://notesapp-ap-backend.onrender.com');
})
