import './widgetSm.scss';
import Visibility from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../config.js';
export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axiosInstance.get('/users', {
          headers: {
            token:
              'Bearer ' + JSON.parse(localStorage.getItem('user'))?.accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  return (
    <div className='dashBWidgetSm'>
      <span className='dashBWidgetSmTitle'>New Join Members</span>
      <ul className='dashBWidgetSmList'>
        {newUsers &&
          newUsers.map((user, i) => (
            <li key={i} className='dashBWidgetSmListItem'>
              <img
                src={
                  user.profilePic ||
                  'https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg'
                }
                alt=''
                className='dashBWidgetSmListItemImg'
              />
              <div className='dashBWidgetSmListItemUser'>
                <span className='dashBWidgetSmListItemUsername'>
                  {user.username}
                </span>
              </div>
              <button className='dashBWidgetSmListItemButton'>
                <Visibility className='dashBWidgetSmListItemIcon' />
                Display
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
