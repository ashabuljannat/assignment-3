
### 1. Create a new course

```json
await Course.create(req.body);
```

- Response: if course any field not given then show error

```
  {
      "success": false,
    "message": "Validation Error",
    "errorMessage": "instructor is Required. price is Required.",
    "errorDetails": {
        "issues": [
            {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                    "body",
                    "instructor"
                ],
                "message": "Required"
            },
            {
                "code": "invalid_type",
                "expected": "number",
                "received": "undefined",
                "path": [
                    "body",
                    "price"
                ],
                "message": "Required"
            }
        ],
        "name": "ZodError"
    },
    "stack": "ZodError: [\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"string\",\n    \"received\": \"undefined\",\n    \"path\": [\n      \"body\",\n      \"instructor\"\n    ],\n    \"message\": \"Required\"\n  },\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"number\",\n    \"received\": \"undefined\",\n    \"path\": [\n      \"body\",\n      \"price\"\n    ],\n    \"message\": \"Required\"\n  }\n]\n    at Object.get error [as error] (F:\\ph-practice-level2-23\\assignment-3\\node_modules\\zod\\lib\\types.js:43:31)\n    at ZodObject.parseAsync (F:\\ph-practice-level2-23\\assignment-3\\node_modules\\zod\\lib\\types.js:166:22)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"
}
```
- Response: if course title is duplicatethen show error

```
  {
  "success": false,
    "message": "Validation Error",
    "errorMessage": "instructor is Required. price is Required.",
    "errorDetails": {
        "issues": [
            {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                    "body",
                    "instructor"
                ],
                "message": "Required"
            },
            {
                "code": "invalid_type",
                "expected": "number",
                "received": "undefined",
                "path": [
                    "body",
                    "price"
                ],
                "message": "Required"
            }
        ],
        "name": "ZodError"
    },
    "stack": "ZodError: [\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"string\",\n    \"received\": \"undefined\",\n    \"path\": [\n      \"body\",\n      \"instructor\"\n    ],\n    \"message\": \"Required\"\n  },\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"number\",\n    \"received\": \"undefined\",\n    \"path\": [\n      \"body\",\n      \"price\"\n    ],\n    \"message\": \"Required\"\n  }\n]\n    at Object.get error [as error] (F:\\ph-practice-level2-23\\assignment-3\\node_modules\\zod\\lib\\types.js:43:31)\n    at ZodObject.parseAsync (F:\\ph-practice-level2-23\\assignment-3\\node_modules\\zod\\lib\\types.js:166:22)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"
}
```

### 2. Retrieve a list of all coureses with  Pagination and Filtering and sort.

```json
i use query perams. mongdb oparetor 
```
### 3.  Create a Category

```json
{   "success": true,
    "statusCode": 201,
    "message": "Category created successfully",
    "data": {
        "name": "full stack development 2",
        "_id": "657f17971a62dce1cc93c00c",
        "__v": 0
    }
}
```
### 4.get all Categories

```json
{  
    "success": true,
    "statusCode": 200,
    "message": "Categories retrieved successfully",
    "data": [
        {
            "_id": "657728957f4c14fa46a3a5cd",
            "name": "Programming",
            "__v": 0
        },
        {
            "_id": "657728e07f4c14fa46a3a5d1",
            "name": "Programming ",
            "__v": 0
        },
        {
            "_id": "65772919d3f5156012604357",
            "name": "Programming 2",
            "__v": 0
        },
        {
            "_id": "65772a9bae97ba5c3906e2b4",
            "name": "Programming-2",
            "__v": 0
        },
        {
            "_id": "65772b849388a61656611cef",
            "name": "Programming-21",
            "__v": 0
        }
    ]
}
```


### 5. Create a Review

```json
{
  "success": true,
    "statusCode": 201,
    "message": "Review created successfully",
    "data": {
        "courseId": "657f16a01a62dce1cc93bf17",
        "rating": 5,
        "review": "Great course 50!",
        "_id": "657f18091a62dce1cc93c00f",
        "__v": 0
    }
}
```
### 6. Update a Course (Partial Update with Dynamic Update)

