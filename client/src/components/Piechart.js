import { Pie } from 'react-chartjs-2'
import { Tooltip, PieChart, ArcElement, Legend, Title } from 'chart.js';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import "../App.css"

Chart.register(
    Tooltip, Title, Legend, ArcElement
);


const data = {
    datasets: [{
        data: [10, 20, 30],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(129 , 237, 187)',
            'rgb(253 ,126, 20);;'
        ],
        hoverOffset: 4
    },
    ],
    labels: [
        'Red',
        'Yellow',
        'Blue',
        'Green',
    ],
};
const Piechart = () => {
    const [data, setData] = useState({
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(129 , 237, 187)',
                'rgb(253 ,126, 20);;'
            ],
            hoverOffset: 4
        },
        ],
        labels: [
            'Red',
            'Yellow',
            'Blue',
            'Green',
        ],
    });
    useEffect(() => {
        const fetchData = () => {
            fetch('https://eployeeregister.herokuapp.com/getdata').then((data) => {
                const res = data.json();
                return res
            }).then((res) => {
                console.log("resss", res)
                const label = [];
                const data = [];
                for (var i of res) {
                    label.push(i.name);
                    data.push(i.salary);
                }
                setData(
                    {

                        datasets: [{
                            data: data,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)',
                                'rgb(129 , 237, 187)',
                                'rgb(253 ,126, 20);;'
                            ],
                            hoverOffset: 4
                        },
                        ],
                        labels: label,
                    }
                )

            }).catch(e => {
                console.log("error", e)
            })
        }
        fetchData();
    }, [])

    return (

        < div className='graph-container'>
            <h3>Grapical Representation of employess and their salaries</h3>
            <div className='pies'>
                <Pie data={data} />
            </div>
        </div>
    )
}

export default Piechart