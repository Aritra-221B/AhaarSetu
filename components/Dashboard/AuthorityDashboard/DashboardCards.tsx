import { Shield, Calendar, FileText, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardCards() {
    const cards = [
      { title: "Registered Farms", value: 245, icon: Shield, color: "text-blue-600", bgColor: "bg-blue-100" },
      { title: "Scheduled Visits", value: 8, icon: Calendar, color: "text-green-600", bgColor: "bg-green-100" },
      { title: "Pending Inspections", value: 15, icon: FileText, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      { title: "Violations", value: 3, icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-100" },
    ];
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-4 mb-6 sm:mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            className="bg-green-100 rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 flex items-center gap-3 sm:gap-4 cursor-pointer"
          >
            <div className={`p-2 sm:p-3 rounded-full ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${card.color}`} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
  