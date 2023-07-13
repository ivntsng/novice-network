import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountRepo, AccountOutWithPassword


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

    def get_hashed_password(self, account: AccountOutWithPassword):
        try:
            return account.hashed_password
        except AttributeError:
            print(account)


authenticator = UserAuthenticator(os.environ["SIGNING_KEY"])
