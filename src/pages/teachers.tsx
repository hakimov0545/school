import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { ActionsTeacher } from "../components/actions";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 70, flex: 0.1 },
	{
		field: "firstName",
		headerName: "First Name",
		width: 130,
		flex: 0.3,
	},
	{
		field: "lastName",
		headerName: "Last Name",
		width: 130,
		flex: 0.3,
	},
	{
		field: "address",
		headerName: "Address",
		width: 130,
		flex: 0.2,
	},
	{ field: "class", headerName: "Class", width: 90, flex: 0.2 },
	{
		field: "subject",
		headerName: "Subject",
		width: 100,
		flex: 0.1,
	},
	{ field: "phone", headerName: "Phone", width: 100, flex: 0.2 },
	{
		field: "actions",
		headerName: "Actions",
		width: 130,
		flex: 0.3,
		renderCell: (params) => (
			<ActionsTeacher
				id={params.row.id}
				onEdit={(id) => console.log(`Edit ${id}`)}
				onDelete={(id) => console.log(`Delete ${id}`)}
			/>
		),
	},
];

const rows = [
	{
		id: 1,
		firstName: "Baxrom",
		lastName: "Kambarov",
		address: "77 Main ST",
		class: "11A",
		subject: "Maths",
		phone: "998051435",
	},
	{
		id: 2,
		firstName: "John",
		lastName: "Doe",
		address: "41 Saint ST",
		class: "11B",
		subject: "English",
		phone: "335142564",
	},
	{
		id: 3,
		firstName: "Shaxlo",
		lastName: "Kudratova",
		address: "65 Road ST",
		class: "9A",
		subject: "Maths",
		phone: "998051435",
	},
	{
		id: 4,
		firstName: "Shaxnoza",
		lastName: "Rustamova",
		address: "18 Main ST",
		class: "9B",
		subject: "Maths",
		phone: "998051435",
	},
];

export default function Teachers() {
	return (
		<Box sx={{ flex: "1" }}>
			<Typography
				sx={{ fontWeight: "bold", marginBottom: "10px" }}
			>
				Teachers
			</Typography>
			<div className="flex-1">
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
					checkboxSelection
				/>
			</div>
		</Box>
	);
}
