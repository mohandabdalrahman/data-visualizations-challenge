export const NEOTable = ({ data }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
            <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Min Diameter (km)
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Max Diameter (km)
                </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {data.map((neo) => (
                <tr key={neo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {neo.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);
