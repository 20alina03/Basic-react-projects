import { useState } from 'react';
import './style.css';

function RandomColor() {
    const [typeofColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState("#000000");

    function handleCreateHexColor() {
        let hexColor = "#";
        const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * hex.length);
            hexColor += hex[randomIndex];
        }
        setColor(hexColor);
    }

    function handleCreateRgbColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const rgbColor = `rgb(${r}, ${g}, ${b})`;
        setColor(rgbColor);
    }

    return (
        <>
            <div 
                className="container" 
                style={{
                    backgroundColor: color,
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "1rem"
                }}
            >
                <button onClick={() => setTypeOfColor('rgb')}>
                    Create RGB color
                </button>
                <button onClick={() => setTypeOfColor('hex')}>
                    Create HEX color
                </button>
                <button onClick={() => {
                    if (typeofColor === 'hex') {
                        handleCreateHexColor();
                    } else {
                        handleCreateRgbColor();
                    }
                }}>
                    Generate Random Color
                </button>
                <div style={{ color: "#fff", fontSize: "1.5rem", marginTop: "1rem" }}>
                    Current Color: {color}
                </div>
            </div>
        </>
    );
}

export default RandomColor;
