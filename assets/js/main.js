
        // بارگذاری تنبل تصویر پس‌زمینه
        document.addEventListener('DOMContentLoaded', () => {
        const hero = document.querySelector('.hero');
        const img = new Image();
        img.onload = () => {
            hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img.src})`;
        };
        img.src = 'optimized-hero-image.jpg'; // تصویر بهینه‌شده
        });        

        // Initialize AOS
        document.addEventListener('DOMContentLoaded', function() {
        // تعریف آستانه و گزینه‌های مشاهده‌گر
        const options = {
            root: null, // استفاده از viewport به عنوان container
            rootMargin: '0px',
            threshold: 0.1 // عنصر وقتی 10% آن قابل مشاهده باشد فعال می‌شود
        };
        
        // ایجاد تاخیر برای عناصر با کلاس delay
        function applyDelay(element) {
            const delay = element.getAttribute('data-delay');
            if (delay) {
            element.style.transitionDelay = `${parseInt(delay) / 1000}s`;
            }
        }
        
        // ایجاد یک Intersection Observer برای تشخیص عناصر در دید
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                // عنصر را با افزودن کلاس visible نمایان می‌کند
                applyDelay(entry.target);
                entry.target.classList.add('visible');
                
                // هر عنصر را فقط یک بار مشاهده می‌کند
                observer.unobserve(entry.target);
            }
            });
        }, options);
        
        // همه عناصر با کلاس‌های انیمیشن را مشاهده می‌کند
        const animElements = document.querySelectorAll('.fade-in, .fade-up, .fade-down, .fade-right, .fade-left, .zoom-in');
        animElements.forEach(element => {
            observer.observe(element);
        });
        });
        
        $(document).ready(function() {
            // Mobile Menu Toggle
            $('.mobile-menu-btn').on('click', function() {
                $(this).find('i').toggleClass('fa-bars fa-times');
                $('.nav-links').toggleClass('active');
                $('body').toggleClass('menu-open');
            });
            
            // Close menu when clicking on a nav link
            $('.nav-links a').on('click', function() {
                $('.nav-links').removeClass('active');
                $('.mobile-menu-btn').find('i').removeClass('fa-times').addClass('fa-bars');
                $('body').removeClass('menu-open');
            });
            
            // Navbar Scroll Effect
            $(window).on('scroll', function() {
                if($(window).scrollTop() > 50) {
                    $('header').addClass('scrolled');
                } else {
                    $('header').removeClass('scrolled');
                }
                
                // Back to top button
                if($(window).scrollTop() > 300) {
                    $('#backToTop').addClass('show');
                } else {
                    $('#backToTop').removeClass('show');
                }
                
                // Active menu item based on scroll position
                var scrollPosition = $(document).scrollTop();
                
                // Check each section and update active class in menu
                $('section').each(function() {
                    var currentSection = $(this);
                    var sectionTop = currentSection.offset().top - 100;
                    var sectionId = currentSection.attr('id');
                    
                    if(scrollPosition >= sectionTop) {
                        $('.nav-links li').removeClass('active');
                        $('.nav-links li a[href="#'+ sectionId +'"]').parent().addClass('active');
                    }
                });
            });
            
            // Smooth Scrolling
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();
                var target = $(this.hash);
                if(target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 800);
                }
            });
            
            // Counter Animation
            function startCounter() {
                $('.stat-number').each(function() {
                    var $this = $(this);
                    var countTo = $this.attr('data-count');
                    
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'linear',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    });
                });
            }
            
            // Start counter when about section is in viewport
            var aboutSection = $('#about');
            $(window).on('scroll', function() {
                if($(window).scrollTop() + $(window).height() > aboutSection.offset().top + 200) {
                    startCounter();
                    // Unbind the event to prevent multiple triggers
                    $(window).off('scroll');
                }
            });
            
            // Product Filter
            $('.category-btn').on('click', function() {
                var filterValue = $(this).attr('data-filter');
                
                $('.category-btn').removeClass('active');
                $(this).addClass('active');
                
                if(filterValue == 'all') {
                    $('.product-card').show();
                } else {
                    $('.product-card').hide();
                    $('.product-card[data-category="' + filterValue + '"]').show();
                }
            });
            
            // Gallery Filter
            $('.gallery-filter').on('click', function() {
                var filterValue = $(this).attr('data-filter');
                
                $('.gallery-filter').removeClass('active');
                $(this).addClass('active');
                
                if(filterValue == 'all') {
                    $('.gallery-item').show();
                } else {
                    $('.gallery-item').hide();
                    $('.gallery-item[data-category="' + filterValue + '"]').show();
                }
            });
            
            // FAQ Accordion
            $('.faq-question').on('click', function() {
                var faqItem = $(this).parent();
                
                if(faqItem.hasClass('active')) {
                    faqItem.removeClass('active');
                } else {
                    $('.faq-item').removeClass('active');
                    faqItem.addClass('active');
                }
            });
            
            // Initialize Testimonials Slider
            var swiper = new Swiper('.testimonials-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }
            });
            
            // Image Lightbox
            $('.lightbox-trigger').on('click', function(e) {
                e.preventDefault();
                var imageUrl = $(this).attr('href');
                
                var lightboxHtml = '<div class="lightbox-overlay">' +
                                   '<div class="lightbox-container">' +
                                   '<img src="' + imageUrl + '" alt="Lightbox Image">' +
                                   '<span class="lightbox-close">&times;</span>' +
                                   '</div>' +
                                   '</div>';
                
                $('body').append(lightboxHtml);
                $('body').addClass('lightbox-open');
                
                // Close lightbox on click
                $('.lightbox-overlay, .lightbox-close').on('click', function() {
                    $('.lightbox-overlay').remove();
                    $('body').removeClass('lightbox-open');
                });
                
                // Prevent closing when clicking on image
                $('.lightbox-container img').on('click', function(e) {
                    e.stopPropagation();
                });
            });
            
            // Form Validation
            $('form').on('submit', function(e) {
                e.preventDefault();
                
                var form = $(this);
                var isValid = true;
                
                form.find('input, textarea, select').each(function() {
                    if($(this).prop('required') && !$(this).val()) {
                        isValid = false;
                        $(this).addClass('error');
                    } else {
                        $(this).removeClass('error');
                    }
                });
                
                if(isValid) {
                    // Show success message
                    var successHtml = '<div class="form-success">' +
                                     '<div class="form-success-icon"><i class="fas fa-check-circle"></i></div>' +
                                     '<h3>پیام شما با موفقیت ارسال شد</h3>' +
                                     '<p>کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.</p>' +
                                     '<button class="btn form-success-close">بستن</button>' +
                                     '</div>';
                    
                    form.html(successHtml);
                    
                    // Close success message
                    $('.form-success-close').on('click', function() {
                        form[0].reset();
                        form.find('.form-success').remove();
                    });
                }
            });
            
            // Add CSS for form validation and success message
            $('<style>')
                .prop('type', 'text/css')
                .html(`
                    .error {
                        border-color: #e74c3c !important;
                        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
                    }
                    .form-success {
                        text-align: center;
                        padding: 30px;
                    }
                    .form-success-icon {
                        font-size: 3rem;
                        color: #2ecc71;
                        margin-bottom: 20px;
                    }
                    .form-success h3 {
                        margin-bottom: 10px;
                        color: #2c3e50;
                    }
                    .form-success p {
                        margin-bottom: 20px;
                        color: #7f8c8d;
                    }
                    .lightbox-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.9);
                        z-index: 9999;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .lightbox-container {
                        position: relative;
                        max-width: 90%;
                        max-height: 90%;
                    }
                    .lightbox-container img {
                        max-width: 100%;
                        max-height: 90vh;
                        border: 5px solid white;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
                    }
                    .lightbox-close {
                        position: absolute;
                        top: -40px;
                        right: 0;
                        color: white;
                        font-size: 30px;
                        cursor: pointer;
                    }
                    body.lightbox-open, body.menu-open {
                        overflow: hidden;
                    }
                    .mt-30 {
                        margin-top: 30px;
                    }
                    .mt-50 {
                        margin-top: 50px;
                    }
                    .text-center {
                        text-align: center;
                    }
                `)
                .appendTo('head');
        });
