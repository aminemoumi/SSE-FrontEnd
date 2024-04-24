import '../styles/ForgotPassword.css'

const ForgotPassword = () => {
  const handleResetPassword = () => {
    // Implement password reset logic here.
    // Implémenter la logique de réinitialisation du mot de passe ici
    console.log('La procédure de réinitialisation du mot de passe a été déclenchée.');
  };

  return (
    <section className='section'>
      <p>Mot de passe oublié  ?</p>
      <button onClick={handleResetPassword}>Réinitialiser le mot de passe</button>
    </section>
  );
};

export default ForgotPassword;
