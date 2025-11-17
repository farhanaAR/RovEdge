 document.getElementById('year').textContent = new Date().getFullYear();

  // Carousel logic: next/prev + basic drag + auto-scroll
  (function(){
    const track = document.getElementById('track');
    const next = document.getElementById('nextBtn');
    const prev = document.getElementById('prevBtn');

    // Scroll distance per click (one card width + gap)
    function scrollByCard(dir = 1){
      const card = track.querySelector('.card');
      if(!card) return;
      const style = getComputedStyle(track);
      const gap = parseInt(style.gap || 16);
      const step = card.offsetWidth + gap;
      track.scrollBy({left: step * dir, behavior: 'smooth'});
    }

    next.addEventListener('click', ()=>scrollByCard(1));
    prev.addEventListener('click', ()=>scrollByCard(-1));

    // Drag to scroll
    let isDown=false, startX, scrollLeft;
    track.addEventListener('pointerdown', (e)=>{
      isDown=true;
      track.setPointerCapture(e.pointerId);
      startX = e.clientX;
      scrollLeft = track.scrollLeft;
      track.style.cursor='grabbing';
    });
    track.addEventListener('pointermove', (e)=>{
      if(!isDown) return;
      const dx = e.clientX - startX;
      track.scrollLeft = scrollLeft - dx;
    });
    track.addEventListener('pointerup', (e)=>{
      isDown=false;
      track.style.cursor='';
    });
    track.addEventListener('pointercancel', ()=>{isDown=false; track.style.cursor='';});


// Initialize the typing animation
const typingAnimationElement = document.getElementById('typing-animation');

// Array of texts to type
const typingTexts = [
  'Social Media Marketing Specialist',
  'Growth Strategist',
  'Content Creator',
  'SEO Expert', 
  'Graphics Designer'
];

// Function to play typing effect
function playTypingAnimation(text) {
  // Typing effect
  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      typingAnimationElement.textContent += text[i];
    }, i * 100);
  }

  // After finishing text, wait, then clear and move to next
  setTimeout(() => {
    typingAnimationElement.textContent = '';
    playTypingAnimation(typingTexts[(typingTexts.indexOf(text) + 1) % typingTexts.length]);
  }, text.length * 100 + 1000); // add small pause
}

// Start animation
playTypingAnimation(typingTexts[0]);





    // Optional: gentle auto-scroll loop (pauses on hover)
    let autoTick;
    const speed = 0.25; // px per interval
    function startAuto(){
      stopAuto();
      autoTick = setInterval(()=> {
        if(!document.querySelector(':hover')?.closest || document.querySelector(':hover')?.closest('.carousel')) {
          track.scrollLeft += speed;
          // loop back to start gracefully
          if(track.scrollLeft + track.clientWidth >= track.scrollWidth - 10){
            track.scrollTo({left:0, behavior:'smooth'});
          }
        }
      }, 16);
    }
    function stopAuto(){ if(autoTick) clearInterval(autoTick); }

    // Start auto unless user interacts
    startAuto();
    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);
    track.addEventListener('scroll', () => {}); // placeholder if you want to add indicators

    // Keyboard accessibility: left/right when focusing any card
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowRight') scrollByCard(1);
        if(e.key === 'ArrowLeft') scrollByCard(-1);
      });
    });

    // Contact form simple handler
    window.submitContact = function(){
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name || !email || !message){
        alert('Please fill all fields before sending.');
        return;
      }
      // In a real site: send to your API / email service
      alert('Thanks — message captured for demo.');
      document.getElementById('contactForm').reset();
    };
  })();

//secure
document.addEventListener('keydown', function(event) {
  if (event.code === 'F12') {
    console.log('Blocked F12');
    event.preventDefault();
  }

  if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
    console.log('Blocked Ctrl+Shift+I');
    event.preventDefault();
  }

  if (event.ctrlKey && event.code === 'KeyU') {
    console.log('Blocked Ctrl+U');
    event.preventDefault();
  }
});

document.querySelectorAll('.card').forEach(card => {
    const url = card.dataset.link;
    if (url) {
        card.style.cursor = "pointer";
        card.addEventListener('click', () => window.open(url, '_blank'));
    }
});


