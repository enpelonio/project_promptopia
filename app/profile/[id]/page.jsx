"use client"

import { useState, useEffect } from "react"

import Profile from "@components/Profile"

const OtherProfile = ({params}) => {

    const [posts, setPosts] = useState([])
    const [username, setUserName] = useState('')
    const userId = params.id

    useEffect(()=>{
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${userId}/posts`)
          const data = await response.json()
          setPosts(data)
          if (data.length > 0)
            setUserName(data[0].creator.username)
        }
        fetchPosts()
      }, [])
  
    return (
    <Profile
        name = {username}
        desc = "Welcome to your personalized profile page"
        data={posts}
    />
  )
}

export default OtherProfile