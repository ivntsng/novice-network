import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountRepo, AccountOut


class UserAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        account_repo: AccountRepo,
    ):
        return account_repo.get_one(username)

    def get_account_getter(
        self,
        accounts: AccountRepo = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOut):
        print(account)
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.username, AccountOut(**account.dict())



authenticator = UserAuthenticator(os.environ["SIGNING_KEY"])
