
import Request from "./Application";


const FormPage = () => {

    document.body.className = "with-nav radial-bg flex-center "

    return ( 
            <section>
                <div className="white-plate white-plate--payment mt-100">
                    <div className="container-fluid">                         
                        <div className="white-plate__header text-center">
                            <p className="white-plate__logo">
                                <span>Форма</span> заявок
                            </p>
                        </div> 
                            <div className="white-plate__line-between 
                            white-plate__line-between--main"></div>   
                        <Request />     
                    </div>
                </div>   
            </section>       
     ); 
};
 
export default FormPage;