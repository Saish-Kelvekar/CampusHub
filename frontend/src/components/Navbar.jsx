
const Navbar = (props) => {
    return (
        <header>
            <nav aria-label="Primary">
                <div className="logo">
                    CampusHub
                </div>
                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>

                    <button type="button" onClick={()=>{
                        
                        props.onLogin()}}>
                        Login
                    </button>

                    <button type="button" onClick={props.onSignup}>
                        Sign Up
                    </button>
                </div>


            </nav>
        </header>

    )
}

export default Navbar
