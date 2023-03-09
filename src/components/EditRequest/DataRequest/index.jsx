import { useEffect, useState } from "react";
import { serverPath } from "../../../helper/varibles";
import { useNavigate, useParams } from "react-router-dom";

const Data = () => {

	const [person, setPerson] = useState ( {
		id: "",
		name: "",
    	phone: "",
   	    email: "",
    	product: "",
    	status: "",
    	number: "",
    	} );
	
	const navigate = useNavigate();
        
    const { id } = useParams();
	

	

	const getCurrentRequest = () => {
		fetch( serverPath + id )
		  .then((res) => {
			return res.json();
		  })
		  .then((data) => {
			setPerson({ ... data});
		  })
		  .catch((err) =>{
			console.log(err) 
		  })
	  };

	  useEffect(() => {
		getCurrentRequest();
	  }, []);

    const submitHandler = (e) => {
        e.preventDefault();

		const controller = new AbortController()
    	const signal = controller.signal
    
		const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(person),
		
		};

		fetch( serverPath + id, requestOptions, {signal})
		.then( ()=> navigate('/table'))
		.catch((err) => {
		if (err === 'AbortError'){
			console.log('fetch aborted')
		}
		console.log(err)
		})

		return ()=> {
		controller.abort()
		}

        
		
    }

	const handleDelete = () =>{
		fetch( serverPath + id, {
            method: 'DELETE'
        }).then(()=>{
            navigate('/table')
        })

	}

	const changeInfo = (e) => {
		//if (e.target.value.length > 1){
		  setPerson( prev => {
			return {
			  ...prev,
			  [e.target.name]: e.target.value
			}
		  })
		//}
	
	  }
	 

    return ( 
		<div className="row">
		<div className="col">
			
		<form onSubmit={(e) => submitHandler(e)}>
       						 <div className="card mb-4 ">
								<div className="card-header">Данные о заявке</div>
								<div className="card-body">
									<div className="row mb-3">
										<div className="col-md-2">
											<strong>ID:</strong>
										</div>
										<div className="col">Заявка №<span id="number">{person.id}</span></div>
										
										<input name="id" type="hidden" id="id" />
									</div>

									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Дата создания:</strong>
										</div>
										<div className="col" id="date">{person.number}</div>
									</div>
  
									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Продукт:</strong>
										</div>
										<div className="col">
											<select 
												id="product" 
												name="product" 
												className="custom-select" 
												value={person.product} 
                    							onChange={changeInfo} 
												>
												<option value="course-html">Курс по верстке</option>
												<option value="course-js">
													Курс по JavaScript
												</option>
												<option value="course-vue">Курс по VUE JS</option>
												<option value="course-php">Курс по PHP</option>
												<option value="course-wordpress">
													Курс по WordPress
												</option>
											</select>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Имя:</strong>
										</div>
										<div className="col">
											<input
												type="text"
												className="form-control"
												value={person.name}
												id="name"
												onChange={changeInfo}
												name="name"
											/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Email:</strong>
										</div>
										<div className="col">
											<input
												type="text"
												className="form-control"
												value={person.email}
												id="email"
												onChange={changeInfo}
												name="email"
												/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Телефон:</strong>
										</div>
										<div className="col">
											<input
												type="text"
												className="form-control"
												value={person.phone}
												id="phone"
												onChange={changeInfo}
												name="phone"
												/>
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Статус заявки:</strong>
										</div>
										<div className="col">
											<select 
												className="custom-select" 
												id="status" 
												name="status"
												value={person.status} 
                    							onChange={changeInfo} 
												>
												<option >Выберите...</option>
												<option value="new">Новая</option>
												<option value="inwork">В работе</option>
												<option value="complete">Завершена</option>
											</select>
										</div>
									</div>
									
								</div>
								
							</div>
							</form>

							<div className="row justify-content-between">
								<div className="col text-right">
									<button 
										type="submit" 
										className="btn btn-primary"
										onClick={submitHandler}
										>
											Сохранить изменения
										</button>
								</div>
							</div>

							<div className="row justify-content-between">
            					<div className="col text-right mt-10">
               					  <button 
									  type="submit" 
									  className="btn btn-primary"
									  onClick={handleDelete}
									  >
										  Удалить
								  </button>
            					</div>
       						 </div>
		</div>
	</div>
					
     );
}
 
export default Data;