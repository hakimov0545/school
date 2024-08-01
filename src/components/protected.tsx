import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Student } from "./Student";
import { Teacher } from "./Teacher";
import { Admin } from "./Admin";
import { useUser } from "./auth";
import { getUser } from "./Api";

export interface Timetable {
	id: number;
	class_id: number;
	table: {
		mon: string[];
		tue: string[];
		wed: string[];
		thu: string[];
		fri: string[];
		sat: string[];
	};
}

export let timetables: Timetable[];

const ProtectedComponent: React.FC = () => {
	const navigate = useNavigate();
	const { user, setUser } = useUser();

	useEffect(() => {
		const fetchProtectedData = async () => {
			try {
				const token = localStorage.getItem("token");
				const userRes = localStorage.getItem("user");
				if (userRes) setUser(JSON.parse(userRes));
				if (!token) {
					navigate("/");
					return;
				}

				const usersRes = await fetch(
					"https://7da6d4a4bea8c10a.mokky.dev/users",
					{
						headers: { Authorization: "Bearer " + token },
					}
				);

				const usersData = await usersRes.json();

				console.log("protected users", { usersData });

				const timetablesRes = await fetch(
					`https://7da6d4a4bea8c10a.mokky.dev/timetables`,
					{
						headers: { Authorization: "Bearer " + token },
					}
				);

				const timetablesData = await timetablesRes.json();

				timetables = timetablesData;

				console.log("protected timetable", {
					timetablesData,
				});
			} catch (e) {
				console.log(e);
			}
		};

		fetchProtectedData();

		const fetchUserData = async () => {
			const token = localStorage.getItem("token");

			if (token) {
				try {
					if (user.id) {
						const userRes = await getUser(user.id);

						if (!userRes.ok) {
							throw new Error(
								"Network response was not ok"
							);
						}

						setUser(userRes);
					} else {
						let res = localStorage.getItem("user");

						if (res) {
							let userRes = JSON.parse(res);
							let userResponse = await getUser(
								userRes.id
							);

							setUser(userResponse);

							console.log("responses");
							console.log(userResponse);
						}
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		fetchUserData();
	}, []);

	console.log({ user });

	const role = user.role;

	return (
		<div>
			<p className="font-bold text-2xl mt-10 mx-auto">
				{role == "student" ? (
					<Student />
				) : role == "teacher" ? (
					<Teacher />
				) : (
					<Admin />
				)}
			</p>
		</div>
	);
};

export default ProtectedComponent;
