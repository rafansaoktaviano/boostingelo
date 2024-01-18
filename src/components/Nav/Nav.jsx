import React from 'react'
import "./nav.css"
const Nav = () => {
  return (
    <nav className='w-full nav-bg h-[100px]  flex fixed justify-around items-center'>
      <h1 className='text-white font-bold text-[24px]'>BOOSTINGELO</h1>
      <ul className='text-secondary flex gap-[40px] font-semibold'>
        <li>League of Legends</li>
        <li>Valorant</li>
        <li>Teamfight Tactics</li>
        <li>Dota 2</li>
      </ul>
      <div>
        <button className='nav-btn text-buttonText bg-button font-semibold'>Login</button>
      </div>
    </nav>
  )
}

export default Nav
