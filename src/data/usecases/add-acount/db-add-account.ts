import { AddAcount, AddAcountModel } from '../../../domain/usecases/add-acount'
import { AccountModel } from '../../../domain/models/account'
import { Encrypter } from '../../protocols/encrypter'
import { AddAcountRepository } from '../../protocols/add-acount-repository'

export class DbAddAccount implements AddAcount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAcountRepository

  constructor (encrypter: Encrypter, addAcountRepository: AddAcountRepository) {
    this.addAccountRepository = addAcountRepository
    this.encrypter = encrypter
  }

  async add (accountData: AddAcountModel): Promise<AccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: encryptedPassword }))
    return await new Promise(resolve => resolve(null))
  }
}
