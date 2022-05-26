const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // store triggered events
    window.deferredPrompt = event;

    // remove hidden class from button
    butInstall.classList.toggle('hidden', false);
});

// click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if(!promptEvent) {
        return;
    }
    // show prompt
    promptEvent.prompt();

    // reset the deferred prompt variable
    window.deferredPrompt = null;

    // add hidden class to button
    butInstall.classList.toggle('hidden', true);
});

// handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // clear prompt
    window.deferredPrompt = null;
});
