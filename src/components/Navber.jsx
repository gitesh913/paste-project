import React from 'react'
import { NavLink } from 'react-router-dom';

function Navber() {
  const getLinkClasses = ({ isActive }) =>
    `rounded-full border px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
      isActive
        ? 'border-cyan-300/60 bg-cyan-300/20 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.25)]'
        : 'border-white/15 bg-white/5 text-slate-300 hover:border-cyan-200/40 hover:text-cyan-100'
    }`;

  return (
    <header className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl'>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <p className='text-sm font-medium tracking-[0.28em] text-cyan-200/80'>PASTE VAULT</p>
          <p className='text-xs text-slate-400'>Secure ideas, beautiful notes</p>
        </div>
        <nav className='flex flex-row gap-3'>
          <NavLink to={'/'} className={getLinkClasses}>
            Home
          </NavLink>
          <NavLink to={'/pastes'} className={getLinkClasses}>
            Pastes
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navber;