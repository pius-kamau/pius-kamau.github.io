
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

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
      <small>Thanks ${name} — Pius will be in touch with you shortly.</small>
    `;
    successDiv.classList.remove('hidden');
    
    form.classList.add('submitted-state');
    submitBtn.disabled = true;
    form.reset();
    
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
