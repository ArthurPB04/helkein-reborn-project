
import React from 'react';
import { CheckIcon } from 'lucide-react';

interface PricingFeature {
  title: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  highlighted?: boolean;
  onSubscribe: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  highlighted = false,
  onSubscribe,
}) => {
  return (
    <div 
      className={`bg-helkein-light rounded-lg overflow-hidden ${
        highlighted ? 'ring-2 ring-helkein-accent shadow-lg transform scale-105' : 'shadow-helkein'
      }`}
    >
      {highlighted && (
        <div className="bg-helkein-accent text-white text-center py-2 font-medium text-sm">
          Plano Recomendado
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold mb-4">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">R${price}</span>
          <span className="text-helkein-muted">/{period}</span>
        </div>
        <p className="text-helkein-muted mb-6">{description}</p>
        
        <button
          onClick={onSubscribe}
          className={`w-full py-2 px-4 rounded-md font-medium transition-all ${
            highlighted 
              ? 'bg-helkein-accent hover:bg-opacity-90 text-white' 
              : 'bg-helkein hover:bg-helkein-light text-white'
          }`}
        >
          {buttonText}
        </button>
        
        <div className="mt-6">
          <h4 className="font-medium mb-3">O que está incluído:</h4>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span 
                  className={`mr-2 rounded-full p-0.5 ${
                    feature.included 
                      ? 'bg-green-500 text-white' 
                      : 'bg-helkein-muted bg-opacity-30 text-helkein-muted'
                  }`}
                >
                  <CheckIcon size={16} />
                </span>
                <span className={feature.included ? 'text-helkein-text' : 'text-helkein-muted line-through'}>
                  {feature.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
