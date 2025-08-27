// Main JavaScript file for the e-commerce website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeRTLToggle();
    initializeDashboardTabs();
    initializeProductFilters();
    initializeAnimations();
    initializeFormValidation();
    initializeCartFunctionality();
    initializeSearchFunctionality();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// RTL (Right-to-Left) toggle functionality
function initializeRTLToggle() {
    const rtlToggle = document.getElementById('rtlToggle');
    const html = document.documentElement;
    
    if (rtlToggle) {
        // Check for saved RTL preference
        const isRTL = localStorage.getItem('rtl') === 'true';
        if (isRTL) {
            html.setAttribute('dir', 'rtl');
            updateRTLStyles(true);
        }
        
        rtlToggle.addEventListener('click', function() {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            
            html.setAttribute('dir', newDir);
            localStorage.setItem('rtl', newDir === 'rtl');
            updateRTLStyles(newDir === 'rtl');
            
            // Add visual feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Update styles for RTL mode
function updateRTLStyles(isRTL) {
    const flexElements = document.querySelectorAll('.flex');
    const spaceElements = document.querySelectorAll('[class*="space-x-"]');
    
    if (isRTL) {
        flexElements.forEach(el => {
            if (!el.classList.contains('flex-col')) {
                el.style.flexDirection = 'row-reverse';
            }
        });
        
        spaceElements.forEach(el => {
            const classes = el.className.split(' ');
            classes.forEach(cls => {
                if (cls.startsWith('space-x-')) {
                    el.style.direction = 'rtl';
                }
            });
        });
    } else {
        flexElements.forEach(el => {
            el.style.flexDirection = '';
        });
        
        spaceElements.forEach(el => {
            el.style.direction = '';
        });
    }
}

// Dashboard tabs functionality
function initializeDashboardTabs() {
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    const dashboardContents = document.querySelectorAll('.dashboard-content');
    
    if (dashboardTabs.length > 0) {
        dashboardTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all tabs
                dashboardTabs.forEach(t => {
                    t.classList.remove('active');
                    const svg = t.querySelector('svg');
                    if (svg) {
                        svg.classList.remove('text-primary');
                        svg.classList.add('text-gray-400');
                    }
                    const span = t.querySelector('span');
                    if (span) {
                        span.classList.remove('text-primary');
                        span.classList.add('text-gray-600');
                    }
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                const activeSvg = this.querySelector('svg');
                if (activeSvg) {
                    activeSvg.classList.remove('text-gray-400');
                    activeSvg.classList.add('text-primary');
                }
                const activeSpan = this.querySelector('span');
                if (activeSpan) {
                    activeSpan.classList.remove('text-gray-600');
                    activeSpan.classList.add('text-primary');
                }
                
                // Hide all content
                dashboardContents.forEach(content => {
                    content.classList.add('hidden');
                });
                
                // Show target content
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                }
            });
        });
    }
}

// Product filters functionality
function initializeProductFilters() {
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const productsGrid = document.getElementById('productsGrid');
    
    if (gridViewBtn && listViewBtn && productsGrid) {
        gridViewBtn.addEventListener('click', function() {
            // Update button states
            gridViewBtn.classList.add('bg-primary', 'text-white');
            gridViewBtn.classList.remove('text-gray-400', 'hover:bg-gray-100');
            listViewBtn.classList.remove('bg-primary', 'text-white');
            listViewBtn.classList.add('text-gray-400', 'hover:bg-gray-100');
            
            // Update grid layout
            productsGrid.className = 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8';
        });
        
        listViewBtn.addEventListener('click', function() {
            // Update button states
            listViewBtn.classList.add('bg-primary', 'text-white');
            listViewBtn.classList.remove('text-gray-400', 'hover:bg-gray-100');
            gridViewBtn.classList.remove('bg-primary', 'text-white');
            gridViewBtn.classList.add('text-gray-400', 'hover:bg-gray-100');
            
            // Update grid layout
            productsGrid.className = 'grid grid-cols-1 gap-4';
        });
    }
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.product-card, .card-shadow');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                } else {
                    clearFieldError(field);
                }
                
                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        showFieldError(field, 'Please enter a valid email address');
                    }
                }
                
                // Phone validation
                if (field.type === 'tel' && field.value.trim()) {
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
                        isValid = false;
                        showFieldError(field, 'Please enter a valid phone number');
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('border-red-500');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1 field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('border-red-500');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Validate individual field
function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

// Cart functionality
function initializeCartFunctionality() {
    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('button:contains("Add to Cart")');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.classList.add('bg-green-600');
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('bg-green-600');
            }, 1500);
            
            // Update cart count
            updateCartCount();
        });
    });
    
    // Quantity controls
    const quantityControls = document.querySelectorAll('.quantity-control');
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.quantity-minus');
        const plusBtn = control.querySelector('.quantity-plus');
        const input = control.querySelector('.quantity-input');
        
        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', function() {
                const currentValue = parseInt(input.value) || 1;
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    updateCartTotal();
                }
            });
            
            plusBtn.addEventListener('click', function() {
                const currentValue = parseInt(input.value) || 1;
                input.value = currentValue + 1;
                updateCartTotal();
            });
            
            input.addEventListener('change', function() {
                const value = parseInt(this.value) || 1;
                this.value = Math.max(1, value);
                updateCartTotal();
            });
        }
    });
}

// Update cart count
function updateCartCount() {
    const cartBadges = document.querySelectorAll('.cart-count');
    cartBadges.forEach(badge => {
        const currentCount = parseInt(badge.textContent) || 0;
        badge.textContent = currentCount + 1;
    });
}

// Update cart total
function updateCartTotal() {
    // This would typically calculate based on actual cart data
    // For demo purposes, we'll just trigger a visual update
    const totalElements = document.querySelectorAll('.cart-total');
    totalElements.forEach(element => {
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });
}

// Search functionality
function initializeSearchFunctionality() {
    const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="search" i]');
    
    searchInputs.forEach(input => {
        let searchTimeout;
        
        input.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            }
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value.trim());
            }
        });
    });
}

// Perform search
function performSearch(query) {
    console.log('Searching for:', query);
    
    // Add visual feedback
    const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="search" i]');
    searchInputs.forEach(input => {
        input.style.borderColor = '#3B82F6';
        setTimeout(() => {
            input.style.borderColor = '';
        }, 1000);
    });
    
    // In a real application, this would make an API call
    // For demo purposes, we'll just show a loading state
    showSearchResults(query);
}

// Show search results
function showSearchResults(query) {
    // This would typically display actual search results
    // For demo purposes, we'll just log the search
    console.log(`Search results for: ${query}`);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Loading state management
function showLoading(element) {
    if (element) {
        element.innerHTML = '<div class="loading-spinner mx-auto"></div>';
    }
}

function hideLoading(element, originalContent) {
    if (element) {
        element.innerHTML = originalContent;
    }
}

// Toast notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transform translate-x-full transition-transform duration-300`;
    
    switch (type) {
        case 'success':
            toast.classList.add('bg-green-600');
            break;
        case 'error':
            toast.classList.add('bg-red-600');
            break;
        case 'warning':
            toast.classList.add('bg-yellow-600');
            break;
        default:
            toast.classList.add('bg-blue-600');
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Local storage helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    // In production, you might want to send this to an error tracking service
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}