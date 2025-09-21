// Signup page specific functionality
document.addEventListener('DOMContentLoaded', function() {
	// Form validation
	const form = document.querySelector('.signup-form');
	const inputs = document.querySelectorAll('.form-input');
	const checkbox = document.getElementById('terms');
	const submitBtn = document.querySelector('.btn--white');
	
	// Real-time validation
	inputs.forEach(input => {
		input.addEventListener('input', validateField);
		input.addEventListener('blur', validateField);
	});
	
	checkbox.addEventListener('change', validateForm);
	
	function validateField(e) {
		const input = e.target;
		const value = input.value.trim();
		
		// Remove previous error styling
		input.classList.remove('error');
		
		// Validate based on input type
		if (input.hasAttribute('required') && !value) {
			showError(input, 'This field is required');
			return false;
		}
		
		if (input.type === 'email' && value) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				showError(input, 'Please enter a valid email');
				return false;
			}
		}
		
		if (input.type === 'tel' && value) {
			const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
			if (!phoneRegex.test(value.replace(/\s/g, ''))) {
				showError(input, 'Please enter a valid phone number');
				return false;
			}
		}
		
		if (input.type === 'password' && value) {
			if (value.length < 8) {
				showError(input, 'Password must be at least 8 characters');
				return false;
			}
		}
		
		// Check password confirmation
		if (input.placeholder === 'Confirm password' && value) {
			const passwordInput = document.querySelector('input[placeholder="Create password"]');
			if (passwordInput.value !== value) {
				showError(input, 'Passwords do not match');
				return false;
			}
		}
		
		clearError(input);
		return true;
	}
	
	function showError(input, message) {
		input.classList.add('error');
		
		// Remove existing error message
		const existingError = input.parentNode.querySelector('.error-message');
		if (existingError) {
			existingError.remove();
		}
		
		// Add new error message
		const errorDiv = document.createElement('div');
		errorDiv.className = 'error-message';
		errorDiv.textContent = message;
		errorDiv.style.color = '#ff4444';
		errorDiv.style.fontSize = '12px';
		errorDiv.style.marginTop = '4px';
		input.parentNode.appendChild(errorDiv);
	}
	
	function clearError(input) {
		input.classList.remove('error');
		const errorMessage = input.parentNode.querySelector('.error-message');
		if (errorMessage) {
			errorMessage.remove();
		}
	}
	
	function validateForm() {
		let isValid = true;
		
		// Validate all inputs
		inputs.forEach(input => {
			if (!validateField({ target: input })) {
				isValid = false;
			}
		});
		
		// Check terms checkbox
		if (!checkbox.checked) {
			isValid = false;
		}
		
		// Update submit button state
		submitBtn.disabled = !isValid;
		submitBtn.style.opacity = isValid ? '1' : '0.6';
		
		return isValid;
	}
	
	// Form submission
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		
		if (!validateForm()) {
			return;
		}
		
		// Show loading state
		submitBtn.textContent = 'Creating Account...';
		submitBtn.disabled = true;
		
		// Simulate API call
		setTimeout(() => {
			alert('Account created successfully! Welcome to Genly.');
			// Redirect to main page or dashboard
			window.location.href = 'index.html';
		}, 2000);
	});
	
	// Initialize form validation
	validateForm();
	
	// Add focus styles
	inputs.forEach(input => {
		input.addEventListener('focus', function() {
			this.parentNode.classList.add('focused');
		});
		
		input.addEventListener('blur', function() {
			this.parentNode.classList.remove('focused');
		});
	});
});

// Add error styling to CSS
const style = document.createElement('style');
style.textContent = `
	.form-input.error {
		border: 2px solid #ff4444;
		background-color: #fff5f5;
	}
	
	.input-group.focused .input-label {
		color: var(--Violet);
	}
`;
document.head.appendChild(style);


