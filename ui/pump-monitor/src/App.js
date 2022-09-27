import React from 'react';
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [labels, setLabels] = useState([]);
    const data = [];
    const labelData = [];
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("http://localhost:8090/api/levels")
            .then(res => res.json())
            .then(
                (result) => {
                    for (var instance in result) {
                        var mydata = (result[instance]);
                        data.push(mydata.data);
                        labelData.push(mydata.label);
                        //console.log(data);
                    }
                    //var isArray = Array.isArray(data);
                    setItems(data);
                    setLabels(labelData);
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
    console.log(items);
    return (
        <div className="App">
            <h2>Sump Pit Water Levels</h2>
            <Line
                datasetIdKey='id'
                data={{
                    //todo: labels should be item logged date.  Data is measurement array. 
                    labels: labels,
                    datasets: [{
                        id: 1,
                        label: '',
                        data: items
                    }],
                }}
            />
        </div>
    );
}
export default App;