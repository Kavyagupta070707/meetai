interface Props{
    children: React.ReactNode
}

export default function layout({children}:Props){
    return(
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:pd-10">
        <div className="w-full max-w-sm md:max-w-3xl"> 
            {children}
        </div>
        </div>
    )
}