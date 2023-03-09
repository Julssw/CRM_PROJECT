
import Bids from "./Bids";
import LeftPanel from "./LeftPanel";
import StatusBar from "./StatusBar";
import { useEffect, useState } from "react";
import { serverPath } from "../../helper/varibles";


function Tables() {
	document.body.className = "with-nav body--dashboard";

	const [users, setUsers] = useState([]);
	const [filterStatus, setFilterStatus] = useState("all");
	const [filterProduct, setFilterProduct] = useState("all");

	const [flag, setFlag] = useState(true);
	let filterByProduct, filteredElements;

	const updateFlag = () => {
		setFlag((prevFlag) => !prevFlag);
	  };
	
	  useEffect(() => {

		const product = localStorage.getItem("filter-product");
		const status = localStorage.getItem("filter-status");
	

		setFilterProduct(product || "all");
		setFilterStatus(status || "all");
	
		const controller = new AbortController()
	
		fetch(serverPath, {
		  signal: controller.signal,
		})
		  .then((response) => {
			if (response.ok !== true) {
			  throw Error("Could not fetch the data from this resource");
			}
			return response.json();
		  })
		  .then((data) => {
			setUsers(data);
		  })
		  .catch((err) => {
			if (err.name === "AbortError") {
			  console.log("Fetch aborted");
			} else {
			  console.log(err);
			}
		  });
	
		return () => {
		  controller.abort();
		};
	  }, [flag]);
	
	 
	  if (filterProduct === "all") {
		filterByProduct = JSON.parse(JSON.stringify(users));
	  } else {
		filterByProduct = users.filter((user) => {
		  return user.product === filterProduct;
		});
	  }
	
	 
	  if (filterStatus === "all") {
		filteredElements = JSON.parse(JSON.stringify(filterByProduct));
	  } else {
		filteredElements = filterByProduct.filter((user) => {
		  return user.status === filterStatus;
		});
	  }
	

	  const clickStatus = (e) => {
		e.preventDefault();
	
		localStorage.setItem("filter-status", e.target.dataset.value);
	
		setFilterStatus(e.target.dataset.value);
	  };
	

	  const chooseProduct = (e) => {
		localStorage.setItem("filter-product", e.target.value);
	
		setFilterProduct(e.target.value);
	  };
	

	  const newUsers = users.filter((user) => {
		return user.status === "new";
	  });
	
	  const buttons = [
		{
		  value: "all",
		  description: "Все",
		},
		{
		  value: "new",
		  description: "Новые",
		},
		{
		  value: "inwork",
		  description: "В работе",
		},
		{
		  value: "complete",
		  description: "Завершенные",
		},
	  ];

    return ( 
        <>
				
				<LeftPanel 
					buttons={buttons}
					countNewRequests={newUsers.length}
					clickStatus={clickStatus}
				/>
			
				<StatusBar
					chooseProduct={chooseProduct}
					clickStatus={clickStatus}
					buttons={buttons}
				/>

				{/*{isLoading && <h3></h3>}*/}

				 <Bids updateFlag={updateFlag} users={filteredElements}/> 
				
	
			
		</>

     );
}
 
export default Tables;


