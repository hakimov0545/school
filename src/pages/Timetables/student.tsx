import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Timetable, timetables } from "../../components/protected";
import { useUser } from "../../components/auth";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

interface StudentTimetableProps {
	id: number;
}

export const StudentTimetable: React.FC<StudentTimetableProps> = ({
	id,
}) => {
	const { user } = useUser();
	let timetable: Timetable | undefined;

	if (!Array.isArray(timetables)) {
		return <div>Error: Timetables data is not available.</div>;
	}

	if (id && id !== 0) {
		timetable = timetables.find(
			(t: Timetable) => t.class_id === id
		);
	} else {
		timetable = timetables.find(
			(t: Timetable) => t.class_id === user.class_id
		);
	}

	if (!timetable) {
		return <div>No timetable available</div>;
	}

	const { table } = timetable;
	const days: Array<keyof typeof table> = [
		"mon",
		"tue",
		"wed",
		"thu",
		"fri",
		"sat",
	];
	const maxPeriods = Math.max(
		...days.map((day) => table[day].length)
	);

	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 700 }}
				aria-label="customized table"
			>
				<TableHead>
					<TableRow>
						<StyledTableCell>Period</StyledTableCell>
						{days.map((day, index) => (
							<StyledTableCell align="left" key={index}>
								{day.charAt(0).toUpperCase() +
									day.slice(1)}
							</StyledTableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{Array.from({ length: maxPeriods }).map(
						(_, periodIndex) => (
							<StyledTableRow key={periodIndex}>
								<StyledTableCell
									component="th"
									scope="row"
									className="font-bold text-xl"
								>
									{periodIndex + 1}
								</StyledTableCell>
								{days.map((day, index) => (
									<StyledTableCell
										align="left"
										key={index}
									>
										{table[day][periodIndex] ||
											""}
									</StyledTableCell>
								))}
							</StyledTableRow>
						)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
