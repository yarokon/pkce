import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import * as queryString from 'query-string';
import { authorizeGitLabByCode } from '../utils';

export function GitlabCallback() {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('search', search);
    const { code, state, error } = queryString.parse(search);

    if (!error && state === window.sessionStorage.getItem('state') && code) {
      console.log(code);

      authorizeGitLabByCode(code as string);

      navigate('/');
    }
  }, [search, navigate]);

  return <div>GitlabCallbackApp</div>;
}
