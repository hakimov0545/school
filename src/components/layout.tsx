import React, { useEffect, useState } from "react";
import {
	styled,
	useTheme,
	Theme,
	CSSObject,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, {
	AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { RouteContext } from "../App";
import { LuLayoutDashboard } from "react-icons/lu";
import { SiGoogleclassroom } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { Grid } from "@mui/material";
import Classes from "../pages/classes";
import Teachers from "../pages/teachers";
import Students from "../pages/students";
import { StudentDashboard } from "../pages/Dashboards/student";
import { TeacherDashboard } from "../pages/Dashboards/teacher";
import { AdminDashboard } from "../pages/Dashboards/admin";
import { StudentTimetable } from "../pages/Timetables/student";
import { AdminTimetable } from "../pages/Timetables/admin";
import { Profile } from "../pages/profile";
import { StudentMarks } from "../pages/Marks/student";
import { TeacherMarks } from "../pages/Marks/teacher";
import { StudentHomework } from "../pages/Homeworks/student";
import { TeacherHomework } from "../pages/Homeworks/teacher";
import TeacherTimetable from "../pages/Timetables/teacher";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

export type MenuItemsType = {
	title: string;
	icon: React.ReactElement;
};

interface LayoutProps {
	menuItems: MenuItemsType[];
	children: React.ReactNode;
	role: string;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function Layout({
	menuItems,
	children,
	role,
}: LayoutProps) {
	const theme = useTheme();
	const [activePage, setActivePage] = useState("Dashboard");
	const [open, setOpen] = useState(true);
	const [activeComponent, setActiveComponent] =
		useState<React.ReactNode>(null);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const handleActivePage = (
			activePage: string,
			role: string
		) => {
			try {
				switch (activePage) {
					case "Dashboard":
						if (role === "Student")
							return <StudentDashboard />;
						if (role === "Teacher")
							return <TeacherDashboard />;
						return <AdminDashboard />;

					case "Timetable":
						if (role === "Student")
							return <StudentTimetable id={0} />;
						if (role === "Teacher")
							return <TeacherTimetable />;
						return <AdminTimetable />;

					case "Marks":
						if (role === "Student")
							return <StudentMarks />;
						return <TeacherMarks />;

					case "Homework":
						if (role === "Student")
							return <StudentHomework />;
						return <TeacherHomework />;

					case "Classes":
						return <Classes />;

					case "Teachers":
						return <Teachers />;

					case "Profile":
						return <Profile />;

					case "Students":
						return <Students />;

					default:
						return null;
				}
			} catch (error) {
				console.log(error);
				return null;
			}
		};

		setActiveComponent(handleActivePage(activePage, role));
	}, [activePage, role]);

	return (
		<Box
			sx={{
				display: "flex",
			}}
		>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						School Project
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				open={open}
				sx={{
					".MuiPaper-root": {
						background: (theme) =>
							theme.palette.primary.dark,
						color: "white",
					},
				}}
			>
				<DrawerHeader>
					<Typography
						className="flex-1 pl-3"
						sx={{ fontWeight: "bold" }}
					>
						{role}
					</Typography>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon sx={{ color: "white" }} />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{menuItems.map(({ title, icon }) => (
						<ListItem
							key={title}
							disablePadding
							sx={{ display: "block" }}
							onClick={() => setActivePage(title)}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open
										? "initial"
										: "center",
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
										color: "white",
									}}
								>
									{icon}
								</ListItemIcon>
								<ListItemText
									primary={title}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Grid container>
					<Grid item xs={12}>
						{activeComponent}
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
