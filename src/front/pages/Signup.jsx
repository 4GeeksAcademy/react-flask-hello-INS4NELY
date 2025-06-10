import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const [name, setName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");

	const navigate = useNavigate();

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			setMsg("Completa los campos correctamente.");
			return;
		}

		setMsg("");

		const body = JSON.stringify({name, last_name, email, password });
		console.log(body);
		
		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create/user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body,
			});

			const data = await response.json();

			if (!response.ok) {
					setMsg(data.error);

			} else {
				navigate(`/`);
			}
		} catch (error) {
			console.log(error);
			setMsg("Error en la conexión con el servidor.");
		}
	};


	return (
		<div className="background-container">
			<div className="col-5 position-absolute top-50 start-50 translate-middle border rounded-3 p-3 p-md-4"  >
				<form className="login-width mx-auto" onSubmit={handleOnSubmit}>
					<h1 className="text-center mb-4">Registrate</h1>
					<div className="d-flex flex-column gap-3 mb-4">
						<div>
							<input name="name" type="text" className="form-control" placeholder="Name" onChange={e => setName(e.target.value)} required />
						</div>
						<div>
							<input name="last_name" type="text" className="form-control" placeholder="Last Name" onChange={e => setLastName(e.target.value)} required />
						</div>
						<div>
							<input name="email" type="email" className="form-control" placeholder="Correo electrónico" onChange={e => setEmail(e.target.value)} required />
						</div>
						<div>
							<input name="password" type="password" className="form-control" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
						</div>
					</div>
					{msg && (
						<div className="alert alert-danger d-flex justify-content-center align-items-center py-1 mb-3 gap-2" role="alert">
							<i className="ri-error-warning-line"></i>
							<div>{msg}</div>
						</div>
					)}
					<button type="submit" className="btn btn-dark w-100">Crear cuenta</button>
				</form>
			</div>
		</div>
	);
};
