import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { usersSelector } from '../../features/users/userSlice';
// import { fetchUsers } from '../../features/users/userService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Brand, Modal } from '../../components';

import HowToPlayModal from './Modals/HowToPlay';
import SetupTeamModal from './Modals/SetupTeam';

import Wheel from '../../assets/images/lucky_wheel.svg';
import Stand from '../../assets/images/stand.svg';
import ImageBg from '../../assets/images/background.jpg';

function Landing() {
  const [welcomeModalOpen, setWelcomeModalOpen] = React.useState(false);
  const [teamModalOpen, setTeamModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (window.location.hash === '#welcome') {
      setWelcomeModalOpen(true);
      setTeamModalOpen(false);
    } else if (window.location.hash === '#team') {
      setTeamModalOpen(true);
      setWelcomeModalOpen(false);
    }
  }, [window.location.hash]);

  // // set up dispatch
  // const dispatch = useDispatch();

  // // fetch data from our store
  // const { loading, error, users } = useSelector(usersSelector);

  // // hook to fetch items
  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);

  // const openInNewTab = (url) => {
  //   window.open(url, '_blank', 'noopener,noreferrer');
  // };

  return (
    <div className="main">
      <header className="header">
        <div className="container">
          <Brand />
          <nav className="nav">
            <Link to="/" className="btn btn--icon">
              <span><FontAwesomeIcon icon={faBookOpen} /></span>
            </Link>
            <Link to="/" className="btn btn--icon">
              <span><FontAwesomeIcon icon={faUserGroup} /></span>
            </Link>
            <Link to="/" className="btn btn--primary">
              <span>Finish Session</span>
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <section id="home" className="section-page" style={{ backgroundImage: `url(${ImageBg})` }}>
          <div className="container">
            <div className="wheel">
              <img src={Wheel} alt="wheel" />
              <img src={Stand} alt="stand" />
            </div>
            {/* <SpinWheel /> */}
          </div>
        </section>
      </main>
      {welcomeModalOpen
      && (
      <Modal
        title="TeamConnector 2.0"
        subtitle="Welkom bij"
        modalOpen={welcomeModalOpen}
        handleClose={() => setWelcomeModalOpen(false)}
      >
        <HowToPlayModal />
      </Modal>
      )}
      {teamModalOpen
      && (
      <Modal
        title="Setup your team"
        subtitle="Your Team"
        modalOpen={teamModalOpen}
        handleClose={() => setWelcomeModalOpen(false)}
      >
        <SetupTeamModal />
      </Modal>
      )}
    </div>
  );
}

export default Landing;
