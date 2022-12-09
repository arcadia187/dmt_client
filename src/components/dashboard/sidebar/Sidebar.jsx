import "./sidebar.scss";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import Timeline from "@mui/icons-material/Timeline";
import PermIdentity from "@mui/icons-material/PermIdentity";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import AttachMoney from '@mui/icons-material/AttachMoney';
import BarChart from "@mui/icons-material/BarChart";
import MailOutline from "@mui/icons-material/MailOutline";
import DynamicFeed from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TrendingUp from "@mui/icons-material/TrendingUp";
import ReportIcon from "@mui/icons-material/Report";
import { NavLink } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
export default function Sidebar() {
  return (
    <div className="dashBsideBar">
      <div className="dashBsideBarWrapper">
        <div className="dashBsideBarMenu">
          <h3 className="dashBsideBarMenuTitle">Dashboard</h3>
          <ul className="dashBsideBarMenuList">
            <NavLink className="dashBSideBarLink" to="/admin/dashboard">
              <li className="dashBsideBarMenuListItems">
                <LineStyleIcon className="dashBsideBarMenuListItemsIcon" />
                Home
              </li>
            </NavLink>
            <li className="dashBsideBarMenuListItems">
              <Timeline className="dashBsideBarMenuListItemsIcon" />
              Analytics
            </li>
            <li className="dashBsideBarMenuListItems">
              <TrendingUp className="dashBsideBarMenuListItemsIcon" />
              sales
            </li>
          </ul>
        </div>
        <div className="dashBsideBarMenu">
          <h3 className="dashBsideBarMenuTitle">Quick Menu</h3>
          <ul className="dashBsideBarMenuList">
            <NavLink className="dashBSideBarLink" to="/admin/users">
              <li className="dashBsideBarMenuListItems">
                <PermIdentity className="dashBsideBarMenuListItemsIcon" />
                Users
              </li>
            </NavLink>

            <NavLink className="dashBSideBarLink" to="/admin/product">
              <li className="dashBsideBarMenuListItems">
                <PlayArrowIcon className="dashBsideBarMenuListItemsIcon" />
                Products
              </li>
            </NavLink>
            <NavLink to="/admin/orders" className="dashBSideBarLink">
              <li className="dashBsideBarMenuListItems">
                <FormatListBulletedIcon className="dashBsideBarMenuListItemsIcon" />
                Orders
              </li>
            </NavLink>
            <li className="dashBsideBarMenuListItems">
              <BarChart className="dashBsideBarMenuListItemsIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="dashBsideBarMenu">
          <h3 className="dashBsideBarMenuTitle">Notifications</h3>
          <ul className="dashBsideBarMenuList">
            <li className="dashBsideBarMenuListItems">
              <MailOutline className="dashBsideBarMenuListItemsIcon" />
              Mail
            </li>
            <li className="dashBsideBarMenuListItems">
              <DynamicFeed className="dashBsideBarMenuListItemsIcon" />
              Feedback
            </li>
            <li className="dashBsideBarMenuListItems">
              <ChatBubbleOutline className="dashBsideBarMenuListItemsIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="dashBsideBarMenu">
          <h3 className="dashBsideBarMenuTitle">Staff</h3>
          <ul className="dashBsideBarMenuList">
            <li className="dashBsideBarMenuListItems">
              <WorkOutlineIcon className="dashBsideBarMenuListItemsIcon" />
              Manage
            </li>
            <li className="dashBsideBarMenuListItems">
              <Timeline className="dashBsideBarMenuListItemsIcon" />
              Analytics
            </li>
            <li className="dashBsideBarMenuListItems">
              <ReportIcon className="dashBsideBarMenuListItemsIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
