import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { ActionsStudent } from "../components/actions";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 70, flex: 0.1 },
	{ field: "name", headerName: "Name", width: 130, flex: 0.3 },
	{
		field: "address",
		headerName: "Address",
		width: 130,
		flex: 0.2,
	},
	{
		field: "class",
		headerName: "Class",
		width: 90,
		flex: 0.2,
	},
	{
		field: "actions",
		headerName: "Actions",
		width: 100,
		flex: 0.3,
		renderCell: (params) => (
			<ActionsStudent
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
		name: "Asqar Rahimov",
		address: "41 Saint ST",
		class: "11A",
	},
	{
		id: 2,
		name: "Doston Kudratov",
		address: "12 Road ST",
		class: "11B",
	},
	{
		id: 3,
		name: "Laziz Erkinov",
		address: "28 Zulfiya ST",
		class: "9A",
	},
	{
		id: 4,
		name: "Malika Islomova",
		address: "45 Main ST",
		class: "9B",
	},
	{
		id: 5,
		name: "Baxrom Yunusov",
		address: "84 Temur ST",
		class: "11A",
	},
	{
		id: 6,
		name: "Abdulaziz Hakimov",
		address: "16 Road ST",
		class: "11A",
	},
	{
		id: 7,
		name: "Botir Akramov",
		address: "94 Zulfiya ST",
		class: "9B",
	},
];

export default function Students() {
	return (
		<Box sx={{ flex: "1", width: "100%" }}>
			<Typography
				sx={{ fontWeight: "bold", marginBottom: "10px" }}
			>
				Students
			</Typography>
			<div style={{ width: "100%" }}>
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