```json
{
    $pull: {
         tags: { name: { $in: tagsForDelete } },
       }
}
```
```json
{   
    {
      $addToSet: { tags: { $each: tagsForUpdate } },
    }
}
```

### 7. Get Course by ID with Reviews

- Endpoint: **DELETE http://localhost:5000/api/courses/657f08786a473931dfd5104c/reviews**

- Response: if user exixt

```json
{
  "success": true,
    "statusCode": 200,
    "message": "Course and Reviews retrieved successfully",
    "data": {
        "course": {
            "_id": "657f08786a473931dfd5104c",
            "title": "Sample Course 15",
            "instructor": "Jane Doe",
            "categoryId": "65772919d3f5156012604357",
            "price": 75,
            "tags": [
                {
                    "name": "Web Development",
                    "isDeleted": false,
                    "_id": "657f0b726a473931dfd510bc"
                },
                {
                    "name": "mern Development",
                    "isDeleted": false,
                    "_id": "657f0b846a473931dfd510c8"
                }
            ],
            "startDate": "2023-05-15",
            "endDate": "2023-05-30",
            "language": "English",
            "provider": "Tech Academy",
            "details": {
                "level": "Intermediate pro",
                "_id": "657f0aa96a473931dfd51074"
            },
            "durationInWeeks": 3,
            "__v": 0
        },
        "reviews": [
            {
                "_id": "657f09766a473931dfd51059",
                "courseId": "657f08786a473931dfd5104c",
                "rating": 3,
                "review": "Great course 15!",
                "__v": 0
            },
            {
                "_id": "657f09fb6a473931dfd51061",
                "courseId": "657f08786a473931dfd5104c",
                "rating": 5,
                "review": "Great course 15!",
                "__v": 0
            },
            {
                "_id": "657f13691a62dce1cc93be19",
                "courseId": "657f08786a473931dfd5104c",
                "rating": 4.5,
                "review": "Great course 50!",
                "__v": 0
            }
        ]
    }
}
```
### 8. Get the Best Course Based on Average Review (Rating)

- Response: if user exixt

```json
{
    
    "success": true,
    "statusCode": 200,
    "message": "Best course retrieved successfully",
    "data": {
        "course": {
            "_id": "657f16a01a62dce1cc93bf17",
            "title": "mern development pro",
            "instructor": "Jane Doe",
            "categoryId": "65772919d3f5156012604357",
            "price": 30,
            "tags": [
                {
                    "name": "Programming",
                    "isDeleted": false,
                    "_id": "657f16a01a62dce1cc93bf18"
                },
                {
                    "name": "Web Development",
                    "isDeleted": false,
                    "_id": "657f16a01a62dce1cc93bf19"
                }
            ],
            "startDate": "2023-05-15",
            "endDate": "2023-05-30",
            "language": "English",
            "provider": "Tech Academy",
            "details": {
                "level": "Intermediate",
                "description": "Detailed description of the course",
                "_id": "657f16a01a62dce1cc93bf1a"
            },
            "durationInWeeks": 3,
            "__v": 0
        },
        "averageRating": "5.000",
        "reviewCount": 5
    }
}
```

## Validation with Zod

- Using zod to validate incoming data for user and order creation and updating operations.
- Consider using linting tools ( ESLint, prettier ) to enforce coding style and identify potential issues. 
- there are 10+ commits in your GitHub repository. in more branch.

## **Submission:**

- repo link : https://github.com/ashabuljannat/assignment-3
- live link : https://github.com/ashabuljannat/assignment-3
- video link: youtube 1:https://youtu.be/wSFWYHnopEY 
    - 2:https://youtu.be/p562QoBpLIU

## Instruction form me

  1. **run this program:**
  - run `tsc` for compile the code to js
  - run `npm run start:dev` for start code in ts-node-dev server
  - run `npm run lint` for catch eslint error
  - run `npm run prettier` for code formatter