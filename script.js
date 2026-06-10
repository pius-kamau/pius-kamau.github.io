//  - Hamburger menu and contact form handling 
document.addEventListener('DOMContentLoaded', function() {
  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on any navigation link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        // Allow the link to navigate normally
        // Just close the menu before navigation
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(event) {
      if (window.innerWidth <= 768) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      }
    });
    
    // Prevent body scroll when menu is open
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
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
      
      console.log('Message from:', name, email);
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
