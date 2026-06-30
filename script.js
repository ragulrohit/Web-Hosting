const currentPage = window.location.pathname.split('/').pop() || 'index.html';
if (currentPage === 'index.html') {
    const pageLoader = document.createElement('div');
    pageLoader.className = 'page-loader';
    pageLoader.setAttribute('role', 'status');
    pageLoader.setAttribute('aria-live', 'polite');
    pageLoader.innerHTML = `
        <div class="loader-panel">
            <img src="images/Stackly_logo.webp" alt="Stackly" class="loader-logo">
            <span class="loader-kicker">Web Hosting</span>
            <div class="loader-percent"><span id="loaderPercent">0</span>%</div>
            <div class="loader-track" aria-hidden="true">
                <span id="loaderBar"></span>
            </div>
        </div>
    `;
    document.body.prepend(pageLoader);
    document.body.classList.add('is-loading');

    const loaderPercent = document.getElementById('loaderPercent');
    const loaderBar = document.getElementById('loaderBar');
    const loaderDuration = 2000;
    const loaderStart = performance.now();

    const updateLoader = (now) => {
        const progress = Math.min((now - loaderStart) / loaderDuration, 1);
        const loaderValue = Math.round(progress * 100);
        if (loaderPercent) {
            loaderPercent.textContent = loaderValue;
        }
        if (loaderBar) {
            loaderBar.style.width = `${loaderValue}%`;
        }

        if (progress >= 1) {
            setTimeout(() => {
                pageLoader.classList.add('is-hidden');
                document.body.classList.remove('is-loading');
            }, 260);
            setTimeout(() => {
                pageLoader.remove();
            }, 760);
            return;
        }

        requestAnimationFrame(updateLoader);
    };

    requestAnimationFrame(updateLoader);
}

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-label', hamburger.classList.contains('active') ? 'Close menu' : 'Menu');
    });
}

// Close menu when a link is clicked
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-label', 'Menu');
            }
        });
    });
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks for contacting Stackly. We will get back to you soon.');
        contactForm.reset();
    });
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
    const animateCounter = (counter) => {
        const target = Number(counter.dataset.count);
        const decimals = Number(counter.dataset.decimals || 0);
        const duration = 1200;
        const startTime = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = (target * eased).toFixed(decimals);
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });

    counters.forEach(counter => observer.observe(counter));
}

const animatedItems = document.querySelectorAll('.animate-on-scroll');
if (animatedItems.length) {
    const animationObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    animatedItems.forEach(item => animationObserver.observe(item));
}

const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        heroVisual.classList.add('is-interacting');
        heroVisual.style.setProperty('--hero-tilt-x', `${x}deg`);
        heroVisual.style.setProperty('--hero-tilt-y', `${y}deg`);
    });

    heroVisual.addEventListener('mouseleave', () => {
        heroVisual.classList.remove('is-interacting');
        heroVisual.style.removeProperty('--hero-tilt-x');
        heroVisual.style.removeProperty('--hero-tilt-y');
    });
}

const passwordToggles = document.querySelectorAll('.password-toggle');

passwordToggles.forEach(passwordToggle => {
    const targetId = passwordToggle.dataset.passwordTarget;
    const passwordInput = targetId ? document.getElementById(targetId) : passwordToggle.previousElementSibling;
    if (!passwordInput) return;

    passwordToggle.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
});

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    const signupFields = [
        {
            input: document.getElementById('name'),
            error: document.getElementById('nameError'),
            messages: {
                valueMissing: 'Please enter your full name.'
            }
        },
        {
            input: document.getElementById('signupEmail'),
            error: document.getElementById('signupEmailError'),
            messages: {
                valueMissing: 'Please enter your email address.',
                typeMismatch: 'Please enter a valid email address.'
            }
        },
        {
            input: document.getElementById('signupPassword'),
            error: document.getElementById('signupPasswordError'),
            messages: {
                valueMissing: 'Please create a password.',
                tooShort: 'Password must be at least 8 characters.'
            }
        },
        {
            input: document.getElementById('confirmPassword'),
            error: document.getElementById('confirmPasswordError'),
            messages: {
                valueMissing: 'Please confirm your password.',
                customError: 'Passwords do not match.'
            }
        }
    ];

    const getFieldMessage = ({ input, messages }) => {
        if (!input.validity.valid) {
            const invalidState = Object.keys(messages).find(state => input.validity[state]);
            return messages[invalidState] || 'Please check this field.';
        }

        return '';
    };

    const validateSignupField = (field) => {
        const passwordInput = document.getElementById('signupPassword');
        const confirmInput = document.getElementById('confirmPassword');

        if (confirmInput && passwordInput && field.input === confirmInput) {
            const hasMismatch = confirmInput.value && passwordInput.value && confirmInput.value !== passwordInput.value;
            confirmInput.setCustomValidity(hasMismatch ? 'Passwords do not match.' : '');
        }

        const message = getFieldMessage(field);
        field.input.classList.toggle('is-invalid', Boolean(message));
        if (field.error) {
            field.error.textContent = message;
        }

        return !message;
    };

    signupFields.forEach(field => {
        if (!field.input) return;

        field.input.addEventListener('input', () => {
            validateSignupField(field);
            if (field.input.id === 'signupPassword') {
                const confirmField = signupFields.find(item => item.input && item.input.id === 'confirmPassword');
                if (confirmField && confirmField.input.value) {
                    validateSignupField(confirmField);
                }
            }
        });

        field.input.addEventListener('blur', () => validateSignupField(field));
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fieldResults = signupFields.map(field => field.input && validateSignupField(field));
        const isValid = fieldResults.every(Boolean);
        if (!isValid) {
            const firstInvalidField = signupFields.find(field => field.input && field.input.classList.contains('is-invalid'));
            if (firstInvalidField) {
                firstInvalidField.input.focus();
            }
            return;
        }

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('signupEmail');
        const displayName = nameInput.value.trim() || 'Stackly User';

        localStorage.setItem('stacklyUserName', displayName);
        localStorage.setItem('stacklyUserEmail', emailInput.value.trim());
        window.location.href = 'dashboard.html';
    });
}

