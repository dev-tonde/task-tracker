import React from 'react';

function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="btn btn-outline-secondary"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeToggle;