import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { StudentTimetable } from "./student";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function TeacherTimetable() {
	const [value, setValue] = React.useState(0);

	const handleChange = (
		event: React.SyntheticEvent,
		newValue: number
	) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="11A" {...a11yProps(0)} />
					<Tab label="11B" {...a11yProps(1)} />
					<Tab label="9A" {...a11yProps(2)} />
					<Tab label="9B" {...a11yProps(3)} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<StudentTimetable id={1} />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<StudentTimetable id={2} />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={2}>
				<StudentTimetable id={3} />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={3}>
				<StudentTimetable id={4} />
			</CustomTabPanel>
		</Box>
	);
}
