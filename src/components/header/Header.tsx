import Button from "./Button"
function Header () {
    return (
        <header className="flex justify-center items-center h-20">
        <nav className="flex gap-6">
          <Button text = "Edit User" link="/editUser"/>
          <Button text = "Users" link="/user"/>
        </nav>
      </header>
    )
}

export default Header