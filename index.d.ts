import { Express } from 'express';
import { ScheduleOptions, ScheduledTask } from 'node-cron'

export const app: Express
export const repositories: any
export const services: any
export const utils: any
export const generateTypes: () => void

export interface CronProps <Repositories, Services, Utils> {
  schedule: (cronExpression: string, func: () => void, options?: ScheduleOptions) => ScheduledTask;
  repositories: Repositories;
  services: Services;
  utils: Utils;
}

export interface ContextRequest<Repositories, Services, Utils> {
  repositories: Repositories;
  services: Services;
  utils: Utils;
  token?: string;
  ip: string;
}

export interface Repository {
  _disconnect: () => Promise<void>
  _clear: () => Promise<void>
}

export interface Input<T> {
  input: T;
}

export type Next = () => void

export interface Query<T> {
  query: string;
  variables?: Input<T>;
}

export function createQuery<T> (query: string): Query<T>