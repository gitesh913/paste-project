import React from 'react'
import { useSelector } from 'react-redux'; 
import { Link, useParams } from 'react-router-dom'

function Viewpaste() {

  const {id} = useParams()
  const allpastes = useSelector((state)=> state.paste.pastes)
  
  const paste = allpastes.find((p)=> p._id === id);

  if (!paste) {
    return (
      <section className='mx-auto w-full max-w-4xl'>
        <div className='rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-center backdrop-blur-xl'>
          <h1 className='text-2xl font-semibold text-white'>Paste not found</h1>
          <p className='mt-2 text-sm text-slate-400'>The paste may have been removed.</p>
          <Link
            to='/pastes'
            className='mt-5 inline-flex rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20'
          >
            Back to list
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className='mx-auto w-full max-w-5xl'>
      <div className='rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_80px_rgba(2,6,23,0.8)] backdrop-blur-xl sm:p-8'>
        <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='text-xs uppercase tracking-[0.28em] text-cyan-200/80'>View Mode</p>
            <h1 className='mt-1 text-2xl font-semibold text-white sm:text-3xl'>{paste.title}</h1>
          </div>
          <Link
            to={`/?pasteID=${paste._id}`}
            className='inline-flex rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20'
          >
            Edit this paste
          </Link>
        </div>

        <textarea
          className='min-h-110 w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-relaxed text-slate-200 sm:p-5'
          value={paste.content}
          disabled
          rows={18}
        />
      </div>
    </section>
  )
}

export default Viewpaste;