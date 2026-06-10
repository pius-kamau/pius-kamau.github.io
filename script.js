/* script.js */
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
  
  // ===== SCROLL REVEAL ANIMATIONS (WORKS ON MOBILE) =====
  var revealElements = [
    '.two-col', '.mission-block', '.featured-projects', 
    '.repo-card', '.project-card-mini', '.github-cta',
    '.bio-card', '.contact-card-main', '.availability-box', 
    '.contact-form-container', '.project-item'
  ];
  
  var elements = document.querySelectorAll(revealElements.join(','));
  
  // Add scroll-reveal class to each element
  elements.forEach(function(el) {
    el.classList.add('scroll-reveal');
  });
  
  // Also add to individual skills and goal items for staggered effect
  var skills = document.querySelectorAll('.skill');
  skills.forEach(function(skill, index) {
    skill.classList.add('scroll-reveal');
    skill.style.transitionDelay = (index * 0.03) + 's';
  });
  
  var goals = document.querySelectorAll('.goal-item');
  goals.forEach(function(goal, index) {
    goal.classList.add('scroll-reveal');
    goal.style.transitionDelay = (index * 0.05) + 's';
  });
  
  var principles = document.querySelectorAll('.principle');
  principles.forEach(function(principle, index) {
    principle.classList.add('scroll-reveal');
    principle.style.transitionDelay = (index * 0.04) + 's';
  });
  
  // Intersection Observer to trigger animations when elements come into view
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after animation to save performance
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,  // Trigger when 10% of element is visible
    rootMargin: '0px 0px -20px 0px'
  });
  
  // Observe all scroll-reveal elements
  var allRevealElements = document.querySelectorAll('.scroll-reveal');
  allRevealElements.forEach(function(el) {
    observer.observe(el);
  });
  
  // Force check for elements already visible on page load
  setTimeout(function() {
    allRevealElements.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    });
  }, 200);
  
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
