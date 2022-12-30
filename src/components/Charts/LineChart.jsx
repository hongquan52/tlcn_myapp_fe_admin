import React, {useState, useEffect} from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';

import { lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import { StaticsService } from '../../services/statics.service';

const LineChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await StaticsService.getALlUserByDay().then((response) => {
      setData(response);
      
    });
  };

  const { currentMode } = useStateContext();
  const lineChartData1 = [];
  const lineChartData2 = []
  data.map((item, index) => {
    const object = { x: 10+index*10, y: item.value*10 }
    const object2 = { x: 10+index*10, y: item.value*20 }

    lineChartData1.push(object)
    lineChartData2.push(object2)
  })
  console.log('lineChartData1', lineChartData1)
  const lineChartData = [
    [
      { x: new Date(2005, 0, 1), y: 100 },
      { x: new Date(2006, 0, 1), y: 24 },
      { x: new Date(2007, 0, 1), y: 36 },
      { x: new Date(2008, 0, 1), y: 38 },
      { x: new Date(2009, 0, 1), y: 54 },
      { x: new Date(2010, 0, 1), y: 57 },
      { x: new Date(2011, 0, 1), y: 100 },
    ],
    [
      { x: new Date(2005, 0, 1), y: 28 },
      { x: new Date(2006, 0, 1), y: 44 },
      { x: new Date(2007, 0, 1), y: 48 },
      { x: new Date(2008, 0, 1), y: 50 },
      { x: new Date(2009, 0, 1), y: 66 },
      { x: new Date(2010, 0, 1), y: 78 },
      { x: new Date(2011, 0, 1), y: 84 },
    ],
  
  ];
  const lineCustomSeries = [
    {
      dataSource: lineChartData1,
      xName: "x",
      yName: "y",
      name: "Germany",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },
  
    {
      dataSource: lineChartData[0],
      xName: "x",
      yName: "y",
      name: "England",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },
  
  ];

  return (

    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {lineCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
