// Smooth scrolling for ALL navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Skip if href is "#" (home)
        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Product hover animations
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('hovered');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('hovered');
    });
});

// Product modal functionality
const productModal = document.createElement('div');
productModal.className = 'product-modal';
productModal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-body">
            <div class="modal-image">
                <img src="" alt="">
            </div>
            <div class="modal-info">
                <h3 class="modal-title"></h3>
                <p class="modal-description"></p>
                <div class="modal-price"></div>
                <div class="modal-rating"></div>
                <button class="btn btn-primary add-to-cart-modal">Add to Cart</button>
            </div>
        </div>
    </div>
`;
document.body.appendChild(productModal);

// Open product modal on product card click
productCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Jangan buka modal jika mengklik tombol Add to Cart
        if (!e.target.classList.contains('add-to-cart') && 
            !e.target.closest('.add-to-cart')) {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('.product-title').textContent;
            const description = this.querySelector('.product-desc').textContent;
            const price = this.querySelector('.product-price').textContent;
            const rating = this.querySelector('.rating').innerHTML;
            
            productModal.querySelector('.modal-image img').src = imgSrc;
            productModal.querySelector('.modal-title').textContent = title;
            productModal.querySelector('.modal-description').textContent = description;
            productModal.querySelector('.modal-price').textContent = price;
            productModal.querySelector('.modal-rating').innerHTML = rating;
            
            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close product modal
productModal.querySelector('.close-modal').addEventListener('click', () => {
    productModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Sign In Modal
const signinModal = document.getElementById('signin-modal');
const signinBtn = document.querySelector('.sign-in-btn');
const closeSigninModal = document.querySelector('#signin-modal .close-modal');

if (signinBtn) {
    signinBtn.addEventListener('click', function(e) {
        e.preventDefault();
        signinModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeSigninModal) {
    closeSigninModal.addEventListener('click', () => {
        signinModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

signinModal.addEventListener('click', (e) => {
    if (e.target === signinModal) {
        signinModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Animated counter
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Trigger counter when in viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Testimonial Carousel
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + testimonialSlides.length) % testimonialSlides.length;
    testimonialSlides[currentSlide].classList.add('active');
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
}

// Auto-rotate slides every 5 seconds
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Cart functionality
let cart = JSON.parse(localStorage.getItem('brewHavenCart')) || [];

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = total;
    }
}

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id == product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('brewHavenCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--coffee-gold);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();
    
    // Add to cart buttons in product cards
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector('.product-title').textContent,
                price: parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '')),
                image: productCard.querySelector('img').src
            };
            addToCart(product);
        });
    });
    
    // Add to cart button in modal
    productModal.querySelector('.add-to-cart-modal').addEventListener('click', function(e) {
        e.stopPropagation();
        const modalInfo = this.closest('.modal-info');
        const product = {
            id: Date.now(),
            name: modalInfo.querySelector('.modal-title').textContent,
            price: parseFloat(modalInfo.querySelector('.modal-price').textContent.replace('$', '')),
            image: modalInfo.querySelector('img').src
        };
        addToCart(product);
    });
    
    // Cart icon click event - show cart modal or notification
    document.querySelector('.cart-icon').addEventListener('click', function(e) {
        e.preventDefault();
        if (cart.length === 0) {
            showNotification('Your cart is empty');
        } else {
            showNotification(`Cart has ${cart.reduce((sum, item) => sum + item.quantity, 0)} items. Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
        }
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Sign in form submission
    const signinForm = document.querySelector('.signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Sign in successful!');
            signinModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            this.reset();
        });
    }
});