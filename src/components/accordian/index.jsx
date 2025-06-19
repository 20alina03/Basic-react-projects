import { useState } from "react";
import data from './data';
import './style.css';

function Accordian() {
    const [selected, setSelected] = useState(null);  
    const [multiSelect, setMultiSelect] = useState(false);  
    const [multi, setMulti] = useState([]);  
    function handleSS(getCurrentId) {
        if (multiSelect) {
            
            if (multi.includes(getCurrentId)) {
                setMulti(multi.filter(id => id !== getCurrentId));
            } else {
               
                setMulti([...multi, getCurrentId]);
            }
        } else {
           
            setSelected(getCurrentId === selected ? null : getCurrentId);
        }
    }

    function toggleMode() {
        setMultiSelect(!multiSelect);
        setSelected(null);
        setMulti([]);
    }

    return (
        <>
            <div><h1>Accordion</h1></div>
            <div className="wrapper">
                <button onClick={toggleMode} className="MultiSelect">
                    {multiSelect ? "Enable Single Selection" : "Enable Multi Selection"}
                </button>
                <div className="accordion">
                    {data && data.length > 0 ? (
                        data.map((dataItem) => (
                            <div className="item" key={dataItem.id}>
                                <div onClick={() => handleSS(dataItem.id)} className="title">
                                    <h3>{dataItem.question}</h3>
                                    <span className="Answer">
                                        {(multiSelect
                                            ? multi.includes(dataItem.id)
                                            : selected === dataItem.id)
                                            ? "Close"
                                            : "Get Answer"}
                                    </span>
                                </div>
                                {(multiSelect
                                    ? multi.includes(dataItem.id)
                                    : selected === dataItem.id) && (
                                        <div className="content">{dataItem.answer}</div>
                                    )
                                }
                            </div>
                        ))
                    ) : (
                        <div>No data found</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Accordian;
