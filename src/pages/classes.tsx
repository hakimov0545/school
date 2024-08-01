import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { ActionsClass } from "../components/actions";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", flex: 0.1, minWidth: 50 },
	{ field: "name", headerName: "Class", flex: 0.3, minWidth: 100 },
	{
		field: "teacher",
		headerName: "Teacher",
		flex: 0.3,
		minWidth: 100,
	},
	{
		field: "students",
		headerName: "Students",
		flex: 0.2,
		minWidth: 50,
	},
	{
		field: "actions",
		headerName: "Actions",
		flex: 0.1,
		minWidth: 100,
		renderCell: (params) => (
			<ActionsClass
				id={params.row.id}
				onEdit={(id) => console.log(`Edit ${id}`)}
				onDelete={(id) => console.log(`Delete ${id}`)}
			/>
		),
	},
];

const rows = [
	{ id: 1, name: "11B", teacher: "Jon Doe", students: "21" },
	{ id: 2, name: "11A", teacher: "Jon Doe", students: "21" },
	{ id: 3, name: "11A", teacher: "Jon Doe", students: "21" },
	{ id: 4, name: "11A", teacher: "Jon Doe", students: "21" },
	{ id: 5, name: "11A", teacher: "Jon Doe", students: "21" },
	{ id: 6, name: "11A", teacher: "Jon Doe", students: "21" },
	{ id: 7, name: "11A", teacher: "Jon Doe", students: "21" },
	{ id: 8, name: "11A", teacher: "Jon Doe", students: "21" },
	{ id: 9, name: "11A", teacher: "Jon Doe", students: "21" },
];

export default function Classes() {
	return (
		<Box sx={{ width: "100%", overflowX: "auto" }}>
			<Typography
				sx={{ fontWeight: "bold", marginBottom: "10px" }}
			>
				Classes
			</Typography>
			<Box sx={{ width: "100%" }}>
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
					disableColumnMenu
					sx={{
						"& .MuiDataGrid-root": {
							width: "100%",
						},
					}}
				/>
			</Box>
		</Box>
	);
}
