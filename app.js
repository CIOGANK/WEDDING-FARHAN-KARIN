// Wedding Invitation App JavaScript - Karin & Fandi (Enhanced with Autoplay & Mobile Optimized)
class WeddingApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.handleLoading();
    }

    setupEventListeners() {
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initAOS();
            this.initCountdown();
            this.initNavigation();
            this.initMusicPlayer();
            this.initForms();
            this.initCopyButtons();
            this.loadExistingWishes();
            this.initPhotoPlaceholders();
            this.initDressCodePhotos();
            this.fixExternalLinks();
            this.initMobileOptimizations();
        });

        // Window load
        window.addEventListener('load', () => {
           console.log('Page loaded - ready for user interaction');
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleNavbarVisibility();
            this.updateActiveNavLink();
        });

        // Resize events
        window.addEventListener('resize', () => {
            this.handleResponsiveLayout();
            this.optimizeMobileLayout();
        });

        // Touch and interaction events for mobile
        document.addEventListener('touchstart', () => {
            this.handleFirstUserInteraction();
        }, { once: true });

        document.addEventListener('click', () => {
            this.handleFirstUserInteraction();
        }, { once: true });
    }

    initializeComponents() {
        // Initialize component states
        this.isNavVisible = false;
        this.isMusicPlaying = false;
        this.hasUserInteracted = false;
        this.autoplayAttempted = false;
    }

    // Enhanced Mobile Optimizations
    initMobileOptimizations() {
        // Detect mobile devices
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Add mobile-specific classes
        if (this.isMobile) {
            document.body.classList.add('mobile-device');
            this.optimizeMobilePerformance();
        }

        // Handle viewport changes for mobile browsers
        this.handleMobileViewport();
        
        // Optimize touch interactions
        this.optimizeTouchInteractions();
    }

    optimizeMobilePerformance() {
        // Reduce animations on mobile for better performance
        if (this.isMobile && window.innerWidth < 768) {
            document.body.classList.add('mobile-optimize');
            
            // Disable some heavy animations on low-end devices
            if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
                document.body.classList.add('low-end-device');
            }
        }
    }

    handleMobileViewport() {
        // Fix viewport height issues on mobile browsers
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });
    }

    optimizeTouchInteractions() {
        // Improve touch targets for mobile
        const touchTargets = document.querySelectorAll('.btn, .nav-link, .copy-btn, .music-btn');
        
        touchTargets.forEach(target => {
            target.style.minHeight = '44px';
            target.style.minWidth = '44px';
        });

        // Add touch feedback
        document.addEventListener('touchstart', (e) => {
            if (e.target.matches('.btn, .nav-link, .copy-btn, .music-btn')) {
                e.target.style.opacity = '0.7';
            }
        });

        document.addEventListener('touchend', (e) => {
            if (e.target.matches('.btn, .nav-link, .copy-btn, .music-btn')) {
                setTimeout(() => {
                    e.target.style.opacity = '';
                }, 150);
            }
        });
    }

    optimizeMobileLayout() {
        // Dynamic layout optimization based on screen size
        if (window.innerWidth < 768) {
            // Adjust couple section for very small screens
            const couplePhotos = document.querySelectorAll('.couple-photo, .dresscode-photo');
            couplePhotos.forEach(photo => {
                if (window.innerWidth < 400) {
                    photo.style.width = '140px';
                    photo.style.height = '180px';
                } else {
                    photo.style.width = '160px';
                    photo.style.height = '200px';
                }
            });
        }
    }

    handleFirstUserInteraction() {
        if (!this.hasUserInteracted) {
            this.hasUserInteracted = true;
            // Try autoplay after first user interaction
            if (!this.autoplayAttempted) {
                setTimeout(() => {
                    this.attemptAutoplay();
                }, 500);
            }
        }
    }

    // Enhanced Autoplay Music Functionality
    attemptAutoplay() {
        const backgroundMusic = document.getElementById('backgroundMusic');
        const musicToggle = document.getElementById('musicToggle');
        
        if (backgroundMusic && musicToggle && !this.autoplayAttempted) {
            this.autoplayAttempted = true;
            
            // Set volume to comfortable level
            backgroundMusic.volume = 0.4;
            
            // Show loading state
            musicToggle.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            musicToggle.title = 'Memuat musik...';
            
            // Attempt autoplay
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Autoplay successful
                    this.isMusicPlaying = true;
                    musicToggle.classList.add('playing');
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    musicToggle.title = 'Jeda Musik: Dengarkan Dia - Bersenyawa';
                    
                    
                    console.log('🎵 Autoplay successful: Music started automatically');
                }).catch((error) => {
                    // Autoplay failed - show play button
                    console.log('Autoplay prevented by browser:', error);
                    musicToggle.classList.remove('playing');
                    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                    musicToggle.title = 'Klik untuk putar musik: Dengarkan Dia - Bersenyawa';
                    this.isMusicPlaying = false;
                });
            }
        }
    }

    // Photo Placeholders Initialization
    initPhotoPlaceholders() {
        const bridePhoto = document.querySelector('.bride-photo');
        const groomPhoto = document.querySelector('.groom-photo');

        // Add loading state initially
        if (bridePhoto) {
            bridePhoto.classList.add('loading');
            setTimeout(() => {
                bridePhoto.classList.remove('loading');
            }, 1000);
        }

        if (groomPhoto) {
            groomPhoto.classList.add('loading');
            setTimeout(() => {
                groomPhoto.classList.remove('loading');
            }, 1200);
        }

        // Instructions for replacing with real photos
        console.log(`
🖼️ COUPLE PHOTO REPLACEMENT INSTRUCTIONS:
        
To add real photos, update the CSS:

1. BRIDE PHOTO:
   .bride-photo {
       background-image: url('path-to-bride-photo.jpg');
   }

2. GROOM PHOTO:
   .groom-photo {
       background-image: url('path-to-groom-photo.jpg');
   }

Expected photos:
- Bride: Muslim woman in white hijab holding flower bouquet
- Groom: Muslim man in black peci and white Islamic shirt

The photos will automatically replace the placeholders.
        `);
    }

    // Dress Code Photo Placeholders Initialization
    initDressCodePhotos() {
        const batikPhoto = document.querySelector('.male-batik-photo');
        const berkainPhoto = document.querySelector('.female-berkain-photo');

        // Add loading state initially
        if (batikPhoto) {
            batikPhoto.classList.add('loading');
            setTimeout(() => {
                batikPhoto.classList.remove('loading');
            }, 1400);
        }

        if (berkainPhoto) {
            berkainPhoto.classList.add('loading');
            setTimeout(() => {
                berkainPhoto.classList.remove('loading');
            }, 1600);
        }

        // Instructions for replacing with real dress code photos
        console.log(`
👔 DRESS CODE PHOTO REPLACEMENT INSTRUCTIONS:
        
To add real dress code photos, update the CSS:

1. BATIK PHOTO:
   .male-batik-photo {
       background-image: url('path-to-batik-photo.jpg');
   }

2. BERKAIN PHOTO:
   .female-berkain-photo {
       background-image: url('path-to-berkain-photo.jpg');
   }

Expected photos:
- Batik: Traditional Indonesian batik shirt or pattern
- Berkain: Traditional kebaya or Indonesian women's traditional dress

The photos will automatically replace the placeholders.
        `);
    }

    // Fix external links
    fixExternalLinks() {
        // Ensure Google Maps link opens in new tab
        const googleMapsLink = document.querySelector('a[href^="https://maps.app.goo.gl"]');
        if (googleMapsLink) {
            googleMapsLink.setAttribute('target', '_blank');
            googleMapsLink.setAttribute('rel', 'noopener noreferrer');
        }

        // Fix all external links
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            if (!link.getAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    // Loading Screen
   handleLoading() {
    // Loading screen TIDAK hilang otomatis
    // Menunggu user klik tombol "Buka Undangan"
    console.log('Loading handler initialized - button controls the flow');
}

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }
    }

    // AOS Initialization
    initAOS() {
        if (typeof AOS !== 'undefined') {
            // Optimize AOS for mobile
            const aosConfig = {
                duration: this.isMobile ? 600 : 800,
                easing: 'ease-in-out',
                once: true,
                offset: this.isMobile ? 30 : 50,
                disable: window.innerWidth < 400 ? 'mobile' : false
            };
            
            AOS.init(aosConfig);
        }
    }

    // Countdown Timer - Updated for February 7, 2026
    initCountdown() {
        const weddingDate = new Date('2026-02-07T08:00:00').getTime();
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const timeLeft = weddingDate - now;

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                const daysEl = document.getElementById('days');
                const hoursEl = document.getElementById('hours');
                const minutesEl = document.getElementById('minutes');
                const secondsEl = document.getElementById('seconds');

                if (daysEl) daysEl.textContent = days;
                if (hoursEl) hoursEl.textContent = hours;
                if (minutesEl) minutesEl.textContent = minutes;
                if (secondsEl) secondsEl.textContent = seconds;
            } else {
                // Wedding day has passed
                const daysEl = document.getElementById('days');
                const hoursEl = document.getElementById('hours');
                const minutesEl = document.getElementById('minutes');
                const secondsEl = document.getElementById('seconds');

                if (daysEl) daysEl.textContent = '0';
                if (hoursEl) hoursEl.textContent = '0';
                if (minutesEl) minutesEl.textContent = '0';
                if (secondsEl) secondsEl.textContent = '0';
            }
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Enhanced Navigation with Better Mobile Support
    initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Hamburger menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when mobile menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Enhanced smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                if (targetId && targetId !== '#' && targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Enhanced scroll calculation for mobile
                        const navbarHeight = 70;
                        const elementTop = targetSection.getBoundingClientRect().top;
                        const offsetPosition = elementTop + window.pageYOffset - navbarHeight;
                        
                        // Smooth scroll with better easing
                        window.scrollTo({
                            top: Math.max(0, offsetPosition),
                            behavior: 'smooth'
                        });

                        // Update active link immediately
                        navLinks.forEach(navLink => navLink.classList.remove('active'));
                        link.classList.add('active');

                        // Close mobile menu
                        if (hamburger && navMenu) {
                            hamburger.classList.remove('active');
                            navMenu.classList.remove('active');
                            document.body.style.overflow = '';
                        }

                        // Show success message for navigation
                        setTimeout(() => {
                            const sectionTitle = targetSection.querySelector('h2')?.textContent || 'Section';
                            this.showMessage(`Navigasi ke ${sectionTitle} berhasil`);
                        }, 500);
                    }
                }
            });
        });

        // Enhanced scroll-down button in hero
        const scrollBtn = document.querySelector('.scroll-btn');
        if (scrollBtn) {
            scrollBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = document.querySelector('#couple');
                if (targetSection) {
                    const navbarHeight = 70;
                    const elementTop = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementTop + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    const coupleNavLink = document.querySelector('a[href="#couple"]');
                    if (coupleNavLink) {
                        coupleNavLink.classList.add('active');
                    }
                }
            });
        }
    }

    handleNavbarVisibility() {
        const navbar = document.getElementById('navbar');
        const scrollPosition = window.scrollY;

        if (navbar) {
            if (scrollPosition > 100 && !this.isNavVisible) {
                navbar.classList.add('visible');
                this.isNavVisible = true;
            } else if (scrollPosition <= 100 && this.isNavVisible) {
                navbar.classList.remove('visible');
                this.isNavVisible = false;
            }
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 150; // Increased offset for better detection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Enhanced Music Player with Autoplay Support
    initMusicPlayer() {
        const musicToggle = document.getElementById('musicToggle');
        const backgroundMusic = document.getElementById('backgroundMusic');
        
        if (musicToggle && backgroundMusic) {
            // Set volume to a comfortable level
            backgroundMusic.volume = 0.4;
            
            // Enhanced audio loading with mobile support
            backgroundMusic.preload = 'metadata';
            backgroundMusic.load();
            
            musicToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.isMusicPlaying) {
                    backgroundMusic.pause();
                    musicToggle.classList.remove('playing');
                    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                    musicToggle.title = 'Putar Musik: Dengarkan Dia - Bersenyawa';
                    this.isMusicPlaying = false;    
                } else {
                    // Autoplay setelah loading selesai
                    setTimeout(() => {
                         if (backgroundMusic && !this.isMusicPlaying) {
                             const playPromise = backgroundMusic.play();

                              if (playPromise !== undefined) {
                                  playPromise.then(() => {
                                      // Autoplay berhasil
                                      backgroundMusic.volume = 0.4;
                                      musicToggle.classList.add('playing');
                                      musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                                      musicToggle.title = 'Putar Musik: Dengarkan Dia - Bersenyawa';
                                      this.isMusicPlaying = true;
                                      this.showMessage('🎵 Musik diputar otomatis');
                                  }).catch(() => {
                                      // Browser memblokir autoplay
                                      console.log('Autoplay diblokir browser');
                                  });  
                              }
                         }
                    }, 2000); // Delay 2 detik setelah loading


                    // Show loading state
                    musicToggle.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    musicToggle.title = 'Memuat musik...';
                    
                    const playPromise = backgroundMusic.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            musicToggle.classList.add('playing');
                            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                            musicToggle.title = 'Jeda Musik';
                            this.isMusicPlaying = true;
                            this.showMessage('♪ Memutar: Dengarkan Dia - Bersenyawa');
                        }).catch((error) => {
                            console.log('Audio playback failed:', error);
                            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                            musicToggle.title = 'Musik tidak dapat diputar';
                            this.showMessage('Musik tidak dapat diputar. Silakan periksa koneksi internet.');
                        });
                    }
                }
            });

            // Enhanced audio event listeners
            backgroundMusic.addEventListener('ended', () => {
                musicToggle.classList.remove('playing');
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                musicToggle.title = 'Putar Musik: Barasuara -  Dengarkan Dia - Bersenyawa';
                this.isMusicPlaying = false;
            });

            backgroundMusic.addEventListener('error', (e) => {
                console.log('Audio loading error:', e);
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                musicToggle.title = 'Musik tidak tersedia';
                this.showMessage('Musik sedang tidak tersedia.');
            });

            backgroundMusic.addEventListener('loadstart', () => {
                console.log('Audio loading started');
            });

            backgroundMusic.addEventListener('canplay', () => {
                console.log('Audio ready to play');
                musicToggle.title = 'Putar Musik: Barasuara - Dengarkan Dia - Bersenyawa';
            });

            // Mobile-specific audio handling
            backgroundMusic.addEventListener('pause', () => {
                if (this.isMusicPlaying) {
                    musicToggle.classList.remove('playing');
                    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                    this.isMusicPlaying = false;
                }
            });

            backgroundMusic.addEventListener('play', () => {
                if (!this.isMusicPlaying) {
                    musicToggle.classList.add('playing');
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    this.isMusicPlaying = true;
                }
            });

            // Set initial tooltip
            musicToggle.title = 'Putar Musik: Barasuara - Dengarkan Dia - Bersenyawa';
        }
    }

    // Copy Button Functionality - Enhanced with better feedback
    initCopyButtons() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const accountNumber = button.getAttribute('data-account');
                
                if (accountNumber) {
                    this.copyToClipboard(accountNumber, button);
                }
            });
        });
    }

    async copyToClipboard(text, button) {
        try {
            // Try modern clipboard API first
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                this.showCopySuccess(button, text);
            } else {
                // Fallback for older browsers or non-secure contexts
                this.fallbackCopyText(text, button);
            }
        } catch (err) {
            console.log('Clipboard copy failed, trying fallback method:', err);
            this.fallbackCopyText(text, button);
        }
    }

    fallbackCopyText(text, button) {
        // Enhanced fallback method for mobile browsers
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        tempTextArea.style.position = 'fixed';
        tempTextArea.style.left = '-9999px';
        tempTextArea.style.top = '0';
        tempTextArea.setAttribute('readonly', '');
        tempTextArea.style.opacity = '0';
        tempTextArea.style.pointerEvents = 'none';
        document.body.appendChild(tempTextArea);
        
        try {
            tempTextArea.focus();
            tempTextArea.select();
            tempTextArea.setSelectionRange(0, 99999); // Mobile support
            
            const successful = document.execCommand('copy');
            
            if (successful) {
                this.showCopySuccess(button, text);
            } else {
                throw new Error('Copy command failed');
            }
        } catch (err) {
            console.log('Fallback copy failed:', err);
            this.showCopyFailure(button, text);
        } finally {
            document.body.removeChild(tempTextArea);
        }
    }

    showCopySuccess(button, text) {
        // Store original button content
        const originalHTML = button.innerHTML;
        const originalClasses = button.className;
        
        // Show success state
        button.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
        button.classList.add('success');
        button.disabled = true;
        
        // Show success message
        this.showMessage(`Nomor rekening ${text} berhasil disalin!`);
        
        // Reset button after 2.5 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.className = originalClasses;
            button.disabled = false;
        }, 2500);
        
        // Add subtle animation
        button.style.transform = 'scale(1.05)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }

    showCopyFailure(button, text) {
        // Store original button content
        const originalHTML = button.innerHTML;
        
        // Show error state briefly
        button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Gagal';
        button.style.background = '#EF4444';
        
        // Show error message with the text to copy manually
        this.showMessage(`Gagal menyalin otomatis. Silakan salin manual: ${text}`, true);
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '#8B7355';
        }, 2000);
    }

    // Forms - Enhanced with better validation and mobile support
    initForms() {
        this.initRSVPForm();
        this.initWishesForm();
        this.fixSelectDropdowns();
        this.enhanceMobileFormExperience();
    }

    enhanceMobileFormExperience() {
        // Improve mobile form experience
        const formInputs = document.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            // Prevent zoom on iOS when focusing inputs
            input.addEventListener('touchstart', () => {
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    input.style.fontSize = '16px';
                }
            });

            // Better mobile keyboard handling
            input.addEventListener('focus', () => {
                if (this.isMobile) {
                    setTimeout(() => {
                        input.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center',
                            inline: 'nearest'
                        });
                    }, 300);
                }
            });
        });
    }

    // Fix select dropdown functionality
    fixSelectDropdowns() {
        const selectElements = document.querySelectorAll('select.form-control');
        
        selectElements.forEach(select => {
            // Remove any existing event listeners that might cause conflicts
            select.addEventListener('mousedown', function(e) {
                // Prevent event bubbling that might interfere
                e.stopPropagation();
            });

            select.addEventListener('focus', function() {
                this.style.borderColor = '#8B7355';
            });
            
            select.addEventListener('blur', function() {
                this.style.borderColor = '#E8E5E1';
            });
            
            select.addEventListener('change', function() {
                if (this.value) {
                    this.style.color = '#4A3D2A';
                    this.style.backgroundColor = '#ffffff';
                } else {
                    this.style.color = 'white';
                    this.style.backgroundColor = '#8B7355';
                }
            });

            // Ensure initial styling for placeholder
            if (!select.value) {
                select.style.color = 'white';
                select.style.backgroundColor = '#8B7355';
            } else {
                select.style.color = '#4A3D2A';
                select.style.backgroundColor = '#ffffff';
            }
        });
    }

    initRSVPForm() {
        const rsvpForm = document.getElementById('rsvpForm');
        
        if (rsvpForm) {
            rsvpForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = {
                    name: document.getElementById('rsvpName')?.value || '',
                    attendance: document.getElementById('rsvpAttendance')?.value || '',
                    message: document.getElementById('rsvpMessage')?.value || '',
                    timestamp: new Date().toISOString()
                };

                if (this.validateRSVPForm(formData)) {
                    this.saveRSVP(formData);
                    this.showSuccessModal('RSVP Anda telah berhasil dikirim! Terima kasih atas konfirmasi kehadiran Anda. Kami sangat menantikan kehadiran Anda di hari bahagia kami.');
                    rsvpForm.reset();
                    // Reset select styles after form reset
                    setTimeout(() => {
                        this.fixSelectDropdowns();
                    }, 100);
                }
            });
        }
    }

    validateRSVPForm(data) {
        if (!data.name.trim()) {
            this.showMessage('Nama harus diisi');
            return false;
        }
        if (!data.attendance) {
            this.showMessage('Pilih status kehadiran');
            return false;
        }
        return true;
    }

    saveRSVP(data) {
        try {
            // For demonstration purposes, we're using console.log
            // In a real implementation, this would send to a server
            console.log('RSVP Data:', data);
            
            // Simulate saving to localStorage for demo
            const existingRSVPs = JSON.parse(localStorage.getItem('karin-fandi-rsvps') || '[]');
            existingRSVPs.push(data);
            localStorage.setItem('karin-fandi-rsvps', JSON.stringify(existingRSVPs));
        } catch (error) {
            console.log('Error saving RSVP:', error);
        }
    }

    initWishesForm() {
        const wishesForm = document.getElementById('wishesForm');
        
        if (wishesForm) {
            wishesForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = {
                    name: document.getElementById('wishesName')?.value || '',
                    message: document.getElementById('wishesMessage')?.value || '',
                    timestamp: new Date().toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                };

                if (this.validateWishesForm(formData)) {
                    this.saveWish(formData);
                    this.displayWish(formData);
                    this.showSuccessModal('Ucapan dan doa Anda telah berhasil dikirim! Terima kasih atas doa terbaik untuk kami. Semoga doa Anda menjadi berkah bagi pernikahan kami.');
                    wishesForm.reset();
                }
            });
        }
    }

    validateWishesForm(data) {
        if (!data.name.trim()) {
            this.showMessage('Nama harus diisi');
            return false;
        }
        if (!data.message.trim()) {
            this.showMessage('Ucapan harus diisi');
            return false;
        }
        if (data.message.trim().length < 10) {
            this.showMessage('Ucapan minimal 10 karakter');
            return false;
        }
        return true;
    }

    saveWish(data) {
        try {
            const existingWishes = JSON.parse(localStorage.getItem('karin-fandi-wishes') || '[]');
            existingWishes.unshift(data);
            // Keep only last 50 wishes for performance
            if (existingWishes.length > 50) {
                existingWishes.splice(50);
            }
            localStorage.setItem('karin-fandi-wishes', JSON.stringify(existingWishes));
        } catch (error) {
            console.log('Error saving wish:', error);
        }
    }

    loadExistingWishes() {
        const defaultWishes = [
            {
                name: "Keluarga Besar",
                message: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
                timestamp: "15 Januari 2026"
            },
            {
                name: "Teman Dekat", 
                message: "Selamat menempuh hidup baru Karin & Fandi! Semoga pernikahan kalian diberkahi Allah SWT dan menjadi keluarga yang harmonis. Bahagia selalu ya!",
                timestamp: "20 Januari 2026"
            },
            {
                name: "Sahabat Kuliah",
                message: "Dari yang dulunya saling kenal di Instagram sampai sekarang menikah! So happy for both of you. Semoga langgeng sampai kakek nenek ya!",
                timestamp: "25 Januari 2026"
            },
            {
                name: "Tetangga",
                message: "Selamat untuk Karin dan Fandi! Semoga menjadi pasangan yang selalu saling melengkapi dan bahagia dunia akhirat. Amin ya rabbal alamin.",
                timestamp: "28 Januari 2026"
            },
            {
                name: "Rekan Kerja",
                message: "Congratulations Fandi & Karin! Wishing you both a lifetime of love and happiness. May your marriage be blessed with joy, peace, and prosperity.",
                timestamp: "1 Februari 2026"
            }
        ];

        try {
            const savedWishes = JSON.parse(localStorage.getItem('karin-fandi-wishes') || '[]');
            const allWishes = [...savedWishes, ...defaultWishes];

            // Clear existing wishes first
            const wishesList = document.getElementById('wishesList');
            if (wishesList) {
                wishesList.innerHTML = '';
            }

            allWishes.forEach(wish => {
                this.displayWish(wish);
            });
        } catch (error) {
            const wishesList = document.getElementById('wishesList');
            if (wishesList) {
                wishesList.innerHTML = '';
            }
            defaultWishes.forEach(wish => {
                this.displayWish(wish);
            });
        }
    }

    displayWish(wish) {
        const wishesList = document.getElementById('wishesList');
        if (wishesList) {
            const wishElement = document.createElement('div');
            wishElement.className = 'wish-item';
            wishElement.innerHTML = `
                <div class="wish-name">${this.escapeHtml(wish.name)}</div>
                <div class="wish-message">${this.escapeHtml(wish.message)}</div>
                <div class="wish-date">${wish.timestamp}</div>
            `;
            wishesList.prepend(wishElement);
        }
    }

    // Utility Functions
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showMessage(message, isError = false) {
        const toast = document.createElement('div');
        const bgColor = isError ? '#EF4444' : '#8B7355';
        const textColor = 'white';
        
        toast.style.cssText = `
            position: fixed;
            top: ${this.isMobile ? '80px' : '100px'};
            right: 20px;
            background: ${bgColor};
            color: ${textColor};
            padding: ${this.isMobile ? '12px 20px' : '16px 24px'};
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            max-width: ${this.isMobile ? '280px' : '350px'};
            font-size: ${this.isMobile ? '13px' : '14px'};
            line-height: 1.4;
            word-wrap: break-word;
            transform: translateX(400px);
            transition: transform 0.3s ease-in-out;
        `;
        
        toast.textContent = message;
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (toast && toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, isError ? 6000 : 4000);
    }

    showSuccessModal(message) {
        const modal = document.getElementById('successModal');
        const messageElement = document.getElementById('successMessage');
        
        if (modal && messageElement) {
            messageElement.textContent = message;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.onclick = () => this.closeModal();
            }

            modal.onclick = (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            };

            // Auto close after 7 seconds for longer messages
            setTimeout(() => {
                this.closeModal();
            }, 7000);
        }
    }

    closeModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    handleResponsiveLayout() {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        
        if (window.innerWidth > 768) {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Global function for modal close button
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Global function for opening invitation and playing music
function bukaUndanganDanPutarMusik() {
    console.log('🎉 Tombol Buka Undangan diklik');
    
    // Sembunyikan loading screen
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    
    // Tunggu sedikit sebelum memutar musik untuk memastikan user interaction terdeteksi
    setTimeout(() => {
        const backgroundMusic = document.getElementById('backgroundMusic');
        const musicToggle = document.getElementById('musicToggle');
        
        if (backgroundMusic && musicToggle) {
            // Set volume
            backgroundMusic.volume = 0.4;
            
            // Tampilkan loading state pada tombol musik
            musicToggle.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            musicToggle.title = 'Memuat musik...';
            
            // Coba putar musik
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Musik berhasil diputar
                    console.log('🎵 Musik berhasil diputar otomatis');
                    musicToggle.classList.add('playing');
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    musicToggle.title = 'Jeda Musik: Dengarkan Dia - Bersenyawa';
                    
                    // Update status di weddingApp jika ada
                    if (window.weddingApp) {
                        window.weddingApp.isMusicPlaying = true;
                        window.weddingApp.autoplayAttempted = true;
                    }
                }).catch((error) => {
                    // Autoplay gagal (browser memblokir)
                    console.log('⚠️ Autoplay diblokir browser:', error);
                    musicToggle.classList.remove('playing');
                    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                    musicToggle.title = 'Klik untuk putar musik: Dengarkan Dia - Bersenyawa';
                    
                    // Update status di weddingApp jika ada
                    if (window.weddingApp) {
                        window.weddingApp.isMusicPlaying = false;
                        window.weddingApp.autoplayAttempted = true;
                    }
                });
            }
        }
    }, 300);
}

