import { motion } from 'framer-motion';
import { floatVariants } from '../utils/motionStyles';

export default function AdminTable({ headers, children }) {
  return (
    <motion.table 
      className="w-full bg-card-bg/10 backdrop-blur-md border border-white/10 rounded-xl shadow-3d"
      initial="hidden"
      animate="visible"
      variants={floatVariants}
    >
      <thead>
        <tr className="bg-card-bg/20 border-b border-white/10">
          {headers.map((header, index) => (
            <th key={index} className="p-4 text-left text-text-primary font-semibold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </motion.table>
  );
}