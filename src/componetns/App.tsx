import {
  generateCodeChallenge,
  generateCodeVerifier,
  getGitLabRedirectURI,
} from '../utils';

function App() {
  const handleButtonClick = () => {
    const codeVerifier = generateCodeVerifier();
    console.log('codeVerifier', codeVerifier);

    window.sessionStorage.setItem('codeVerifier', codeVerifier);

    const codeChalanger = generateCodeChallenge(codeVerifier);
    console.log('codeChalanger', codeChalanger);

    const gitLabRedirectURI = getGitLabRedirectURI(codeVerifier);
    console.log('codeChalanger', gitLabRedirectURI);

    window.location.replace(gitLabRedirectURI);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Authorize GitLab</button>
    </div>
  );
}

export default App;
