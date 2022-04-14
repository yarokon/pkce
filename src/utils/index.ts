import { SHA256, enc } from 'crypto-js';
import * as queryString from 'query-string';
import axios from 'axios';

function getRandomInteger(max = 100) {
  return Math.floor(Math.random() * max);
}

// The CODE_VERIFIER is a random string, between 43 and 128 characters in length,
// which use the characters A-Z, a-z, 0-9, -, ., _, and ~.
export function generateCodeVerifier(length = 128) {
  const CHARACTERS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

  return Array.from({ length })
    .map(() => {
      const randomIndex = getRandomInteger(CHARACTERS.length);

      return CHARACTERS[randomIndex];
    })
    .join('');
}

// The CODE_CHALLENGE is an URL-safe base64-encoded string of the SHA256 hash of the CODE_VERIFIER
export function generateCodeChallenge(codeVerifier: string) {
  return SHA256(codeVerifier).toString(enc.Base64url);
}

export function getGitLabRedirectURI(codeChallenge: string) {
  const state = generateCodeVerifier(16);

  window.sessionStorage.setItem('state', state);

  const queryParams = {
    client_id: process.env.REACT_APP_APPLICATION_ID,
    redirect_uri: process.env.REACT_APP_CALLBACK_URL,
    response_type: 'code',
    state,
    scope: 'api',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  };

  const gitLabQuery = queryString.stringify(queryParams);

  return `${process.env.REACT_APP_GITLAB_BASE_URL}/oauth/authorize?${gitLabQuery}`;
}

export async function authorizeGitLabByCode(code: string) {
  const params = {
    client_id: process.env.REACT_APP_APPLICATION_ID,
    code,
    grant_type: 'authorization_code',
    redirect_uri: process.env.REACT_APP_CALLBACK_URL,
    code_verifier: window.sessionStorage.getItem('codeVerifier'),
  };

  return await axios.post<{ access_token: string; refresh_token: string }>(
    `${process.env.REACT_APP_GITLAB_BASE_URL}/oauth/token`,
    params
  );
}

export async function getProjects() {
  const params = {
    membership: true,
  };

  return await axios.get<
    { id: number; name: string; http_url_to_repo: string }[]
  >(`${process.env.REACT_APP_GITLAB_BASE_URL}/api/v4/projects`, {
    params,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    },
  });
}
