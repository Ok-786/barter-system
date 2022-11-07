import { Avatar, Button, Grid, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { axiosGetAllChats, axiosGetEnableChat, axiosSendMessage } from '../utils/Api'
import SendIcon from '@mui/icons-material/Send';
import welcome from '../assets/welcome.gif'
import DeleteIcon from '@mui/icons-material/Delete';

export default function Chats() {
  // const [users, setUsers] = useState([])
  const online = JSON.parse(localStorage.getItem('user'));
  const [allChats, setAllChats] = useState([]);
  const [userNames, setUserNames] = useState([])
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState()
  const [hover, setHover] = useState(false)

  const setMessageHandler = (e) => {
    setMessage(e.target.value)
  }


  const sendMessageHandler = async () => {

    const receiver = selectedUser;
    const sender = online.email;
    setAllChats([...allChats, { message, user: "sender" }])
    // try {
    console.log(receiver, sender)
    const data = { receiver, message }
    await axiosSendMessage(sender, data);
    setMessage('')
  }


  const getEnabledUsers = async () => {
    try {
      const temp = await axiosGetEnableChat(online.email)
      var uniq = temp.data.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.users[0] === value.users[0] && t.users[1] === value.users[1]
        ))
      )

      var n = []
      n = uniq.map((item) => item.users[0] === online.email ? item.users[1] : item.users[0])


      n = n.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t === value
        ))
      )
      console.log('usrnames')
      console.log(n)
      setUserNames(n)


    } catch (err) {
      console.log(err)
    }
  }

  const getChats = async (item) => {
    setSelectedUser(item)
    const receiver = item;
    var chats = await axiosGetAllChats()
    var temp = chats.data.map((chat) => {
      if ((chat.sender === receiver && chat.receiver === online.email) || (chat.sender === online.email && chat.receiver === receiver)) {
        console.log('qqqq')
        if (chat.sender === receiver) {
          return ({
            message: chat.message,
            user: 'receiver',
          })
        } else {
          return ({
            message: chat.message,
            user: 'sender',
          })
        }
      }
    })

    temp = temp.filter(function (element) {
      return element !== undefined;
    });
    setAllChats(temp)
  }
  console.log('allChats')
  console.log(allChats)


  useEffect(() => {
    console.log('qqqqqq')
    getEnabledUsers()
  }, [])

  const setDeleteMessageHandler = (chat) => {
    var filtered = allChats.filter(function (el) { return el.message != chat.message });
    console.log(filtered)
    setAllChats(filtered)
  }

  const onDeleteHandler = (chat) => {
    var filtered = userNames.filter(function (el) { return el != chat });
    setUserNames(filtered)

  }


  return (
    <>
      <Grid container style={{ width: '100%', height: '100vh' }}>
        <Grid item lg={3} >
          <div style={{ backgroundColor: 'rgb(0,0,120,.1', height: '100%', marginTop: '-2vh', textAlign: 'center', borderRadius: '25px' }}>
            <div style={{ textAlign: 'center', color: 'white', backgroundColor: 'black', borderRadius: '25px' }}><h2>Contact List</h2></div>
            {
              userNames.length !== 0 && userNames.map((item) =>
                <>
                  <div style={{ cursor: 'pointer', display: 'inline-flex', backgroundColor: 'rgb(128,0,120, 1)', borderRadius: '10px', margin: '8px', paddingInline: '15px', width: '70%', color: 'white', paddingBlock: '15px', }}>
                    <div style={{ float: 'left', width: '90%' }} onClick={() => getChats(item)}>
                      <Avatar /><h4 style={{ marginTop: '-35px', marginLeft: '1px' }}>{item}</h4>
                    </div>
                    <div style={{ float: 'right', width: '10%', zIndex: 999 }}>
                      {selectedUser !== item && <DeleteIcon fontSize='large' onClick={() => onDeleteHandler(item)} />}
                    </div>
                  </div>
                </>)
            }
          </div>
        </Grid>
        <Grid item lg={9} style={{ backgroundColor: '', width: '100%' }} paddingX={10} >
          <div style={{ position: 'relative', display: 'block', paddingTop: '5vh', height: '83%', backgroundColor: '' }}>
            {allChats.length === 0 && <div style={{ textAlign: 'center' }}>
              <img src={welcome} alt="adad" width="50%" />
              <h4 style={{ color: 'black' }}> Select your Contact to view all chats</h4>
            </div>}
            {
              allChats && allChats.map((chat) =>
                <>
                  <div onClick={() => setDeleteMessageHandler(chat)} style={{ cursor: 'pointer' }} onMouseEnter={() => setHover(chat.message)} onMouseLeave={() => setHover(false)}>
                    {chat.user == 'sender' ?
                      <div style={{ display: 'block' }} >
                        <div style={{ backgroundColor: hover == chat.message ? 'rgb(128,0,30)' : 'rgb(0,0,118)', color: 'white', float: 'left', borderRadius: '25vh', paddingInline: '2vh', paddingBlock: '1vh' }}>
                          {chat.message}
                        </div>
                      </div>
                      :
                      <>
                        <div style={{ display: 'block', backgroundColor: hover == chat.message ? 'rgb(128,0,30)' : 'black', color: 'white', borderRadius: '25vh', float: 'right', paddingInline: '2vh', paddingBlock: '1vh' }}>
                          {chat.message}
                        </div>
                      </>
                    }

                  </div>
                  <br />
                  <br />
                  <br />
                </>
              )}

          </div>
          <div style={{ position: 'absolute', bottom: 13, width: '62%', display: 'inline-flex' }}>
            <TextField disabled={!(!!selectedUser)} onChange={setMessageHandler} value={message} color="secondary" size='small' fullWidth />
            <IconButton disabled={!(!!selectedUser)} onClick={sendMessageHandler} style={{ marginTop: '-1vh' }}><SendIcon disabled={true} color="secondary" fontSize='large' /></IconButton>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
