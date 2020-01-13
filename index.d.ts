import { Express } from 'express';

export const app: Express
export const repositories: any
export const services: any
export const utils: any
export const generateTypes: () => void

export interface ContextRequest {
  token?: string;
  ip: string;
}