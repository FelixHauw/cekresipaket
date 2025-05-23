// DOM Elements
const trackingForm = document.getElementById('trackingForm');
const trackingNumber = document.getElementById('trackingNumber');
const courier = document.getElementById('courier');
const loading = document.getElementById('loading');
const trackingResult = document.getElementById('trackingResult');
const errorMessage = document.getElementById('errorMessage');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

// API Configuration
const API_CONFIG = {
    // Using a free tracking API service
    binderbyte: {
        url: 'https://api.binderbyte.com/v1/track',
        key: 'abb21f25eb9ae2960ba6232074f63916d0879431b3c82b938ecc9b360ee030c6'
    },
    // Fallback with mock data for demo
    mock: false // Changed to false to use real API
};

// Courier mapping sesuai dengan kode BinderByte API
const COURIER_MAPPING = {
    'jne': { name: 'JNE Express', code: 'jne' },
    'jnt': { name: 'J&T Express', code: 'jnt' },
    'tiki': { name: 'TIKI', code: 'tiki' },
    'sicepat': { name: 'SiCepat', code: 'sicepat' },
    'pos': { name: 'POS Indonesia', code: 'pos' },
    'anteraja': { name: 'AnterAja', code: 'anteraja' },
    'ninja': { name: 'Ninja Express', code: 'ninja' },
    'wahana': { name: 'Wahana', code: 'wahana' },
    'spx': { name: 'Shopee Express', code: 'spx' }
};

// Mock tracking data for demo purposes
const MOCK_TRACKING_DATA = {
    success: true,
    data: {
        summary: {
            awb: '',
            courier: '',
            service: 'REG',
            status: 'DELIVERED',
            date: '2025-05-23',
            description: 'Paket telah diterima',
            amount: '',
            weight: '1 kg'
        },
        detail: {
            origin: 'Jakarta Pusat',
            destination: 'Bandung',
            shipper: 'Toko Online ABC',
            receiver: 'John Doe'
        },
        history: [
            {
                date: '2025-05-23 14:30:00',
                desc: 'Paket telah diterima oleh penerima',
                location: 'Bandung'
            },
            {
                date: '2025-05-23 09:15:00',
                desc: 'Paket sedang dalam perjalanan untuk pengiriman',
                location: 'Bandung'
            },
            {
                date: '2025-05-22 16:45:00',
                desc: 'Paket tiba di sorting center',
                location: 'Bandung Sorting Center'
            },
            {
                date: '2025-05-22 08:20:00',
                desc: 'Paket dalam perjalanan menuju kota tujuan',
                location: 'Jakarta'
            },
            {
                date: '2025-05-21 17:30:00',
                desc: 'Paket telah di pickup',
                location: 'Jakarta Pusat'
            },
            {
                date: '2025-05-21 15:00:00',
                desc: 'Paket telah dibuat',
                location: 'Jakarta Pusat'
            }
        ]
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

trackingForm.addEventListener('submit', handleTrackingSubmit);
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
    });
});

// Initialize App
function initializeApp() {
    console.log('TrackMyPackage initialized');
    
    // Add some interactive effects
    addScrollEffects();
    addTypingEffect();
}

// Handle form submission
async function handleTrackingSubmit(e) {
    e.preventDefault();
    
    const resi = trackingNumber.value.trim();
    const courierCode = courier.value;
    
    if (!resi || !courierCode) {
        showError('Harap isi nomor resi dan pilih kurir');
        return;
    }
      // Show loading
    hideAllResults();
    loading.style.display = 'block';
    
    try {
        const trackingData = await getTrackingData(resi, courierCode);
        
        if (trackingData.success) {
            displayTrackingResult(trackingData.data, resi, courierCode);
        } else {
            showError(trackingData.message || 'Paket tidak ditemukan atau terjadi kesalahan');
        }
        
    } catch (error) {
        console.error('Tracking error:', error);
        showError('Terjadi kesalahan saat melacak paket');
    } finally {
        loading.style.display = 'none';
    }
}

