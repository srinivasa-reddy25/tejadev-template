import type { Model } from 'mongoose'

import type { TUser } from '@tejadev/shared'

import { user_model } from './user'

export type TUserModel = Model<TUser>

type TMg = {
  user: TUserModel
}

export const mg: TMg = {
  user: user_model
}
