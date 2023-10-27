// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key: jest.fn()
};
global.localStorage = localStorageMock;

// Mock the request issued by the react app to get the client configuration parameters.
window.fetch = () => {
    return Promise.resolve(
        {
            ok: true,
            json: () => Promise.resolve({
                "authority": "https://localhost:7251",
                "client_id": "Kemkas.Web",
                "redirect_uri": "https://localhost:7251/authentication/login-callback",
                "post_logout_redirect_uri": "https://localhost:7251/authentication/logout-callback",
                "response_type": "id_token token",
                "scope": "Kemkas.WebAPI openid profile"
            })
        });
};
