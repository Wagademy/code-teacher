// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'llama-3.2-11b-vision-preview',
    label: 'LLAMA 3.2 11B Vision',
    apiIdentifier: 'llama-3.2-11b-vision-preview',
    description: 'Standard multimodal model for heavier and more complex tasks',
  },
  {
    id: 'llama-3.2-90b-vision-preview',
    label: 'LLAMA 3.2 90B Vision',
    apiIdentifier: 'llama-3.2-90b-vision-preview',
    description:
      'Largest multimodal model for the heaviest and most complex tasks',
  },
  {
    id: 'llama-3.2-1b-preview',
    label: 'LLAMA 3.2 1B',
    apiIdentifier: 'llama-3.2-1b-preview',
    description: 'Smallest model for fast, very lightweight tasks',
  },
  {
    id: 'llama-3.2-3b-preview',
    label: 'LLAMA 3.2 3B',
    apiIdentifier: 'llama-3.2-3b-preview',
    description: 'Small model for fast, lightweight tasks',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'llama-3.2-90b-vision-preview';
export const SHORT_MODEL_NAME: string = 'llama-3.2-1b-preview';
