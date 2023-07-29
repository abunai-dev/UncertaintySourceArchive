import recognizedIgnorance from "@/data/manifestations/type/recognizedIgnorance";
import scenarioUncertainty from "@/data/manifestations/type/scenarioUncertainty";
import statisticalUncertainty from "@/data/manifestations/type/statisticalUncertainty";
import type { Manifestation } from '@/util/types/Manifestation';

export function typeMapping(typeMappingName: String) : Manifestation{
    switch (typeMappingName.toLocaleLowerCase()) {
        case 'recognized ignorance':
            return recognizedIgnorance;
        case 'scenario uncertainty':
            return scenarioUncertainty;
        case 'statistical uncertainty':
            return statisticalUncertainty;
        default:
            throw new Error('Invalid Type Manifestation');
    }
}