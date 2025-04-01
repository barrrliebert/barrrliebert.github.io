document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splashscreen');
    const circle = document.querySelector('.splash-circle');
    const percentText = document.querySelector('.loading-percent');
    let percent = 0;
    
    // Prevent scrolling during splash screen
    document.body.style.overflow = 'hidden';
    
    // Animate percentage counter
    const updatePercent = setInterval(() => {
        percent++;
        percentText.textContent = `${percent}%`;
        
        if (percent >= 100) {
            clearInterval(updatePercent);
            // Add delay before expand
            setTimeout(() => {
                circle.classList.add('expand');
            }, 800);
            
            // Add slide-up animation after expand
            setTimeout(() => {
                splashScreen.classList.add('slide-up');
            }, 3300);
            
            // Remove splash screen after animation completes
            setTimeout(() => {
                splashScreen.remove();
                document.body.style.overflow = 'auto';
            }, 8300); // 3300 + 5000 (slide duration)
        }
    }, 20); // Update every 20ms for smooth counting (total 2s)
});

const testSlide = ()=>{
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        grabCursor:true,
        loop:true
    });
}
testSlide()


const textAnim = () => {
    var typed = new Typed(".auto-type", {
        strings: ["BRANDING", "DEVELOPMENT", "DESIGN"],
        typeSpeed: 100,
        backSpeed: 120,
        loop: true
    })
}
textAnim()

const barAnim = () => {
    let bar = document.querySelector('.bar')
    let inrBar = document.querySelector('.inr-bar')
    let circle = document.querySelector('.circle')
    let dot = document.querySelector('.dot')
    let rating = document.querySelector('.rating')
    let inrBarTwo = document.querySelector('.inr-bar-two')

    bar.addEventListener('mouseenter', () => {
        bar.style.backgroundColor = "#fff"
        inrBar.style.backgroundColor = "#111"
        circle.style.backgroundColor = "#fff"
        dot.style.border = "2px solid #111"
        rating.style.color = "#fff"
        inrBarTwo.style.color = "#111"
        
        // Check if text is overflowing
        if (inrBarTwo.scrollWidth > inrBarTwo.clientWidth) {
            // Text is overflowing, add ellipsis
            inrBarTwo.style.textOverflow = "ellipsis"
        }
    })
    bar.addEventListener('mouseleave', () => {
        bar.style.backgroundColor = "transparent"
        inrBar.style.backgroundColor = "#fff"
        circle.style.backgroundColor = "#111"
        dot.style.border = "2px solid #fff"
        rating.style.color = "#111"
        inrBarTwo.style.color = "#fff"
    })
}
barAnim()

function cursorAnim() {
    var cursor = document.querySelector("#cursor");
    var main = document.querySelector('main');

    function updateCursorPosition(e) {
        var posX = e.clientX + window.scrollX;
        var posY = e.clientY + window.scrollY;

        cursor.style.left = posX + 'px';
        cursor.style.top = posY + 'px';
    }

    main.addEventListener('mousemove', updateCursorPosition);

    window.addEventListener('scroll', updateCursorPosition);
}
cursorAnim();

// Function to handle button hover state when scrolling past hero section
function buttonScrollEffect() {
    const btn = document.querySelector('.btn.btnaf');
    const heroSection = document.querySelector('.page1');
    const btnNavItem = btn.querySelector('.nav-item');
    
    window.addEventListener('scroll', () => {
        // Get the bottom position of the hero section
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        
        // If we've scrolled past the hero section
        if (heroBottom <= 0) {
            // Add active class to simulate hover
            btn.classList.add('btn-active');
            // Trigger the hover effect for the plus icon
            document.querySelector('.plus').style.color = '#fff';
            // Trigger the hover effect using the ::before pseudo element
            btn.style.setProperty('--btn-hover', '0');
            
            // Trigger the rolling text animation
            if (btnNavItem) {
                btnNavItem.style.transform = 'translateY(-19px)';
            }
        } else {
            // Remove active class when back in hero section
            btn.classList.remove('btn-active');
            // Reset the plus icon color
            document.querySelector('.plus').style.color = '';
            // Reset the hover state
            btn.style.setProperty('--btn-hover', '-100%');
            
            // Reset the rolling text animation
            if (btnNavItem) {
                btnNavItem.style.transform = '';
            }
        }
    });
}
buttonScrollEffect();

// Menu overlay functionality
function menuOverlayToggle() {
    const menuButton = document.querySelector('.menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const headRight = document.querySelector('.head-right');
    const closeBtn = document.querySelector('.close-btn');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu li a');
    let isMobile = window.innerWidth <= 768;
    
    // Add resize event listener to check screen size
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
    });
    
    // Add hover effect to menu items
    mobileMenuItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            mobileMenuItems.forEach((otherItem, otherIndex) => {
                if (otherIndex !== index) {
                    otherItem.style.opacity = '0.5';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            mobileMenuItems.forEach((otherItem) => {
                otherItem.style.opacity = '1';
            });
        });
    });
    
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Add the active class with a slight delay to ensure CSS transitions work properly
        if (!menuOverlay.classList.contains('active')) {
            // Show overlay first
            menuOverlay.style.opacity = "1";
            menuOverlay.style.pointerEvents = "all";
            
            // Add body class to prevent scrolling
            document.body.classList.add('no-scroll');
            
            // Delay adding active class for animation sequence
            setTimeout(() => {
                menuOverlay.classList.add('active');
                
                // Apply staggered animation to menu items
                const menuItems = document.querySelectorAll('.mobile-menu li');
                menuItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100 + (index * 100));
                });
            }, 50);
            
            // Make sure the head-right section remains visible and above the overlay
            headRight.style.zIndex = "1000";
            
            // Change menu icon to close icon with animation
            menuButton.classList.remove('ri-menu-3-line');
            menuButton.classList.add('ri-close-line');
            menuButton.style.transform = 'rotate(90deg)';
        } else {
            closeMenu();
        }
    });
    
    closeBtn.addEventListener('click', () => {
        closeMenu();
    });
    
    // Close menu function
    function closeMenu() {
        // First reverse the staggered animation
        const menuItems = document.querySelectorAll('.mobile-menu li');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(40px)';
            }, index * 50);
        });
        
        // Then remove the active class for animations
        setTimeout(() => {
            menuOverlay.classList.remove('active');
        }, 300);
        
        // Reset menu icon with animation
        menuButton.classList.remove('ri-close-line');
        menuButton.classList.add('ri-menu-3-line');
        menuButton.style.transform = 'rotate(0deg)';
        
        // After animations complete, hide overlay completely
        setTimeout(() => {
            menuOverlay.style.opacity = "0";
            menuOverlay.style.pointerEvents = "none";
            
            // Remove body class to allow scrolling again
            document.body.classList.remove('no-scroll');
        }, 1000);
    }
    
    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (menuOverlay.classList.contains('active')) {
            // Check if click is outside of overlay content
            if (!e.target.closest('.overlay-content') && !e.target.closest('.menu')) {
                closeMenu();
            }
        }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
}

menuOverlayToggle();

