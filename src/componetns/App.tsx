import {
  generateCodeChallenge,
  generateCodeVerifier,
  getGitLabRedirectURI,
} from '../utils';
import { Projects } from './Projects';

function App() {
  const handleButtonClick = () => {
    const codeVerifier = generateCodeVerifier();

    console.log('\nCODE_VERIFIER');
    console.log(codeVerifier);

    window.sessionStorage.setItem('codeVerifier', codeVerifier);

    const codeChalanger = generateCodeChallenge(codeVerifier);

    console.log('\nCODE_CHALANGER');
    console.log(codeChalanger);

    const gitLabRedirectURI = getGitLabRedirectURI(codeChalanger);

    window.location.replace(gitLabRedirectURI);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Authorize GitLab</button>

      <Projects />
    </div>
  );
}

export default App;
