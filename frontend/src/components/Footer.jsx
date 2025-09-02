import React from 'react'

function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>© {new Date().getFullYear()} BookClub. All rights reserved.</p>
      </aside>
    </footer>
  )
}

export default Footer