// actions.tsx
import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

interface ActionsProps {
	id: number;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

export const ActionsClass: React.FC<ActionsProps> = ({
	id,
	onEdit,
	onDelete,
}) => {
	return (
		<>
			<Tooltip title="Edit">
				<IconButton
					onClick={(event) => {
						event.stopPropagation();
						onEdit(id);
					}}
					color="primary"
				>
					<EditIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Delete">
				<IconButton
					onClick={(event) => {
						event.stopPropagation();
						onDelete(id);
					}}
					color="error"
				>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</>
	);
};

export const ActionsTeacher: React.FC<ActionsProps> = ({
	id,
	onEdit,
	onDelete,
}) => {
	return (
		<>
			<Tooltip title="Edit">
				<IconButton
					onClick={(event) => {
						event.stopPropagation();
						onEdit(id);
					}}
					color="primary"
				>
					<EditIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Delete">
				<IconButton
					onClick={(event) => {
						event.stopPropagation();
						onDelete(id);
					}}
					color="error"
				>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</>
	);
};

export const ActionsStudent: React.FC<ActionsProps> = ({
	id,
	onEdit,
	onDelete,
}) => {
	return (
		<>
			<Tooltip title="Edit">
				<IconButton
					onClick={(event) => {
						event.stopPropagation();
						onEdit(id);
					}}
					color="primary"
				>
					<EditIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Delete">
				<IconButton
					onClick={(event) => {
						event.stopPropagation();
						onDelete(id);
					}}
					color="error"
				>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</>
	);
};
