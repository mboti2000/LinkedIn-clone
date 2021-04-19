import React, { forwardRef } from 'react';
import './Post.css';
import InputOption from './InputOption';

import { Avatar } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import {  useDispatch, useSelector } from 'react-redux';
import { selectPosts, deletePost } from './features/postSlice';
import { selectUser } from './features/userSlice';
import { db } from './firebase';


const Post = forwardRef(({ id, name, description, message, photoURL }, ref) =>{
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const user = useSelector(selectUser);

    const renderDeleteButton = () =>{
        if(user.email === description){
            return (
                <div onClick={() => db.collection('posts').doc(id).delete()} class="post__delete">
                    <InputOption Icon={DeleteOutlineIcon} title="Delete" color="red"/>
                </div>
            );
        }
    };

    return (
        <div ref={ref} className="post">
            <div className="post__header">
                
                <Avatar src={photoURL}></Avatar>
                <div className="post__info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>

                {renderDeleteButton()}
                
            </div>

            <div className="post__body">
                <p>{message}</p>
            </div>

            <div className="post__buttons">
                <InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray" />
                <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
                <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
                <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
            </div>

        </div>
    );
});

export default Post;