import React, { useEffect } from "react";
import { useState } from "react";
import "./knight.css";

const Knight = () => {
    useEffect(() => {
        document.getElementsByClassName("box-1")[0].innerHTML = `
        <img
        src="/knight.png"
        alt="knight"
        className="knightImg"        
        style="height:74px; width:74px;"
        />
    `;
    }, []);

    const [curPosition, setCurPosition] = useState<number>(1);

    const selectBox = (boxNum: number, selected: boolean) => {
        const box = document.getElementsByClassName(`box-${boxNum}`)[0];
        if (selected) {
            box.classList.remove("selected");
        } else {
            box.classList.add("selected");
        }

        // column and row number of the knight in box boxNum
        var row: number = boxNum % 8;
        if (row === 0) {
            row = 8;
        }
        const col: number = Math.ceil(boxNum / 8);

        var positions: number[][] = [];
        positions.push([row + 1, col + 2]);
        positions.push([row + 2, col + 1]);
        positions.push([row - 2, col + 1]);
        positions.push([row - 1, col + 2]);
        positions.push([row + 2, col - 1]);
        positions.push([row + 1, col - 2]);
        positions.push([row - 1, col - 2]);
        positions.push([row - 2, col - 1]);

        console.log(positions);

        for (var i: number = 0; i < positions.length; i++) {
            // Color the box at (row, col)
            if (
                positions[i][0] > 0 &&
                positions[i][0] <= 8 &&
                positions[i][1] > 0 &&
                positions[i][1] <= 8
            ) {
                var n: number = (positions[i][1] - 1) * 8 + positions[i][0];
                if (selected) {
                    document
                        .getElementsByClassName(`box-${n}`)[0]
                        .classList.remove("selected");
                } else {
                    document
                        .getElementsByClassName(`box-${n}`)[0]
                        .classList.add("selected");
                }
            }
        }
    };

    const handleKnight = (e: React.MouseEvent) => {
        // If the knight is clicked
        if (e.target instanceof HTMLImageElement) {
            // get the box with the knight and change it's color
            const box = e.currentTarget;
            var selected: boolean = false;
            if (box.classList.contains("selected")) {
                box.classList.remove("selected");
                selected = true;
            } else {
                box.classList.add("selected");
                selected = false;
            }

            // get the boxes that the knight can move to
            const boxNum: number = parseInt(
                e.currentTarget.className.split("-")[1]
            ); // current position of the knight

            setCurPosition(boxNum);

            selectBox(boxNum, selected);
        } else if (e.currentTarget.classList.contains("selected")) {
            const newPos: number = parseInt(
                e.currentTarget.className.split("-")[1]
            );

            var knightElement = document.getElementsByClassName(
                `box-${curPosition}`
            )[0];

            selectBox(
                curPosition,
                knightElement.classList.contains("selected")
            );

            const knight = knightElement.innerHTML;
            knightElement.innerHTML = "";

            document.getElementsByClassName(`box-${newPos}`)[0].innerHTML =
                knight;

            setCurPosition(newPos);
        }
    };

    return (
        <>
            <div className="boardContainer">
                <div className="board fadeRight">
                    <div className="Col1">
                        <div className="box-1" onClick={handleKnight}></div>
                        <div
                            className="box-2 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-3" onClick={handleKnight}></div>
                        <div
                            className="box-4 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-5" onClick={handleKnight}></div>
                        <div
                            className="box-6 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-7" onClick={handleKnight}></div>
                        <div
                            className="box-8 black-edge-1"
                            onClick={handleKnight}
                        ></div>
                    </div>
                    <div className="Col2">
                        <div
                            className="box-9 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-10" onClick={handleKnight}></div>
                        <div
                            className="box-11 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-12" onClick={handleKnight}></div>
                        <div
                            className="box-13 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-14" onClick={handleKnight}></div>
                        <div
                            className="box-15 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-16" onClick={handleKnight}></div>
                    </div>
                    <div className="Col3">
                        <div className="box-17" onClick={handleKnight}></div>
                        <div
                            className="box-18 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-19" onClick={handleKnight}></div>
                        <div
                            className="box-20 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-21" onClick={handleKnight}></div>
                        <div
                            className="box-22 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-23" onClick={handleKnight}></div>
                        <div
                            className="box-24 black"
                            onClick={handleKnight}
                        ></div>
                    </div>
                    <div className="Col4">
                        <div
                            className="box-25 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-26" onClick={handleKnight}></div>
                        <div
                            className="box-27 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-28" onClick={handleKnight}></div>
                        <div
                            className="box-29 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-30" onClick={handleKnight}></div>
                        <div
                            className="box-31 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-32" onClick={handleKnight}></div>
                    </div>
                    <div className="Col5">
                        <div className="box-33" onClick={handleKnight}></div>
                        <div
                            className="box-34 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-35" onClick={handleKnight}></div>
                        <div
                            className="box-36 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-37" onClick={handleKnight}></div>
                        <div
                            className="box-38 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-39" onClick={handleKnight}></div>
                        <div
                            className="box-40 black"
                            onClick={handleKnight}
                        ></div>
                    </div>
                    <div className="Col6">
                        <div
                            className="box-41 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-42" onClick={handleKnight}></div>
                        <div
                            className="box-43 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-44" onClick={handleKnight}></div>
                        <div
                            className="box-45 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-46" onClick={handleKnight}></div>
                        <div
                            className="box-47 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-48" onClick={handleKnight}></div>
                    </div>
                    <div className="Col7">
                        <div className="box-49" onClick={handleKnight}></div>
                        <div
                            className="box-50 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-51" onClick={handleKnight}></div>
                        <div
                            className="box-52 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-53" onClick={handleKnight}></div>
                        <div
                            className="box-54 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-55" onClick={handleKnight}></div>
                        <div
                            className="box-56 black"
                            onClick={handleKnight}
                        ></div>
                    </div>
                    <div className="Col8">
                        <div
                            className="box-57 black-edge-2"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-58" onClick={handleKnight}></div>
                        <div
                            className="box-59 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-60" onClick={handleKnight}></div>
                        <div
                            className="box-61 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-62" onClick={handleKnight}></div>
                        <div
                            className="box-63 black"
                            onClick={handleKnight}
                        ></div>
                        <div className="box-64" onClick={handleKnight}></div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Knight;
