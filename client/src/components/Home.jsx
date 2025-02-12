export default function Home(){
    if(!localStorage.getItem("token")){
        window.location.href = "/login";
    }
    return(
        <div className="bg-gradient-to-r from-green-400 to-blue-500 h-screen grid grid-cols-1">
            <h1 className="text-9xl text-white place-self-center">Welcome !!</h1>
            <h3 className="text-6xl text-white place-self-center">You are an Authenticated User</h3>
        </div>
    )
}