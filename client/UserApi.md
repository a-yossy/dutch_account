# .UserApi

All URIs are relative to *http://localhost:3000/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addUser**](UserApi.md#addUser) | **POST** /users | ユーザ作成API
[**getUserByUserId**](UserApi.md#getUserByUserId) | **GET** /users/{user_id} | ユーザ情報取得API
[**getUsers**](UserApi.md#getUsers) | **GET** /users | 全ユーザ情報取得API
[**updateUserByUserId**](UserApi.md#updateUserByUserId) | **PUT** /users/{user_id} | ユーザ更新API


# **addUser**
> User addUser()

ユーザを作成する

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:.UserApiAddUserRequest = {
  // AddUserRequest | リクエストユーザ情報 (optional)
  addUserRequest: {
    name: "太郎",
  },
};

apiInstance.addUser(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **addUserRequest** | **AddUserRequest**| リクエストユーザ情報 |


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | 追加されたユーザ情報 |  -  |
**400** | リクエストパラメーターに不備がある時のレスポンス |  -  |
**401** | 認証がされていない時のレスポンス |  -  |
**500** | サーバー側でエラーが発生している時のレスポンス |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUserByUserId**
> User getUserByUserId()

ユーザIDでユーザ情報を取得する

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:.UserApiGetUserByUserIdRequest = {
  // number | ユーザID
  userId: 1,
};

apiInstance.getUserByUserId(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**number**] | ユーザID | defaults to undefined


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | ユーザ情報 |  -  |
**401** | 認証がされていない時のレスポンス |  -  |
**404** | リクエストされたリソースが存在しない時のレスポンス |  -  |
**500** | サーバー側でエラーが発生している時のレスポンス |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUsers**
> Array<User> getUsers()

全てのユーザ情報を取得する

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:any = {};

apiInstance.getUsers(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<User>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | 全てのユーザー情報 |  -  |
**401** | 認証がされていない時のレスポンス |  -  |
**500** | サーバー側でエラーが発生している時のレスポンス |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateUserByUserId**
> User updateUserByUserId()

ユーザIDでユーザ情報を更新する

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UserApi(configuration);

let body:.UserApiUpdateUserByUserIdRequest = {
  // number | ユーザID
  userId: 1,
  // AddUserRequest | リクエストユーザ情報 (optional)
  addUserRequest: {
    name: "太郎",
  },
};

apiInstance.updateUserByUserId(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **addUserRequest** | **AddUserRequest**| リクエストユーザ情報 |
 **userId** | [**number**] | ユーザID | defaults to undefined


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | ユーザ情報 |  -  |
**401** | 認証がされていない時のレスポンス |  -  |
**404** | リクエストされたリソースが存在しない時のレスポンス |  -  |
**500** | サーバー側でエラーが発生している時のレスポンス |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


