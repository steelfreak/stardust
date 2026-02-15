const container = document.getElementById('container');
const iframe = document.getElementById('game-iframe');
const maxBtn = document.getElementById('maximize-btn');
let popupWindow = null;

maxBtn.addEventListener('click', function() {
    if (popupWindow && !popupWindow.closed) {
        popupWindow.focus();
        return;
    }
    
    // Open iframe in popup without address bar/toolbars
    popupWindow = window.open(
        iframe.src,
        'gamePopup',
        'width=' + screen.availWidth + 
        ',height=' + screen.availHeight + 
        ',top=0,left=0,' +
        'toolbar=no,menubar=no,location=no,status=no,scrollbars=yes,resizable=yes'
    );
    
    // if (popupWindow) {
    //     // Minimize main iframe when popup opens
    //     container.classList.add('minimized');
    //     iframe.style.display = 'none';
    // }
});

// Handle popup close from main page - auto restore
const checkPopupClosed = setInterval(function() {
    if (popupWindow && popupWindow.closed) {
        // Restore main iframe when popup closes
        container.classList.remove('minimized');
        iframe.style.display = 'block';
        iframe.width = 900;
        iframe.height = 500;
        popupWindow = null;
        clearInterval(checkPopupClosed);
    }
}, 500);
