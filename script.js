/* script.js -  */
document.addEventListener('DOMContentLoaded', function() {
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
