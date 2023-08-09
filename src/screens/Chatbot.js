import React, { useState, useEffect } from 'react'
import '../componentsCSS/chatbot.css'

export default function Chatbot() {
    const [question, setQuestion] = useState(null)
    const [reply, setReply] = useState(null)
    const [previousChats, setPreviousChats] = useState([])
    const [currentTitle, setCurrentTitle] = useState(null)

    const createNewChat = () => {
        setReply(null)
        setQuestion(null)
        setCurrentTitle(null)
    }

    const handleClick = (uniqueTitle) => {
        setCurrentTitle(uniqueTitle)
        setReply(null)
        setQuestion(null)
    }


    const getMessages = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: question
            })
        }
        try {
            const response = await fetch("http://localhost:9000/api/chatbotbackend", options)
            const data = await response.json()
            console.log(data)
            setReply(data.choices[0].message)
        } catch (error) {
            console.error(error)
        }
    }

    //console.log(reply)
    useEffect(() => {
        //console.log(currentTitle, question, reply)
        if (!currentTitle && question && reply) {
            setCurrentTitle(question)
        }
        if (currentTitle && question && reply) {
            setPreviousChats(prevChats => (
                [...prevChats,
                {
                    title: currentTitle,
                    role: "user",
                    content: question
                },
                {
                    title: currentTitle,
                    role: reply.role,
                    content: reply.content
                }
                ]
            ))
        }
    }, [reply, currentTitle])

    const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

    return (
        <div className='chatbot'>
            <section className='side-bar'>
                <button onClick={createNewChat}>+ New chat</button>
                <ul className='history'>
                    {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
                </ul>
                <nav>
                    <p>Made by Kamal</p>
                </nav>
            </section>
            <section className='main'>
                {!currentTitle && <h1>HealthGPT</h1>}
                <ul className='feed'>
                    {currentChat?.map((chatMessage, index) => <li key={index}>
                        <p className='role'>{chatMessage.role + ": "}</p>
                        <p>{chatMessage.content}</p>
                    </li>)}
                </ul>
                <div className='bottom-section'>
                    <div className='input-container'>
                        <input question={question} onChange={(e) => setQuestion(e.target.value)} />
                        <div id="submit" onClick={getMessages}>➢</div>
                    </div>
                    <p className='info'>
                        HealthGPT is the chatBOT build using ChatGPT of OpenAI.
                    </p>
                </div>
            </section>
        </div>
    )
}
