

export default function Main({children} : {children:React.ReactNode}){


    return(
        
      <main className="flex min-h-screen w-full md:max-w-3xl flex-col items-center bg-white justify-center py-32 px-16 shadow-2xl rounded-xl">
        {children}
      </main>
    )
}