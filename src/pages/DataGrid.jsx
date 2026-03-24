import React, { useState } from "react";
import GridWithTable from '../components/GridWithTable';
import GridWithVirtualized from '../components/GridWithVirtualized';
import Counter from '../components/Counter';

const DataGrid = () => {
    const [isGrid, setIsGrid] = useState('');

    const handleNormalClick = (type) => {
        setIsGrid(type);
    }

// string reversal 
    // let a = 'charu';
    // let b = 'charu is my name';
    // console.log(a.split('').reverse().join(''));
    // console.log(b.split(' '));
    // let c = b.split(' ');
    // let d = '';
    // for (let i = 0; i < c.length; i++) {
    //     console.log(c[i], 'forLoop');
    //     console.log(c[i].split(''), 'forLoop2');
    //     console.log(c[i].split('').reverse(), 'forLoop3');
    //     console.log(c[i].split('').reverse().join(''), 'forLoop3');
    //     d = d + " " + c[i].split('').reverse().join('')
    // }
    // console.log(d, 'endesult')

    return (
        <>
        <div>
            <button onClick={() => handleNormalClick('normal')}> Normal Grid </button>
            <button onClick={() => handleNormalClick('virtual')}> Virtualized Grid </button>
            <button onClick={() => handleNormalClick('button')}>Counter</button>
        </div>
        {
            isGrid === 'normal' && 
            <GridWithTable /> }
             {isGrid === 'virtual' &&
            <GridWithVirtualized />}
            {isGrid === 'button' &&
            <Counter />}
        
        </>
    )
}

export default DataGrid;