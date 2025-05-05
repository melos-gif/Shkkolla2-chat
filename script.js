      // Sample Data
      const sampleGrades = [
        { subject: 'Matematikë', grade: 'A', semester: 'Semestri I', teacher: 'Avni Z.' },
        { subject: 'Gjuhë Shqipe', grade: 'B', semester: 'Semestri I', teacher: 'Remzi T.' },
        { subject: 'Harduer dhe Souftver', grade: 'A', semester: 'Semestri I', teacher: 'Ernest H.' },
        { subject: 'Programim', grade: 'A', semester: 'Semestri I', teacher: 'Fevzi O.' },
        { subject: 'Baza Elektronike', grade: 'A', semester: 'Semestri I', teacher: 'Shpresa V.' }
    ];

    const sampleSchedule = {
        'E Hënë': [
            { subject: 'Matematikë', time: '08:00 - 09:30', teacher: 'Avni Z.' },
            { subject: 'Gjuhë Shqipe', time: '09:45 - 11:15', teacher: 'Remzi T.' },
            { subject: 'Fizikë', time: '11:30 - 13:00', teacher: 'Teuta K.' }
        ],
        'E Martë': [
            { subject: 'Harduer dhe souftver', time: '08:00 - 09:30', teacher: 'Ernest H.' },
            { subject: ' Qertefikim me ECDL', time: '09:45 - 11:15', teacher: 'Fevzi O.' }
        ],
        'E Mërkurë': [
            { subject: 'Programim', time: '08:00 - 09:30', teacher: 'Ilmi B.' },
            { subject: 'Anglisht', time: '09:45 - 11:15', teacher: 'Albulena P.' }
        ],
        'E Enjte': [
            { subject: 'Matematikë', time: '08:00 - 09:30', teacher: 'Avni Z.' },
            { subject: ' Baza Elektronike', time: '09:45 - 11:15', teacher: 'Shpresa V.' }
        ],
        'E Premte': [
            { subject: 'Baza Elektronike', time: '08:00 - 09:30', teacher: 'Shpresa V.' },
            { subject: 'Hardurer dhe souftwer', time: '09:45 - 11:15', teacher: 'Ernest H.' }
        ]
    };

    const sampleBooks = [
        { title: 'Matematikë 10', author: 'Autorë të ndryshëm', year: 2022, category: 'Matematikë' },
        { title: 'Gjuhë Shqipe 11', author: 'Autorë të ndryshëm', year: 2021, category: 'Gjuhë Shqipe' },
        { title: 'Fizikë 10', author: 'Fatos K.', year: 2022, category: 'Fizikë' },
        { title: 'Histori Kompjuteruike', author: 'Dritan K.', year: 2020, category: 'Harduer dhe souftver' },
        { title: 'Bazat e Elektronikes', author: 'Klea M.', year: 2021, category: 'Baza Elektronike' },
        { title: 'ECDL', author: 'Blerina S.', year: 2022, category: 'Qertefikimi me ECDL' }
    ];

    // DOM Elements
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const exploreBtn = document.getElementById('exploreBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const showRegisterModalLink = document.getElementById('showRegisterModalLink');
    const showLoginModalLink = document.getElementById('showLoginModalLink');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const dashboard = document.getElementById('dashboard');
    const gradesTableBody = document.getElementById('gradesTableBody');
    const scheduleContainer = document.getElementById('scheduleContainer');
    const libraryContainer = document.getElementById('libraryContainer');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const messagesList = document.getElementById('messagesList');

    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = {
        'notat': document.getElementById('notat-section'),
        'orari': document.getElementById('orari-section'),
        'libraria': document.getElementById('libraria-section'),
        'mesazhet': document.getElementById('mesazhet-section')
    };

    // Event Listeners
    loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    registerBtn.addEventListener('click', () => registerModal.style.display = 'flex');
    exploreBtn.addEventListener('click', () => {
        // For demo purposes, show login modal
        loginModal.style.display = 'flex';
    });

    closeLoginModal.addEventListener('click', () => loginModal.style.display = 'none');
    closeRegisterModal.addEventListener('click', () => registerModal.style.display = 'none');
    showRegisterModalLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });
    showLoginModalLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });

    // Handle login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (email && password) {
            // In a real app, you would send this to a server
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Hide modals and show dashboard
            loginModal.style.display = 'none';
            dashboard.style.display = 'grid';
            
            // Load data
            loadGrades();
            loadSchedule();
            loadLibrary();
            
            // Update UI
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
        } else {
            alert('Ju lutem plotësoni të gjitha fushat!');
        }
    });

    // Handle registration
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        // Simple validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Ju lutem plotësoni të gjitha fushat!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Fjalëkalimet nuk përputhen!');
            return;
        }
        
        // In a real app, you would send this to a server
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        
        // Hide modals and show dashboard
        registerModal.style.display = 'none';
        dashboard.style.display = 'grid';
        
        // Load data
        loadGrades();
        loadSchedule();
        loadLibrary();
        
        // Update UI
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
    });

    // Sidebar navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Hide all sections
            Object.values(sections).forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the selected section
            const sectionId = link.getAttribute('href').substring(1);
            if (sections[sectionId]) {
                sections[sectionId].style.display = 'block';
            }
        });
    });

    // Chat functionality
    sendMessageBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message message-outgoing';
            messageElement.innerHTML = `
                <div class="message-sender">Ju</div>
                <div class="message-text">${messageText}</div>
            `;
            messagesList.appendChild(messageElement);
            messageInput.value = '';
            
            // Scroll to bottom
            messagesList.scrollTop = messagesList.scrollHeight;
            
            // Simulate reply after 1 second
            setTimeout(() => {
                const replyElement = document.createElement('div');
                replyElement.className = 'message message-incoming';
                replyElement.innerHTML = `
                    <div class="message-sender">Avni Z.</div>
                    <div class="message-text">Faleminderit për mesazhin! Do t'ju përgjigjem sa më shpejt.</div>
                `;
                messagesList.appendChild(replyElement);
                messagesList.scrollTop = messagesList.scrollHeight;
            }, 1000);
        }
    }

    // Load grades
    function loadGrades() {
        gradesTableBody.innerHTML = '';
        sampleGrades.forEach(grade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${grade.subject}</td>
                <td><span class="grade-badge grade-${grade.grade}">${grade.grade}</span></td>
                <td>${grade.semester}</td>
                <td>${grade.teacher}</td>
                <td><button class="btn btn-outline btn-sm">Detaje</button></td>
            `;
            gradesTableBody.appendChild(row);
        });
    }

    // Load schedule
    function loadSchedule() {
        scheduleContainer.innerHTML = '';
        for (const day in sampleSchedule) {
            const dayColumn = document.createElement('div');
            dayColumn.className = 'schedule-day';
            dayColumn.innerHTML = `<h3>${day}</h3>`;
            
            sampleSchedule[day].forEach(cls => {
                const classElement = document.createElement('div');
                classElement.className = 'schedule-class';
                classElement.draggable = true;
                classElement.innerHTML = `
                    <h4>${cls.subject}</h4>
                    <p>${cls.time}</p>
                    <p>${cls.teacher}</p>
                `;
                
                // Add drag events
                classElement.addEventListener('dragstart', () => {
                    classElement.classList.add('dragging');
                });
                
                classElement.addEventListener('dragend', () => {
                    classElement.classList.remove('dragging');
                });
                
                dayColumn.appendChild(classElement);
            });
            
            scheduleContainer.appendChild(dayColumn);
        }
        
        // Make schedule droppable
        scheduleContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingClass = document.querySelector('.dragging');
            const afterElement = getDragAfterElement(scheduleContainer, e.clientY);
            if (afterElement) {
                scheduleContainer.insertBefore(draggingClass, afterElement);
            } else {
                scheduleContainer.appendChild(draggingClass);
            }
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.schedule-class:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Load library
    function loadLibrary() {
        libraryContainer.innerHTML = '';
        sampleBooks.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book-card';
            bookElement.innerHTML = `
                <div class="book-cover">
                    <i class="fas fa-book"></i>
                </div>
                <div class="book-info">
                    <h4>${book.title}</h4>
                    <p>${book.author} • ${book.year}</p>
                    <div class="book-actions">
                        <button class="btn btn-outline btn-sm">Shiko</button>
                        <button class="btn btn-primary btn-sm">Shkarko</button>
                    </div>
                </div>
            `;
            libraryContainer.appendChild(bookElement);
        });
    }

    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        dashboard.style.display = 'grid';
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        loadGrades();
        loadSchedule();
        loadLibrary();
    }

    // loginForm
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch("login.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${email}&fjalekalimi=${password}`
    });

    const text = await res.text();
    alert(text);
});

// registerForm
document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const emri = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const res = await fetch("register.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `emri=${emri}&email=${email}&fjalekalimi=${password}`
    });

    const text = await res.text();
    alert(text);
});


// Funksionaliteti i kopjimit të kodit
document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const code = btn.closest('.code-container').querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            alert('Kodi u kopjua me sukses!');
        });
    });
});

// Funksionaliteti i kërkimit
document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    window.location.href = `search.php?q=${encodeURIComponent(query)}`;
});