import { useLoaderData } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const SurveyResult = () => {
 const { yes, no, _id } = useLoaderData();

 const data = [
  { name: 'Yes', value: yes },
  { name: 'No', value: no },
 ];

 const COLORS = ['#36A2EB', '#FF6384'];

 return (
  <div>
   <h2>Survey Results Chart of: {_id}</h2>
   <ResponsiveContainer width="100%" height={300}>
    <PieChart>
     <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
      {data.map((entry, index) => (
       <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
      ))}
     </Pie>
     <Legend />
    </PieChart>
   </ResponsiveContainer>
  </div>
 );
};

export default SurveyResult;
