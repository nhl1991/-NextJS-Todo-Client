

export default function Main({children} : {children:React.ReactNode}){


    return(
        
      <main className="flex min-h-screen w-full max-w-3xl bg-white flex-col items-center justify-center py-32 md:px-16 px-8 shadow-2xl rounded-xl">
        {children}
      </main>
    )
}