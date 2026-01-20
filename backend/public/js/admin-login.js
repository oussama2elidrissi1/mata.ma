(() => {
  const API_BASE = '/api';
  
  // Helper functions
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  
  const showError = (message) => {
    const errorDiv = $('#error-message');
    const errorText = $('#error-text');
    if (errorDiv && errorText) {
      errorText.textContent = message;
      errorDiv.classList.remove('hidden');
    }
  };
  
  const hideError = () => {
    const errorDiv = $('#error-message');
    if (errorDiv) {
      errorDiv.classList.add('hidden');
    }
  };
  
  const setLoading = (loading) => {
    const btn = $('#submit-btn');
    const text = $('#submit-text');
    const icon = $('#login-icon');
    if (btn && text) {
      btn.disabled = loading;
      if (loading) {
        text.textContent = 'Connexion...';
        if (icon) icon.style.display = 'none';
        btn.innerHTML = '<div class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>';
      } else {
        text.textContent = 'Se connecter';
        if (icon) icon.style.display = 'block';
        btn.innerHTML = '<i data-lucide="log-in" class="w-5 h-5" id="login-icon"></i><span id="submit-text">Se connecter</span>';
        if (window.lucide) lucide.createIcons();
      }
    }
  };
  
  // Check if already authenticated
  const checkAuth = () => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('auth_user');
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        if (userData.role === 'admin') {
          window.location.href = '/admin';
          return true;
        }
      } catch (e) {
        // Invalid user data
      }
    }
    return false;
  };
  
  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    hideError();
    
    const email = $('#email')?.value?.trim();
    const password = $('#password')?.value;
    
    if (!email || !password) {
      showError('Veuillez remplir tous les champs');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Erreur de connexion');
      }
      
      if (data.data.user.role !== 'admin') {
        throw new Error('Accès réservé aux administrateurs');
      }
      
      // Store token and user
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.data.user));
      
      // Redirect to admin dashboard
      window.location.href = '/admin';
    } catch (error) {
      showError(error.message || 'Les identifiants fournis sont incorrects.');
    } finally {
      setLoading(false);
    }
  };
  
  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!checkAuth()) {
        $('#login-form')?.addEventListener('submit', handleLogin);
      }
    });
  } else {
    if (!checkAuth()) {
      $('#login-form')?.addEventListener('submit', handleLogin);
    }
  }
})();
