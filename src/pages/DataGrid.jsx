import React, { useState } from "react";
import GridWithTable from '../components/GridWithTable';
import GridWithVirtualized from '../components/GridWithVirtualized'

const DataGrid = () => {
    const [isGrid, setIsGrid] = useState('');

    const handleNormalClick = (type) => {
        setIsGrid(type);
    }

    return (
        <>
        <div>
            <button onClick={() => handleNormalClick('normal')}> Normal Grid </button>
            <button onClick={() => handleNormalClick('virtual')}> Virtualized Grid </button>
        </div>
        {
            isGrid === 'normal' && 
            <GridWithTable /> }
             {isGrid === 'virtual' &&
            <GridWithVirtualized />}
        
        </>
    )
}

export default DataGrid;