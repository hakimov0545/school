import React from "react";
import { FaTable } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Layout, { MenuItemsType } from "../layout";
import { LuLayoutDashboard } from "react-icons/lu";

const menuItems: MenuItemsType[] = [
	{
		title: "Dashboard",
		icon: <LuLayoutDashboard />,
	},
	{
		title: "Classes",
		icon: <SiGoogleclassroom />,
	},
	{
		title: "Teachers",
		icon: <FaChalkboardTeacher />,
	},
	{
		title: "Students",
		icon: <PiStudent />,
	},
	{
		title: "Timetable",
		icon: <FaTable />,
	},
	{
		title: "Profile",
		icon: <CgProfile />,
	},
];

export const Admin = () => {
	return (
		<Layout menuItems={menuItems} role="Admin">
			Admin
		</Layout>
	);
};
