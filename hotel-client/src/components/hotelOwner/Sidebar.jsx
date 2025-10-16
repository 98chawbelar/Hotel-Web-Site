import { MdAdd, MdList, MdOutlineDashboardCustomize } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: <MdOutlineDashboardCustomize />,
    },
    { name: "Add Rooms", path: "/owner/add-rooms", icon: <MdAdd /> },
    { name: "List Rooms", path: "/owner/list-rooms", icon: <MdList /> },
  ];

  return (
    <div className="md:w-64 w-16 border-r h-[94vh] md:h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
      {sidebarLinks.map((link, index) => (
        <NavLink
          to={link.path}
          key={index}
          end="/owner"
          className={({ isActive }) =>
            `flex items-center py-3 px-4 md:px-8 gap-3 ${
              isActive
                ? "border-r-4 md:border-r-[6px] bg-indigo-600/60 border-indigo-600 text-shadow-indigo-300"
                : "hover:bg-gray-100/90 border-white text-neutral-600/50"
            }  `
          }
        >
          <div className="min-h-6 min-w-6 flex items-center justify-center">
            {link.icon}
          </div>
          <p className="md:block hidden text-center">{link.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
