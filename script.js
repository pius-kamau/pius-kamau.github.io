
document.addEventListener('DOMContentLoaded', function() {
  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Function to close menu
    function closeMenu() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
    
    // Function to open menu
    function openMenu() {
      hamburger.classList.add('active');
      navLinks.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('menu-open');
    }
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      if (navLinks.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    // Close menu when clicking on overlay
    overlay.addEventListener('click', function() {
      closeMenu();
    });
    
    // Handle navigation links - THIS IS THE KEY FIX
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // Close the menu first
        closeMenu();
        // Then navigate to the link
        if (href && !href.startsWith('#')) {
          setTimeout(function() {
            window.location.href = href;
          }, 150);
        } else if (href === '#') {
          e.preventDefault();
        }
      });
    });
    
    // Close menu on window resize if screen becomes desktop size
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  }
  
  // ===== CONTACT FORM HANDLING =====
  const form = document.getElementById('contactForm');
  if (form) {
    const submitBtn = document.getElementById('submitBtn');
    const successDiv = document.getElementById('successNotification');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const message = document.getElementById('userMessage').value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill in all fields before sending.');
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
      }
      
      successDiv.innerHTML = `
        <p>✓ Message sent successfully!</p>
        <small>Thanks ${escapeHtml(name)} — Pius will be in touch with you shortly.</small>
      `;
      successDiv.classList.remove('hidden');
      
      form.classList.add('submitted-state');
      if (submitBtn) submitBtn.disabled = true;
      form.reset();
      
      successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    
    function escapeHtml(str) {
      if (!str) return '';
      return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
      });
    }
  }
});
