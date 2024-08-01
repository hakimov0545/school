import React from "react";

export const getUser = async (id: number) => {
	const token = localStorage.getItem("token");
	if (!token) {
		return;
	}
	const response = await fetch(
		`https://7da6d4a4bea8c10a.mokky.dev/users/${id}`,
		{
			headers: { Authorization: "Bearer " + token },
		}
	);

	const data = await response.json();

	return data;
};

export const getTimetable = async (class_id: number) => {
	const token = localStorage.getItem("token");
	if (!token) {
		return;
	}
	const response = await fetch(
		`https://7da6d4a4bea8c10a.mokky.dev/timetables?class_id=${class_id}`,
		{
			headers: { Authorization: "Bearer " + token },
		}
	);

	const data = await response.json();

	return data;
};
