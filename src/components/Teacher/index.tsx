import {
	AppBar,
	Box,
	CssBaseline,
	IconButton,
	Toolbar,
} from "@mui/material";
import React from "react";
import { FaTable } from "react-icons/fa";
import { RiNumbersLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Layout, { MenuItemsType } from "../layout";
import { LuLayoutDashboard } from "react-icons/lu";

const menuItems: MenuItemsType[] = [
	{
		title: "Dashboard",
		icon: <LuLayoutDashboard />,
	},
	{
		title: "Timetable",
		icon: <FaTable />,
	},
	{
		title: "Marks",
		icon: <RiNumbersLine />,
	},
	{
		title: "Homework",
		icon: <FaHome />,
	},
	{
		title: "Profile",
		icon: <CgProfile />,
	},
];

export const Teacher = () => {
	return (
		<Layout menuItems={menuItems} role="Teacher">
			Teacher
		</Layout>
	);
};
