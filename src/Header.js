import React from 'react'
import './header.css'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import linkedinIcon from './images/linkedin.png'
import HeaderOption from './HeaderOption';
import { useDispatch } from 'react-redux';
import {signOut, auth} from './firebase';
import { logout } from './features/userSlice';

function Header() {

    const dispatch = useDispatch();

    const logoutOfApp = () => {
        dispatch(logout());
        signOut(auth);
    }
    return (
        <div className="header">
            <div className="header_left">
                <img src={linkedinIcon} alt="linkedin" />
                <div className="header_search">
                    <SearchIcon />
                    <input placeholder="Search" type="text" />
                </div>
            </div>
            <div className="header_right">
                <HeaderOption Icon={HomeIcon} title='Home'/>
                <HeaderOption Icon={SupervisorAccountIcon} title='My Network'/>
                <HeaderOption Icon={BusinessCenterIcon} title='Jobs'/>
                <HeaderOption Icon={ChatIcon} title='Messaging'/>
                <HeaderOption Icon={NotificationsIcon} title='Notifications'/>
                <HeaderOption avatar='https://i.pravatar.cc/300' title='me' onClick={logoutOfApp}/>
            </div>
        </div>
    )
}

export default Header;
