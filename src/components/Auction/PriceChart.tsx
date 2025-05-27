import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { PriceHistory } from "../../api/auction";

interface Props {
  itemName: string;
  priceHistory: PriceHistory[];
}

export default function PriceChart({ itemName, priceHistory }: Props) {
  return (
    <div className="py-6 px-4">
      <p className="text-[15px] font-semibold text-gray-300 mb-1">최근,</p>
      <p className="text-[20px] font-extrabold text-white mb-4">{itemName}</p>

      {priceHistory.length > 0 ? (
        <div className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-700">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={priceHistory}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="recordedAt"
                tickFormatter={(d) => dayjs(d).format("MM/DD")}
                stroke="#ccc"
                fontSize={8}
              />
              <YAxis
                tickFormatter={(v) => v.toLocaleString()}
                stroke="#ccc"
                fontSize={8}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#333",
                  borderRadius: 8,
                  border: "none",
                }}
                labelFormatter={(label) =>
                  `${dayjs(label).format("YYYY.MM.DD HH:mm")}`
                }
                formatter={(value: number) => [
                  `${value.toLocaleString()}원`,
                  "가격",
                ]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4F8DFD"
                strokeWidth={2}
                dot={{ r: 4, stroke: "#4F8DFD", fill: "#4F8DFD" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mt-4">아직 시세 이력이 없습니다.</p>
      )}
    </div>
  );
}
