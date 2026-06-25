import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navber'
import Home from './components/Home'
import Paste from './components/Paste'
import Viewpaste from './components/Viewpaste'

function AppLayout() {
  return (
    <div className='relative min-h-screen overflow-hidden bg-slate-950 text-slate-100'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.14),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.12),transparent_35%)]' />

      <div className='relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-10'>
        <Navbar />
        <main className='mt-8 flex-1'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'pastes',
          element: <Paste />,
        },
        {
          path: 'pastes/:id',
          element: <Viewpaste />,
        },
      ],
    },
  ]
   
)

function App() {
  return (
   <>
   <RouterProvider router={router}/>
   </>
  )
}

export default App