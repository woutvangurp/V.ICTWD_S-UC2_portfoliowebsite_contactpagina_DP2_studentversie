window.addEventListener('contextmenu', e => e.preventDefault()); 

window.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
        e.preventDefault();
    }
});

function naiveEmailCheck(email) {
    return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}

function setupValidation() {
    const form = document.getElementById('contactForm');
    const hp = document.getElementById('website');
    const email = document.getElementById('Email');
    const name = document.getElementById('Name');
    const msg = document.getElementById('Message');
    const status = document.getElementById('liveStatus');

    const sendBtn = document.getElementById('send-button');
    sendBtn.style.backgroundColor = 'darkgray';
    sendBtn.disabled = true;

    const isFormValid = () =>
        naiveEmailCheck(email.value) &&
        name.value.length >= 2 && name.value.length <= 25 &&
        msg.value.length >= 5 && msg.value.length <= 150;

    const clearError = (id) => {
        document.getElementById(id).innerHTML = '';
    };

    const problemWithError = (id, value, message) => 
        document.getElementById(id).innerHTML = `\n <span>Probleem met: \'${value}\'  ${message}</span>\n `;
    const genericError = (id, message) =>
        document.getElementById(id).innerHTML = `\n <span> ${message} </span> \n`;

    [email, name, msg].forEach(el => {
        el.addEventListener('input', () => {
            if (el === email) {
                if (!el.value.contains('@')) {
                    problemWithError('emailErr', el.value, 'de email bevat geen \'@\'');
                } else if (!el.value.contains('.')) {
                    problemWithError('emailErr', el.value, 'de email bevat geen \'.\'');
                } else if (!naiveEmailCheck(el.value)) {
                    genericError('emailErr', 'geen kloppende email');
                } else {
                    clearError('emailErr');
                }
            } else if (el === name) {
                if (el.value.length < 2) {
                    genericError('nameErr', 'naam is te kort');
                } else if (el.value.length > 25) {
                    genericError('nameErr', 'naam is te lang');
                } else {
                    clearError('nameErr');
                }
            } else if (el === msg) {
                if (el.value.length < 5) {
                    genericError('msgErr', 'bericht is te klein');
                } else if (el.value.length > 150) {
                    genericError('msgErr', 'bericht is te lang, probeer in te korten');
                } else {
                    clearError('msgErr');
                }
            }

            if (isFormValid()) {
                sendBtn.disabled = false;
                sendBtn.style.backgroundColor = 'green';
            } else {
                sendBtn.disabled = true;
                sendBtn.style.backgroundColor = 'darkgray';
            }

        });
    });

    form.addEventListener('submit', (e) => {
        if (hp.value) {
            e.preventDefault();
            alert('Spam gedetecteerd (client-side)!');
            return false;
        }

        return true;
    });
}

window.addEventListener('DOMContentLoaded', setupValidation);