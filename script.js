
    (function() {
      const form = document.getElementById('contactForm');
      const submitBtn = document.getElementById('submitBtn');
      const successDiv = document.getElementById('successNotification');
      const formContainer = document.getElementById('contactFormContainer');

      // Remove any existing demo note if present (old HTML had it, but we ensure clean)
      const oldNote = document.querySelector('.form-note');
      if (oldNote) oldNote.remove();

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const message = document.getElementById('userMessage').value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
          alert('Please fill in all fields before sending.');
          return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
          alert('Please enter a valid email address.');
          return;
        }
        
        // Display success message
        successDiv.innerHTML = `
          <p>✓ Message sent successfully!</p>
          <small>Thanks ${escapeHtml(name)} — Pius will be in touch with you shortly.</small>
        `;
        successDiv.classList.remove('hidden');
        
        // Disable form and button
        form.classList.add('submitted-state');
        submitBtn.disabled = true;
        
        // Optionally reset form fields (optional, but keeps UX clean)
        form.reset();
        
        // Scroll success message into view smoothly
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // You can also send data to a backend endpoint here if needed.
        // For now it's a client-side demo with visual feedback.
        console.log('Message from:', name, email, message);
      });
      
      // Simple escape function to prevent XSS
      function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
          if (m === '&') return '&amp;';
          if (m === '<') return '&lt;';
          if (m === '>') return '&gt;';
          return m;
        }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
          return c;
        });
      }
    })();
