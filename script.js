/* ==========================================================================
   Birthday Wishes Web Application - Logic Controller
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // ==========================================
    // ⚙️ CARD CONFIGURATION (Edit this section!)
    // ==========================================
    const CARD_CONFIG = {
        // 👤 Recipient details
        name: "Sowjanya",
        relation: "Birthday Star",
        
        // ✉️ The written letter (inside the interactive envelope)
        wishMessage:"Happy Birthday jiiiii 🥰! 🎂💫 Wishing you endless happiness, unforgettable adventures, and all the success your heart desires. You make life brighter just by being you — may this year bring you everything you’ve been dreaming of. Enjoy your day to the fullest!🌹🎉",
        
        // 🎨 Theme: "carnival" (Rainbow), "aurora" (Indigo/Teal), "sunset" (Warm Peach), or "neon" (Cyberpunk)
        theme: "carnival",

        // 📸 Polaroid Memories (Place custom local image paths or external URLs here!)
        photos: [
            {
                url: "assets/ph1.jpeg",
                caption: "Laughter, joy, and endless smiles! ✨"
            },
            {
                url: "assets/ph2.jpeg",
                caption: "May your year sparkle like fireflies! 💫"
            },
            {
                url: "assets/ph3.jpeg",
                caption: "Keep chasing your dreams! 🚀"
            },
            {
                url: "assets/ph4.jpeg",
                caption: "💪 Believe in yourself — you’re unstoppable!"
            },
             {
                url: "assets/ph5.jpeg",
                caption: "🌟 Shine bright, the world needs your light!"
            }
        ],

        // 🎙️ Voice greeting audio file URL (leave empty if not using)
        voiceNoteUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", // sample track placeholder

        // 🔮 Fortune Cookie predictions
        predictions: [
            "A spectacular year ahead is waiting for you! 🌟",
            "Your code will compile on the first try this entire week! 💻",
            "An unexpected adventure will bring you great happiness! ✈️",
            "Success is in your near future, keep chasing your dreams! 🚀",
            "A beautiful surprise will warm your heart very soon! ❤️",
            "You will find money in a pocket you forgot about! 💸"
        ],

        // 🎰 Spin Wheel coupons / prize vouchers
        prizes: [
            "Free pepsii 🍷",
            "Free Chocolate 🍫",
            "Bike ride to a place u wish ☺️",
            "Movie Night of Choice 🎬",
            "Infinite Bragging Rights 🏆",
            "You option"
        ],

        // 🗺️ Memory Timeline milestones
        timelineEvents: [
            {
                date: "June 2025",
                title: "How We Met",
                description: "Our paths crossed at sports room, starting a wonderful journey of friendship and shared goals."
            },
            {
                date: "November 2025",
                title: "winning our trophy ",
                description: "Victory earned through sweat, teamwork, and passion — our trophy stands as proof of it all."
            },
            {
                date: "December 2025",
                title: "The First Trip",
                description: "Was in Pondicherry… cruising along the beachside roads, talking and laughing while chasing sunsets and soaking in the coastal breeze. 🌅💬"
            }
        ]
    };

    // ----------------------------------------------------
    // State Management
    // ----------------------------------------------------
    let appState = {
        name: CARD_CONFIG.name,
        relation: CARD_CONFIG.relation,
        wish: CARD_CONFIG.wishMessage,
        theme: CARD_CONFIG.theme,
        photos: CARD_CONFIG.photos,
        poppedBalloons: 0,
        isPlaying: false,
        isMuted: false,
        currentTrackIndex: 0
    };

    // Curated pastel colors for balloons
    const balloonColors = [
        "#f43f5e", "#ec4899", "#d946ef", "#a855f7", "#8b5cf6", 
        "#6366f1", "#3b82f6", "#0ea5e9", "#06b6d4", "#14b8a6", 
        "#10b981", "#84cc16", "#eab308", "#f97316"
    ];

    // Gift surprises
    const giftSurprises = [
        {
            title: "🎟️ Golden Ticket Unwrapped!",
            icon: "🎟️",
            text: "This golden voucher unlocks a full day of carefree joy — no deadlines, no duties, just pure relaxation and happy vibes. Consider it your personal escape pass to bliss! 🌸🌞"
        },
        {
            title: " 🌟 “Treasure Chest of Smiles!",
            icon: "🌟",
            text: "You’ve unlocked a sparkling chest filled with endless smiles, cheerful vibes, and happy memories — ready to brighten any moment, anywhere, anytime."
        },
        {
            title: "✋ Secret Dream Coupon!",
            icon: "✋",
            text: "A coupon that guarantees Mr.Dhanush 😎 will help you achieve one of your major goals this year, whether it's debugging a project or planning a trip!"
        }
    ];

    // ----------------------------------------------------
    // Element Selectors
    // ----------------------------------------------------
    // Display Elements
    const displayName = document.getElementById("display-name");
    const displayRelation = document.getElementById("display-relation");
    const displayWish = document.getElementById("display-wish");

    // Game Elements
    const popCountDisplay = document.getElementById("pop-count");

    // Cake & Candles Elements
    const candles = document.querySelectorAll(".candle");
    const relightBtn = document.getElementById("relight-btn");
    const micToggleBtn = document.getElementById("mic-toggle-btn");

    // Envelope
    const envelope = document.getElementById("envelope");

    // Polaroid Gallery Elements
    const polaroidDeck = document.getElementById("polaroid-deck");
    const prevSlideBtn = document.getElementById("prev-slide");
    const nextSlideBtn = document.getElementById("next-slide");
    const galleryIndicator = document.getElementById("gallery-indicator");
    let currentSlideIndex = 0;

    // Gift Elements
    const giftBoxes = document.querySelectorAll(".gift-box");
    const giftModal = document.getElementById("gift-modal");
    const modalClose = document.getElementById("modal-close");
    const modalOkBtn = document.getElementById("modal-ok-btn");
    const modalGiftIcon = document.getElementById("modal-gift-icon");
    const modalGiftTitle = document.getElementById("modal-gift-title");
    const modalGiftText = document.getElementById("modal-gift-text");

    // Audio Widget Elements
    const playPauseBtn = document.getElementById("play-pause-btn");
    const muteBtn = document.getElementById("mute-btn");
    const trackSelect = document.getElementById("track-select");
    const trackVoiceOption = document.getElementById("track-voice-option");
    const audioWave = document.getElementById("audio-wave");
    const soundFX = {
        pop: document.getElementById("sfx-pop"),
        blow: document.getElementById("sfx-blow"),
        cheer: document.getElementById("sfx-cheer"),
        gift: document.getElementById("sfx-gift")
    };
    const musicTracks = [
        document.getElementById("audio-track-1"),
        document.getElementById("audio-track-2"),
        document.getElementById("audio-track-3"),
        document.getElementById("audio-track-4")
    ];

    // Fortune Cookie Selectors
    const fortuneCookie = document.getElementById("fortune-cookie");
    const fortuneText = document.getElementById("fortune-text");
    const crackCookieBtn = document.getElementById("crack-cookie-btn");
    let isCookieCracked = false;

    // Spin Wheel Selectors
    const spinWheelBtn = document.getElementById("spin-wheel-btn");
    const wheelCanvas = document.getElementById("wheel-canvas-render");
    const wheelPointer = document.querySelector(".wheel-pointer");
    let wheelCtx = null;
    let wheelPrizes = CARD_CONFIG.prizes || ["Gift 🎁"];
    let isWheelSpinning = false;
    let currentWheelAngle = 0;

    // Timeline Selector
    const timelineItemsContainer = document.getElementById("timeline-items-container");

    // Canvas Mouse Trail
    const canvas = document.getElementById("trail-canvas");
    const ctx = canvas.getContext("2d");

    // Microphone Blowing Variables
    let isMicBlowingEnabled = false;
    let micStream = null;
    let audioCtx = null;
    let analyser = null;
    let dataArray = null;
    let animationFrameId = null;

    // ----------------------------------------------------
    // Load Personalization Config
    // ----------------------------------------------------
    function init() {
        // Sync theme class to body
        document.body.className = `theme-${appState.theme}`;

        // Render contents
        updateDOM();
        renderGallery();
        renderTimeline();
        setupCanvas();
        startBalloonSpawner();
        setup3DCardTilt();
        setupVoiceNotePlayer();
        initPrizeWheel();

        // Fortune Cookie click bindings
        if (crackCookieBtn) crackCookieBtn.addEventListener("click", crackFortuneCookie);
        if (fortuneCookie) fortuneCookie.addEventListener("click", crackFortuneCookie);

        // Spin Wheel click bindings
        if (spinWheelBtn) spinWheelBtn.addEventListener("click", spinPrizeWheel);
    }

    function updateDOM() {
        if (displayName) displayName.textContent = appState.name;
        if (displayRelation) displayRelation.textContent = appState.relation;
        if (displayWish) displayWish.textContent = appState.wish;
    }

    // ----------------------------------------------------
    // Voice Greeting Player Option Setup
    // ----------------------------------------------------
    function setupVoiceNotePlayer() {
        if (CARD_CONFIG.voiceNoteUrl && CARD_CONFIG.voiceNoteUrl.trim() !== "") {
            const voiceAudioNode = document.getElementById("audio-track-4");
            if (voiceAudioNode) {
                voiceAudioNode.src = CARD_CONFIG.voiceNoteUrl;
                if (trackVoiceOption) {
                    trackVoiceOption.classList.remove("hidden");
                }
            }
        }
    }

    // ----------------------------------------------------
    // 3D Parallax Tilt Effect
    // ----------------------------------------------------
    function setup3DCardTilt() {
        const gridCards = document.querySelectorAll(".grid-card");
        gridCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x coordinate within client
                const y = e.clientY - rect.top;  // y coordinate within client
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                const dx = x - xc;
                const dy = y - yc;
                
                // Tilt card up to 7 degrees
                const tiltX = -(dy / yc) * 7;
                const tiltY = (dx / xc) * 7;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
            });
            
            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
            });
        });
    }

    // ----------------------------------------------------
    // Memory Lane Timeline populator
    // ----------------------------------------------------
    function renderTimeline() {
        if (!timelineItemsContainer) return;
        timelineItemsContainer.innerHTML = "";
        
        const events = CARD_CONFIG.timelineEvents || [];
        events.forEach(evt => {
            const item = document.createElement("div");
            item.className = "timeline-item";
            item.innerHTML = `
                <div class="timeline-node"></div>
                <div class="timeline-content-box">
                    <span class="timeline-date">${evt.date}</span>
                    <h3>${evt.title}</h3>
                    <p>${evt.description}</p>
                </div>
            `;
            timelineItemsContainer.appendChild(item);
        });
    }

    // ----------------------------------------------------
    // Polaroid Gallery Slider & Canvas Scratch-Off
    // ----------------------------------------------------
    function renderGallery() {
        polaroidDeck.innerHTML = "";
        const slidesToUse = appState.photos;

        slidesToUse.forEach((slide, idx) => {
            const card = document.createElement("div");
            card.className = `polaroid-card ${idx === 0 ? "active" : ""}`;
            card.setAttribute("data-index", idx);

            card.innerHTML = `
                <div class="polaroid-img-wrapper" id="polaroid-img-wrapper-${idx}">
                    <img src="${slide.url}" alt="${slide.caption || 'Memory Photo'}">
                    <canvas class="scratch-canvas" id="scratch-canvas-${idx}"></canvas>
                </div>
                <p class="polaroid-caption">${slide.caption || ''}</p>
            `;
            polaroidDeck.appendChild(card);

            // Hook canvas sizing & scratches once card image loads or resolves
            const img = card.querySelector("img");
            if (img) {
                img.onload = () => {
                    initScratchCanvas(idx);
                };
                if (img.complete) {
                    initScratchCanvas(idx);
                }
            }
        });

        currentSlideIndex = 0;
        updateGalleryIndicator(slidesToUse.length);
    }

    function initScratchCanvas(idx) {
        const canvas = document.getElementById(`scratch-canvas-${idx}`);
        const parent = document.getElementById(`polaroid-img-wrapper-${idx}`);
        if (!canvas || !parent) return;

        const ctx = canvas.getContext("2d");
        const rect = parent.getBoundingClientRect();
        
        // Synchronize sizes
        canvas.width = rect.width || 250;
        canvas.height = rect.height || 200;

        // Draw scratch surface (metallic grey gradient)
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, "#bdbdbd");
        grad.addColorStop(0.5, "#8d8d8d");
        grad.addColorStop(1, "#a1a1a1");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw textured diagonal patterns
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 3;
        for (let i = -canvas.height; i < canvas.width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i + canvas.height, canvas.height);
            ctx.stroke();
        }

        // Add instructions
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.font = "700 16px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("✨ Scratch to Reveal ✨", canvas.width / 2, canvas.height / 2);

        // Scratch handler coordinates
        let isDrawing = false;

        function getPos(e) {
            const r = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - r.left,
                y: clientY - r.top
            };
        }

        function handleScratch(e) {
            if (!isDrawing) return;
            e.preventDefault();
            const p = getPos(e);

            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 22, 0, Math.PI * 2);
            ctx.fill();
            
            computeScratchRatio();
        }

        let ratioDebouncer = null;
        function computeScratchRatio() {
            if (ratioDebouncer) return;
            ratioDebouncer = setTimeout(() => {
                ratioDebouncer = null;
                
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pix = imgData.data;
                let transparentCount = 0;
                for (let i = 3; i < pix.length; i += 4) {
                    if (pix[i] === 0) {
                        transparentCount++;
                    }
                }
                const scratchPct = (transparentCount / (canvas.width * canvas.height)) * 100;
                
                // Expose fully if scratched over 45%
                if (scratchPct > 45) {
                    canvas.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
                    canvas.style.opacity = "0";
                    canvas.style.transform = "scale(1.15)";
                    playSFX("gift");
                    setTimeout(() => {
                        canvas.remove();
                    }, 600);
                }
            }, 100);
        }

        canvas.addEventListener("mousedown", (e) => { isDrawing = true; handleScratch(e); });
        canvas.addEventListener("mousemove", handleScratch);
        window.addEventListener("mouseup", () => { isDrawing = false; });

        canvas.addEventListener("touchstart", (e) => { isDrawing = true; handleScratch(e); });
        canvas.addEventListener("touchmove", handleScratch);
        canvas.addEventListener("touchend", () => { isDrawing = false; });
    }

    function updateGalleryIndicator(total) {
        if (galleryIndicator) galleryIndicator.textContent = `${currentSlideIndex + 1} / ${total}`;
    }

    function changeSlide(direction) {
        const cards = polaroidDeck.querySelectorAll(".polaroid-card");
        if (cards.length === 0) return;

        cards[currentSlideIndex].classList.remove("active");

        if (direction === "next") {
            currentSlideIndex = (currentSlideIndex + 1) % cards.length;
        } else {
            currentSlideIndex = (currentSlideIndex - 1 + cards.length) % cards.length;
        }

        cards[currentSlideIndex].classList.add("active");
        updateGalleryIndicator(cards.length);
    }

    if (prevSlideBtn) prevSlideBtn.addEventListener("click", () => changeSlide("prev"));
    if (nextSlideBtn) nextSlideBtn.addEventListener("click", () => changeSlide("next"));

    // ----------------------------------------------------
    // Virtual Cake & Candle Blow Out
    // ----------------------------------------------------
    candles.forEach(candle => {
        candle.addEventListener("click", () => {
            if (!candle.classList.contains("blown-out")) {
                blowCandle(candle);
            }
        });
    });

    function blowCandle(candle) {
        candle.classList.add("blown-out");
        candle.classList.remove("active-candle");
        playSFX("blow");

        // Small single puff confetti burst near the candle
        const rect = candle.getBoundingClientRect();
        confetti({
            particleCount: 15,
            spread: 30,
            origin: { x: rect.left / window.innerWidth, y: rect.top / window.innerHeight }
        });

        checkCandlesState();
    }

    function checkCandlesState() {
        const activeCandles = document.querySelectorAll(".active-candle");
        if (activeCandles.length === 0) {
            // All blown out!
            setTimeout(() => {
                playSFX("cheer");
                triggerConfetti(0.8, { spread: 100, scale: 1.2 });
                // Pop up blast with 25 balloons!
                triggerBalloonBlast(25);
                // Play music after all candles are blown out!
                if (!appState.isPlaying) {
                    togglePlay();
                }
            }, 500);
        }
    }

    // Relight candles trigger
    if (relightBtn) {
        relightBtn.addEventListener("click", () => {
            candles.forEach(candle => {
                candle.classList.remove("blown-out");
                candle.classList.add("active-candle");
            });
        });
    }

    // ----------------------------------------------------
    // Web Audio API: Microphone Candle Blow Detector
    // ----------------------------------------------------
    if (micToggleBtn) {
        micToggleBtn.addEventListener("click", () => {
            if (isMicBlowingEnabled) {
                disableMicBlowing();
            } else {
                enableMicBlowing();
            }
        });
    }

    function enableMicBlowing() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(stream => {
                isMicBlowingEnabled = true;
                micStream = stream;
                micToggleBtn.classList.add("active");
                micToggleBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Mic Blowing Active';
                
                // Initialize Web Audio Context
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const source = audioCtx.createMediaStreamSource(stream);
                analyser = audioCtx.createAnalyser();
                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                dataArray = new Uint8Array(bufferLength);
                
                source.connect(analyser);
                detectVolumeSpikes();
            })
            .catch(err => {
                console.error("Microphone stream block", err);
                alert("Microphone permissions are required to blow out candles. Please check browser settings.");
                disableMicBlowing();
            });
    }

    function disableMicBlowing() {
        isMicBlowingEnabled = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        if (micStream) {
            micStream.getTracks().forEach(track => track.stop());
            micStream = null;
        }
        if (audioCtx) {
            audioCtx.close();
            audioCtx = null;
        }
        if (micToggleBtn) {
            micToggleBtn.classList.remove("active");
            micToggleBtn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i> Enable Mic Blowing';
        }
    }

    function detectVolumeSpikes() {
        if (!isMicBlowingEnabled) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        // Sum values across mid-high frequencies that represent blow velocity
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
        }
        const average = sum / dataArray.length;

        // Threshold spike (blow detected)
        if (average > 75) {
            const activeCandles = document.querySelectorAll(".active-candle");
            if (activeCandles.length > 0) {
                // Extinguish a random candle
                const randomCandle = activeCandles[Math.floor(Math.random() * activeCandles.length)];
                blowCandle(randomCandle);
            }
        }
        
        animationFrameId = requestAnimationFrame(detectVolumeSpikes);
    }

    // ----------------------------------------------------
    // Mailbox & Envelope Interaction
    // ----------------------------------------------------
    if (envelope) {
        envelope.addEventListener("click", () => {
            envelope.classList.toggle("open");
            if (envelope.classList.contains("open")) {
                playSFX("gift");
                triggerConfetti(0.3, { spread: 40, velocity: 15 });
            }
        });
    }

    // ----------------------------------------------------
    // Fortune Cookie Predictions Handler
    // ----------------------------------------------------
    function crackFortuneCookie() {
        if (isCookieCracked) {
            // Reset state
            isCookieCracked = false;
            fortuneCookie.classList.remove("cracked");
            fortuneText.textContent = "Your future is full of bright possibilities! ✨";
            crackCookieBtn.innerHTML = '<i class="fa-solid fa-heart-pulse"></i> Crack Cookie';
            playSFX("pop");
            return;
        }

        // Trigger shake/crack
        fortuneCookie.classList.add("shake");
        playSFX("pop");

        setTimeout(() => {
            fortuneCookie.classList.remove("shake");
            fortuneCookie.classList.add("cracked");
            isCookieCracked = true;

            // Pick a random prediction
            const preds = CARD_CONFIG.predictions || ["Wishing you an amazing year ahead! 🌟"];
            const selection = preds[Math.floor(Math.random() * preds.length)];
            fortuneText.textContent = selection;

            // Toggle button to reset state
            crackCookieBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Reset Cookie';
            playSFX("gift");

            // Sparkle confetti burst on the cookie
            const rect = fortuneCookie.getBoundingClientRect();
            confetti({
                particleCount: 25,
                spread: 45,
                origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: rect.top / window.innerHeight }
            });
            // Balloon pop blast!
            triggerBalloonBlast(8);
        }, 450);
    }

    // ----------------------------------------------------
    // Spin Prize Wheel Handler
    // ----------------------------------------------------
    function initPrizeWheel() {
        if (!wheelCanvas) return;
        wheelCtx = wheelCanvas.getContext("2d");
        drawWheel();
    }

    function drawWheel() {
        if (!wheelCtx || !wheelCanvas) return;
        const size = wheelCanvas.width;
        const center = size / 2;
        const radius = center - 8;
        const sliceAngle = (Math.PI * 2) / wheelPrizes.length;

        wheelCtx.clearRect(0, 0, size, size);

        // Fun pastel segment colors
        const colors = ["#f43f5e", "#3b82f6", "#10b981", "#eab308", "#8b5cf6", "#f97316"];

        wheelPrizes.forEach((prize, idx) => {
            const startAngle = idx * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            // Draw segment
            wheelCtx.beginPath();
            wheelCtx.moveTo(center, center);
            wheelCtx.arc(center, center, radius, startAngle, endAngle);
            wheelCtx.closePath();

            wheelCtx.fillStyle = colors[idx % colors.length];
            wheelCtx.fill();

            // Slices partition line
            wheelCtx.strokeStyle = "rgba(255,255,255,0.25)";
            wheelCtx.lineWidth = 2;
            wheelCtx.stroke();

            // Add text label
            wheelCtx.save();
            wheelCtx.translate(center, center);
            wheelCtx.rotate(startAngle + sliceAngle / 2);
            wheelCtx.textAlign = "right";
            wheelCtx.fillStyle = "#ffffff";
            wheelCtx.font = "bold 11px Outfit, sans-serif";
            const maxLen = prize.length > 18 ? prize.substring(0, 16) + ".." : prize;
            wheelCtx.fillText(maxLen, radius - 15, 4);
            wheelCtx.restore();
        });
    }

    function spinPrizeWheel() {
        if (isWheelSpinning) return;
        isWheelSpinning = true;
        spinWheelBtn.disabled = true;

        if (wheelPointer) wheelPointer.classList.add("wiggling");
        playSFX("pop");

        // Determine landing outcome
        const prizeIndex = Math.floor(Math.random() * wheelPrizes.length);
        const sliceAngle = 360 / wheelPrizes.length;

        // Math: 5 full rotations + landing segment offset
        const fullSpins = 5 * 360;
        const sliceCenterOffset = 360 - (prizeIndex * sliceAngle) - (sliceAngle / 2);
        const finalRotationAngle = currentWheelAngle + fullSpins + sliceCenterOffset;

        // Apply style transform spin
        wheelCanvas.style.transition = "transform 4s cubic-bezier(0.15, 0.85, 0.35, 1)";
        wheelCanvas.style.transform = `rotate(${finalRotationAngle}deg)`;

        // Periodic ticks during animation
        let ticks = 0;
        const tickTimer = setInterval(() => {
            if (ticks < 20) {
                playSFX("pop");
                ticks++;
            } else {
                clearInterval(tickTimer);
            }
        }, 180);

        setTimeout(() => {
            if (wheelPointer) wheelPointer.classList.remove("wiggling");
            clearInterval(tickTimer);

            playSFX("cheer");
            triggerConfetti(0.8, { spread: 90 });

            // Store angle modulo
            currentWheelAngle = finalRotationAngle % 360;

            // Show congratulatory coupon voucher modal
            const prizeWon = wheelPrizes[prizeIndex];
            setTimeout(() => {
                showGiftModal({
                     title: "🎰 Wheel Spin Winner! 🎉",
                     icon: "🎁",
                     text: `Congratulations! You spun the wheel and won: "${prizeWon}". And take a screenshot and send it Mr. Dhanush 😎`
                });
                isWheelSpinning = false;
                spinWheelBtn.disabled = false;
            }, 400);

        }, 4000);
    }

    // ----------------------------------------------------
    // Mystery Gift Box Interaction
    // ----------------------------------------------------
    giftBoxes.forEach((gift, index) => {
        gift.addEventListener("click", () => {
            if (!gift.classList.contains("opened")) {
                gift.classList.add("opened");
                playSFX("gift");
                
                // Trigger a confetti pop on the gift box itself
                const rect = gift.getBoundingClientRect();
                confetti({
                    particleCount: 40,
                    spread: 60,
                    origin: { x: (rect.left + rect.width/2) / window.innerWidth, y: rect.top / window.innerHeight }
                });

                // Show modal overlay with specialized surprise
                setTimeout(() => {
                    showGiftModal(giftSurprises[index]);
                }, 800);
            }
        });
    });

    function showGiftModal(surprise) {
        if (modalGiftIcon) modalGiftIcon.textContent = surprise.icon;
        if (modalGiftTitle) modalGiftTitle.textContent = surprise.title;
        if (modalGiftText) modalGiftText.textContent = surprise.text;
        if (giftModal) giftModal.classList.add("active");

        // Staggered balloon blast on popup reveal!
        triggerBalloonBlast(20);

        // Burst confetti sparks from the center
        confetti({
            particleCount: 50,
            spread: 75,
            origin: { x: 0.5, y: 0.5 }
        });
    }

    function closeGiftModal() {
        if (giftModal) giftModal.classList.remove("active");
    }

    if (modalClose) modalClose.addEventListener("click", closeGiftModal);
    if (modalOkBtn) modalOkBtn.addEventListener("click", closeGiftModal);
    if (giftModal) {
        giftModal.addEventListener("click", (e) => {
            if (e.target === giftModal) closeGiftModal();
        });
    }

    // ----------------------------------------------------
    // Audio Player Widget & Sound Effects
    // ----------------------------------------------------
    function getActiveTrack() {
        return musicTracks[appState.currentTrackIndex];
    }

    function togglePlay() {
        const activeTrack = getActiveTrack();
        if (!activeTrack) return;

        if (appState.isPlaying) {
            activeTrack.pause();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            audioWave.classList.remove("playing");
            appState.isPlaying = false;
        } else {
            activeTrack.play().then(() => {
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                audioWave.classList.add("playing");
                appState.isPlaying = true;
            }).catch(err => {
                console.warn("Audio play blocked by browser autoplay constraints", err);
            });
        }
    }

    function toggleMute() {
        appState.isMuted = !appState.isMuted;
        musicTracks.forEach(track => {
            if (track) track.muted = appState.isMuted;
        });
        
        // Mute SFX
        Object.keys(soundFX).forEach(key => {
            if (soundFX[key]) soundFX[key].muted = appState.isMuted;
        });

        if (appState.isMuted) {
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
    }

    function changeTrack() {
        const wasPlaying = appState.isPlaying;
        
        // Stop current playing track
        const currentTrack = getActiveTrack();
        if (currentTrack) {
            currentTrack.pause();
            currentTrack.currentTime = 0;
        }

        // Set index
        appState.currentTrackIndex = trackSelect.selectedIndex;
        
        if (wasPlaying) {
            appState.isPlaying = false;
            togglePlay();
        }
    }

    if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlay);
    if (muteBtn) muteBtn.addEventListener("click", toggleMute);
    if (trackSelect) trackSelect.addEventListener("change", changeTrack);

    function playSFX(name) {
        if (appState.isMuted) return;
        const sfx = soundFX[name];
        if (sfx) {
            sfx.currentTime = 0;
            sfx.play().catch(e => console.log("SFX autoplay deferred until interaction", e));
        }
    }

    // ----------------------------------------------------
    // Confetti Celebrations Helper
    // ----------------------------------------------------
    function triggerConfetti(intensity = 0.5, customOpts = {}) {
        const count = 100 * intensity;
        const defaults = {
            origin: { y: 0.65 },
            colors: ['#38bdf8', '#fb7185', '#fbbf24', '#34d399', '#ec4899', '#818cf8']
        };

        const opts = { ...defaults, ...customOpts };

        confetti({
            ...opts,
            particleCount: count * 0.6,
            angle: 60,
            spread: opts.spread || 55,
            origin: { x: 0.1, y: opts.origin.y }
        });

        confetti({
            ...opts,
            particleCount: count * 0.6,
            angle: 120,
            spread: opts.spread || 55,
            origin: { x: 0.9, y: opts.origin.y }
        });
    }

    // ----------------------------------------------------
    // Balloon Pop Mini-game
    // ----------------------------------------------------
    function startBalloonSpawner() {
        setInterval(() => {
            const activeBalloons = document.querySelectorAll(".balloon, .floating-emoji");
            if (activeBalloons.length < 8) {
                spawnBalloon();
            }
        }, 2200);
    }

    function spawnBalloon(isFast = false) {
        const randomX = Math.random() * (window.innerWidth - 80);
        const floatDuration = isFast ? (5 + Math.random() * 4) : (8 + Math.random() * 6);
        const isForeground = Math.random() < 0.35;
        const zIndex = isForeground ? "1005" : "50";

        // Choose a random object type (55% standard styled balloons, 45% other cute emojis)
        const isStandardBalloon = Math.random() < 0.55;
        
        if (isStandardBalloon) {
            const balloon = document.createElement("div");
            balloon.className = "balloon";
            
            const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            const baseWidth = 65;
            const baseHeight = 80;
            const randomScale = 0.75 + Math.random() * 0.55;
            balloon.style.width = `${baseWidth * randomScale}px`;
            balloon.style.height = `${baseHeight * randomScale}px`;

            balloon.style.left = `${randomX}px`;
            balloon.style.color = randomColor;
            balloon.style.backgroundColor = randomColor;
            balloon.style.animationDuration = `${floatDuration}s`;
            balloon.style.zIndex = zIndex;

            // Layer depth: 35% float in foreground (above modal), 65% in background
            const glare = document.createElement("div");
            glare.className = "balloon-glare";
            balloon.appendChild(glare);

            const string = document.createElement("div");
            string.className = "balloon-string";
            balloon.appendChild(string);

            balloon.addEventListener("click", (e) => {
                e.stopPropagation();
                popBalloon(balloon);
            });

            balloon.addEventListener("animationend", () => {
                balloon.remove();
            });

            document.body.appendChild(balloon);
        } else {
            // Spawn other celebration objects (Emojis)
            const emojis = ['💖', '⭐', '🎁', '🧁', '🎉', '🎈', '✨', '🎂', '🥳', '❤️'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

            const emojiEl = document.createElement("div");
            emojiEl.className = "floating-emoji";
            emojiEl.textContent = randomEmoji;
            
            // Randomize speed and float offset animation
            const randomScale = 0.8 + Math.random() * 0.65;
            emojiEl.style.transform = `scale(${randomScale})`;
            emojiEl.style.left = `${randomX}px`;
            emojiEl.style.animationDuration = `${floatDuration}s`;
            emojiEl.style.zIndex = zIndex;

            emojiEl.addEventListener("click", (e) => {
                e.stopPropagation();
                popBalloon(emojiEl);
            });

            emojiEl.addEventListener("animationend", () => {
                emojiEl.remove();
            });

            document.body.appendChild(emojiEl);
        }
    }

    function triggerBalloonBlast(count = 20) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                spawnBalloon(true);
            }, i * 130);
        }
    }

    function popBalloon(balloon) {
        if (balloon.classList.contains("popped")) return;
        balloon.classList.add("popped");
        playSFX("pop");

        appState.poppedBalloons++;
        if (popCountDisplay) popCountDisplay.textContent = appState.poppedBalloons;

        const rect = balloon.getBoundingClientRect();
        
        // Custom spark colors: emojis get rainbow sparks, balloons get matching color
        const colors = balloon.classList.contains("floating-emoji")
            ? ['#f43f5e', '#eab308', '#ec4899', '#a855f7', '#3b82f6', '#10b981']
            : [balloon.style.backgroundColor || '#fb7185'];

        confetti({
            particleCount: 25,
            spread: 45,
            origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: rect.top / window.innerHeight },
            colors: colors
        });

        const indicator = document.createElement("div");
        indicator.className = "pop-indicator";
        indicator.textContent = "+1";
        indicator.style.left = `${rect.left + (rect.width || 40) / 4}px`;
        indicator.style.top = `${rect.top}px`;
        document.body.appendChild(indicator);

        setTimeout(() => {
            indicator.remove();
            balloon.remove();
        }, 1000);
    }

    // ----------------------------------------------------
    // Canvas Mouse Trail (Glitter Particles)
    // ----------------------------------------------------
    let particlesArray = [];
    const mouse = { x: undefined, y: undefined };

    function setupCanvas() {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            for (let i = 0; i < 2; i++) {
                particlesArray.push(new Particle(mouse.x, mouse.y));
            }
        });
        
        window.addEventListener("touchmove", (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
                particlesArray.push(new Particle(mouse.x, mouse.y));
            }
        });

        animateParticles();
    }

    function resizeCanvas() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1.5;
            this.color = `hsla(${Math.random() * 360}, 90%, 75%, `;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.015;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= this.decay;
        }

        draw() {
            if (!ctx) return;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = this.color + this.alpha + ")";
            
            ctx.moveTo(0, -this.size * 2);
            ctx.lineTo(this.size * 0.6, -this.size * 0.6);
            ctx.lineTo(this.size * 2, 0);
            ctx.lineTo(this.size * 0.6, this.size * 0.6);
            ctx.lineTo(0, this.size * 2);
            ctx.lineTo(-this.size * 0.6, this.size * 0.6);
            ctx.lineTo(-this.size * 2, 0);
            ctx.lineTo(-this.size * 0.6, -this.size * 0.6);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    function animateParticles() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();

            if (particlesArray[i].alpha <= 0) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animateParticles);
    }

    // Launch application setup
    init();
});
