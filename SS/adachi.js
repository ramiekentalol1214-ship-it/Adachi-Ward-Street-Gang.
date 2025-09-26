
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                
                // Randomly assign (formerly green) water-blue color
                if (Math.random() > 0.5) {
                    particle.style.setProperty('--particle-color', '#00B2FF');
                    const before = particle.style.getPropertyValue('--particle-color');
                    particle.style.background = '#00B2FF';
                }
                
                particlesContainer.appendChild(particle);
            }
        }

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');

        function updateActiveNav() {
            const scrollPosition = window.pageYOffset + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navItems.forEach(item => item.classList.remove('active'));
                    const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
                    if (currentNav) currentNav.classList.add('active');
                }
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateActiveNav();
        });

        // Initial active nav update
        updateActiveNav();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // game list tabs functionality
        const tabs = document.querySelectorAll('.tab-item');
        const panels = document.querySelectorAll('.content-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                tab.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Initialize particles
        createParticles();

        // Ensure all .glitch-text elements (including member names) are prepared for glitch animations
        document.querySelectorAll('.glitch-text').forEach(el => {
            // If the element already contains span-wrapped chars, skip
            if (!el.querySelector('.char')) {
                // Wrap each character in span for potential animation (non-rotator elements too)
                const text = el.textContent;
                el.innerHTML = text.split('').map((char, i) =>
                    `<span class="char" style="animation-delay: ${i * 0.02}s">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');
                // Keep data-text attribute for CSS pseudo-element glitch effect
                el.setAttribute('data-text', text);
            }
        });

    // Old spray-paint loader removed; replaced by new simple `#siteLoader` implementation.

        // Text rotation with character animation
        const textSets = document.querySelectorAll('.text-set');
        let currentIndex = 0;
        let isAnimating = false;

        function wrapTextInSpans(element) {
            const text = element.textContent;
            element.innerHTML = text.split('').map((char, i) => 
                `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
        }

        function animateTextIn(textSet) {
            const glitchText = textSet.querySelector('.glitch-text');
            const subtitle = textSet.querySelector('.subtitle');
            
            // Wrap text in spans for animation
            wrapTextInSpans(glitchText);
            
            // Update data attribute for glitch effect
            glitchText.setAttribute('data-text', glitchText.textContent);
            
            // Show subtitle after main text
            setTimeout(() => {
                subtitle.classList.add('visible');
            }, 800);
        }

        function animateTextOut(textSet) {
            const chars = textSet.querySelectorAll('.char');
            const subtitle = textSet.querySelector('.subtitle');
            
            // Animate characters out
            chars.forEach((char, i) => {
                char.style.animationDelay = `${i * 0.02}s`;
                char.classList.add('out');
            });
            
            // Hide subtitle
            subtitle.classList.remove('visible');
        }

        function rotateText() {
            if (isAnimating) return;
            isAnimating = true;

            const currentSet = textSets[currentIndex];
            const nextIndex = (currentIndex + 1) % textSets.length;
            const nextSet = textSets[nextIndex];

            // Animate out current text
            animateTextOut(currentSet);

            // After out animation, switch sets
            setTimeout(() => {
                currentSet.classList.remove('active');
                nextSet.classList.add('active');
                animateTextIn(nextSet);
                
                currentIndex = nextIndex;
                isAnimating = false;
            }, 600);
        }

        // Initialize first text set
        textSets[0].classList.add('active');
        animateTextIn(textSets[0]);

        // Start rotation after initial display
        setTimeout(() => {
            setInterval(rotateText, 5000); // Change every 5 seconds
        }, 4000);

        // Add random glitch effect
        setInterval(() => {
            const glitchTexts = document.querySelectorAll('.glitch-text');
            glitchTexts.forEach(text => {
                if (Math.random() > 0.95) {
                    text.style.animation = 'none';
                    setTimeout(() => {
                        text.style.animation = '';
                    }, 200);
                }
            });
        }, 3000);

                // Members carousel controls and click-to-enlarge
                (function() {
                    const leftBtn = document.querySelector('.carousel-btn-left');
                    const rightBtn = document.querySelector('.carousel-btn-right');
                    const cardsContainer = document.querySelector('.members-carousel .member-cards');

                    if (leftBtn && rightBtn && cardsContainer) {
                        const scrollAmount = 300; // px per click

                        leftBtn.addEventListener('click', () => {
                            cardsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                        });

                        rightBtn.addEventListener('click', () => {
                            cardsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                        });

                        // Keyboard support for focused carousel
                        cardsContainer.addEventListener('keydown', (e) => {
                            if (e.key === 'ArrowLeft') cardsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                            if (e.key === 'ArrowRight') cardsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                        });

                        // Click-to-enlarge behavior
                        cardsContainer.querySelectorAll('.member-card').forEach(card => {
                            card.addEventListener('click', (e) => {
                                // Toggle enlarged class; collapse siblings
                                const already = card.classList.contains('enlarged');
                                cardsContainer.querySelectorAll('.member-card.enlarged').forEach(c => c.classList.remove('enlarged'));
                                if (!already) card.classList.add('enlarged');
                            });
                        });

                        // Click outside to collapse
                        document.addEventListener('click', (e) => {
                            if (!e.target.closest('.member-card')) {
                                cardsContainer.querySelectorAll('.member-card.enlarged').forEach(c => c.classList.remove('enlarged'));
                            }
                        });
                    }
                })();

        // Site loader: simulate progress and hide on load
        // This is exposed as startSiteLoader() so we can show the sound consent dialog first
        function startSiteLoader(){
            const loader = document.getElementById('siteLoader');
            if(!loader) return;

            // ensure page content remains hidden until loader finishes
            try{ document.body.classList.add('preload-hidden'); }catch(e){}

            // ensure loader is visible
            loader.classList.remove('hidden');
            loader.setAttribute('aria-hidden','false');

            const progressEl = loader.querySelector('.site-loader__progress');
            const hintEl = loader.querySelector('.site-loader__hint');
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Minimum visible time for the loader (ms)
            const MIN_VISIBLE_MS = 1500;
            const startTime = Date.now();

            // Simple simulated progress until real load event
            if(progressEl){
                let simulated = 6;
                progressEl.style.width = simulated + '%';

                // advance toward 80% while loading
                const interval = setInterval(()=>{
                    if(reduced) return; // keep minimal movement if reduced
                    simulated += Math.random() * 6 + 2;
                    if(simulated >= 80) simulated = 80;
                    progressEl.style.width = Math.round(simulated) + '%';
                }, 300);

                function doFinish(){
                    clearInterval(interval);
                    // finish animation
                    progressEl.style.width = '100%';
                    if(hintEl) hintEl.textContent = 'Loaded';

                    // reveal page content after loader finishes
                    document.body.classList.remove('preload-hidden');

                    if(reduced){
                        loader.classList.add('hidden');
                        loader.setAttribute('aria-hidden','true');
                        setTimeout(()=> loader.parentNode && loader.parentNode.removeChild(loader), 120);
                        return;
                    }

                    // brief pause so users see completion
                    setTimeout(()=>{
                        loader.classList.add('hidden');
                        loader.setAttribute('aria-hidden','true');
                        setTimeout(()=> loader.parentNode && loader.parentNode.removeChild(loader), 520);
                    }, 420);
                }

                function finish(){
                    // ensure the loader is visible for at least MIN_VISIBLE_MS
                    const elapsed = Date.now() - startTime;
                    const remaining = MIN_VISIBLE_MS - elapsed;
                    if(reduced){
                        // respect reduced motion: finish immediately
                        doFinish();
                        return;
                    }
                    if(remaining > 0){
                        setTimeout(doFinish, remaining);
                    } else {
                        doFinish();
                    }
                }

                if(document.readyState === 'complete'){
                    finish();
                } else {
                    window.addEventListener('load', finish);
                    // fallback: ensure we remove loader after a reasonable max (MIN_VISIBLE_MS + 2s)
                    setTimeout(()=>{ if(document.body && document.body.contains(loader)) finish(); }, MIN_VISIBLE_MS + 2000);
                }
            }
        }

        // Sound consent UI handling: show dialog on first visit and start loader after choice
        (function(){
            const consentEl = document.getElementById('soundConsent');
            if(!consentEl) return;
            const audio = document.getElementById('bgmAudio');
            const consentOn = document.getElementById('consentOn');
            const consentOff = document.getElementById('consentOff');

            function disablePageScroll(){ document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'; }
            function enablePageScroll(){ document.documentElement.style.overflow = ''; document.body.style.overflow = ''; }
            function hideConsent(){ consentEl.setAttribute('aria-hidden','true'); consentEl.style.display='none'; enablePageScroll(); }

            // Always show dialog on every page load (do NOT read/write localStorage so choice is not persisted)
            // Show dialog and await choice. Make background fully black and prevent scrolling
            disablePageScroll();
            consentEl.style.display = 'flex';
            consentEl.setAttribute('aria-hidden','false');

            consentOn.addEventListener('click', ()=>{
                // Do NOT persist the choice. Attempt playback (user gesture) and start loader.
                try{ audio && audio.play().catch(()=>{}); }catch(e){}
                startSiteLoader();
                hideConsent();
            });

            consentOff.addEventListener('click', ()=>{
                // Do NOT persist the choice. Ensure audio is stopped for this session and start loader.
                try{ if(audio){ audio.pause(); audio.currentTime = 0; audio.muted = true; } }catch(e){}
                startSiteLoader();
                hideConsent();
            });
        })();

        // Screenshots slideshow: automatic rotation, controls, dots, keyboard support
        (function(){
            const slidesEl = document.getElementById('ssSlides');
            if(!slidesEl) return;
            const slides = Array.from(slidesEl.children);
            const prevBtn = document.querySelector('.ss-prev');
            const nextBtn = document.querySelector('.ss-next');
            const dotsContainer = document.getElementById('ssDots');
            let current = 0;
            let autoplayId = null;
            const AUTOPLAY_MS = 5000;

            function update(){
                slidesEl.style.transform = `translateX(-${current * 100}%)`;
                // update dots
                if(dotsContainer){
                    Array.from(dotsContainer.children).forEach((d,i)=> d.classList.toggle('active', i===current));
                }
            }

            function go(n){ current = (n + slides.length) % slides.length; update(); }
            function next(){ go(current+1); }
            function prev(){ go(current-1); }

            // create dots
            if(dotsContainer){
                slides.forEach((_,i)=>{
                    const b = document.createElement('button');
                    b.type = 'button';
                    b.setAttribute('aria-label', `スライド ${i+1}`);
                    b.addEventListener('click', ()=>{ go(i); restartAutoplay(); });
                    dotsContainer.appendChild(b);
                });
            }

            if(prevBtn) prevBtn.addEventListener('click', ()=>{ prev(); restartAutoplay(); });
            if(nextBtn) nextBtn.addEventListener('click', ()=>{ next(); restartAutoplay(); });

            // keyboard support when viewport focused
            const viewport = document.querySelector('.ss-viewport');
            if(viewport){
                viewport.addEventListener('keydown', (e)=>{
                    if(e.key === 'ArrowLeft') { prev(); restartAutoplay(); }
                    if(e.key === 'ArrowRight') { next(); restartAutoplay(); }
                });
                // allow focus
                viewport.addEventListener('focus', pauseAutoplay);
                viewport.addEventListener('blur', restartAutoplay);
                viewport.addEventListener('mouseenter', pauseAutoplay);
                viewport.addEventListener('mouseleave', restartAutoplay);
            }

            function startAutoplay(){
                if(autoplayId) return;
                autoplayId = setInterval(next, AUTOPLAY_MS);
            }
            function pauseAutoplay(){ if(autoplayId){ clearInterval(autoplayId); autoplayId = null; } }
            function restartAutoplay(){ pauseAutoplay(); startAutoplay(); }

            // init
            update();
            startAutoplay();
        })();

        // Click-to-open modal for screenshots
        (function(){
            const modal = document.getElementById('ssModal');
            const modalImg = document.getElementById('ssModalImg');
            const modalCaption = document.getElementById('ssModalCaption');
            const modalClose = document.getElementById('ssModalClose');
            const modalBackdrop = document.getElementById('ssModalBackdrop');
            if(!modal || !modalImg) return;

            function openModal(imgEl){
                modalImg.src = imgEl.src;
                modalImg.alt = imgEl.alt || '';
                modalCaption.textContent = imgEl.getAttribute('alt') || '';
                modal.setAttribute('aria-hidden','false');
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }

            function closeModal(){
                modal.setAttribute('aria-hidden','true');
                modal.classList.remove('open');
                modalImg.src = '';
                document.body.style.overflow = '';
            }

            // attach click handlers to slideshow images
            document.querySelectorAll('.ss-slide img').forEach(img=>{
                img.style.cursor = 'zoom-in';
                img.addEventListener('click', (e)=>{ openModal(e.currentTarget); });
            });

            modalClose && modalClose.addEventListener('click', closeModal);
            modalBackdrop && modalBackdrop.addEventListener('click', closeModal);
            document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });
        })();