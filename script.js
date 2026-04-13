// --- 1. Logika zmiany motywu (zielony / czerwony) ---

// Pobranie elementów z drzewa DOM
const themeButton = document.getElementById('themeToggle');
const themeStylesheet = document.getElementById('themeStylesheet');

// Nasłuchiwanie na kliknięcie przycisku zmiany motywu
themeButton.addEventListener('click', function() {
    // Sprawdzenie, jaki plik CSS jest obecnie podłączony
    if (themeStylesheet.getAttribute('href') === 'styles.css') {
        // Zmiana na czerwony
        themeStylesheet.setAttribute('href', 'red.css');
        themeButton.textContent = 'Zmień motyw na zielony';
    } else {
        // Powrót do zielonego
        themeStylesheet.setAttribute('href', 'styles.css');
        themeButton.textContent = 'Zmień motyw na czerwony';
    }
});

// --- 2. Logika ukrywania i pokazywania sekcji CV ---

// Pobranie elementów z drzewa DOM
const toggleSkillsButton = document.getElementById('toggleSkills');
const skillsContent = document.getElementById('skillsContent');

// Nasłuchiwanie na kliknięcie przycisku ukrywania/pokazywania
toggleSkillsButton.addEventListener('click', function() {
    // Sprawdzenie, czy zawartość posiada klasę 'hidden'
    if (skillsContent.classList.contains('hidden')) {
        // Jeśli jest ukryta - pokaż ją i zmień tekst przycisku
        skillsContent.classList.remove('hidden');
        toggleSkillsButton.textContent = 'Ukryj umiejętności';
    } else {
        // Jeśli jest widoczna - ukryj ją i zmień tekst przycisku
        skillsContent.classList.add('hidden');
        toggleSkillsButton.textContent = 'Pokaż umiejętności';
    }
});
