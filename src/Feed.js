import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import React, { useEffect, useState } from 'react'
import { collection, db, onSnapshot, addDoc, Timestamp, query, orderBy } from './firebase'
import './feed.css'
import InputOption from './InputOption';
import Post from './Post';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';

function Feed() {

    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');
    useEffect(() => {
        const unsc = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', "desc")),
            (snap) => {
                setPosts(
                    snap.docs.map(
                        (doc) => (
                            {
                                id: doc.id,
                                data: doc.data()
                            }
                        ))
                )
            })
        return () => {
            unsc();
        }
    }, [])

    const sendPost = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'posts'), {
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || '',
            timestamp: Timestamp.now()
        });

        setInput('');

    }
    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form action="">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>

                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" /><InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" /><InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7FC15E" />
                </div>
            </div>
            {/* Post */}
            <FlipMove>
                {posts?.map(({ id, data: { name, description, message, photoUrl } }) => {
                    return <Post
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                })}
            </FlipMove>

        </div>
    )
}

export default Feed;
