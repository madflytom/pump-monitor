//this line imports react functionality 
import React from 'react';
import { useEffect, useState } from "react";
import { LineChart, Line, Tooltip } from 'recharts';
import Moment from 'moment';
import Chart from 'react-chartjs-2';

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

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    return (
        <div>
        <canvas id="myChart" width="400" height="400"></canvas>

            <h1>Sump Pit Levels</h1>
            <LineChart width={500} height={800} margin={{ top: 50, right: 30, left: 20, bottom: 5 }} data={items}>
                <Line dot={false} type="monotone" dataKey="Measurement" stroke="rgb(0,200,5)" yAxisId="100" />
                <Tooltip content={<CustomTooltip data={items} />} />
            </LineChart>
        </div>
    )
}

