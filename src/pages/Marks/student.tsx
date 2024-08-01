import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { userId, useUser } from "../../components/auth";
import { getUser } from "../../components/Api";

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

interface User {
	id: number;
	firstName: string;
	lastName: string;
	class_id: number;
	address: string;
	phone: string;
	login: string;
	role: string;
	marks: {
		English: number[];
		Maths: number[];
		PI: number[];
		Russian: number[];
	};
}

function createData(name: string, marks: number[]) {
	return { name, marks };
}

let userRes: User = {
	id: 0,
	firstName: "",
	lastName: "",
	class_id: 0,
	address: "",
	phone: "",
	login: "",
	role: "",
	marks: {
		English: [],
		Maths: [],
		PI: [],
		Russian: [],
	},
};

function qisqartir(res: any) {
	const num = parseFloat(res);

	if (num % 1 === 0) return num;
	return parseFloat(num.toFixed(2));
}

function getMaxLength(
	rows: { name: string; marks: number[] }[]
): number {
	return Math.max(...rows.map((row) => row.marks.length));
}

function padArray(arr: number[], length: number): number[] {
	return [
		...arr,
		...Array(Math.max(length - arr.length, 0)).fill(0),
	];
}

export default function CustomizedTables() {
	const { user, setUser } = useUser();

	userRes = user;

	const rows = [
		createData("English", userRes.marks.English),
		createData("Maths", userRes.marks.Maths),
		createData("PI", userRes.marks.PI),
		createData("Russian", userRes.marks.Russian),
	];

	const maxLength = getMaxLength(rows);

	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 700 }}
				aria-label="customized table"
			>
				<TableBody>
					{rows.map((row) => {
						row.marks = padArray(row.marks, maxLength);
						let number = 0;
						let res = 0;
						return (
							<StyledTableRow key={row.name}>
								<StyledTableCell
									component="th"
									scope="row"
									sx={{
										fontWeight: "bold",
										fontSize: "18px",
									}}
								>
									{row.name}
								</StyledTableCell>
								{row.marks.map((mark, index) => {
									res += mark;
									number++;

									return (
										<StyledTableCell
											key={index}
											align="right"
										>
											{mark ? mark : ""}
										</StyledTableCell>
									);
								})}
								<StyledTableCell>
									{qisqartir(res / number)}
								</StyledTableCell>
							</StyledTableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export const StudentMarks = () => {
	return <CustomizedTables />;
};