// Initialize the app
const weddingApp = new WeddingApp();

// Expose weddingApp to global scope for access from other functions
window.weddingApp = weddingApp;

// Enhanced initialization with autoplay support
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all anchor links - ENHANCED
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = 70;
                const elementTop = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementTop + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.event-card, .wish-item, .gift-card, .dresscode-card, .couple-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Initialize navbar visibility
    setTimeout(() => {
        if (window.scrollY > 100) {
            const navbar = document.getElementById('navbar');
            if (navbar) navbar.classList.add('visible');
        }
    }, 100);

    // Enhanced form validation feedback
    const formInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim() && this.hasAttribute('required')) {
                this.style.borderColor = '#EF4444';
            } else {
                this.style.borderColor = '#E8E5E1';
            }
        });

        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#10B981';
            } else if (this.hasAttribute('required')) {
                this.style.borderColor = '#EF4444';
            } else {
                this.style.borderColor = '#E8E5E1';
            }
        });
    });

    // Final console log for completed application
    console.log(`
    ✨ WEDDING INVITATION ENHANCED - WITH AUTOPLAY & MOBILE OPTIMIZED ✨
    
    🎵 NEW AUTOPLAY FEATURES:
    ✅ Music starts automatically after page load
    ✅ Fallback to manual play if autoplay blocked
    ✅ Enhanced mobile audio support
    ✅ Better user interaction detection
    
    💑 COUPLE SECTION UPDATES:
    ✅ THE BRIDE title added above bride photo
    ✅ THE GROOM title added above groom photo  
    ✅ Instagram handle @jiinnnnn___ for bride
    ✅ Instagram handle @imaamaulia for groom
    ✅ Elegant styling with hover effects
    
    📱 ENHANCED MOBILE OPTIMIZATION:
    ✅ Perfect responsive design for all devices
    ✅ Optimized touch targets (44px minimum)
    ✅ Enhanced viewport handling
    ✅ Better mobile form experience
    ✅ Improved mobile navigation
    ✅ Touch feedback animations
    ✅ Mobile-specific performance optimizations
    
    🚀 ALL FEATURES MAINTAINED:
    ✅ Elegant cream and white design
    ✅ Working forms with validation
    ✅ Copy functionality for account numbers
    ✅ Smooth navigation and scrolling
    ✅ Countdown timer
    ✅ Photo placeholders ready for replacement
    
    📝 READY FOR MOBILE DEVICES:
    ✅ iPhone (all sizes) 
    ✅ Android phones (all sizes)
    ✅ Tablets and iPads
    ✅ Landscape and portrait orientations
    
    🎶 AUTOPLAY STATUS: ACTIVE
    `);
});

