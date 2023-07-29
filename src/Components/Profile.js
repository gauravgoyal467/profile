import React,{useState,useEffect} from 'react'

const Profile = () => {
    const [user, setUser] = useState("");
    const [err,setErr]=useState("");

     useEffect(() => {
    
        const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
        console.log(storedUser)
        if (storedUser) {
            fetch(`https://dummyjson.com/users/${storedUser.id}`)
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
              })
              .catch((error) => {
                console.error('Error occurred while fetching user data:', error);
              });
          }else{
            setErr("User Not Found Please Login");
            console.log("User Not Found Please Login");
          }
        }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {err? (<p id="error">{err}</p>) :(
         <div className='profile' >
         <h1>Profile Page</h1>
         <h3>Username: {user.username}</h3>
         <p>Name: {user.firstName} {user.lastName}</p>
         <p>Gender: {user.gender}</p>
         <p>Age: {user.age}</p>
         <img src={user.image} alt="img" />
         <p>Email: {user.email} </p>
         <p>Address: {user.address.address},{user.address.city}</p>
       </div>
    )}
    </>
  );
};

export default Profile