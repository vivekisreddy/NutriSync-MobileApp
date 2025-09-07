// script.js
// Data for meal products (mock database)
const mealData = {
    salmon: [
        { name: "Atlantic Salmon Fillet (2x)", note: "Omega-3 rich", price: "$12.90", store: "Local Market", img: "🧈" },
        { name: "Tricolor Quinoa", note: "Complete protein", price: "$4.80", store: "Global Foods", img: "🌾" },
        { name: "Lemon", note: "Fresh produce", price: "$0.79", store: "Green Grocer", img: "🍋" },
        { name: "Arugula", note: "Iron & folate", price: "$2.20", store: "Green Grocer", img: "🥬" }
    ],
    chana: [
        { name: "Canned Chickpeas", note: "High fiber", price: "$1.29", store: "World Bazaar", img: "🥫" },
        { name: "No-salt Tomato Puree", note: "Low sodium", price: "$1.10", store: "Local Market", img: "🍅" },
        { name: "Garam Masala", note: "Authentic spice blend", price: "$3.40", store: "Desi Mart", img: "🧂" },
        { name: "Brown Basmati Rice", note: "Low GI", price: "$5.30", store: "Desi Mart", img: "🍚" }
    ],
    soba: [
        { name: "100% Buckwheat Soba", note: "Gluten-Free", price: "$4.50", store: "Asia Foods", img: "🍜" },
        { name: "Organic Firm Tofu", note: "26g protein", price: "$2.60", store: "Asia Foods", img: "🧈" },
        { name: "Low-sodium Soy Sauce", note: "Heart-smart", price: "$2.10", store: "Asia Foods", img: "🧂" },
        { name: "Edamame", note: "Plant protein", price: "$3.00", store: "Asia Foods", img: "🫘" }
    ],
    bundle: [
        { name: "Oats", note: "Soluble fiber", price: "$2.10", store: "Global Foods", img: "🌾" },
        { name: "Chia Seeds", note: "ALA omega-3", price: "$3.90", store: "Global Foods", img: "🟤" },
        { name: "Canned Tuna (low-sodium)", note: "EPA/DHA", price: "$2.30", store: "Local Market", img: "🐟" },
        { name: "Mixed Berries", note: "Antioxidants", price: "$3.60", store: "Green Grocer", img: "🫐" }
    ]
};

// Mock user plan
let userPlan = [];

// Boundary Objects / Event Handlers

// Chip toggle functionality
function toggleChip(chip) {
    const isActive = chip.getAttribute('data-active') === 'true';
    chip.setAttribute('data-active', (!isActive).toString());
    // Simulate filter update - in real app, this would trigger API call
    updateMealPicks();
}

// Update meal picks based on active filters (mock)
function updateMealPicks() {
    // Placeholder: In full app, filter and re-render cards based on chips
    console.log('Filters updated - refreshing meal picks');
}

// Add to plan functionality
function addToPlan(mealKey) {
    if (!userPlan.includes(mealKey)) {
        userPlan.push(mealKey);
        alert(`${mealKey.charAt(0).toUpperCase() + mealKey.slice(1)} added to your plan!`); // Mock notification
        console.log('Updated plan:', userPlan);
    }
}

// Modal management
function openModal(key, modalId = 'productModal') {
    const modal = document.getElementById(modalId);
    const body = document.getElementById('modalBody');
    const title = document.getElementById('modalTitle');
    body.innerHTML = '';

    const products = mealData[key] || [];
    products.forEach(item => {
        const el = document.createElement('div');
        el.className = 'product';
        el.innerHTML = `
            <div class="pimg">${item.img}</div>
            <div style="flex:1">
                <strong>${item.name}</strong>
                <div class="subtle">${item.note} • ${item.store}</div>
            </div>
            <div class="qty">
                <button onclick="adjustQty(this, -1)">-</button>
                <span>1</span>
                <button onclick="adjustQty(this, 1)">+</button>
            </div>
            <div style="font-weight:600; color:var(--green)">${item.price}</div>
        `;
        body.appendChild(el);
    });

    title.textContent = key === 'bundle' ? 'Heart Health Cart' : 'Recommended Products';
    modal.style.display = 'flex';
}

// Adjust quantity in modal (mock)
function adjustQty(btn, delta) {
    const qty = btn.parentElement.querySelector('span');
    let current = parseInt(qty.textContent);
    qty.textContent = Math.max(1, current + delta);
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Add all to cart (mock)
function addAllToCart() {
    alert('All items added to cart!'); // Mock
    closeModal('productModal');
}

// Tab switching
function switchTab(tabName) {
    // Remove active from all tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    // Add active to clicked tab
    event.target.classList.add('active');
    // Simulate tab content change
    console.log(`Switched to ${tabName} tab`);
    // In full app, load tab-specific content
}

// AI Agent Modal and Creation
function openAIAgentModal() {
    document.getElementById('aiAgentModal').style.display = 'flex';
    document.getElementById('aiAgentForm').reset();
}

document.getElementById('aiAgentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const agentName = document.getElementById('agentName').value;
    const healthGoals = Array.from(document.getElementById('healthGoals').selectedOptions).map(opt => opt.value);
    const culturalPrefs = Array.from(document.getElementById('culturalPrefs').selectedOptions).map(opt => opt.value);
    const dietaryNeeds = document.getElementById('dietaryNeeds').value;

    // Mock AI response generation
    const mockResponse = generateMockAIResponse(agentName, healthGoals, culturalPrefs, dietaryNeeds);

    document.getElementById('agentOutput').innerHTML = mockResponse;
    document.getElementById('aiAgentForm').style.display = 'none';
    document.getElementById('agentResponse').style.display = 'block';
});

// Mock AI response generator (simulates AI-powered personalization)
function generateMockAIResponse(name, goals, prefs, needs) {
    return `
        <p><strong>${name}</strong> has been created successfully!</p>
        <p>Your agent will focus on ${goals.join(', ')} while incorporating ${prefs.join(', ')} flavors. It accounts for: ${needs}.</p>
        <p>Example Advice: For heart health with Mediterranean preferences, try grilled fish with olive oil and veggies – low sodium, high in omega-3s. Adjusts shopping lists to use pantry items and reduce waste.</p>
        <p>Access your agent in the Profile tab for daily tips and plans.</p>
    `;
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Basic focus management for modals
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target.id);
            }
        });
    });
});