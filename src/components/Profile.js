
const Profile = (props)=>{
    const user = props.profiles.find(profile=>profile.email === props.user.email);
    console.log('found',user)
    const goBackToFormHandler = ()=>{
        
    }
return (
    <>
    <div>
        <h2>Name: {user.name}</h2>
    </div>
    <div>
        <h2>Email: {user.email}</h2>
    </div>
    <button onClick={goBackToFormHandler}>Go Back</button>
    </>
)

}
export default Profile