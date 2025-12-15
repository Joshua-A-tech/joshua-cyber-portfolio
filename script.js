// Complete Portfolio JavaScript with FormSubmit Integration
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger to X icon
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking navigation links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===== 2. SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== 3. VIDEO OVERLAY HANDLING =====
    const videoOverlay = document.getElementById('videoOverlay');
    const playButton = document.getElementById('playButton');
    
    if (videoOverlay && playButton) {
        playButton.addEventListener('click', () => {
            videoOverlay.style.display = 'none';
        });
    }
    
    // ===== 4. TRANSCRIPT TOGGLE =====
    const showTranscriptBtn = document.getElementById('showTranscript');
    const fullTranscript = document.getElementById('fullTranscript');
    
    if (showTranscriptBtn && fullTranscript) {
        showTranscriptBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (fullTranscript.style.display === 'none' || fullTranscript.style.display === '') {
                fullTranscript.style.display = 'block';
                showTranscriptBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
                showTranscriptBtn.classList.add('active');
            } else {
                fullTranscript.style.display = 'none';
                showTranscriptBtn.innerHTML = 'Read Full Transcript <i class="fas fa-chevron-down"></i>';
                showTranscriptBtn.classList.remove('active');
            }
        });
    }
    
    // ===== 5. TESTIMONIAL SLIDER =====
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    if (testimonials.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
            currentIndex = index;
        }
        
        // Initialize - show first testimonial
        showTestimonial(0);
        
        // Previous button
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = testimonials.length - 1;
            showTestimonial(newIndex);
        });
        
        // Next button
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        });
        
        // Auto-rotate every 5 seconds
        setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 5000);
    }
    
    // ===== 6. FORM SUBMIT HANDLING (FormSubmit.co) =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('#btnText');
            
            // Validation
            if (!name || !email || !subject || !message) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            if (btnText) {
                const originalText = btnText.textContent;
                btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Disable submit button
                submitBtn.disabled = true;
                
                try {
                    // Submit to FormSubmit.co using AJAX
                    const response = await fetch('https://formsubmit.co/ajax/muorongolejoshua@gmail.com', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            subject: subject,
                            message: message,
                            _honey: "", // Honeypot
                            _captcha: "false",
                            _template: "table",
                            _subject: `Portfolio Contact: ${subject}`,
                            _next: "https://joshua-a-tech.github.io/joshua-cyber-portfolio/thank-you.html"
                        })
                    });
                    
                    const data = await response.json();
                    
                    if (data.success === "true" || data.success === true) {
                        showAlert('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Redirect to thank you page after 2 seconds
                        setTimeout(() => {
                            window.location.href = "thank-you.html";
                        }, 2000);
                        
                    } else {
                        showAlert('❌ Failed to send message. Please try again.', 'error');
                    }
                    
                } catch (error) {
                    console.error('Error:', error);
                    showAlert('❌ Network error. Please check your connection and try again.', 'error');
                    
                    // Fallback: Submit the form normally after 3 seconds
                    setTimeout(() => {
                        contactForm.submit();
                    }, 3000);
                } finally {
                    // Reset button
                    if (btnText) {
                        btnText.innerHTML = originalText;
                    }
                    submitBtn.disabled = false;
                }
            }
        });
    }
    
    // ===== 7. RESUME DOWNLOAD TRACKING =====
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Track download
            console.log('Resume downloaded');
            
            // Show confirmation
            setTimeout(() => {
                showAlert('Resume downloaded successfully!', 'success');
                setTimeout(() => {
                    const alerts = document.querySelectorAll('.form-message');
                    alerts.forEach(alert => alert.remove());
                }, 3000);
            }, 500);
        });
    }
    
    // ===== HELPER FUNCTIONS =====
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlerts = document.querySelectorAll('.form-message');
        existingAlerts.forEach(alert => alert.remove());
        
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `form-message ${type}`;
        alertDiv.textContent = message;
        alertDiv.style.cssText = `
            margin: 15px 0;
            padding: 15px;
            border-radius: 5px;
            display: block;
            animation: fadeIn 0.3s ease-in;
        `;
        
        // Style based on type
        if (type === 'success') {
            alertDiv.style.backgroundColor = 'rgba(72, 187, 120, 0.1)';
            alertDiv.style.border = '1px solid #48bb78';
            alertDiv.style.color = '#48bb78';
        } else {
            alertDiv.style.backgroundColor = 'rgba(245, 101, 101, 0.1)';
            alertDiv.style.border = '1px solid #f56565';
            alertDiv.style.color = '#f56565';
        }
        
        // Insert alert
        const form = document.querySelector('.contact-form');
        if (form) {
            // Insert before the form
            form.parentNode.insertBefore(alertDiv, form);
            
            // Scroll to alert
            setTimeout(() => {
                alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            
            // Auto remove after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    alertDiv.style.opacity = '0';
                    alertDiv.style.transition = 'opacity 0.5s';
                    setTimeout(() => alertDiv.remove(), 500);
                }, 5000);
            }
        }
    }
    
    // ===== 8. ACTIVE NAVIGATION HIGHLIGHTING =====
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // ===== INITIALIZE =====
    highlightActiveNavLink();
    
    // Add CSS for active navigation links
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            color: var(--accent) !important;
        }
        nav a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--accent);
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            nav ul {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: var(--primary);
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                z-index: 1000;
            }
            
            nav ul.active {
                display: flex;
            }
            
            nav ul li {
                margin: 15px 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Console log for debugging
    console.log('✅ Portfolio JavaScript loaded successfully!');
});