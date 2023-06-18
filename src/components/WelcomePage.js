import { Paper } from '@mui/material';



export default function WelcomePage() {


  return (
    <>
    <Paper
      // className="homepage"
      elevation={16}
    >
    <div className="homepage-text">
    <h2 className="welcome-header">Welcome to Bagbuilder</h2>
    <div className="welcome-description">
      <p> This website is used by new disc golf players and veterans of the sport <br/>
      to "build" new bags without spending the money on the discs or doing endless google searches.<br/></p>
      <span className="welcome-login-directions">Please create an account or log in to continue</span>
      <span className="welcome-login-guest">You can also continue as a guest, but your bags won't be saved for the future</span>
    </div>
    </div>
    </Paper>
    </>
  )
}


