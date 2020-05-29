const cookieWindow = document.getElementById('cookieWindow')



function showWindow() {
    if (localStorage.getItem('cookie') === 'accepted') {
        cookieWindow.style.display = 'none'
    }
}

document.getElementById('cookieAccept').addEventListener('click', acceptCookie);

function acceptCookie() {
    localStorage.setItem('cookie', 'accepted');
    cookieWindow.style.display = 'none'
}

showWindow();
