import { useLoaderData } from "react-router-dom";
import { PieChart, Pie, Tooltip, Legend } from "recharts";

const SurveyResult = () => {
  const { yes, no, title } = useLoaderData();
  const data = [
    { name: "Yes", value: yes, fill: "#00B5FF" },
    { name: "No", value: no, fill: "#FF3366" },
  ];

  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl  text-center font-semibold mt-4 sm:mt-6 md:mt-8 capitalize">
        {title}
      </h1>
      <div className="flex justify-center items-center">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          />

          <Tooltip />
          <Legend
            align="center"
            iconSize={10}
            wrapperStyle={{
              paddingBottom: "10px",
            }}
          />
        </PieChart>
      </div>
    </>
  );
};

export default SurveyResult;
