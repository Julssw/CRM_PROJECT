
import Data from "./DataRequest";
import Title from "./Title";


const EditForm = () => {
	document.body.className = "with-nav";

	
    return ( 
		<div className="form-wrapper">
			<div className="container-fluid">
				<Title />
				<Data />
			</div>
				
		</div>
		
    
     );
}
 
export default EditForm;