

export default function Main({children} : {children:React.ReactNode}){


    return(
        
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 rounded-xl shadow-2xl">
        {children}
      </main>
    )
}