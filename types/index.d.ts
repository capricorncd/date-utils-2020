/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-05 11:35
 */
export type langPackage = {
  weeks: string[]
}

export function formatDate(srcDate: any, fmt: string, langPackage?: langPackage): string;

export function toDate(date: any): Date | null;

export function isNumberLike(n: any): boolean;

export function isString(s: any): boolean;

export function toTwoDigits(n: any): string;
