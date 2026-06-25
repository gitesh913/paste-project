import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFrompastes } from '../redux/pasteSlice';
import { toast } from "react-toastify";


function Paste() {

  const pastes = useSelector((state)=>state.paste.pastes) ;

  const [searchTerm, setsearchTerm] = useState("");
  const dispatch = useDispatch();

  const FilterData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  function HandleDelete(pasteId){
    dispatch(removeFrompastes(pasteId))
    toast.success("Paste deleted")
  }

  return (
    <section className='mx-auto w-full max-w-5xl'>
      <div className='rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl sm:p-8'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold text-white sm:text-3xl'>Your Pastes</h1>
            <p className='mt-1 text-sm text-slate-400'>Search, preview, and manage your snippets.</p>
          </div>
          <input
            className='h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/20 sm:w-80'
            type='text'
            placeholder='Search by title'
            value={searchTerm}
            onChange={(e)=> setsearchTerm(e.target.value)}
          />
        </div>

        <div className='mt-6 space-y-4'>
          {FilterData.length === 0 && (
            <div className='rounded-2xl border border-dashed border-white/15 bg-slate-950/40 p-8 text-center text-slate-400'>
              No pastes found.
            </div>
          )}

          {FilterData.map((paste) => (
            <article key={paste?._id} className='rounded-2xl border border-white/10 bg-slate-950/60 p-4 shadow-[0_10px_30px_rgba(2,6,23,0.45)] sm:p-5'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                <div className='min-w-0'>
                  <h2 className='truncate text-lg font-semibold text-white'>{paste.title}</h2>
                  <p className='mt-2 line-clamp-3 text-sm text-slate-300'>{paste.content}</p>
                </div>
                <p className='shrink-0 text-xs text-slate-500'>
                  {new Date(paste.createdAt).toLocaleString()}
                </p>
              </div>

              <div className='mt-4 flex flex-wrap gap-2'>
                <Link to={`/?pasteID=${paste?._id}`} className='rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/20'>
                  Edit
                </Link>
                <Link to={`/pastes/${paste?._id}`} className='rounded-lg border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-xs font-medium text-emerald-100 transition hover:bg-emerald-300/20'>
                  View
                </Link>
                <button
                  onClick={() => HandleDelete(paste?._id)}
                  className='rounded-lg border border-rose-300/30 bg-rose-300/10 px-3 py-2 text-xs font-medium text-rose-100 transition hover:bg-rose-300/20'
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to clipboard")
                  }}
                  className='rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/10'
                >
                  Copy
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Paste;