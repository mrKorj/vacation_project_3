import React, {useContext, useEffect, useState} from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import {appContext} from "../App";

const {CanvasJSChart} = CanvasJSReact

export const Chart: React.FC = () => {
    const {state} = useContext(appContext)
    const [dataP, setDataP] = useState<any[]>([])

    useEffect(() => {
        const points: any[] = []
        state.vacations.forEach(v => {
            if (v.countFollowers! > 0) {
                points.push({y: v.countFollowers, label: `${v.name} / ${v.id}`})
            }
        })

        setDataP(points)
    }, [state.vacations])

    const options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Most Popular Vacations"
        },
        axisX: {
            title: "Vacation name / id",
            reversed: true,
        },
        axisY: {
            title: "Number of Followers",
            interval: 1,
        },
        data: [{
            type: "column",
            dataPoints: dataP
        }]
    }

    return (
        <div>
            <CanvasJSChart options={options}/>
        </div>
    );
};
