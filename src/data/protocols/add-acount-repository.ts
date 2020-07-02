import { AddAcountModel } from '../../domain/usecases/add-acount'
import { AccountModel } from '../../domain/models/account'

export interface AddAcountRepository {
  add: (accountData: AddAcountModel) => Promise<AccountModel>
}
