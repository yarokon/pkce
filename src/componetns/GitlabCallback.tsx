import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import * as queryString from 'query-string';
import { authorizeGitLabByCode } from '../utils';

export function GitlabCallback() {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { code, state, error } = queryString.parse(search);

    if (!error && state === window.sessionStorage.getItem('state') && code) {
      console.log('\nCODE');
      console.log(code);

      authorizeGitLabByCode(code as string).then(
        ({ data: { access_token, refresh_token } }) => {
          console.log('\nACCESS_TOKEN');
          console.log(access_token);

          localStorage.setItem('access_token', access_token);
          localStorage.refresh_token('refresh_token', refresh_token);
        }
      );

      navigate('/');
    }
  }, [search, navigate]);

  return <div>GitlabCallbackApp</div>;
}
