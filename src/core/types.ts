import { Observable } from "./Observable"

export type SubscriptionCb = (x: any) => void
export type UnaryFunction = (value: any) => Observable