// Get tracking data from BinderByte API
async function getTrackingData(resi, courierCode) {
    // Use mock data for demo if enabled
    if (API_CONFIG.mock) {
        const mockData = { ...MOCK_TRACKING_DATA };
        mockData.data.summary.awb = resi;
        mockData.data.summary.courier = COURIER_MAPPING[courierCode].name;
        return mockData;
    }
    
    // Real API call to BinderByte
    try {
        const url = `${API_CONFIG.binderbyte.url}?api_key=${API_CONFIG.binderbyte.key}&courier=${courierCode}&awb=${resi}`;
        console.log('Calling API:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Check if API returned success
        if (data.status === 200 && data.data) {
            return {
                success: true,
                data: {
                    summary: {
                        awb: resi,
                        courier: COURIER_MAPPING[courierCode].name,
                        service: data.data.summary?.service || '-',
                        status: data.data.summary?.status || 'UNKNOWN',
                        date: data.data.summary?.date || '',
                        description: data.data.summary?.desc || '',
                        weight: data.data.summary?.weight || '-'
                    },
                    detail: {
                        origin: data.data.detail?.origin || '-',
                        destination: data.data.detail?.destination || '-',
                        shipper: data.data.detail?.shipper || '-',
                        receiver: data.data.detail?.receiver || '-'
                    },
                    history: data.data.history || []
                }
            };
        } else {
            return {
                success: false,
                message: data.message || 'Data tidak ditemukan'
            };
        }
        
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(`Gagal mengakses API: ${error.message}`);
    }
}

// Display tracking result
function displayTrackingResult(data, resi, courierCode) {
    hideAllResults();
    
    // Update result header
    document.getElementById('resultResi').textContent = resi;
    document.getElementById('resultCourier').textContent = COURIER_MAPPING[courierCode].name;
    
    // Update status badge
    const statusBadge = document.getElementById('statusBadge');
    const statusText = document.getElementById('statusText');
    
    statusText.textContent = getStatusText(data.summary.status);
    updateStatusBadgeColor(statusBadge, data.summary.status);
    
    // Update delivery info
    document.getElementById('senderInfo').textContent = data.detail.shipper || '-';
    document.getElementById('receiverInfo').textContent = data.detail.receiver || '-';
    document.getElementById('estimatedDelivery').textContent = formatDate(data.summary.date) || '-';
    
    // Create timeline
    createTrackingTimeline(data.history);
    
    // Show result
    trackingResult.style.display = 'block';
    
    // Scroll to result
    trackingResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Create tracking timeline
function createTrackingTimeline(history) {
    const timeline = document.getElementById('trackingTimeline');
    timeline.innerHTML = '';
    
    history.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-icon">
                <i class="fas ${getTimelineIcon(index, history.length)}"></i>
            </div>
            <div class="timeline-content">
                <div class="timeline-date">${formatDateTime(item.date)}</div>
                <div class="timeline-status">${item.desc}</div>
                <div class="timeline-location">${item.location}</div>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Get timeline icon based on position
function getTimelineIcon(index, total) {
    if (index === 0) return 'fa-flag-checkered'; // Last/Current status
    if (index === total - 1) return 'fa-play'; // First status
    return 'fa-circle';
}

// Get status text in Indonesian
function getStatusText(status) {
    const statusMap = {
        'DELIVERED': 'Terkirim',
        'ON_DELIVERY': 'Dalam Pengiriman',
        'IN_TRANSIT': 'Dalam Perjalanan',
        'PICKED_UP': 'Sudah Diambil',
        'CREATED': 'Paket Dibuat'
    };
    
    return statusMap[status] || status;
}

// Update status badge color
function updateStatusBadgeColor(badge, status) {
    // Remove existing status classes
    badge.className = 'status-indicator';
    
    const statusIcon = badge.querySelector('.status-icon');
    const deliveryState = document.getElementById('deliveryState');
    
    switch (status) {
        case 'DELIVERED':
            badge.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            statusIcon.className = 'status-icon fas fa-check-circle';
            deliveryState.textContent = 'Sudah Selesai';
            deliveryState.style.backgroundColor = 'rgba(16, 185, 129, 0.25)';
            break;
        case 'ON_DELIVERY':
            badge.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
            statusIcon.className = 'status-icon fas fa-truck';
            deliveryState.textContent = 'Masih Proses';
            deliveryState.style.backgroundColor = 'rgba(59, 130, 246, 0.25)';
            break;
        case 'IN_TRANSIT':
            badge.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
            statusIcon.className = 'status-icon fas fa-route';
            deliveryState.textContent = 'Masih Proses';
            deliveryState.style.backgroundColor = 'rgba(245, 158, 11, 0.25)';
            break;
        case 'PICKED_UP':
            badge.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)';
            statusIcon.className = 'status-icon fas fa-dolly';
            deliveryState.textContent = 'Masih Proses';
            deliveryState.style.backgroundColor = 'rgba(139, 92, 246, 0.25)';
            break;
        case 'CREATED':
            badge.style.background = 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)';
            statusIcon.className = 'status-icon fas fa-box';
            deliveryState.textContent = 'Masih Proses';
            deliveryState.style.backgroundColor = 'rgba(236, 72, 153, 0.25)';
            break;
        default:
            badge.style.background = 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
            statusIcon.className = 'status-icon fas fa-question-circle';
            deliveryState.textContent = 'Tidak Diketahui';
            deliveryState.style.backgroundColor = 'rgba(107, 114, 128, 0.25)';
    }
    
    // Add animation for status change
    badge.classList.add('status-updated');
    setTimeout(() => {
        badge.classList.remove('status-updated');
    }, 1000);
}

// Format date
function formatDate(dateStr) {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format date and time
function formatDateTime(dateStr) {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    return date.toLocaleString('id-ID', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Show error message
function showError(message) {
    hideAllResults();
    errorMessage.querySelector('p').textContent = message;
    errorMessage.style.display = 'block';
}

// Hide all result sections
function hideAllResults() {
    loading.style.display = 'none';
    trackingResult.style.display = 'none';
    errorMessage.style.display = 'none';
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

// Add scroll effects
function addScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    });
}

// Add typing effect to hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-text h1');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = function() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Add notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .nav-menu.active .nav-link {
            padding: 0.5rem 0;
        }
    }
