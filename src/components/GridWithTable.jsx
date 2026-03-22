import React, { useEffect, useState } from "react";
import "./grid.css";

const GridWithTable = () => {
    const [responseData, setResponseData] = useState();
    const [filter, setFilter] = useState({
        category: '',
        year: '',
        laureates: ''
    });

    useEffect (() => {
        fetch('https://api.nobelprize.org/v1/prize.json').then(res => res.json()).then(data => setResponseData(data.prizes)).catch(err => console.log(err));

    }, [])
console.log(responseData, 'response')

const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, 'name');
    console.log(value, 'value')
    setFilter((prev) => ({...prev, [name]: value.toLowerCase()}));
}

const filteredData = responseData && responseData.filter((item) => {
    const laureates = item && item.laureates && item.laureates.map(items => (`${items.firstname} ${items.surname}`)).join(', ');
    return (
        item.category.toLowerCase().includes(filter.category) && item.year.includes(filter.year) && laureates && laureates.includes(filter.laureates)
)});

console.log(filteredData, 'filteredData')
    return (
        <>
        <table className="tableGrid">
            <thead className="tableHeadGrid">
                <tr>
                    <th>Category
                    <input type="text" name='category' onChange={(e) => handleChange(e)} /></th>
                    <th>Year
                    <input type="text"  name='year' onChange={(e) => handleChange(e)} /></th>
                    <th>Laureates
                    <input type="text" name='laureates' onChange={(e) => handleChange(e)} /></th>
                </tr>
            </thead>
            <tbody>
                {filteredData && filteredData.map((item, index) => (
                    <tr key={index} className="tableBodyGrid">
                        <td>{item && item.category}</td>
                        <td>{item && item.year}</td>
                        <td>
                        {item && item.laureates && item.laureates.map((items) => (
                             `${items.firstname} ${items.surname}`
                        )).join(', ')}
                        </td>
                    </tr>
                ))

                }
            </tbody>
        </table>        
        </>
    )
}

export default GridWithTable;