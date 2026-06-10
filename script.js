
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    function closeMenu() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
    
    function openMenu() {
      hamburger.classList.add('active');
      navLinks.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('menu-open');
    }
    
    // Toggle menu
    hamburger.onclick = function(e) {
      e.stopPropagation();
      if (navLinks.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    };
    
    // Close overlay
    overlay.onclick = closeMenu;

    const links = navLinks.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
      links[i].onclick = function() {
        closeMenu();
        return true;
      };
    }
  }
  
  // Contact form handling
  const form = document.getElementById('contactForm');
  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const message = document.getElementById('userMessage').value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      if (!email.includes('@')) {
        alert('Enter a valid email.');
        return;
      }
      
      const successDiv = document.getElementById('successNotification');
      successDiv.innerHTML = '<p>✓ Message sent!</p><small>Thanks ' + name + ' — Pius will be in touch.</small>';
      successDiv.className = 'success-message';
      
      form.style.pointerEvents = 'none';
      form.style.opacity = '0.6';
      form.reset();
      
      successDiv.scrollIntoView({ behavior: 'smooth' });
    };
  }
});
