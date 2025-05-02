import React,{useState,useEffect} from 'react';
import axios from 'axios';
import style from './style.css';

const Pagination = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [itemsToDisplay, setItemsToDisplay] = useState([]);
    const totalPage = Math.ceil((items.length)/10);

    var startIndex = (page-1)*10;
    var endIndex = startIndex + 10;

    useEffect(()=>{
        axios.get(' https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').
        then((data)=>{
            setItems(data.data);
            setItemsToDisplay(data.data.slice(0,10));
            console.log(data.data);
        }).catch((err)=>{
            console.log(err);
            alert("failed to fetch data.");
        });
    },[]);

    useEffect(()=>{
        const itemsToDisplay = items.slice(startIndex, endIndex);
        setItemsToDisplay(itemsToDisplay);
        console.log(itemsToDisplay); 
    },[page]);

    const previousHandler = () => {
        if(page > 1){
            setPage(page - 1);
            startIndex = (page-1)*10;
            endIndex = startIndex + 10;
        }
    };
    const nextHandler = () => {
        if(page !== totalPage){
            setPage(page + 1);
            startIndex = (page-1)*10;
            endIndex = startIndex + 10;
        }
    };

    return(
        <div style={{display:"flex", flexDirection:'column', alignItems:'center', width:"100%"}}>
            <table className='table'>
                <thead className='heading'>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsToDisplay.map((item, index) => {return (
                        <tr className='row' key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                        </tr>
                    )})}
                </tbody>
            </table>
            <div>
                <button onClick={previousHandler} disabled={page===1}>Previous</button>
                <span>{page}</span>
                <button onClick={nextHandler} disabled={page===totalPage}>Next</button>
            </div>
        </div>
    )
};

export default Pagination;