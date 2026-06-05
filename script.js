// script.js
const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});
document.getElementById('current-date').textContent = currentDate;

const pianos = [ /* Same as previous version - keeping it short here for space */ 
    // Copy the full pianos array from my last response if needed
    {
        id: 1, brand: "Yamaha", model: "C7", price: 89000, title: "Yamaha C7 Grand Piano",
        tile: "c7-tile.jpg", images: ["c7-tile.jpg", "c7-1.jpg", "c7-2.jpg"],
        description: "The Yamaha C7 is a world-renowned grand piano known for its exceptional tone, power, and responsiveness. This professionally refurbished model features a rich, singing treble and deep, resonant bass. Ideal for professional musicians, music schools, and serious home players who want concert-quality sound in a beautiful instrument.",
        specs: [{ label: "Length", value: "225 cm" }, { label: "Width", value: "155 cm" }, { label: "Height", value: "102 cm" }, { label: "Weight", value: "415 kg" }]
    },
    // ... (add all other 5 pianos same as previous full version)
];

let selectedItem = null;

function renderPianos() {
    const grid = document.getElementById('piano-grid');
    grid.innerHTML = '';
    pianos.forEach(piano => {
        const cardHTML = `
            <div class="piano-card" data-id="${piano.id}">
                <img src="${piano.tile}" alt="${piano.title}">
                <div class="card-info">
                    <p class="brand">${piano.brand}</p>
                    <h3>${piano.model}</h3>
                    <div class="price-tag">${piano.price.toLocaleString()} AED</div>
                    <button class="view-btn">View Details</button>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

function openModal(piano) {
    document.getElementById('modal-title').textContent = piano.title;
    document.getElementById('modal-price').innerHTML = `${piano.price.toLocaleString()} <small>AED</small>`;
    document.getElementById('modal-description').textContent = piano.description;

    document.getElementById('main-image').src = piano.images[0];

    const strip = document.getElementById('thumbnail-strip');
    strip.innerHTML = '';
    piano.images.forEach((src, i) => {
        const thumb = document.createElement('div');
        thumb.className = `thumbnail ${i === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${src}" alt="View ${i+1}">`;
        thumb.onclick = () => {
            document.getElementById('main-image').src = src;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        };
        strip.appendChild(thumb);
    });

    const specsList = document.getElementById('modal-specs');
    specsList.innerHTML = '';
    piano.specs.forEach(spec => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${spec.label}</span><strong>${spec.value}</strong>`;
        specsList.appendChild(li);
    });

    document.getElementById('product-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
document.addEventListener('click', function(e) {
    if (e.target.closest('.piano-card')) {
        const id = parseInt(e.target.closest('.piano-card').dataset.id);
        const piano = pianos.find(p => p.id === id);
        if (piano) openModal(piano);
    }
});

document.getElementById('modal-close').addEventListener('click', closeModal);

document.getElementById('add-to-quote').addEventListener('click', () => {
    selectedItem = currentPiano || selectedItem;
    renderSelected();
    closeModal();
});

document.getElementById('whatsapp-checkout').addEventListener('click', sendToWhatsApp);

// Close modal when clicking outside content
document.getElementById('product-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

function renderSelected() { /* same as before */ }
function sendToWhatsApp() { /* same as before */ }

renderPianos();