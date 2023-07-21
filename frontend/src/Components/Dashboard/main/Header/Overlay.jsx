import ProfileView from "./ProfileView"
const ProfileMenu = () => {
  return (
    <div className="position-absolute" style={{zIndex:"2000",top:"0",right:"0"}}>
        <ProfileView/>
    </div>
  )
}

export default ProfileMenu
