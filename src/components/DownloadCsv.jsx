export const downloadCSV = (data) => {
    const csvContent = [
        ["Name", "Min Diameter (km)", "Max Diameter (km)"],
        ...data.map(neo => [neo.name, neo.estimated_diameter.kilometers.estimated_diameter_min, neo.estimated_diameter.kilometers.estimated_diameter_max])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "neo_data.csv");
    document.body.appendChild(link);
    link.click();
};
