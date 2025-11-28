import { Check, Clock, Package, Truck } from "lucide-react"; 
import { cn } from "@/lib/utils"; 


const STEPS = [
  { status: 'NEW', label: 'Pedido Recebido', icon: Clock },
  { status: 'INVOICED', label: 'Pagamento Aprovado', icon: Check },
  { status: 'SEPARATION', label: 'Em Separação', icon: Package },
  { status: 'SHIPPED', label: 'Enviado', icon: Truck },
  { status: 'DELIVERED', label: 'Entregue', icon: Check },
];

export function OrderStepper({ currentStatus }: { currentStatus: string }) {

  const currentIndex = STEPS.findIndex(s => s.status === currentStatus);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="w-full py-6">
      <div className="relative flex items-center justify-between w-full">
        {}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />
        
        {}
        <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-green-500 -z-10 transition-all duration-500"
            style={{ width: `${(activeIndex / (STEPS.length - 1)) * 100}%` }} 
        />

        {STEPS.map((step, index) => {
          const isCompleted = index <= activeIndex;
          const isCurrent = index === activeIndex;
          const Icon = step.icon;

          return (
            <div key={step.status} className="flex flex-col items-center bg-white px-2">
              <div 
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300",
                  isCompleted ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-300 text-gray-400",
                  isCurrent && "ring-4 ring-green-100"
                )}
              >
                <Icon size={18} />
              </div>
              <span className={cn(
                "mt-2 text-xs font-medium text-center max-w-[80px]",
                isCompleted ? "text-green-700" : "text-gray-500"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}