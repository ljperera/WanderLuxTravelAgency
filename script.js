
document.addEventListener('DOMContentLoaded', () => {

  
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close mobile menu automatically when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }


  
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px' 
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }


 
  const slides = document.querySelectorAll('.hero-carousel .slide');
  
  if (slides.length > 0) {
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
      slides[currentSlide].classList.remove('active');
      if (dots.length) dots[currentSlide].classList.remove('active');
      
      currentSlide = (index + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      if (dots.length) dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        resetTimer();
      });
    });

    const startTimer = () => { slideInterval = setInterval(nextSlide, 6000); };
    const resetTimer = () => { clearInterval(slideInterval); startTimer(); };

    startTimer();
  }


  
  const calcForm = document.getElementById('calcForm');
  const calcOutput = document.getElementById('calcOutput');

  if (calcForm && calcOutput) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page refresh

      const destSelect = document.getElementById('calcDestination');
      const selectedOption = destSelect.options[destSelect.selectedIndex];
      const destName = destSelect.value;
      
      const dailyRatePerTraveler = parseFloat(selectedOption.getAttribute('data-daily'));
      const dailyAccommodationRate = parseFloat(selectedOption.getAttribute('data-hotel'));

      const travelers = parseInt(document.getElementById('calcTravelers').value, 10) || 1;
      const days = parseInt(document.getElementById('calcDays').value, 10) || 1;

      const styleSelect = document.getElementById('calcStyle');
      const styleName = styleSelect.value;
      const multiplier = parseFloat(styleSelect.options[styleSelect.selectedIndex].getAttribute('data-multiplier'));

      const totalTravelerCost = dailyRatePerTraveler * travelers * days;
      const totalAccommodationCost = dailyAccommodationRate * days;
      const baseTotal = totalTravelerCost + totalAccommodationCost;
      
      const estimatedTotal = baseTotal * multiplier;

      const formattedCost = estimatedTotal.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      });

      calcOutput.innerHTML = `
        <div class="output-success" style="color: #FCD34D; font-weight: 700; font-size: 1.5rem; margin-bottom: 0.5rem;">
          ${formattedCost}
        </div>
        <p style="margin: 0; font-size: 1.05rem; color: #FFFFFF;">
          “Estimated cost for ${travelers} traveller${travelers > 1 ? 's' : ''} to ${destName} for ${days} days: <strong>${formattedCost}</strong> – ${styleName} Travel Package.”
        </p>
      `;
    });
  }


  
  const appointmentForm = document.getElementById('appointmentForm');
  const appFeedback = document.getElementById('appFeedback');

  if (appointmentForm && appFeedback) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('appName');
      const name = nameInput ? nameInput.value : 'Traveler';
      
      appFeedback.className = 'form-feedback feedback-success';
      appFeedback.style.display = 'block';
      appFeedback.style.backgroundColor = '#D1FAE5';
      appFeedback.style.color = '#065F46';
      appFeedback.style.border = '1px solid #34D399';
      appFeedback.style.padding = '1rem';
      appFeedback.style.borderRadius = '6px';
      appFeedback.style.marginTop = '1.25rem';
      
      appFeedback.innerHTML = `Thank you, <strong>${name}</strong>! Your appointment request has been logged. A Senior Travel Consultant will contact you shortly to confirm your slot.`;
      
      appointmentForm.reset();
    });
  }


  
  const directContactForm = document.getElementById('directContactForm');

  if (directContactForm) {
    directContactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('contactName').value;
      const subjectVal = document.getElementById('contactSubject').value;
      const bodyVal = document.getElementById('contactBody').value;

      const name = encodeURIComponent(nameVal);
      const subject = encodeURIComponent(`[Website Inquiry] ${subjectVal}`);
      const body = encodeURIComponent(`Name: ${decodeURIComponent(name)}\n\nMessage:\n${bodyVal}`);

      window.location.href = `mailto:concierge@wanderluxtravel.com.au?subject=${subject}&body=${body}`;
    });
  }

});