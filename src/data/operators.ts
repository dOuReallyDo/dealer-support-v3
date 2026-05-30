import type { Operator, OperatorId } from '@/types';

export const OPERATORS: Operator[] = [
  {
    id: 'windtre',
    name: 'WindTre',
    displayName: 'WINDTRE',
    cssFile: '/brands/windtre.css',
    logoFile: '/logos/windtre.svg',
    brandColor: '#FF6B00',
    brandColorLight: '#FFF3E0',
    prefix: '--wt-',
    cssClass: 'wt',
  },
  {
    id: 'tim',
    name: 'TIM',
    displayName: 'TIM',
    cssFile: '/brands/tim.css',
    logoFile: '/logos/tim.svg',
    brandColor: '#004990',
    brandColorLight: '#E3F2FD',
    prefix: '--tim-',
    cssClass: 'tim',
  },
  {
    id: 'vodafone',
    name: 'Vodafone',
    displayName: 'Vodafone',
    cssFile: '/brands/vodafone.css',
    logoFile: '/logos/vodafone.svg',
    brandColor: '#E60000',
    brandColorLight: '#FFEBEE',
    prefix: '--voda-',
    cssClass: 'voda',
  },
  {
    id: 'fastweb',
    name: 'Fastweb',
    displayName: 'Fastweb',
    cssFile: '/brands/fastweb.css',
    logoFile: '/logos/fastweb.svg',
    brandColor: '#C4007A',
    brandColorLight: '#FCE4EC',
    prefix: '--fw-',
    cssClass: 'fw',
  },
  {
    id: 'iliad',
    name: 'iliad',
    displayName: 'iliad',
    cssFile: '/brands/iliad.css',
    logoFile: '/logos/iliad.svg',
    brandColor: '#8B5CF6',
    brandColorLight: '#F3E8FF',
    prefix: '--iliad-',
    cssClass: 'iliad',
  },
];

export const OPERATORS_MAP: Record<OperatorId, Operator> = Object.fromEntries(
  OPERATORS.map((o) => [o.id, o])
) as Record<OperatorId, Operator>;

export function getOperator(id: OperatorId): Operator {
  return OPERATORS_MAP[id];
}