import './App.css'
import {useEffect, useState} from 'react'
import Modal from './Modal/Modal'
import "./Modal/zoomInModal.css"
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

function PostsPage() {

  const [message, setMessage] = useState([])
  const [modal, setModal] = useState(false)
  const [modalName,setModalName] = useState("")
  const [modalContent,setModalContent] = useState("")
  const history = useNavigate()
  let loginTest = 0;
  

  //Getting token data from database
  const getUserInfo = async () =>{
    const res = await fetch('http://localhost:5000/users',{
      method: "GET",
      headers:{
        "x-access-token" : localStorage.getItem('token')
      }
    })
    
    console.log(res)
    
  }
  //Token auth
  useEffect(() => {
    const token = localStorage.getItem('token')
  
    if (token) {
     const user = jwt_decode(token)
     console.log(user.oldUserCheck.status)
      if(!user) {
        console.log("user not found")
        localStorage.removeItem('token')
        history('/login')
      }else {
        fetch("http://localhost:5000/posts")
        .then((res) =>res.json())
        .then((data) => setMessage(data))
        
        getUserInfo()

      }
    } 
  },[]);

  
  //Reversing the posts array
  const messageReverse = [...message].reverse()
  
  // Database url
  let url = 'http://localhost:5000/posts/'

  //Full post Modal view
  let modalId
  const showData = () => {
    console.log(message.length);
    for(let i = 0;i<message.length;i++){
      if(message[i]._id === modalId){
        setModalName(message[i].name)
        setModalContent(message[i].content)
      }
    }
  }
  //Toggle Modal function
  const toggleModal = () => {
    setModal(!modal);
  };
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  //

  // Delete post function
  const deletePost = async () => {
    try{
    let deletePost = await fetch(url,{
      headers:{
        "Content-Type":"application/json"
      },
      method: "DELETE"
    })

    url = 'http://localhost:5000/posts/'
    let resJson = await deletePost.json()
    if(deletePost.status === 200){
      console.log("User deleted")
    }
  }catch(err){
    console.log(err)
  }}
  //
  
  
  return (
   
    <div className="App">
      
      <Modal/>
      <h1>Posts</h1><div>
      {messageReverse.map((post) =>(
      <div class="postDiv">   
        <div key={post._id}>
          <h2>{post.name}</h2>
          <p>{post.content}</p>
          <p>{post.time}</p>
          <button id={post._id} onClick={(e) =>{url = url + e.target.id;deletePost()}}>Delete</button>
              <button id={post._id} onClick={(e) => {modalId = e.target.id;showData();toggleModal()}}  className="btn-modal">
                View full post
          </button>
          
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h2>{modalName}</h2>
                <p>{modalContent}</p>
                
              </div>
            </div>
          )}
        </div></div>
      )
      )}</div>
    </div>
  );
}

export default PostsPage;
