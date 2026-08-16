import { test, expect, APIResponse } from '@playwright/test';

// 1. Define a TypeScript Interface to strictly type your API response structure
interface PostPayload {
  userId: number;
  id?: number; // Optional because the server generates this on POST requests
  title: string;
  body: string;
}

test.describe('JSONPlaceholder API Verification (TypeScript)', () => {
  
  // Test 1: Verifying a GET Request
  test('1001 - Should successfully fetch user post #1', async ({ request }) => {
    // Send the HTTP GET request
    const response: APIResponse = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Assert the HTTP Status Code is 200 OK
    expect(response.status()).toBe(200);
    
    // Parse and explicitly type the response data structure
    const responseBody: PostPayload = await response.json();

    // 🛠️ ADD THIS TEMPORARY LINE TO DEBUG:
    console.log("ACTUAL SERVER RESPONSE IS:", responseBody);
    
    // Assert specific data fields with type safety
    expect(responseBody.id).toBe(1);
    expect(responseBody.userId).toBe(1);
    expect(typeof responseBody.title).toBe('string');
  });

  // Test 2: Verifying a POST Request
  test('1002 - Should successfully create a brand new post', async ({ request }) => {
    // Define the exact data payload to send
    const newPost: PostPayload = {
      title: 'Automating with Playwright TS',
      body: 'Type safety ensures high-quality testing framework data.',
      userId: 99
    };

    // Send the POST request
    const response: APIResponse = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: newPost
    });

    // Assert the HTTP Status Code is 201 Created
    expect(response.status()).toBe(201);

    // Verify the returned properties match our payload schema
    const responseBody: PostPayload = await response.json();

    // 🛠️ ADD THIS TEMPORARY LINE TO DEBUG:
console.log("ACTUAL SERVER RESPONSE IS:", responseBody);
    expect(responseBody.id).toBe(101); // Public mock API always sets ID 101 for inserts
    expect(responseBody.title).toBe(newPost.title);
    expect(responseBody.userId).toBe(newPost.userId);
  });

});
