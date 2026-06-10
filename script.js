/* script.js  */
document.addEventListener('DOMContentLoaded', function() {
  // ===== HAMBURGER MENU =====
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    }
    
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        }
      }
    });
  }
  
  // ===== SCROLL-TRIGGERED ANIMATIONS =====

  var animateElements = [
    '.two-col', '.mission-block', '.featured-projects', 
    '.repo-card', '.project-card-mini', '.github-cta',
    '.bio-card', '.contact-card-main', '.availability-box', 
    '.contact-form-container', '.project-item', '.skill',
    '.goal-item', '.principle', '.contact-item'
  ];
  
  var elementsToAnimate = document.querySelectorAll(animateElements.join(','));
  
  // Add scroll-animate class to each element
  elementsToAnimate.forEach(function(el) {
    el.classList.add('scroll-animate');
    el.classList.add('fade-in-up');
  });
  
  // Add different animation types for variety
  var repoCards = document.querySelectorAll('.repo-card');
  repoCards.forEach(function(card, index) {
    card.classList.remove('fade-in-up');
    card.classList.add('scale-in');
  });
  
  var projectCards = document.querySelectorAll('.project-card-mini');
  projectCards.forEach(function(card) {
    card.classList.remove('fade-in-up');
    card.classList.add('scale-in');
  });
  
  var contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(function(item) {
    item.classList.remove('fade-in-up');
    item.classList.add('slide-right');
  });
  
  var skills = document.querySelectorAll('.skill');
  skills.forEach(function(skill, index) {
    skill.classList.remove('fade-in-up');
    skill.classList.add('scale-in');
  });
  
  // Intersection Observer for scroll animations
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Add the animation class when element comes into view
        var el = entry.target;
        var animationClass = el.classList.contains('fade-in-up') ? 'fade-in-up' :
                            (el.classList.contains('scale-in') ? 'scale-in' :
                            (el.classList.contains('slide-left') ? 'slide-left' :
                            (el.classList.contains('slide-right') ? 'slide-right' : 'fade-in-up')));
        el.classList.add(animationClass);
        // Unobserve after animation triggers
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  
  // Observe each element
  elementsToAnimate.forEach(function(el) {
    observer.observe(el);
  });
  
  // Force check for elements already visible
  setTimeout(function() {
    elementsToAnimate.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        var animationClass = el.classList.contains('fade-in-up') ? 'fade-in-up' :
                            (el.classList.contains('scale-in') ? 'scale-in' :
                            (el.classList.contains('slide-left') ? 'slide-left' :
                            (el.classList.contains('slide-right') ? 'slide-right' : 'fade-in-up')));
        el.classList.add(animationClass);
        observer.unobserve(el);
      }
    });
  }, 100);
  
  // ===== CONTACT FORM =====
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('userName').value.trim();
      var email = document.getElementById('userEmail').value.trim();
      var message = document.getElementById('userMessage').value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        alert('Please enter a valid email address.');
        return;
      }
      
      var successDiv = document.getElementById('successNotification');
      successDiv.innerHTML = '<p>✓ Message sent successfully!</p><small>Thanks ' + name + ' — Pius will be in touch with you shortly.</small>';
      successDiv.classList.remove('hidden');
      
      form.style.pointerEvents = 'none';
      form.style.opacity = '0.6';
      form.reset();
      
      successDiv.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
