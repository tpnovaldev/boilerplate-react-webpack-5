import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { usersSelector } from '../../features/users/userSlice';
// import { fetchUsers } from '../../features/users/userService';
import { BaseLayout, Modal } from '../../components';

import HowToPlayModal from './Modals/HowToPlay';
import SetupTeamModal from './Modals/SetupTeam';

import Wheel from '../../assets/images/lucky_wheel.png';
import ImageBg from '../../assets/images/background.jpg';

function LandingPage() {
  // const navigate = useNavigate();

  const [welcomeModalOpen, setWelcomeModalOpen] = React.useState(false);
  const [
    teamModalOpen,
    // setTeamModalOpen
  ] = React.useState(false);

  // React.useEffect(() => {
  //   navigate('/start-your-game#welcome');
  // }, [])

  // React.useEffect(() => {
  //   if (window.location.hash === '#welcome') {
  //     setWelcomeModalOpen(true);
  //     setTeamModalOpen(false);
  //   } else if (window.location.hash === '#team') {
  //     setTeamModalOpen(true);
  //     setWelcomeModalOpen(false);
  //   }
  // }, [window.location.hash]);

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
    <BaseLayout>
      <section id="home" className="section-page" style={{ backgroundImage: `url(${ImageBg})` }}>
        <div className="container">
          <div className="wheel">
            <img src={Wheel} alt="wheel" />
          </div>
          {/* <SpinWheel /> */}
        </div>
      </section>
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
    </BaseLayout>
  );
}

export default LandingPage;
