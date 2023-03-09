import { useEffect, useState } from "react";
import getRandomData from "../../../data";
import { serverPath } from "../../../helper/varibles";


import Button from "../Button";



const Request = () => {
     
    

    const [person, setPerson] = useState( getRandomData );
    const [isLoading, setLoading] = useState(false);
        
    
    const handleChange = (e) => {
        setPerson({...person, [e.target.name]: e.target.value});
    }

    
     const currentDate = () => {
        const number = new Date();

        return number.toLocaleDateString();
    };

      
      const clearForm = () => {
        setLoading(false);
        setPerson({
        name: "",
        phone: "",
        email: "",
        product: "none",
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true); 

        const currentRequest = {
            ...person,
            date: currentDate(),
            status: "new",
          };

        fetch( serverPath  , {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(currentRequest)
        }).then(() => {
            clearForm();
            setLoading(false);
        })


    }

     
   
   
    
    return ( 
      
    <form onSubmit={(e) => submitHandler(e)} id="form" method="POST" action="">
        <label>Ваши данные:</label>
            <div className="form-group">
                <input 
                    id="name" 
                    type="text" 
                    name="name" 
                    autoComplete="on" 
                    className="form-control" 
                    placeholder="Имя и Фамилия" 
                    required 
                    value={person.name} 
                    onChange={handleChange} 
                />
            </div>
                <div className="form-group">
                    <input 
                        id="phone" 
                        type="text" 
                        name="phone" 
                        autoComplete="on" 
                        className="form-control" 
                        placeholder="Телефон" 
                        value={person.phone} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        id="email" 
                        type="email" 
                        name="email" 
                        autoComplete="on" 
                        className="form-control" 
                        placeholder="Email" 
                        required 
                        value={person.email} 
                        onChange={handleChange} 
                    />
                </div>


        <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Продукт:</label>
                <select 
                    id="exampleFormControlSelect1"
                    name="product" 
                    className="form-control" 
                    value={person.product} 
                    onChange={handleChange} 
                    >
                   
                    <option value="course-html">Курс по верстке</option>
                    <option value="course-js">Курс по JavaScript</option>
                    <option value="course-vue">Курс по VUE JS</option>
                    <option value="course-php">Курс по PHP</option>
                    <option value="course-wordpress">Курс по WordPress</option>
                </select>
        </div>
    
        <Button isLoading={isLoading} />
        </form>

     );
}
 
export default Request;