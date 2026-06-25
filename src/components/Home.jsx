import React, { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import { useSearchParams} from 'react-router-dom'
import { addTopastes , updateTopastes} from '../redux/pasteSlice';
import { toast } from "react-toastify";

function Home() {
 
  const [title, settitle] = useState("")
  const [value, setvalue] = useState("")
  const [SearchParams , setSearchParams] = useSearchParams();
  const pasteID = SearchParams.get("pasteID");
  const allpastes = useSelector((state)=> state.paste.pastes)

  const dispatch = useDispatch();

  useEffect(() => {
     if(pasteID){
      const paste= allpastes.find((p)=> p._id === pasteID);
      if (paste) {
        settitle(paste.title)
        setvalue(paste.content)
      }
     }
    }, [pasteID, allpastes])

  function createPaste(){
    const paste ={
      title : title,
      content : value,
      _id : pasteID || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    
    if(pasteID){
      //update
      dispatch(updateTopastes(paste))
      toast.success("Updated Successfully")
    }else{
      //create
      dispatch(addTopastes(paste))
      toast.success("Created Successfully")
    }
    settitle('')
    setvalue('')
    setSearchParams('')
  }

  return (
    <section className='mx-auto w-full max-w-5xl'>
      <div className='rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_80px_rgba(2,6,23,0.8)] backdrop-blur-xl sm:p-8'>
        <div className='mb-6'>
          <h1 className='text-2xl font-semibold text-white sm:text-3xl'>
            {pasteID ? 'Refine your paste' : 'Create a new paste'}
          </h1>
          <p className='mt-2 text-sm text-slate-400'>
            Write fast, save instantly, and keep everything in one elegant workspace.
          </p>
        </div>

        <div className='flex flex-col gap-4 lg:flex-row'>
          <input
            type='text'
            className='h-12 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/20'
            placeholder='Paste title'
            value={title}
            onChange={(e)=>settitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className='h-12 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-6 text-sm font-semibold text-slate-900 transition-transform duration-200 hover:scale-[1.02]'
          >
            {pasteID ? 'Update Paste' : 'Create Paste'}
          </button>
        </div>

        <div className='mt-6'>
          <textarea
            className='min-h-105 w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-relaxed text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/20 sm:p-5'
            value={value}
            placeholder='Write your content here...'
            onChange={(e)=>setvalue(e.target.value)}
            rows={18}
          />
        </div>
      </div>
    </section>
  )
}

export default Home;