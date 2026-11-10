import NavButton from "./NavButton"
function Header () {
    return (
        <header className="flex justify-center items-center h-20">
        <nav className="flex gap-6">
          <NavButton text = "Edit User" link="/editUser"/>
          <NavButton text = "Users" link="/user"/>
        </nav>
      </header>
    )
}

export default Header