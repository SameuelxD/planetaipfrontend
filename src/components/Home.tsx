import React from 'react';

interface HomeProps {
  userEmail: string | null;
}

const Home: React.FC<HomeProps> = ({ userEmail }) => {
  return (
    <div>
      <h1>Bienvenido, {userEmail ? userEmail : "Invitado"}!</h1>
    </div>
  );
};

export default Home;
