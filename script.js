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


// --- 3. Walidacja formularza (Zadanie 5) ---

// Pobranie elementów formularza
const contactForm = document.getElementById('contactForm');
const formErrors = document.getElementById('formErrors');
const formSuccess = document.getElementById('formSuccess');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Nasłuchiwanie na wysłanie formularza
contactForm.addEventListener('submit', function(event) {
    // Zapobiegamy domyślnemu przeładowaniu strony
    event.preventDefault();

    // Czyszczenie poprzednich błędów
    formErrors.innerHTML = '';
    formErrors.classList.add('hidden');
    formSuccess.classList.add('hidden');
    
    // Usunięcie czerwonych ramek
    const inputs = [firstNameInput, lastNameInput, emailInput, messageInput];
    inputs.forEach(input => input.classList.remove('input-error'));

    let errors = [];

    // Wyrażenie regularne: sprawdza czy ciąg zawiera jakiekolwiek cyfry
    const hasNumberRegex = /\d/;
    // Wyrażenie regularne: proste sprawdzenie formatu email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1. Walidacja imienia (wymagane, bez cyfr)
    if (firstNameInput.value.trim() === '') {
        errors.push('Pole "Imię" jest wymagane.');
        firstNameInput.classList.add('input-error');
    } else if (hasNumberRegex.test(firstNameInput.value)) {
        errors.push('Pole "Imię" nie może zawierać cyfr.');
        firstNameInput.classList.add('input-error');
    }

    // 2. Walidacja nazwiska (wymagane, bez cyfr)
    if (lastNameInput.value.trim() === '') {
        errors.push('Pole "Nazwisko" jest wymagane.');
        lastNameInput.classList.add('input-error');
    } else if (hasNumberRegex.test(lastNameInput.value)) {
        errors.push('Pole "Nazwisko" nie może zawierać cyfr.');
        lastNameInput.classList.add('input-error');
    }

    // 3. Walidacja e-mail (wymagane, poprawny format)
    if (emailInput.value.trim() === '') {
        errors.push('Pole "E-mail" jest wymagane.');
        emailInput.classList.add('input-error');
    } else if (!emailRegex.test(emailInput.value)) {
        errors.push('Podaj poprawny adres e-mail (np. jan@kowalski.pl).');
        emailInput.classList.add('input-error');
    }

    // 4. Walidacja wiadomości (wymagane)
    if (messageInput.value.trim() === '') {
        errors.push('Pole "Wiadomość" jest wymagane.');
        messageInput.classList.add('input-error');
    }

    // Sprawdzenie czy są błędy
    if (errors.length > 0) {
        // Pokazujemy błędy
        formErrors.innerHTML = errors.join('<br>');
        formErrors.classList.remove('hidden');
    } else {
        // Sukces - brak błędów
        formSuccess.classList.remove('hidden');
        contactForm.reset(); // Czyścimy pola po wysłaniu
    }
});
// --- 4. Pobieranie danych z pliku JSON (Zadanie 6) ---

// Funkcja pobierająca i budująca listy
function loadDataFromJson() {
    // Używamy fetch API do pobrania pliku data.json
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd ładowania pliku JSON');
            }
            return response.json(); // Parsowanie odpowiedzi do obiektu JS
        })
        .then(data => {
            // --- Budowanie listy umiejętności ---
            const skillsList = document.getElementById('skillsList');
            if (skillsList) {
                skillsList.innerHTML = ''; // Czyszczenie listy na starcie
                // Przechodzimy przez tablicę umiejętności z JSON
                data.umiejetnosci.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li); // Dodanie elementu do strony
                });
            }

            // --- Budowanie listy projektów ---
            const projectsList = document.getElementById('projectsList');
            if (projectsList) {
                projectsList.innerHTML = ''; // Czyszczenie listy na starcie
                // Przechodzimy przez tablicę projektów z JSON
                data.projekty.forEach(projekt => {
                    const li = document.createElement('li');
                    // Używamy innerHTML, aby pogrubić nazwę projektu
                    li.innerHTML = `<strong>${projekt.nazwa}:</strong> ${projekt.opis}`;
                    projectsList.appendChild(li); // Dodanie elementu do strony
                });
            }
        })
        .catch(error => {
            console.error('Wystąpił błąd podczas pobierania danych:', error);
        });
}

// Uruchamiamy funkcję od razu po załadowaniu całej struktury HTML
document.addEventListener('DOMContentLoaded', loadDataFromJson);
