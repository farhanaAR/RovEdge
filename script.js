document.getElementById('year').textContent = new Date().getFullYear();

// Carousel logic: next/prev + basic drag + auto-scroll
(function() {
  const track = document.getElementById('track');
  const next = document.getElementById('nextBtn');
  const prev = document.getElementById('prevBtn');

  // Shared flag to distinguish between a Click and a Drag
  let isDragging = false;

  // Scroll distance per click (one card width + gap)
  function scrollByCard(dir = 1) {
    const card = track.querySelector('.card');
    if (!card) return;
    const style = getComputedStyle(track);
    const gap = parseInt(style.gap || 16);
    const step = card.offsetWidth + gap;
    track.scrollBy({
      left: step * dir,
      behavior: 'smooth'
    });
  }

  next.addEventListener('click', () => scrollByCard(1));
  prev.addEventListener('click', () => scrollByCard(-1));

  // Drag to scroll Logic
  let isDown = false,
    startX, scrollLeft;

  track.addEventListener('pointerdown', (e) => {
    isDown = true;
    isDragging = false; // Reset dragging flag
    startX = e.clientX;
    scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
    // REMOVED: track.setPointerCapture(e.pointerId); <--- This was the problem
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX); // Scroll speed 

    // If user moves mouse more than 5px, consider it a Drag, not a Click
    if (Math.abs(walk) > 5) {
      isDragging = true;
    }

    track.scrollLeft = scrollLeft - walk;
  });

  track.addEventListener('pointerup', () => {
    isDown = false;
    track.style.cursor = 'grab';
    // Small timeout to ensure the click event can read the isDragging flag
    setTimeout(() => { isDragging = false; }, 50); 
  });

  track.addEventListener('pointercancel', () => {
    isDown = false;
    isDragging = false;
    track.style.cursor = 'grab';
  });


  // --- CLICKABLE CARDS LOGIC (Fixed) ---
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (e) => {
      // If the carousel was being dragged, stop the click
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Otherwise, open the link
      const url = card.getAttribute('data-link');
      if (url) {
        window.open(url, "_blank");
      }
    });
  });


  // Initialize the typing animation
  const typingAnimationElement = document.getElementById('typing-animation');
  const typingTexts = [
    'Social Media Marketing Specialist',
    'Growth Strategist',
    'Content Creator',
    'SEO Expert',
    'Graphics Designer'
  ];

  function playTypingAnimation(text) {
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        typingAnimationElement.textContent += text[i];
      }, i * 100);
    }
    setTimeout(() => {
      typingAnimationElement.textContent = '';
      playTypingAnimation(typingTexts[(typingTexts.indexOf(text) + 1) % typingTexts.length]);
    }, text.length * 100 + 1000);
  }
  
  // Check if element exists to prevent errors
  if(typingAnimationElement) {
      playTypingAnimation(typingTexts[0]);
  }

  // Auto-scroll
  let autoTick;
  const speed = 0.5; 
  function startAuto() {
    stopAuto();
    autoTick = setInterval(() => {
      // Stop auto scroll if hovering over carousel OR if dragging
      if (!isDown && (!document.querySelector(':hover')?.closest || document.querySelector(':hover')?.closest('.carousel'))) {
        track.scrollLeft += speed;
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 16);
  }

  function stopAuto() {
    if (autoTick) clearInterval(autoTick);
  }

  startAuto();
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

})();

// Block Shortcuts (Security)
document.addEventListener('keydown', function(event) {
  if (event.code === 'F12' || 
     (event.ctrlKey && event.shiftKey && event.code === 'KeyI') || 
     (event.ctrlKey && event.code === 'KeyU')) {
    event.preventDefault();
  }
});
//form
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    fetch("https://script.google.com/macros/s/AKfycbw-wRgVYEPXpCsho5pCbnRt1dFqBHCiYUdLB7J1Z_Yvp2rW1t2Sds98JtTvRzBr4mht4Q/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    document.getElementById("form-status").innerText = "Message sent successfully!";
    document.getElementById("contactForm").reset();
});


