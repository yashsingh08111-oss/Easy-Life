import React from 'react';

function Footer() {
  return (
    <footer style={{ padding: '1rem', textAlign: 'center', background: '#222', color: '#fff' }}>
      <p>© {new Date().getFullYear()} Easy Life. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
