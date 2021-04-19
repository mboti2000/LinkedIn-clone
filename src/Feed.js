import React, { useEffect, useState } from 'react';
import './Feed.css';
import InputOption from './InputOption';
import Post from './Post';
import { db } from './firebase';
import firebase from 'firebase';

import { selectUser } from './features/userSlice';
import {  useSelector } from 'react-redux';

import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import SubsciptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import FlipMove from 'react-flip-move';

const Feed = () =>{
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');

    const user = useSelector(selectUser);

    useEffect(() =>{
        db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot =>{
                setPosts(snapshot.docs.map(doc =>{
                    return {
                        id: doc.id,
                        data: doc.data()
                    };
            }))
        });
    }, []);

    const sendPost = (e) =>{
        e.preventDefault();
        
        db.collection('posts').add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoURL: user.photoURL || '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setInput('');
    };

    return (
        <div className="feed">
            <div className="feed__inputContainer">

                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text"/>
                        <button onClick={sendPost} type ="submit">Send</button>
                    </form>
                </div>

                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="Photo" color="#7085f9"/>
                    <InputOption Icon={SubsciptionsIcon} title="Video" color="#E7A33E"/>
                    <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD"/>
                    <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7FC1SE"/>
                </div>
                
            </div>
            
            <FlipMove>
                {posts.map(post =>{
                    return (
                        <Post 
                            key={post.id}
                            name={post.data.name} 
                            description={post.data.description} 
                            message={post.data.message} 
                            photoURL={post.data.photoURL}
                        />
                    );
                })}
            </FlipMove>

        </div>
    );
};

export default Feed;