import designTime from "@/data/options/resolutionTime/designTime";
import requirementsTime from "@/data/options/resolutionTime/requirementsTime";
import runTime from "@/data/options/resolutionTime/runTime";
import realizationTime from "@/data/options/resolutionTime/realizationTime";
import type { ResolutionTimeOption } from '../../types/Option';

export function resolutionTimeMapping(resolutionTimeMappingName: String) : ResolutionTimeOption{
    switch (resolutionTimeMappingName.toLocaleLowerCase()) {
        case 'design time':
            return designTime;
        case 'requirements time':
            return requirementsTime;
        case 'run time':
            return runTime;
        case 'realization time':
            return realizationTime;
        default:
            throw new Error('Invalid Resolution Time Manifestation');
    }
}

export function getResolutionTimeNames() : string[]{
    return [ designTime.name, requirementsTime.name, runTime.name, realizationTime.name ];
}