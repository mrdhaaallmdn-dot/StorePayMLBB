// Data paket diamond
const packages = [
    { id: 1, diamonds: 35, price: 15000, originalPrice: 20000, popular: false },
    { id: 2, diamonds: 72, price: 28000, originalPrice: 35000, popular: false },
    { id: 3, diamonds: 150, price: 55000, originalPrice: 70000, popular: true },
    { id: 4, diamonds: 257, price: 90000, originalPrice: 120000, popular: false },
    { id: 5, diamonds: 526, price: 175000, originalPrice: 230000, popular: false },
    { id: 6, diamonds: 1060, price: 340000, originalPrice: 450000, popular: false }
];

let selectedPackage = null;
let selectedPayment = null;

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    renderPackages();
    updateBalance();
});

// Render packages
function renderPackages() {
    const packageGrid = document.getElementById('packageGrid');
    packageGrid.innerHTML = packages.map(pkg => `
        <div class="package-card ${pkg.popular ? 'popular' : ''}" onclick="selectPackage(${pkg.id})">
            <div class="diamond-amount">${pkg.diamonds}</div>
            <div class="price">
                Rp ${pkg.price.toLocaleString()}
                ${pkg.originalPrice ? `<span class="original-price">Rp ${pkg.originalPrice.toLocaleString()}</span>` : ''}
            </div>
            <div style="font-weight: 600; color: #666;">${pkg.diamonds} Diamonds</div>
        </div>
    `).join('');
}

// Select package
function selectPackage(packageId) {
    selectedPackage = packages.find(pkg => pkg.id === packageId);
    
    // Update UI
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[onclick="selectPackage(${packageId})"]`).classList.add('selected');
    
    // Show next section
    document.getElementById('paymentSection').style.display = 'block';
    document.getElementById('orderSummary').style.display = 'block';
    
    updateOrderSummary();
}

// Update order summary
function updateOrderSummary() {
    if (selectedPackage) {
        document.getElementById('selectedPackage').textContent = `${selectedPackage.diamonds} Diamonds`;
        document.getElementById('totalPrice').textContent = `Rp ${selectedPackage.price.toLocaleString()}`;
    }
}

// Payment method selection
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function() {
        selectedPayment = this.dataset.method;
        
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// Buy button
document.getElementById('buyBtn').addEventListener('click', function() {
    const userId = document.getElementById('userId').value;
    
    if (!selectedPackage) {
        alert('Pilih paket diamond terlebih dahulu!');
        return;
    }
    
    if (!userId) {
        alert('Masukkan ID Akun ML Anda!');
        return;
    }
    
    if (!selectedPayment) {
        alert('Pilih metode pembayaran!');
        return;
    }
    
    // Simulate purchase
    showSuccessModal();
    updateBalance();
});

// Show success modal
function showSuccessModal() {
    document.getElementById('successModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('successModal').style.display = 'none';
    // Reset form
    selectedPackage = null;
    selectedPayment = null;
    document.getElementById('userId').value = '';
    document.querySelectorAll('.package-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('orderSummary').style.display = 'none';
}

// Simulate balance
function updateBalance() {
    const balance = Math.floor(Math.random() * 500000) + 100000;
    document.getElementById('balance').textContent = `Saldo: Rp ${balance.toLocaleString()}`;
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
      }