`;
document.head.appendChild(style);

// Add some demo functionality
function addDemoFeatures() {
    const formContainer = document.querySelector('.tracking-form-container');
    
    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        flex-wrap: wrap;
    `;
    
    // Add sample tracking numbers for quick testing
    const sampleButton = document.createElement('button');
    sampleButton.innerHTML = '<i class="fas fa-magic"></i> Coba Sample';
    sampleButton.style.cssText = `
        background: #f59e0b;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        cursor: pointer;
    `;
    
    sampleButton.addEventListener('click', () => {
        trackingNumber.value = 'JP123456789ID';
        courier.value = 'jne';
        showNotification('Sample data diisi! Klik "Lacak Paket" untuk melihat demo.', 'info');
    });
    
    // Add mode toggle button
    const modeToggleButton = document.createElement('button');
    modeToggleButton.innerHTML = `<i class="fas fa-toggle-${API_CONFIG.mock ? 'off' : 'on'}"></i> Mode: ${API_CONFIG.mock ? 'Demo' : 'API Real'}`;
    modeToggleButton.style.cssText = `
        background: ${API_CONFIG.mock ? '#6b7280' : '#10b981'};
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        cursor: pointer;
    `;
    
    modeToggleButton.addEventListener('click', () => {
        API_CONFIG.mock = !API_CONFIG.mock;
        modeToggleButton.innerHTML = `<i class="fas fa-toggle-${API_CONFIG.mock ? 'off' : 'on'}"></i> Mode: ${API_CONFIG.mock ? 'Demo' : 'API Real'}`;
        modeToggleButton.style.background = API_CONFIG.mock ? '#6b7280' : '#10b981';
        
        const message = API_CONFIG.mock ? 
            'Mode Demo aktif - menggunakan data simulasi' : 
            'Mode API Real aktif - menggunakan data dari server';
        showNotification(message, 'info');
    });
    
    // Add API status indicator
    const apiStatusDiv = document.createElement('div');
    apiStatusDiv.style.cssText = `
        font-size: 0.8rem;
        color: #666;
        margin-top: 0.5rem;
        padding: 0.5rem;
        background: #f8fafc;
        border-radius: 5px;
        border-left: 3px solid ${API_CONFIG.mock ? '#f59e0b' : '#10b981'};
    `;
    apiStatusDiv.innerHTML = `
        <i class="fas fa-info-circle"></i> 
        ${API_CONFIG.mock ? 
            'Sedang menggunakan data demo untuk testing' : 
            'Tersambung dengan BinderByte API untuk data real-time'
        }
    `;
    
    buttonContainer.appendChild(sampleButton);
    buttonContainer.appendChild(modeToggleButton);
    formContainer.appendChild(buttonContainer);
    formContainer.appendChild(apiStatusDiv);
}

// Initialize demo features
document.addEventListener('DOMContentLoaded', function() {
    addDemoFeatures();
});

// Export functions for potential future use
window.TrackMyPackage = {
    track: handleTrackingSubmit,
    showNotification: showNotification,
    hideAllResults: hideAllResults
};
