/**
 * Contact Form Module - Production-ready Formspree integration
 * Features: validation, accessibility, spam protection, mailto fallback
 */

(function() {
  'use strict';

  const ContactForm = {
    init: function() {
      const form = document.getElementById('contactForm');
      if (!form) return;

      this.form = form;
      this.submitBtn = document.getElementById('cf-submit');
      this.statusEl = document.getElementById('cf-status');
      this.inputs = form.querySelectorAll('input:not([type="hidden"]), textarea');
      
      this.bindEvents();
      this.setupValidation();
    },

    bindEvents: function() {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      
      // Real-time validation feedback
      this.inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            this.validateField(input);
          }
        });
      });
    },

    setupValidation: function() {
      this.validators = {
        text: (value) => value.trim().length >= 2,
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
        textarea: (value) => value.trim().length >= 10
      };
    },

    validateField: function(field) {
      const value = field.value;
      const fieldType = field.type === 'email' ? 'email' : 
                       field.tagName.toLowerCase() === 'textarea' ? 'textarea' : 'text';
      
      const isValid = this.validators[fieldType](value);
      const minLength = field.getAttribute('minlength');
      
      if (minLength && value.trim().length < parseInt(minLength)) {
        this.showFieldError(field, `Minimum ${minLength} characters required`);
        return false;
      }
      
      if (!isValid && value.trim()) {
        const errorMsg = fieldType === 'email' ? 'Please enter a valid email address' :
                        fieldType === 'textarea' ? 'Message must be at least 10 characters' :
                        'Please enter at least 2 characters';
        this.showFieldError(field, errorMsg);
        return false;
      }
      
      this.clearFieldError(field);
      return true;
    },

    showFieldError: function(field, message) {
      field.classList.add('error');
      
      // Remove existing error message if any
      const existingError = field.parentNode.querySelector('.field-error');
      if (existingError) {
        existingError.remove();
      }
      
      // Add error message
      const errorEl = document.createElement('span');
      errorEl.className = 'field-error';
      errorEl.textContent = message;
      errorEl.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorEl);
    },

    clearFieldError: function(field) {
      field.classList.remove('error');
      const errorEl = field.parentNode.querySelector('.field-error');
      if (errorEl) {
        errorEl.remove();
      }
    },

    validateForm: function() {
      let isValid = true;
      this.inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });
      return isValid;
    },

    handleSubmit: function(e) {
      e.preventDefault();
      
      // Check honeypot - if filled, it's a bot
      const honeypot = this.form.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        this.showStatus('Form submitted successfully!', 'success');
        this.form.reset();
        return;
      }
      
      // Validate form
      if (!this.validateForm()) {
        this.showStatus('Please correct the errors below.', 'error');
        return;
      }
      
      // Disable submit button and show loading
      this.setLoading(true);
      
      // Prepare form data
      const formData = new FormData(this.form);
      
      // Submit to Formspree
      fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        console.log('Formspree response status:', response.status);
        console.log('Formspree response ok:', response.ok);
        
        // Formspree returns 200 OK for successful submissions
        if (response.ok) {
          return response.json();
        }
        
        // Try to get more details about the error
        return response.text().then(text => {
          console.log('Formspree response text:', text);
          throw new Error(`Form submission failed with status ${response.status}: ${text}`);
        });
      })
      .then(data => {
        console.log('Formspree success data:', data);
        this.showStatus('Thank you! Your message has been sent successfully.', 'success');
        this.form.reset();
        this.clearAllFieldErrors();
      })
      .catch(error => {
        console.error('Form submission error:', error);
        this.showStatus('Unable to submit form. <a href="mailto:geetanjalipandey776@gmail.com">Send email directly</a>', 'error');
      })
      .finally(() => {
        this.setLoading(false);
      });
    },

    setLoading: function(isLoading) {
      this.submitBtn.disabled = isLoading;
      if (isLoading) {
        this.submitBtn.classList.add('loading');
        this.submitBtn.innerHTML = '<span class="spinner"></span>Sending...';
      } else {
        this.submitBtn.classList.remove('loading');
        this.submitBtn.innerHTML = 'Send message';
      }
    },

    showStatus: function(message, type) {
      this.statusEl.innerHTML = message;
      this.statusEl.className = `cf-status cf-status--${type}`;
      this.statusEl.setAttribute('role', 'alert');
      
      // Auto-hide success messages after 10 seconds
      if (type === 'success') {
        setTimeout(() => {
          this.statusEl.innerHTML = '';
          this.statusEl.className = 'cf-status';
          this.statusEl.removeAttribute('role');
        }, 10000);
      }
    },

    clearAllFieldErrors: function() {
      this.inputs.forEach(input => this.clearFieldError(input));
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ContactForm.init());
  } else {
    ContactForm.init();
  }

  // Make it globally available for potential external use
  window.ContactForm = ContactForm;
})();
