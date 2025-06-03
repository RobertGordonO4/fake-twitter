# PostsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**postsControllerCreate**](#postscontrollercreate) | **POST** /api/posts | Create a new post|
|[**postsControllerFindAll**](#postscontrollerfindall) | **GET** /api/posts | Get all posts|
|[**postsControllerLikePost**](#postscontrollerlikepost) | **PATCH** /api/posts/{id}/like | Like a post|
|[**postsControllerRemove**](#postscontrollerremove) | **DELETE** /api/posts/{id} | Delete a post|

# **postsControllerCreate**
> Post postsControllerCreate(createPostDto)


### Example

```typescript
import {
    PostsApi,
    Configuration,
    CreatePostDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

let createPostDto: CreatePostDto; //

const { status, data } = await apiInstance.postsControllerCreate(
    createPostDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPostDto** | **CreatePostDto**|  | |


### Return type

**Post**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | The post has been successfully created. |  -  |
|**401** | Unauthorized. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **postsControllerFindAll**
> Array<Post> postsControllerFindAll()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

const { status, data } = await apiInstance.postsControllerFindAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Post>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of all posts. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **postsControllerLikePost**
> Post postsControllerLikePost()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.postsControllerLikePost(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Post**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Post liked successfully. |  -  |
|**401** | Unauthorized. |  -  |
|**404** | Post not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **postsControllerRemove**
> postsControllerRemove()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.postsControllerRemove(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Post deleted successfully. |  -  |
|**401** | Unauthorized. |  -  |
|**404** | Post not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

