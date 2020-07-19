# Authentication Routes

`POST` `/api/v1/user` Create new user resource

`GET` `/api/v1/user/auth` User login status

`GET` `/api/v1/user/auth/logout` User logout route

# Contact Routes `(protected)`

`POST` `/api/v1/contact` Create new contact resource

`GET` `/api/v1/contact` Get all contacts

`GET` `/api/v1/contact/:contactId` Get single contact resource

`DELETE` `/api/v1/contact/:contactId` Delete a single contact resource

`PATCH` `/api/v1/contact/:contactId` Edit a single contact resource

# Client

Client site ReactJS imported from https://github.com/demicoder/phonebook-client
