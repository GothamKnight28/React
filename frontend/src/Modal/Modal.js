import React, { useState } from "react";
import "./Modal.css";


export default function Modal() {
  const [modal, setModal] = useState(false);
  const [name,setName] = useState("")
  const [content,setContent] = useState("")

  const handleSubmit = async (e)  => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:5000/posts',{
        headers:{
         "Content-Type" : "application/json" 
        },
        method: "POST",
        body: JSON.stringify({
          name:name,
          content:content,
          time:Date().toLocaleString()
        }),
      });
      let resJson = await res.json();
      if (res.status === 201){
        setName("")
        setContent("")
        console.log("Post created")
      } else {
        console.log("Error occured")

      }
    }catch(err){
        console.log(err)
    }
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
    
      <button onClick={toggleModal} className="btn-modal">
        Add post
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            ></input><br></br>
            <input
            type="text"
            value={content}
            placeholder="Text"
            onChange={(e) => setContent(e.target.value)}
            ></input><br></br>
            <button type="submit">Submit</button>
          </form>
          </div>
        </div>
      )}
      </>
  );
}