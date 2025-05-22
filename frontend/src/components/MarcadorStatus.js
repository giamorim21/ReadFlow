const MarcadorStatus = ({ ativo, onClick, children }) => {
  return (
    <div
      className={`marcador ${ativo ? 'ativo' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      {children}
    </div>
  );
};

export default MarcadorStatus;