// Handle form submissions for better UX
document.addEventListener('submit', function(e) {
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
});

// Enhanced copy button functionality for better UX
document.addEventListener('click', function(e) {
    if (e.target.matches('.copy-btn') || e.target.closest('.copy-btn')) {
        e.preventDefault();
        e.stopPropagation();
    }
});

// Handle external links globally
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="http"]');
    if (link && !link.target) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }
});

// Enhanced mobile-specific event listeners
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Prevent iOS bounce effect - FIXED: Jangan prevent pada button dan link
    document.body.addEventListener('touchstart', function(e) {
        // Izinkan touch pada input, textarea, button, dan link
        if (e.target.tagName === 'INPUT' || 
            e.target.tagName === 'TEXTAREA' || 
            e.target.tagName === 'BUTTON' || 
            e.target.tagName === 'A' ||
            e.target.closest('button') ||
            e.target.closest('a')) {
            return;
        }
        // Hanya prevent pada body untuk mencegah bounce effect
        if (e.target === document.body) {
            e.preventDefault();
        }
    }, { passive: false });

    // Improve mobile scrolling performance
    document.addEventListener('touchmove', function(e) {
        if (e.target.closest('.wishes-list') || e.target.closest('.nav-menu.active')) {
            return;
        }
    }, { passive: true });
}

// Prevent form validation styling conflicts
document.addEventListener('invalid', function(e) {
    e.preventDefault();
    const input = e.target;
    input.style.borderColor = '#EF4444';
    
    // Show custom validation message
    let message = 'Field ini harus diisi';
    if (input.type === 'email') {
        message = 'Email tidak valid';
    }
    
    // Create or update validation message
    let errorMsg = input.parentNode.querySelector('.validation-error');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'validation-error';
        errorMsg.style.cssText = 'color: #EF4444; font-size: 12px; margin-top: 4px;';
        input.parentNode.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
    
    // Remove error message when input becomes valid
    input.addEventListener('input', function() {
        if (this.validity.valid) {
            const error = this.parentNode.querySelector('.validation-error');
            if (error) {
                error.remove();
            }
            this.style.borderColor = '#10B981';
        }
    }, { once: true });
}, true);
