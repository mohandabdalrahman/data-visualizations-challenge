import { Chart } from 'react-google-charts';

export const NEOChart = ({ data }) => {
  // Prepare the chart data
  const chartData = [['Name', 'Min Diameter (km)', 'Max Diameter (km)']];

  data.forEach((neo) => {
    const minDiameter =
      neo.estimated_diameter.kilometers.estimated_diameter_min;
    const maxDiameter =
      neo.estimated_diameter.kilometers.estimated_diameter_max;
    chartData.push([neo.name, minDiameter, maxDiameter]);
  });

  const options = {
    title: 'Near-Earth Objects: Estimated Diameter',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Diameter (Kilometers)',
      minValue: 0,
    },
    vAxis: {
      title: 'NEOs',
    },
  };

  return (
    <Chart
      chartType='BarChart'
      width='100%'
      height='400px'
      data={chartData}
      options={options}
    />
  );
};
