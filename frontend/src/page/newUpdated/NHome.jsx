function NHome() {

  return (
    <div className="h-[100vh] w-full flex sm: flex-col   bg-zinc sm:flex sm:items-center sm:justify-center">
        <div className="h-full w-1/2 sm:w-full sm: text-center flex flex-col items-center text-black">
          <h1 className="text-5xl text-black"><span className="green-500">green</span><span>Earth</span></h1>
          <p className="text-black">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum sunt nam sit. Nisi in minus dolorum architecto. Ipsum deserunt nisi ipsa deleniti error quasi quas necessitatibus perferendis ullam neque.</p>
          <button className="px-5 text-white bg-slate-400 w-fit bg-green-500 text-black font-bold text-2xl rounded hover:bg-green-600">
            Plant-Now
          </button>
        </div>
        <div className="h-full w-1/2 sm:w-full bg-zinc-600">
            
        </div>
    </div>
  )
}

export default NHome  