const loginForm = document.querySelector('form.login-form[action="dashboard.html"]');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return;
        }

        const usernameInput = loginForm.querySelector('#username');
        const emailInput = loginForm.querySelector('#email');
        const rememberInput = loginForm.querySelector('#rememberMe');
        const successModal = document.getElementById('loginSuccessModal');
        const successTitle = document.getElementById('loginSuccessTitle');
        const userEmail = emailInput && emailInput.value ? emailInput.value : 'user@stackly.com';
        const username = usernameInput && usernameInput.value ? usernameInput.value.trim() : '';
        const displayName = (username || userEmail.split('@')[0])
            .split(/[._\-\s]+/)
            .filter(Boolean)
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ') || 'Stackly User';

        localStorage.setItem('stacklyUserName', displayName);
        localStorage.setItem('stacklyUserEmail', userEmail);
        localStorage.setItem('stacklyRememberMe', rememberInput && rememberInput.checked ? 'true' : 'false');

        if (successTitle) {
            successTitle.textContent = `Congrats, ${displayName}!`;
        }
        if (successModal) {
            successModal.classList.add('open');
            successModal.setAttribute('aria-hidden', 'false');
        }

        setTimeout(() => {
            window.location.href = loginForm.getAttribute('action');
        }, 1400);
    });
}

const dashboardUserName = document.getElementById('dashboardUserName');
const dashboardAvatar = document.getElementById('dashboardAvatar');
const dashboardWelcome = document.getElementById('dashboardWelcome');
const dashboardUserEmail = document.getElementById('dashboardUserEmail');
if (dashboardUserName && dashboardAvatar) {
    const savedName = localStorage.getItem('stacklyUserName') || 'Stackly User';
    const savedEmail = localStorage.getItem('stacklyUserEmail') || 'user@stackly.com';
    const initials = savedName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part.charAt(0).toUpperCase())
        .join('') || 'SU';

    dashboardUserName.textContent = savedName;
    dashboardAvatar.textContent = initials;
    if (dashboardWelcome) {
        dashboardWelcome.textContent = `Welcome, ${savedName}`;
    }
    if (dashboardUserEmail) {
        dashboardUserEmail.textContent = savedEmail;
    }

    const settingsEmail = document.getElementById('settingsEmail');
    if (settingsEmail) {
        settingsEmail.value = savedEmail;
    }
}

const dashboardNavLinks = document.querySelectorAll('[data-dashboard-target]');
const dashboardPanels = document.querySelectorAll('.dashboard-panel');

if (dashboardNavLinks.length && dashboardPanels.length) {
    const showDashboardPanel = (targetId) => {
        dashboardPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === targetId);
        });

        dashboardNavLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.dashboardTarget === targetId);
        });
    };

    dashboardNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.dashboardTarget;
            showDashboardPanel(targetId);
            history.replaceState(null, '', `#${targetId}`);
        });
    });

    const initialTarget = window.location.hash.replace('#', '') || 'dashboard';
    if (document.getElementById(initialTarget)) {
        showDashboardPanel(initialTarget);
    }
}

const dashboardLogout = document.getElementById('dashboardLogout');
const logoutModal = document.getElementById('logoutModal');
const logoutCancel = document.getElementById('logoutCancel');
if (dashboardLogout) {
    dashboardLogout.addEventListener('click', (e) => {
        e.preventDefault();
        if (logoutModal) {
            logoutModal.classList.add('open');
            logoutModal.setAttribute('aria-hidden', 'false');
        }
    });
}

if (logoutCancel && logoutModal) {
    logoutCancel.addEventListener('click', () => {
        logoutModal.classList.remove('open');
        logoutModal.setAttribute('aria-hidden', 'true');
    });

    logoutModal.addEventListener('click', (e) => {
        if (e.target === logoutModal) {
            logoutModal.classList.remove('open');
            logoutModal.setAttribute('aria-hidden', 'true');
        }
    });
}
