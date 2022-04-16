//this line imports react functionality 
import React from 'react';
import { useEffect, useState } from "react";
import { LineChart, Line, Tooltip } from 'recharts';
import Moment from 'moment';

function CustomTooltip(props) {
    var measurement = ""
    var date = ""

    if (props.data[props.label]) {
        measurement = props.data[props.label]["Measurement"]
        date = props.data[props.label]["LoggedTime"]
    }
    return (
        <div>
            <div >{Moment(date).utc().format('LLL')} </div>
            <div style={{ color: "rgb(0,200,5)" }}>{measurement} cm</div>
        </div>
    )
}

export default function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const data = [];
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("http://localhost:8090/api/levels")
            .then(res => res.json())
            .then(
                (result) => {
                    for (var instance in result) {
                        var mydata = (result[instance])
                        mydata.date = instance.LoggedTime
                        data.push(mydata)
                    }
                    //var isArray = Array.isArray(data);
                    setItems(data.reverse())
                },

                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    return (
        <div>
            <h1>Sump Pit Levels</h1>
            <LineChart width={500} height={800} margin={{ top: 50, right: 30, left: 20, bottom: 5 }} data={items}>
                <Line dot={false} type="monotone" dataKey="Measurement" stroke="rgb(0,200,5)" yAxisId="100" />
                <Tooltip content={<CustomTooltip data={items} />} />
            </LineChart>
        </div>
    )
}

