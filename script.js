const guestForm = document.getElementById('guestForm');
const guestList = document.getElementById('guestList');

// Load existing guestbook entries from localStorage
function loadGuestbookEntries() {
    const guests = JSON.parse(localStorage.getItem('guests')) || [];
    guests.forEach((guest, index) => {
        addGuestCard(guest.name, guest.address, index);
    });
}

// Add a new guest card
function addGuestCard(name, address, index) {
    const guestCard = document.createElement('div');
    guestCard.classList.add('guest-card');
    guestCard.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Message:</strong> ${address}</p>
        <button class="delete-button" data-index="${index}">Delete</button>`;
    guestList.appendChild(guestCard);
}

// Handle form submission
guestForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;

    // Create guest object
    const guest = { name, address };

    // Save guest to localStorage
    const guests = JSON.parse(localStorage.getItem('guests')) || [];
    guests.push(guest);
    localStorage.setItem('guests', JSON.stringify(guests));

    // Add guest card to the list
    addGuestCard(name, address, guests.length - 1);

    // Reset form
    guestForm.reset();
});

// Handle delete button clicks
guestList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-button')) {
        const index = e.target.getAttribute('data-index');

        // Remove guest from localStorage
        const guests = JSON.parse(localStorage.getItem('guests'));
        guests.splice(index, 1);
        localStorage.setItem('guests', JSON.stringify(guests));

        // Re-render guestbook
        guestList.innerHTML = '';
        loadGuestbookEntries();
    }
});

// Load entries when page loads
window.onload = loadGuestbookEntries;
