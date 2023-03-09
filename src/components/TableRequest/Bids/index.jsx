import { Link } from "react-router-dom";


function Bids  ({ users}) {

	const reverseProduct = {
		"course-vue": "Курс по VUE JS",
		"course-php": "Курс по PHP",
		"course-js": "Курс по JavaScript",
		"course-html": "Курс по верстке",
		"course-wordpress": "Курс по WordPress",
	  };
	
	  const badges = {
		new: "badge-danger",
		inwork: "badge-warning",
		complete: "badge-success",
	  };
	
	  const reverseStatus = {
		new: "new",
		inwork: "inwork",
		complete: "complete",
	  };
	
	  return (
		<table className="table fs-14">
		  <thead>
			<tr>
			  <th>ID</th>
			  <th>дата</th>
			  <th>продукт</th>
			  <th>имя</th>
			  <th>email</th>
			  <th>телефон</th>
			  <th>статус</th>
			  <th></th>
			</tr>
		  </thead>
		  <tbody id="tbody">
						{users.map((user) => (
							<tr key={user.id}>
							<th scope="row">{user.id}</th>
							<td>{user.number}</td>
							<td>{reverseProduct[user.product]}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.phone}</td>
							<td>
							<div className={`badge badge-pill ${badges[user.status]}`}>
								{reverseStatus[user.status]}
							</div>
							</td>
								<td>
								<Link to={`/edit/${user.id}`}>
									Редактировать
								</Link>
								</td>
						</tr>
						))} 
					</tbody>
				</table>
	  );
	}
	
	export default Bids;






