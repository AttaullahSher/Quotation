// script.js
const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});
document.getElementById('current-date').textContent = currentDate;

const pianos = [
    {
        id: 1,
        brand: "Yamaha",
        model: "C7",
        price: 89000,
        title: "Yamaha C7 Grand Piano",
        tile: "c7-tile.jpg",
        images: ["c7-tile.jpg", "c7-1.jpg", "c7-2.jpg"],
        description: "The Yamaha C7 is a world-renowned grand piano known for its exceptional tone, power, and responsiveness. This professionally refurbished model features a rich, singing treble and deep, resonant bass. Ideal for professional musicians, music schools, and serious home players who want concert-quality sound in a beautiful instrument.",
        specs: [
            { label: "Length", value: "225 cm" },
            { label: "Width", value: "155 cm" },
            { label: "Height", value: "102 cm" },
            { label: "Weight", value: "415 kg" },
            { label: "Soundboard", value: "Solid Spruce" }
        ]
    },
    {
        id: 2,
        brand: "Yamaha",
        model: "G5",
        price: 56500,
        title: "Yamaha G5 Grand Piano",
        tile: "g5-tile.jpg",
        images: ["g5-tile.jpg", "g5-1.jpg", "g5-2.jpg"],
        description: "A fantastic mid-size grand piano with excellent clarity and dynamic range. This refurbished Yamaha G5 offers warm tone and precise touch, making it perfect for both classical and contemporary music. Its balanced size makes it suitable for homes, studios, and small performance venues.",
        specs: [
            { label: "Length", value: "200 cm" },
            { label: "Width", value: "148 cm" },
            { label: "Height", value: "100 cm" },
            { label: "Weight", value: "340 kg" },
            { label: "Soundboard", value: "Solid Spruce" }
        ]
    },
    {
        id: 3,
        brand: "Yamaha",
        model: "G2",
        price: 32000,
        title: "Yamaha G2 Grand Piano",
        tile: "g2-tile.jpg",
        // Repo contains: g2-tile.jpg, g2-1.jpg (NO g2-2.jpg)
        images: ["g2-tile.jpg", "g2-1.jpg"],
        description: "Compact and versatile, the Yamaha G2 delivers impressive sound quality despite its smaller size. This refurbished model is an excellent choice for apartments, teaching studios, and smaller venues. It maintains the signature Yamaha reliability and beautiful tone.",
        specs: [
            { label: "Length", value: "170 cm" },
            { label: "Width", value: "145 cm" },
            { label: "Height", value: "98 cm" },
            { label: "Weight", value: "280 kg" },
            { label: "Soundboard", value: "Solid Spruce" }
        ]
    },
    {
        id: 4,
        brand: "Steinway & Sons",
        model: "D-274",
        price: 385000,
        title: "Steinway D-274 Concert Grand",
        tile: "steinway-tile.jpg",
        images: ["steinway-tile.jpg", "steinway-1.jpg", "steinway-2.jpg"],
        description: "The Steinway D-274 is the gold standard of concert grand pianos. This meticulously refurbished instrument offers unparalleled tonal depth, projection, and expressive capabilities. Favored by world-class pianists and prestigious concert halls worldwide.",
        specs: [
            { label: "Length", value: "274 cm" },
            { label: "Width", value: "158 cm" },
            { label: "Height", value: "103 cm" },
            { label: "Weight", value: "480 kg" },
            { label: "Action", value: "Steinway Accelerated" }
        ]
    },
    {
        id: 5,
        brand: "Yamaha",
        model: "U3",
        price: 17500,
        title: "Yamaha U3 Upright Piano",
        tile: "U3-tile.jpg",
        // Repo contains: U3-tile.jpg, U3-1.jpg, U3-2.jpg (uppercase U3)
        images: ["U3-tile.jpg", "U3-1.jpg", "U3-2.jpg"],
        description: "One of the most popular upright pianos in the world. The Yamaha U3 delivers full, rich sound with excellent sustain. This professionally refurbished model is perfect for serious students, teachers, and families who want a high-quality instrument with a compact footprint.",
        specs: [
            { label: "Height", value: "131 cm" },
            { label: "Width", value: "153 cm" },
            { label: "Depth", value: "65 cm" },
            { label: "Weight", value: "240 kg" },
            { label: "Keys", value: "88" }
        ]
    },
    {
        id: 6,
        brand: "Yamaha",
        model: "U2",
        price: 14500,
        title: "Yamaha U2 Upright Piano",
        tile: "u2-tile.jpg",
        images: ["u2-tile.jpg", "u2-1.jpg", "u2-2.jpg"],
        description: "A highly versatile and reliable upright piano. The Yamaha U2 offers a great balance between size and sound quality. This refurbished unit is ideal for home use, practice rooms, and small music schools. Known for its durability and consistent performance.",
        specs: [
            { label: "Height", value: "123 cm" },
            { label: "Width", value: "152 cm" },
            { label: "Depth", value: "63 cm" },
            { label: "Weight", value: "220 kg" },
            { label: "Keys", value: "88" }
        ]
    }
];

let selectedItem = null;

// Render all pianos in one grid
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

// Open Modal
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
        thumb.innerHTML = `<img src="${src}" alt="View ${i + 1}">`;
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
}

// Render Selected
function renderSelected() {
    const container = document.getElementById('selected-items');
    container.innerHTML = '';

    if (selectedItem) {
        const div = document.createElement('div');
        div.className = 'selected-item';
        div.innerHTML = `
            <strong>${selectedItem.brand} ${selectedItem.model}</strong><br>
            ${selectedItem.price.toLocaleString()} AED
        `;
        container.appendChild(div);

        document.getElementById('total-price').innerHTML =
            `Total: <strong>${selectedItem.price.toLocaleString()} AED</strong>`;
    } else {
        document.getElementById('total-price').innerHTML = 'Total: 0 AED';
    }
}

// WhatsApp Order
function sendToWhatsApp() {
    if (!selectedItem) {
        alert("Please select a piano first.");
        return;
    }

    let message = `*AKM Music Order Request - Quotation #26651*\\n\\n`;
    message += `Date: ${currentDate}\\n\\n`;
    message += `I would like to order:\\n`;
    message += `• ${selectedItem.brand} ${selectedItem.model}\\n`;
    message += `Price: ${selectedItem.price.toLocaleString()} AED\\n\\n`;
    message += `Package includes: Delivery, Bench & One Free Tuning\\n`;
    message += `All pianos are professionally refurbished.\\n\\n`;
    message += `Please confirm availability and next steps. Thank you.`;

    const phone = "971506418963";
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Event Listeners
document.addEventListener('click', function (e) {
    const card = e.target.closest('.piano-card');
    if (card) {
        const id = parseInt(card.dataset.id);
        const piano = pianos.find(p => p.id === id);
        if (piano) openModal(piano);
    }
});

document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('product-modal').style.display = 'none';
});

document.getElementById('product-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        document.getElementById('product-modal').style.display = 'none';
    }
});

let currentPiano = null;

document.getElementById('add-to-quote').addEventListener('click', () => {
    selectedItem = currentPiano;
    renderSelected();
    document.getElementById('product-modal').style.display = 'none';
});

document.getElementById('whatsapp-checkout').addEventListener('click', sendToWhatsApp);

// Keep currentPiano updated when opening modal
const originalOpenModal = openModal;
openModal = function (piano) {
    currentPiano = piano;
    return originalOpenModal(piano);
};

// Initialize
renderPianos();
