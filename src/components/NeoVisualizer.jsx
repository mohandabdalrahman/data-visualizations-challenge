import {useEffect, useState} from 'react';
import {NEOChart} from "./NeoChart.jsx";
import {NEOTable} from "./NeoTable.jsx";
import {downloadCSV} from "./DownloadCsv.jsx";

const API_URL = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY';

export const NEOVisualizer = () => {
    const [neoData, setNeoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orbitalBodies, setOrbitalBodies] = useState([]);
    const [selectedOrbitalBody, setSelectedOrbitalBody] = useState('All');
    const [filteredData, setFilteredData] = useState([]);
    const [view, setView] = useState('chart');

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                setNeoData(data.near_earth_objects);
                setFilteredData(data.near_earth_objects);
                const bodies = Array.from(new Set(data.near_earth_objects.map(neo => neo.name)));
                console.log('bodies', bodies)
                setOrbitalBodies(['All', ...bodies]);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });


    }, []);

    useEffect(() => {
        if (selectedOrbitalBody === 'All') {
            setFilteredData(neoData);
        } else {
            const filtered = neoData.filter(neo => neo.name === selectedOrbitalBody);
            setFilteredData(filtered);
        }
    }, [selectedOrbitalBody, neoData]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-6">NEO Visualization</h1>
            <div className="flex justify-center mb-4">
                <label className="mr-4 text-lg font-semibold">Filter by Neo Name: </label>
                <select
                    className="p-2 border rounded-md bg-white text-black shadow-md focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setSelectedOrbitalBody(e.target.value)}
                    value={selectedOrbitalBody}
                >
                    {orbitalBodies.map(body => (
                        <option key={body} value={body}>
                            {body}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-2 flex justify-between">
                <button onClick={() => setView('chart')}>Chart View</button>
                <button onClick={() => setView('table')}>Table View</button>
                <button onClick={() => downloadCSV(filteredData)}>Download CSV</button>
            </div>
            {view === 'chart' ? <NEOChart data={filteredData}/> : <NEOTable data={filteredData}/>}
        </>
    );
};
